import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine } from 'common-tags'
import { MatrixClient } from '..'

export default class DisableCommandCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'disable',
      aliases: ['disable-command', 'cmd-off', 'command-off'],
      group: 'commands',
      memberName: 'disable',
      description: 'Disables a command or command group.',
      details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
      examples: ['disable util', 'disable Utility', 'disable prefix'],
      clientPermissions: ['EMBED_LINKS'],
      guarded: true,
      args: [
        {
          key: 'cmdOrGrp',
          label: 'command/group',
          prompt: 'Which command or group would you like to disable?',
          type: 'group|command'
        }
      ]
    })
  }

  hasPermission(msg: CommandoMessage) {
    if (!msg.guild) return this.client.isOwner(msg.author)
    return msg.member!.permissions.has('ADMINISTRATOR') || this.client.isOwner(msg.author)
  }

  run(msg: CommandoMessage, args: any) {
    const createEmbed = (text: string) => {
      return new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(text)
    }

    if (!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
      return msg.reply(createEmbed(`The \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} is already disabled.`), {})
    }
    if (args.cmdOrGrp.guarded) {
      return msg.reply(createEmbed(`You cannot disable the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`))
    }
    args.cmdOrGrp.setEnabledIn(msg.guild, false)
    return msg.reply(createEmbed(`Disabled the \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'}.`))
  }
}
