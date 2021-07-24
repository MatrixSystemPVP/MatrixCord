import { Command, CommandoMessage } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine, stripIndents } from 'common-tags'
import { MatrixClient } from '..'

export default class PrefixCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'prefix',
      group: 'util',
      memberName: 'prefix',
      description: 'Shows or sets the command prefix.',
      format: '[prefix/"default"/"none"]',
      details: oneLine`
        If no prefix is provided, the current prefix will be shown.
        If the prefix is "default", the prefix will be reset to the bot's default prefix.
        If the prefix is "none", the prefix will be removed entirely, only allowing mentions to run commands.
        Only administrators may change the prefix.
      `,
      examples: ['prefix', 'prefix -', 'prefix omg!', 'prefix default', 'prefix none'],
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'prefix',
          prompt: "What would you like to set the bot's prefix to?",
          type: 'string',
          max: 15,
          default: ''
        }
      ]
    })
  }
  async run(msg: CommandoMessage, args: any) {
    const createEmbed = (text: string) => {
      return new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(text)
    }

    // Output the prefix when no arguments are specified
    if (!args.prefix) {
      const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix
      return msg.reply(
        createEmbed(
          stripIndents`${prefix ? `The command prefix is \`${prefix}\`.` : 'There is no command prefix.'}
            To run commands, use ${msg.anyUsage('command')}.`
        )
      )
    }

    // Check users permission before doing anything
    if (msg.guild) {
      if (!msg.member?.permissions.has('ADMINISTRATOR') && !this.client.isOwner(msg.author.id))
        return msg.reply(createEmbed('Only administrators may change the command prefix.'))
    } else if (!this.client.isOwner(msg.author.id)) return msg.reply(createEmbed('Only the bot owner(s) may change the global command prefix.'))

    // Save the prefix
    const lowercase = args.prefix.toLowerCase()
    const prefix = lowercase === 'none' ? '' : args.prefix
    let response
    if (lowercase === 'default') {
      if (msg.guild) msg.guild.commandPrefix = null!
      else this.client.commandPrefix = null!
      const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : 'no prefix'
      response = `Reset the command prefix to the default (currently ${current}).`
    } else {
      if (msg.guild) msg.guild.commandPrefix = prefix
      else this.client.commandPrefix = prefix
      response = prefix ? `Set the command prefix to \`${args.prefix}\`.` : 'Removed the command prefix entirely.'
    }
    await msg.reply(createEmbed(`${response}\nTo run commands, use ${msg.anyUsage('command')}.`))
    return null
  }
}
