import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine } from 'common-tags'
import { MatrixClient } from '..'

export default class ReloadCommandCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'reload',
      aliases: ['reload-command'],
      group: 'commands',
      memberName: 'reload',
      description: 'Reloads a command or command group.',
      details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Providing a command group will reload all of the commands in that group.
				Only the bot owner(s) may use this command.
			`,
      examples: ['reload some-command'],
      clientPermissions: ['EMBED_LINKS'],
      ownerOnly: true,
      guarded: true,
      args: [
        {
          key: 'cmdOrGrp',
          label: 'command/group',
          prompt: 'Which command or group would you like to reload?',
          type: 'group|command'
        }
      ]
    })
  }

  async run(msg: CommandoMessage, args: any) {
    const createEmbed = (text: string) => {
      return new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(text)
    }

    const { cmdOrGrp } = args
    const isCmd = Boolean(cmdOrGrp.groupID)
    cmdOrGrp.reload()

    if (this.client.shard) {
      try {
        await this.client.shard.broadcastEval(`
					const ids = [${this.client.shard.ids.join(',')}];
					if(!this.shard.ids.some(id => ids.includes(id))) {
						this.registry.${isCmd ? 'commands' : 'groups'}.get('${isCmd ? cmdOrGrp.name : cmdOrGrp.id}').reload();
					}
				`)
      } catch (err) {
        this.client.emit('warn', `Error when broadcasting command reload to other shards`)
        this.client.emit('error', err)
        if (isCmd) {
          await msg.reply(createEmbed(`Reloaded \`${cmdOrGrp.name}\` command, but failed to reload on other shards.`))
        } else {
          await msg.reply(createEmbed(`Reloaded all of the commands in the \`${cmdOrGrp.name}\` group, but failed to reload on other shards.`))
        }
        return null
      }
    }

    if (isCmd) {
      await msg.reply(createEmbed(`Reloaded \`${cmdOrGrp.name}\` command${this.client.shard ? ' on all shards' : ''}.`))
    } else {
      await msg.reply(createEmbed(`Reloaded all of the commands in the \`${cmdOrGrp.name}\` group${this.client.shard ? ' on all shards' : ''}.`))
    }
    return null
  }
}
