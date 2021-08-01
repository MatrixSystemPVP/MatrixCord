# MatrixEvent

## Constructor
```js
new MatrixCord.MatrixEvent(client, info)
```

| Parameter | Type                            | Description                 |
|:---------:|:-------------------------------:|:---------------------------:|
| client    | [MatrixClient](./MatrixClient)  | The client the event is for |
| info      | [EventInfo](../types/EventInfo) | The event information       |

## Properties

### .client <Badge text="READONLY" type="readonly"/>
Client that this event is for\
**Type:** [MatrixClient](./MatrixClient)

### .id
Unique id for this event\
**Type:** [String](@external_string)

### .name
Valid event name\
**Type:** keyof [ClientEvents](@external_ClientEvents)

### .once
Whether the event should run once\
**Type:** [Boolean](@external_boolean)

## Methods

### .run(...args) <Badge text="ABSTRACT" type="abstract"/>
| Parameter | Type                                                                                  | Description                           |
|:---------:|:-------------------------------------------------------------------------------------:|:-------------------------------------:|
| ...args   | [ClientEvents](@external_ClientEvents)[keyof [ClientEvents](@external_ClientEvents)]  | All arguments from the specific event |
**Returns:** Any

### .validateInfo(client, info) <Badge text="STATIC" type="static"/>
| Parameter | Type                            | Description           |
|:---------:|:-------------------------------:|:---------------------:|
| client    | [MatrixClient](./MatrixClient)  | The client to use     |
| info      | [EventInfo](../types/EventInfo) | The event information |
**Returns:** Void