import { Command, CommandoMessage, util } from 'discord.js-commando'
import { MessageEmbed, Util } from 'discord.js'
import { stripIndents } from 'common-tags'
import { MatrixClient } from '..'
import { inspect } from 'util'

const nlPattern = new RegExp('!!NL!!', 'g')

export default class EvalCommand extends Command {
  _sensitivePattern: null | RegExp
  lastResult: any
  constructor(client: MatrixClient) {
    super(client, {
      name: 'eval',
      group: 'util',
      memberName: 'eval',
      description: 'Executes JavaScript code.',
      format: '<script>',
      details: 'Only the bot owner(s) may use this command.',
      ownerOnly: true,
      clientPermissions: ['EMBED_LINKS'],
      args: [
        {
          key: 'script',
          prompt: 'What code would you like to evaluate?',
          type: 'string'
        }
      ]
    })
    this._sensitivePattern = null
    this.lastResult = null
  }
  run(msg: CommandoMessage, { script }: any) {
    const message = msg
    const { client } = this

    if (script.startsWith('```') && script.endsWith('```')) script = script.replace(/(^.*?\s)|(\n.*$)/g, '')

    let hrStart
    let hrDiff
    try {
      hrStart = process.hrtime()
      this.lastResult = eval(script)
      hrDiff = process.hrtime(hrStart)
    } catch (err) {
      hrDiff = process.hrtime(hrStart)
      const time = `${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms`
      return msg.reply(
        new MessageEmbed().setColor(client.getColorFromMsg(msg)).setDescription(stripIndents`
        **Input**
        \`\`\`js
        ${script}
        \`\`\`
        **Output** (*Callback executed after ${time}.*)
        \`\`\`js
        ${err}
        \`\`\`
      `)
      )
    }

    const result = this.makeResultMessages(this.lastResult, hrDiff, script)
    return Promise.all(result.map((item) => msg.reply(new MessageEmbed().setColor(client.getColorFromMsg(msg)).setDescription(item))))
  }
  makeResultMessages(result: any, hrDiff: [number, number], input: null | string = null) {
    const inspected = inspect(result, { depth: 0 })
      .replace(nlPattern, '\n')
      .replace(this.sensitivePattern, 'Do not even try it ;)')
      .replace(util.escapeRegex(`/${this.client.token!}/gi`), "'Do not even try it ;)'")
    const split = inspected.split('\n')
    const last = inspected.length - 1
    const prependPart = inspected[0] !== '{' && inspected[0] !== '[' && inspected[0] !== "'" ? split[0] : inspected[0]
    const appendPart = inspected[last] !== '}' && inspected[last] !== ']' && inspected[last] !== "'" ? split[split.length - 1] : inspected[last]
    const prepend = `\`\`\`js\n${prependPart}\n`
    const append = `\n${appendPart}\n\`\`\``
    const time = `${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms`
    if (input) {
      return Util.splitMessage(
        stripIndents`
        **Input**
        \`\`\`js
        ${input}
        \`\`\`
        **Output** (*Executed in ${time}.*)
				\`\`\`js
				${inspected}
				\`\`\`
			`,
        { maxLength: 1900, prepend, append }
      )
    } else {
      return Util.splitMessage(
        stripIndents`
        **Input**
        \`\`\`js
        ${input ? input : 'undefined'}
        \`\`\`
				**Output** (*Callback executed after ${time}.*)
				\`\`\`js
				${inspected}
				\`\`\`
			`,
        { maxLength: 1900, prepend, append }
      )
    }
  }
  get sensitivePattern() {
    if (!this._sensitivePattern) {
      const client = this.client
      let pattern = ''
      if (client.token) pattern += util.escapeRegex(client.token)
      this._sensitivePattern = new RegExp(pattern, 'gi')
    }
    return this._sensitivePattern
  }
}
