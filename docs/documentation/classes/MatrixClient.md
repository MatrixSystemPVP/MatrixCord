# MatrixClient
extends [CommandoClient](@external_CommandoClient)

## Constructor
```js
new MatrixCord.MatrixClient(options)
```

| Parameter | Type                                                | Optional           | Default | Description            |
|:---------:|:---------------------------------------------------:|:------------------:|:-------:|:----------------------:|
| options   | [MatrixClientOptions](../types/MatrixClientOptions) | :heavy_check_mark: | none    | Options for the client |

## Properties

### .matrixRegistry <Badge text="READONLY" type="readonly"/>
The client's registry\
**Type:** [MatrixRegistry](./MatrixRegistry)

## Methods

### .getColor(guildID)
Get the global color or color of the guild if guildID is specified
| Parameter | Type                       | Optional           | Default | Description   |
|:---------:|:--------------------------:|:------------------:|:-------:|:-------------:|
| guildID   | [String](@external_string) | :heavy_check_mark: | none    | Id of a guild |
**Returns:** HEX color

### .getColorFromMsg(message)
Get the global color or color of the guild if the message was send in a guild
| Parameter | Type                                         | Description                                       |
|:---------:|:--------------------------------------------:|:-------------------------------------------------:|
| message   | [CommandoMessage](@external_CommandoMessage) | Most likely the message which triggered a command |
**Returns:** HEX color

### .setColor(color, guildID)
Set/Reset the global color or set/reset color of a guild if guildID is specified
| Parameter | Type                                                 | Optional           | Default | Description                                 |
|:---------:|:----------------------------------------------------:|:------------------:|:-------:|:-------------------------------------------:|
| color     | [null](@external_null) \| [String](@external_string) | :x:                | none    | Null for default color or a valid HEX color |
| guildID   | [String](@external_string)                           | :heavy_check_mark: | none    | Id of a guild                               |
**Returns:** [Boolean](@external_boolean)