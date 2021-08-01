# MatrixCord
[![Discord](https://discord.com/api/guilds/738111582864932897/embed.png)](https://discord.gg/kEbQyy6)
[![Downloads](https://img.shields.io/npm/dt/matrixcord.svg)](https://www.npmjs.com/package/matrixcord)
[![Version](https://img.shields.io/npm/v/matrixcord.svg)](https://www.npmjs.com/package/matrixcord)

## About
MatrixCord is a multipurpose framework for [discord.js](https://github.com/discordjs/discord.js) which is based on and extends [discord.js-commando](https://github.com/discordjs/Commando).\
It's created for and used in [MatrixBot](https://matrixbot.ddns.net) a multipurpose Discord Bot.

## Features
- All features from [discord.js-commando](https://github.com/discordjs/Commando#features)
- Beautiful commands using Embeds
- Changeable server specific favorite color
- Event handler

## Installation 
```
npm install matrixcord
```

## Sample usage
```js
// Import in ES6 style or via require()
import { MatrixClient } from 'matrixcord'
import * as path from 'path'

const client = new MatrixClient({/* Optional options */})

client.once('ready', () => {
  client.registry
    .registerDefaultTypes() // Register Commando's default types
    .registerDefaultGroups() // Register Commando's default groups
  client.matrixRegistry
    .registerDefaultCommands({/* Optional options */}) // Register default commands
    .registerEventsIn(path.join(__dirname, 'events')) // Register all event files in the specified directory
})

client.login('BOT_TOKEN')
```

## Documentation
[View the docs here.](https://matrixsystempvp.github.io/MatrixCord/)\
See the [discord.js-commando documentation](https://discord.js.org/#/docs/commando) and [discord.js documentation](https://discord.js.org/#/docs) as well.