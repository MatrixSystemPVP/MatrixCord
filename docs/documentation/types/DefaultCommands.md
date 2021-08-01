# DefaultCommands
extends [Object](@external_object)

## Properties
| Parameter      | Type                         | Optional           | Default | Description                                                                                                 |
|:--------------:|:----------------------------:|:------------------:|:-------:|:-----------------------------------------------------------------------------------------------------------:|
| disable        | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in disable command<br>(requires "commands" group and "group", "command" type) |
| enable         | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in enable command<br>(requires "commands" group and "group", "command" type)  |
| groups         | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in groups command<br>(requires "commands" group)                              |
| load           | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in load command<br>(requires "commands" group)                                |
| reload         | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in reload command<br>(requires "commands" group and "group", "command" type)  |
| unload         | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in unload command<br>(requires "commands" group and "command" type)           |
| eval           | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in eval command<br>(requires "util" group and "string" type)                  |
| help           | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in help command<br>(requires "util" group and "string" type)                  |
| ping           | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in ping command<br>(requires "util" group)                                    |
| prefix         | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in prefix command<br>(requires "util" group and "string" type)                |
| unknownCommand | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in unknown command<br>(requires "util" group)                                 |
| color          | [Boolean](@external_boolean) | :heavy_check_mark: | true    | Whether to register the built-in color command<br>(requires "util" group and "string" type)                 |