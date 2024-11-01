import { PanelRow, RangeControl, SelectControl, BaseControl } from '@wordpress/components';
import { useState } from '@wordpress/element';

function UnitRangeControl({ label, help, value, onValueChange, onUnitChange, customUnitOptions, maxPx, maxPerc, maxVw, maxVh, maxEm, maxRem, ...props }) {

	const defaultUnitOptions = [
		{ label: 'px', value: 'px' },
		{ label: '%', value: '%' },
		{ label: 'vw', value: 'vw' },
		{ label: 'vh', value: 'vh' },
		{ label: 'em', value: 'em' },
		{ label: 'rem', value: 'rem' },
	];
	const unitOptions = customUnitOptions ? customUnitOptions : defaultUnitOptions;

	const [rangeConfig, setRangeConfig] = useState({
		min: 0,
		max: 40,
		step: 1,
	});

	const handleUnitChange = (newUnit) => {
		onUnitChange(newUnit);
		// Update range control config based on selected unit.
		const newRangeConfig = getRangeConfig(newUnit);
		setRangeConfig(newRangeConfig);
	};

	const handleValueChange = (newValue) => {
		onValueChange(newValue);
	};

	const getRangeConfig = (unit) => {
		// Calculate and return range control config based on selected unit.
		let min = 0;
		let max, step;
		switch (unit) {
			case 'px':
				max = maxPx ? maxPx : 100;
				step = 1;
				break;
			case '%':
				max = maxPerc ? maxPerc : 100;
				step = 1;
				break;
			case 'vw':
				max = maxVw ? maxVw : 10;
				step = 0.1;
				break;
			case 'vh':
				max = maxVh ? maxVh : 10;
				step = 0.1;
				break;
			case 'em':
				max = maxEm ? maxEm : 10;
				step = 0.1;
				break;
			case 'rem':
				max = maxRem ? maxRem : 10;
				step = 0.1;
				break;
			default:
				max = 40;
				step = 1;
				break;
		}
		return { min, max, step };
	};

	const rangeConfigForSelectedUnit = getRangeConfig(value.unit);

	return (
		<>
			<BaseControl label={label} help={help} className='unit-range-control-label wcspots-label' />

			<PanelRow className='editor-range-unit-combo'>
				<RangeControl
					value={value.value}
					onChange={handleValueChange}
					{...rangeConfigForSelectedUnit}
					{...props}
				/>
				<SelectControl
					value={value.unit}
					options={unitOptions}
					onChange={handleUnitChange}
				/>
			</PanelRow>
		</>
	);
}

export default UnitRangeControl;
