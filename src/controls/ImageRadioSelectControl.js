import { Button, ButtonGroup, BaseControl, Dashicon } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';

function ImageRadioSelectControl({ value, options, onChange, label, height, help }) {
	const [activeOption, setActiveOption] = useState(value);

	const handleClick = (optionValue) => {
		setActiveOption(optionValue); // update the button.
		onChange(optionValue); // update the value for setAttribute.
	};

	// Update the button on reset.
	useEffect(() => {
		setActiveOption(value);
	}, [value]) // parameter change to listen

	return (
		<>
			<BaseControl label={label} help="" className='image-radio-select-control-label wcspots-label' />

			<ButtonGroup>
				{options.map((option) => (
					<Button
						key={option.value}
						isPrimary={activeOption === option.value}
						onClick={() => handleClick(option.value)}
						style={{ padding: "4px", boxShadow: "none", borderWidth: "0" }}
						className='wcspots-image-button'
					>
						{option.icon ? (
							<Dashicon icon={option.icon} />
						) : (
							<img src={option.image} alt={option.label} style={{ height: height }} />
						)}

					</Button>
				))}
			</ButtonGroup>
		</>
	);
}

export default ImageRadioSelectControl;
