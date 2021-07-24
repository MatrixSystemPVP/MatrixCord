import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { MatrixClient } from '..'

export default class ListGroupsCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'groups',
      aliases: ['list-groups', 'show-groups'],
      group: 'commands',
      memberName: 'groups',
      description: 'Lists all command groups.',
      details: 'Only administrators may use this command.',
      clientPermissions: ['EMBED_LINKS'],
      guarded: true
    })
  }

  hasPermission(msg: CommandoMessage) {
    if (!msg.guild) return this.client.isOwner(msg.author)
    return msg.member!.permissions.has('ADMINISTRATOR') || this.client.isOwner(msg.author)
  }

  run(msg: CommandoMessage) {
    const createEmbed = (text: string) => {
      return new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(text).setTitle('Groups')
    }

    return msg.reply(
      createEmbed(`${this.client.registry.groups.map((grp) => `**${grp.name}:** ${grp.isEnabledIn(msg.guild) ? 'Enabled' : 'Disabled'}`).join('\n')}`)
    )
  }
}
