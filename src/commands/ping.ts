import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed, Message } from 'discord.js'
import { MatrixClient } from '..'

export default class PingCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'ping',
      group: 'util',
      memberName: 'ping',
      description: "Checks the bot's ping to the Discord server.",
      clientPermissions: ['EMBED_LINKS'],
      throttling: { usages: 5, duration: 10 }
    })
  }
  async run(msg: CommandoMessage) {
    const createEmbed = (pMsg?: Message) => {
      return new MessageEmbed()
        .setColor(this.client.getColorFromMsg(msg))
        .setTitle(`${pMsg ? ':ping_pong: Pong!' : ':ping_pong: Pinging...'}`)
        .setDescription(
          `${pMsg ? `Message round-trip: ${pMsg.createdTimestamp - msg.createdTimestamp}ms\nHeartbeat ping: ${this.client.ws.ping}` : ''}`
        )
    }
    const pingMsg = await msg.reply(createEmbed())
    return pingMsg.edit(createEmbed(pingMsg))
  }
}
