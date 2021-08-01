# Util
Contains various general-purpose utility methods.

## Methods

### .validateHex(hex) <Badge text="STATIC" type="static"/>
Validates the specified hex color
| Parameter | Type                       | Description          |
|:---------:|:--------------------------:|:--------------------:|
| hex       | [String](@external_string) | A string to validate |
**Returns:** [Boolean](@external_boolean)

### .traverseDir(dir) <Badge text="STATIC" type="static"/>
Finds all files in the specified directory and returns them
| Parameter | Type                       | Description           |
|:---------:|:--------------------------:|:---------------------:|
| dir       | [String](@external_string) | A path to a directory |
**Returns:** [Array](@external_array)<[String](@external_string)>