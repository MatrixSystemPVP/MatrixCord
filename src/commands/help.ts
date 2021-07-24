import { Command, CommandoMessage, util } from 'discord.js-commando'
import { MessageEmbed } from 'discord.js'
import { oneLine, stripIndents } from 'common-tags'
import { MatrixClient } from '..'

export default class HelpCommand extends Command {
  constructor(client: MatrixClient) {
    super(client, {
      name: 'help',
      aliases: ['commands'],
      group: 'util',
      memberName: 'help',
      description: 'Displays a list of available commands, or detailed information for a specified command.',
      format: '[command]',
      details: oneLine`
				The command may be part of a command name or a whole command name.
				If it isn't specified, all available commands will be listed.
			`,
      examples: ['help', 'help all', 'help prefix'],
      clientPermissions: ['EMBED_LINKS'],
      guarded: true,
      args: [
        {
          key: 'command',
          prompt: 'Which command would you like to view the help for?',
          type: 'string',
          default: ''
        }
      ]
    })
  }
  async run(msg: CommandoMessage, args: any) {
    const groups = this.client.registry.groups
    const commands = this.client.registry.findCommands(args.command, false, msg)
    const showAll = args.command && args.command.toLowerCase() === 'all'
    if (args.command && !showAll) {
      if (commands.length === 1) {
        let help = stripIndents`**Format:** ${msg.anyUsage(`${commands[0].name}${commands[0].format ? ` ${commands[0].format}` : ''}`)}`
        if (commands[0].aliases.length > 0) help += `\n**Aliases:** ${commands[0].aliases.join(', ')}`
        help += `\n${oneLine`
					**Group:** ${commands[0].group?.name}
					(\`${commands[0].groupID}:${commands[0].name}\`)
				`}`
        if (commands[0].description) help += `\n**Description:** ${commands[0].description}`
        if (commands[0].details) help += `\n**Details:** ${commands[0].details}`
        if (commands[0].examples) help += `\n**Examples:**\n${commands[0].examples.join('\n')}`

        const messages = []
        messages.push(
          await msg.channel.send(
            new MessageEmbed()
              .setColor(this.client.getColorFromMsg(msg))
              .setTitle(
                stripIndents`
                  ${oneLine`
                  Command __${commands[0].name}__
                  ${commands[0].guildOnly ? ' (Usable only in servers)' : ''}
                  ${commands[0].nsfw ? ' (NSFW)' : ''}
                  `}
                `
              )
              .setDescription(help)
          )
        )
        return messages
      } else if (commands.length > 15) {
        return msg.reply('Multiple commands found. Please be more specific.')
      } else if (commands.length > 1) {
        return msg.reply(util.disambiguation(commands, 'commands'))
      } else {
        return msg.reply(
          `Unable to identify command. Use ${msg.usage(
            null!,
            msg.channel.type === 'dm' ? null! : undefined,
            msg.channel.type === 'dm' ? null! : undefined
          )} to view the list of all commands.`
        )
      }
    } else {
      const messages = []
      messages.push(
        await msg.channel.send(
          new MessageEmbed().setColor(this.client.getColorFromMsg(msg)).setDescription(stripIndents`
            ${`
              To run a command in ${msg.guild ? msg.guild.name : 'any server'},
              use ${Command.usage('command', msg.guild ? msg.guild.commandPrefix : undefined, this.client.user!)}.
              For example, ${Command.usage('prefix', msg.guild ? msg.guild.commandPrefix : undefined, this.client.user!)}.
            `}
            Use ${this.usage('<command>', null!, null!)} to view detailed information about a specific command.
            Use ${this.usage('all', null!, null!)} to view a list of *all* commands, not just available ones.

            __**${showAll ? 'All commands' : `Available commands in ${msg.guild || 'this DM'}`}**__

            ${groups
              .filter((grp) => grp.commands.some((cmd) => !cmd.hidden && (showAll || cmd.isUsable(msg))))
              .map(
                (grp) => stripIndents`
                __${grp.name}__
                ${grp.commands
                  .filter((cmd) => !cmd.hidden && (showAll || cmd.isUsable(msg)))
                  .map((cmd) => `\`${cmd.name}\``)
                  .join(', ')}
              `
              )
              .join('\n\n')}
          `)
        )
      )
      return messages
    }
  }
}
