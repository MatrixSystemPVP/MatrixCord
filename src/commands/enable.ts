import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine } from 'common-tags'
import { MatrixClient } from '..'

export default class EnableCommandCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'enable',
      aliases: ['enable-command', 'cmd-on', 'command-on'],
      group: 'commands',
      memberName: 'enable',
      description: 'Enables a command or command group.',
      details: oneLine`
				The argument must be the name/ID (partial or whole) of a command or command group.
				Only administrators may use this command.
			`,
      examples: ['enable util', 'enable Utility', 'enable prefix'],
      clientPermissions: ['EMBED_LINKS'],
      guarded: true,
      args: [
        {
          key: 'cmdOrGrp',
          label: 'command/group',
          prompt: 'Which command or group would you like to enable?',
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

    const group = args.cmdOrGrp.group
    if (args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
      return msg.reply(
        createEmbed(
          `The \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'command' : 'group'} is already enabled${
            group && !group.isEnabledIn(msg.guild) ? `, but the \`${group.name}\` group is disabled, so it still can't be used` : ''
          }.`
        )
      )
    }
    args.cmdOrGrp.setEnabledIn(msg.guild, true)
    return msg.reply(
      createEmbed(
        `Enabled the \`${args.cmdOrGrp.name}\` ${group ? 'command' : 'group'}${
          group && !group.isEnabledIn(msg.guild) ? `, but the \`${group.name}\` group is disabled, so it still can't be used` : ''
        }.`
      )
    )
  }
}
