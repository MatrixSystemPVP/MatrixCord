import { CommandoClient, CommandoMessage } from 'discord.js-commando'
import { MatrixRegistry } from './registry'
import { MatrixClientOptions } from './types'
import Util from './Util'

export class MatrixClient extends CommandoClient {
  public readonly matrixRegistry: MatrixRegistry
  private colors: Map<string, string>
  private defaultColor: string | null
  private globalColor: string = '0099ff'
  constructor(options?: MatrixClientOptions) {
    super(options)
    this.matrixRegistry = new MatrixRegistry(this)
    this.colors = new Map()
    this.defaultColor = options?.color || null
    this.setColor(options?.color)
    this.once('providerReady', () => {
      const globalColor = this.provider.get('global', 'color')
      if (globalColor) this.globalColor = globalColor
    })
  }
  public getColor(guildID?: string): string {
    if (guildID) {
      const guildColor = this.colors.get(guildID)
      if (guildColor) return guildColor
      const providerColor = this.provider.get(guildID, 'color')
      if (providerColor) return providerColor
    }
    return this.globalColor
  }
  public getColorFromMsg(msg: CommandoMessage): string {
    if (msg.guild) return this.getColor(msg.guild.id)
    else return this.getColor()
  }
  public setColor(color?: null | string, guildID?: string): boolean {
    if (color !== undefined && color !== null && !Util.validateHex(color)) return false
    if (guildID) {
      if (color === undefined || color === null) {
        this.colors.delete(guildID)
        if (this.provider) this.provider.remove(guildID, 'color')
      } else {
        this.colors.set(guildID, color)
        if (this.provider) this.provider.set(guildID, 'color', color)
      }
    } else {
      if (color === undefined || color === null) {
        this.globalColor = this.defaultColor || '#0099ff'
        if (this.provider) this.provider.remove('global', 'color')
      } else {
        this.globalColor = color
        if (this.provider) this.provider.set('global', 'color', color)
      }
    }
    return true
  }
}
