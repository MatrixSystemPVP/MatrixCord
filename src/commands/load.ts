import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine } from 'common-tags'
import { MatrixClient } from '..'
import * as fs from 'fs'

export default class LoadCommandCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'load',
      aliases: ['load-command'],
      group: 'commands',
      memberName: 'load',
      description: 'Loads a new command.',
      details: oneLine`
				The argument must be full name of the command in the format of \`group:memberName\`.
				Only the bot owner(s) may use this command.
			`,
      examples: ['load some-command'],
      clientPermissions: ['EMBED_LINKS'],
      ownerOnly: true,
      guarded: true,
      args: [
        {
          key: 'command',
          prompt: 'Which command would you like to load?',
          validate: (val: string) =>
            new Promise((resolve) => {
              if (!val) return resolve(false)
              const split = val.split(':')
              if (split.length !== 2) return resolve(false)
              if (this.client.registry.findCommands(val).length > 0) {
                return resolve('That command is already registered.')
              }
              const cmdPath = this.client.registry.resolveCommandPath(split[0], split[1])
              fs.access(cmdPath, fs.constants.R_OK, (err) => (err ? resolve(false) : resolve(true)))
              return null
            }),
          parse: (val: string) => {
            const split = val.split(':')
            const cmdPath = this.client.registry.resolveCommandPath(split[0], split[1])
            delete require.cache[cmdPath]
            return require(cmdPath)
          }
        }
      ]
    })
  }

  async run(msg: CommandoMessage, args: any) {
    const createEmbed = (text: string) => {
      return new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(text)
    }

    this.client.registry.registerCommand(args.command)
    const command = this.client.registry.commands.last()

    if (this.client.shard) {
      try {
        await this.client.shard.broadcastEval(`
					const ids = [${this.client.shard.ids.join(',')}];
					if(!this.shard.ids.some(id => ids.includes(id))) {
						const cmdPath = this.registry.resolveCommandPath('${command!.groupID}', '${command!.name}');
						delete require.cache[cmdPath];
						this.registry.registerCommand(require(cmdPath));
					}
				`)
      } catch (err) {
        this.client.emit('warn', `Error when broadcasting command load to other shards`)
        this.client.emit('error', err)
        await msg.reply(createEmbed(`Loaded \`${command!.name}\` command, but failed to load on other shards.`))
        return null
      }
    }

    await msg.reply(createEmbed(`Loaded \`${command!.name}\` command${this.client.shard ? ' on all shards' : ''}.`))
    return null
  }
}
