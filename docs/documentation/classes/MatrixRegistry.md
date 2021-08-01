# MatrixRegistry

## Constructor
```js
new MatrixCord.MatrixRegistry(client)
```

| Parameter | Type                           | Description                 |
|:---------:|:------------------------------:|:---------------------------:|
| client    | [MatrixClient](./MatrixClient) | Client this registry is for |

## Properties

### .client <Badge text="READONLY" type="readonly"/>
The client this registry is for\
**Type:** [MatrixClient](./MatrixClient)

### .events <Badge text="READONLY" type="readonly"/>
Collection of registered events mapped by their id\
**Type:** [Collection](@external_Collection)<[String](@external_string), [MatrixEvent](./MatrixEvent)>

## Methods

### .registerDefaultCommands(commands)
| Parameter | Type                                        | Optional           | Default | Description                                  |
|:---------:|:-------------------------------------------:|:------------------:|:-------:|:--------------------------------------------:|
| commands  | [DefaultCommands](../types/DefaultCommands) | :heavy_check_mark: | none    | Object specifying which commands to register |
**Returns:** [MatrixRegistry](./MatrixRegistry)

### .registerEvent(event)
| Parameter | Type                         | Description              |
|:---------:|:----------------------------:|:------------------------:|
| event     | [MatrixEvent](./MatrixEvent) | Accepts a event instance |
**Returns:** [MatrixRegistry](./MatrixRegistry)

### .registerEvents(events)
| Parameter | Type                                                   | Description                         |
|:---------:|:------------------------------------------------------:|:-----------------------------------:|
| events    | [Array](@external_array)<[MatrixEvent](./MatrixEvent)> | Accepts an array of event instances |
**Returns:** [MatrixRegistry](./MatrixRegistry)

### .registerEventsIn(path)
| Parameter | Type                       | Description                             |
|:---------:|:--------------------------:|:---------------------------------------:|
| path      | [String](@external_string) | Accepts an absolute path to a directory |
**Returns:** [MatrixRegistry](./MatrixRegistry)