import { ClientEvents } from 'discord.js'
import { MatrixClient } from '.'
import { EventInfo } from './types'

export abstract class MatrixEvent {
  public readonly client: MatrixClient
  id: string
  name: keyof ClientEvents
  once: boolean
  constructor(client: MatrixClient, info: EventInfo) {
    MatrixEvent.validateInfo(client, info)
    this.client = client
    this.id = info.id.toLowerCase()
    this.name = info.name
    this.once = info.once || false
  }
  abstract run(...args: ClientEvents[keyof ClientEvents]): any
  static validateInfo(client: MatrixClient, info: EventInfo) {
    if (!client) throw new Error('A client must be specified.')
    if (!info) throw new Error('EventInfo must be specified.')
    if (typeof info !== 'object') throw new TypeError('Event info must be an object.')
    if (!info.id) throw new Error('A event id must be specified.')
    if (typeof info.id !== 'string') throw new TypeError('Event id must be a string.')
    if (!info.name) throw new Error('A event name must be specified.')
    if (typeof info.name !== 'string') throw new TypeError('Event name must be a string.')
    if (info.once !== undefined && typeof info.once !== 'boolean') throw new TypeError(`Event once must be a boolean.`)
  }
}
