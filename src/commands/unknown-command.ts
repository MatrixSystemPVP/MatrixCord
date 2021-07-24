import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { MatrixClient } from '..'

export default class UnknownCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'unknown-command',
      group: 'util',
      memberName: 'unknown-command',
      description: "Let's the user know when an unknown command is used.",
      clientPermissions: ['EMBED_LINKS'],
      hidden: true,
      unknown: true
    })
  }
  run(msg: CommandoMessage) {
    return msg.reply(
      new MessageEmbed()
        .setColor(this.client.getColorFromMsg(msg))
        .setTitle('Whoops')
        .setDescription(
          `Unknown command.\nUse ${msg.anyUsage('help', msg.guild ? undefined : null!, msg.guild ? undefined : null!)}\nto view the command list.`
        )
    )
  }
}
