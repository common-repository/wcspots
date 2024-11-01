# Unit Range Control - custom component for size control

This component is a alternative way to control elements sizing. It renders the markup using existing Gutenberg components `RangeControl` and `SelectControll`, to be used in the block inspector.

Component creates two separate properties: `value` and `unit` to be used as object properties in attributes. Example:

```js
// ... other attributes.
"myAttribute": {
	"type": "object",
	"default": {"value":1, "unit": "vw"}
},
```

Two event handlers are `onValueChange` and `onUnitChange` (see "Usage").

## Usage

```js
// Internal dependency.
import UnitRangeControl from './UnitRangeControl';

// Handle value change.
const handleValueChange = (newValue) => {
	setAttributes({ myAttribute: { value: newValue, unit: myAttribute.unit } });
};
// Handle unit change.
const handleUnitChange = (newUnit) =>{
	setAttributes({ myAttribute: { value: myAttribute.value, unit: newUnit } });
};

function myCustomControl() {
	return (
		<UnitRangeControl
			label={__('My attribute size', 'wcspots')}
			value={myAttribute}
			onValueChange={handleValueChange}
			onUnitChange={handleUnitChange}
			customUnitOptions={
				[
					{ label: 'px', value: 'px' },
					{ label: 'em', value: 'em' },
					{ label: 'rem', value: 'rem' },
				]
			}
			maxPx={100}
			maxVw={10}
		/>
)}
```

## Props

#### `label`

-   **Type:** `String` or `Undefined`

The label for the component

#### `help`

-   **Type:** `String` or `Undefined`

Help text for the component.

#### `value`

-   **Type:** `Object` or `Undefined`

Object containing two properties - `value` and `unit`

#### `onValueChange`

-   **Type:** `Function`

A callback function to handle the value change

#### `onUnitChange`

-   **Type:** `Function`

A callback function to handle the unit change.

#### `customUnitOptions`

-   **Type:** `Array` or `Undefined`

The array of custom unit options. If defined, custom selection of units will be accepted as options, for example `['px', 'em', 'rem']`. If undefined, all unit will be set as options.

#### `maxPx, maxPerc, maxVw, maxVh, maxEm, maxRem`

-   **Type:** `Number` or `Undefined`

Maximum allowed values for any given unit.