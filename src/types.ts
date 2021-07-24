import { CommandoClientOptions } from 'discord.js-commando'
import { MatrixRegistry } from './registry'

declare module 'discord.js' {
  export interface ClientEvents {
    matrixDebug: [string]
  }
}

declare module 'discord.js-commando' {
  export class Client {
    public readonly matrixRegistry: MatrixRegistry
    public getColor(guildID?: string): string
    public getColorFromMsg(msg: CommandoMessage): string
    public setColor(color?: null | string, guildID?: string): boolean
  }
}

export interface MatrixClientOptions extends CommandoClientOptions {
  color?: string
}

export interface DefaultCommands {
  disable?: boolean
  enable?: boolean
  groups?: boolean
  load?: boolean
  reload?: boolean
  unload?: boolean
  eval?: boolean
  help?: boolean
  ping?: boolean
  prefix?: boolean
  unknownCommand?: boolean
  color?: boolean
}
