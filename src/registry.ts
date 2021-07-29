import { Collection } from 'discord.js'
import { MatrixClient } from './client'
import { DefaultCommands } from './types'
import { MatrixEvent } from './eventBase'
import Util from './Util'
import DisableCommandCommand from './commands/disable'
import EnableCommandCommand from './commands/enable'
import ListGroupsCommand from './commands/groups'
import LoadCommandCommand from './commands/load'
import ReloadCommandCommand from './commands/reload'
import UnloadCommandCommand from './commands/unload'
import EvalCommand from './commands/eval'
import HelpCommand from './commands/help'
import PingCommand from './commands/ping'
import PrefixCommand from './commands/prefix'
import UnknownCommand from './commands/unknown-command'
import ColorCommand from './commands/color'

export class MatrixRegistry {
  public readonly client: MatrixClient
  public readonly events: Collection<string, MatrixEvent>
  private registeredEvents: string[]
  constructor(client: MatrixClient) {
    this.client = client
    this.events = new Collection()
    this.registeredEvents = []
  }
  public registerDefaultCommands(commands?: DefaultCommands): MatrixRegistry {
    const { registry } = this.client
    if (commands?.disable === undefined || commands.disable) {
      const commandoCommand = registry.commands.get('disable')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(DisableCommandCommand)
    }
    if (commands?.enable === undefined || commands.enable) {
      const commandoCommand = registry.commands.get('enable')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(EnableCommandCommand)
    }
    if (commands?.groups === undefined || commands.groups) {
      const commandoCommand = registry.commands.get('groups')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(ListGroupsCommand)
    }
    if (commands?.load === undefined || commands.load) {
      const commandoCommand = registry.commands.get('load')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(LoadCommandCommand)
    }
    if (commands?.reload === undefined || commands.reload) {
      const commandoCommand = registry.commands.get('reload')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(ReloadCommandCommand)
    }
    if (commands?.unload === undefined || commands.unload) {
      const commandoCommand = registry.commands.get('unload')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(UnloadCommandCommand)
    }
    if (commands?.eval === undefined || commands.eval) {
      const commandoCommand = registry.commands.get('eval')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(EvalCommand)
    }
    if (commands?.help === undefined || commands.help) {
      const commandoCommand = registry.commands.get('help')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(HelpCommand)
    }
    if (commands?.ping === undefined || commands.ping) {
      const commandoCommand = registry.commands.get('ping')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(PingCommand)
    }
    if (commands?.prefix === undefined || commands.prefix) {
      const commandoCommand = registry.commands.get('prefix')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(PrefixCommand)
    }
    if (commands?.unknownCommand === undefined || commands.unknownCommand) {
      const commandoCommand = registry.commands.get('unknown-command')
      if (commandoCommand) registry.unregisterCommand(commandoCommand)
      registry.registerCommand(UnknownCommand)
    }
    if (commands?.color === undefined || commands.color) registry.registerCommand(ColorCommand)
    return this
  }
  public registerEvent<A extends MatrixEvent>(matrixEvent: new (client: MatrixClient) => A): MatrixRegistry {
    const event = new matrixEvent(this.client)
    if (this.events.has(event.id)) throw new Error(`An event with the id "${event.id}" already exist.`)
    this.events.set(event.id, event)
    if (!this.registeredEvents.includes(event.name)) {
      this.registeredEvents.push(event.name)
      this.client.on(event.name, (...args) => {
        const events = this.events.filter((e) => e.name === event.name)
        events.forEach((e) => {
          if (e.once) {
            e.run(...args)
            this.events.delete(e.id)
          } else e.run(...args)
        })
      })
    }
    this.client.emit('debug', `Registered event ${event.name}:${event.id}.`)
    return this
  }
  public registerEvents<A extends MatrixEvent>(matrixEvents: Array<new (client: MatrixClient) => A>): MatrixRegistry {
    if (!Array.isArray(matrixEvents)) throw new TypeError('Events must be an Array.')
    matrixEvents.forEach((event) => this.registerEvent(event))
    return this
  }
  public registerEventsIn(path: string): MatrixRegistry {
    if (typeof path !== 'string') throw new TypeError('Path must be a string.')
    const files = Util.traverseDir(path)
    const events: Array<new (client: MatrixClient) => MatrixEvent> = []
    files.forEach((file) => {
      if (!file.endsWith('.js')) return this.client.emit('debug', `Skipping invalid event file: ${file}.`)
      const event = require(file)
      if (typeof event === 'object' && event.default !== undefined) events.push(event.default)
      else if (typeof event === 'function' && event.prototype instanceof MatrixEvent) events.push(event)
      else throw new Error(`Invalid event structure in file: "${file}". Did you export the event correctly?`)
    })
    return this.registerEvents(events)
  }
}
