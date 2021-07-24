import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine } from 'common-tags'
import { MatrixClient } from '..'
import Util from '../Util'

export default class ColorCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'color',
      group: 'util',
      memberName: 'color',
      description: 'Shows or sets the favorite color.',
      format: '[color(HEX)/"default"]',
      details: oneLine`
        If no color(HEX) is provided, the current color will be shown.
        If the color is "default", the color will be reset to the bot's default color.
        Only administrators may change the color.
      `,
      examples: ['color', 'color #4287f5', 'color default'],
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'color',
          prompt: 'Which hex color do you wanna set as favorite color?',
          type: 'string',
          default: '',
          validate: (color: string) => {
            if (color === 'default') return true
            if (Util.validateHex(color)) return true
            return `The provided color isn't a valid HEX color: \`${color}\`. Please provide a valid HEX color or the word "default".
            Need help in getting a correct HEX color? Use this color picker on google: https://www.google.com/search?q=hex+color+picker.`
          }
        }
      ]
    })
  }
  hasPermission(msg: CommandoMessage) {
    if (!msg.guild) return this.client.isOwner(msg.author.id)
    return msg.member?.permissions.has('ADMINISTRATOR') || this.client.isOwner(msg.author.id)
  }
  async run(msg: CommandoMessage, args: any) {
    const createEmbed = (text: string) => {
      return new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(text)
    }

    // Output the color when no arguments are specified
    if (!args.color) {
      const color = msg.guild ? this.client.getColor(msg.guild.id) : this.client.getColor()
      return msg.reply(createEmbed(`The current color is \`${color}\`.`))
    }

    // Check users permission before doing anything
    if (msg.guild) {
      if (!msg.member?.permissions.has('ADMINISTRATOR') && !this.client.isOwner(msg.author.id))
        return msg.reply(createEmbed('Only administrators may change the color.'))
    } else if (!this.client.isOwner(msg.author.id)) return msg.reply(createEmbed('Only the bot owner(s) may change the global color.'))

    // Save the color
    let response
    const color = args.color
    if (color === 'default') {
      if (msg.guild) this.client.setColor(null, msg.guild.id)
      else this.client.setColor(null)
      response = `Reset the color to the default (currently \`${this.client.getColor()}\`).`
    } else {
      if (msg.guild) this.client.setColor(color, msg.guild.id)
      else this.client.setColor(color)
      response = `Set the color to \`${color}\`.`
    }
    await msg.reply(createEmbed(response))
    return null
  }
}
