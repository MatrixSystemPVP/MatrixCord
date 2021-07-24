import { MatrixClient } from './client'
import { DefaultCommands } from './types'
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
  constructor(client: MatrixClient) {
    this.client = client
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
}
