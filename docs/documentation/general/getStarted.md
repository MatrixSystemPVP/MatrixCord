---
prev: ../
---

# Get Started
The first thing you need to do to use MatrixCord is ensure you're creating a [MatrixClient](../classes/MatrixClient) rather than the regular discord.js [Client](@external_Client). A MatrixClient is just an extension of the [CommandoClient](@external_CommandoClient), so all options, properties, methods, and events on CommandoClient are also on MatrixClient.

You can provide the `color` option to the constructor, which is an option specific to MatrixClient, and should be set to an valid HEX color code. This will set the default color for all embeds used in MatrixCord's default commands.

<code-group>
<code-block title="JS">

```js
const MatrixCord = require('MatrixCord')

const client = new MatrixCord.MatrixClient({
  color: '#0099ff'
})
```

</code-block>
<code-block title="TS">

```ts
import MatrixCord from 'MatrixCord'

const client = new MatrixCord.MatrixClient({
  color: '#0099ff'
})
```

</code-block>
</code-group>

Then, to make use of the multipurpose framework, you need to register Commando's default argument types, default Groups and MatrixCord's default commands, in addition to any of the built-in stuff that you want make use of. This will look something like this:

<code-group>
<code-block title="JS">

```js
const path = require('path')

client.registry
  /* Register Commando's default types */
  .registerDefaultTypes()

  /* Register Commando's default groups */
  .registerDefaultGroups()
client.matrixRegistry
  /* Register default commands */
  .registerDefaultCommands({/* Optional options */})

  /* Register all event files in the specified directory */
  .registerEventsIn(path.join(__dirname, 'events'))
```

</code-block>
<code-block title="TS">

```ts
import * as path from 'path'

client.registry
  /* Register Commando's default types */
  .registerDefaultTypes()

  /* Register Commando's default groups */
  .registerDefaultGroups()
client.matrixRegistry
  /* Register default commands */
  .registerDefaultCommands({/* Optional options */})

  /* Register all event files in the specified directory */
  .registerEventsIn(path.join(__dirname, 'events'))
```

</code-block>
</code-group>

MatrixCord has a build-in color configuration per-guild. In order for this to persist across restarts, you should use a SettingProvider. You can find more information's and how to use a SettingProvider in the [documentation of Commando](@external_CommandoDocs).

Finally, you must log in, just as if you were using a regular Client.

```js
client.login('token goes here')
```