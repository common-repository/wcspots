/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PanelColorSettings,
	HeightControl
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	TabPanel,
	CardDivider,
	RangeControl,
	ToggleControl,
	BaseControl,
	Button
} from '@wordpress/components';

import { Fragment } from 'react';

/**
 * Internal dependecies.
 */
import UnitRangeControl from './UnitRangeControl';
import ImageRadioSelectControl from './ImageRadioSelectControl';
import metadata from '../block.json';

const PopoverControls = ({ popoverAtts, setAttributes }) => {

	// Desctructure attribute objects for simpler properties access.
	const { elementsToggle, popoverWidth } = popoverAtts;

	// Access default attribute values from block.json for reset.
	const defaultpopoverAtts = metadata.attributes.popoverAtts.default;
	// Resetting the attributes.
	const resetPopoverAtts = (atts) => {
		const newPopoverAtts = { ...popoverAtts };
		atts.forEach((att) => {
			newPopoverAtts[att] = defaultpopoverAtts[att];
		});
		setAttributes({ popoverAtts: newPopoverAtts });
	};

	// Different labels for image size control, depending on layout.
	const imageSizingLabel = () => {
		let layout = popoverAtts.productsLayout;
		let labelEnableImageSize = (layout === 'layout1' || layout === 'layout3') ? __('Enable image height', 'wcspots') : __('Enable image width', 'wcspots')
		let labelImageSize = (layout === 'layout1' || layout === 'layout3') ? __('Image height', 'wcspots') : __('Image width', 'wcspots');
		return [labelEnableImageSize, labelImageSize];
	}

	// Popover settings tabs.
	const popoverAttsTabs = [
		{
			name: 'popoverLayout',
			title: 'Layout',
			content: (
				<div>
					<CardDivider size="xSmall" />

					<ImageRadioSelectControl
						label={__('Popover layout type', 'wcspots')}
						help={__('Pick a layout for popover with product', 'wcspots')}
						options={[
							{ value: 'layout1', label: 'Layout 1', image: require('./icons/popoverLayout_1.png') },
							{ value: 'layout2', label: 'Layout 2', image: require('./icons/popoverLayout_2.png') },
							{ value: 'layout3', label: 'Layout 3', image: require('./icons/popoverLayout_3.png') },
							{ value: 'layout4', label: 'Layout 3', image: require('./icons/popoverLayout_4.png') },
						]}
						value={popoverAtts.productsLayout}
						onChange={(selectedLayout) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productsLayout: selectedLayout
								}
							});
						}}
						height='38px'
					/>


					{(elementsToggle?.image) && (
						<Fragment>
							<CardDivider size="xSmall" />
							<ToggleControl
								__nextHasNoMarginBottom
								label={imageSizingLabel()[0]}
								checked={popoverAtts.imageSizeOn}
								onChange={() =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											imageSizeOn: !popoverAtts.imageSizeOn
										}
									})
								}
							/>

							<CardDivider size="xSmall" style={{ margin: '10px 0' }} />
							{popoverAtts.imageSizeOn && (

								<HeightControl
									label={imageSizingLabel()[1]}
									value={popoverAtts.imageSize}
									onChange={(newValue) => {
										setAttributes({
											popoverAtts: {
												...popoverAtts,
												imageSize: newValue
											}
										});
									}}
									height={15}
								/>
							)}

						</Fragment>
					)}

					<ImageRadioSelectControl
						label={__('Product align', 'wcspots')}
						help={__('Align product elements in the popover', 'wcspots')}
						options={[
							{ value: 'flex-start', label: 'Flex start', icon: 'align-left' },
							{ value: 'center', label: 'Center', icon: 'align-center' },
							{ value: 'flex-end', label: 'Flex end', icon: 'align-right' },
						]}
						value={popoverAtts.productsAlign}
						onChange={(selectedAlign) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productsAlign: selectedAlign
								}
							});
						}}
					/>

					<CardDivider size="xSmall" />

					<HeightControl
						label={__('Popover width: minimum', 'wcspots')}
						value={popoverWidth.min}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverWidth: {
										...popoverWidth,
										min: newValue
									}
								}
							});
						}}
					/>
					<HeightControl
						label={__('Popover width: preferred', 'wcspots')}
						value={popoverWidth.val}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverWidth: {
										...popoverWidth,
										val: newValue
									}
								}
							});
						}}
					/>
					<HeightControl
						label={__('Popover width: maximum', 'wcspots')}
						value={popoverWidth.max}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									popoverWidth: {
										...popoverWidth,
										max: newValue
									}
								}
							});
						}}
					/>


					<Button
						isLink
						isSmall
						text={__('Reset popover layout settings.', 'wcspots')}
						onClick={() => {
							resetPopoverAtts(['productsLayout', 'imageSizeOn', 'imageSize', 'productsAlign', 'popoverWidth'])
						}}
						className='wcspots-reset-attributes'
					/>

				</div>
			),
		},
		{
			name: 'toggleElements',
			title: 'Toggle elements',
			content: (
				<div>
					<CardDivider size="xSmall" />

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show image', 'wcspots')}
						checked={elementsToggle?.image}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										image: !elementsToggle?.image
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'wcspots')}
						checked={elementsToggle?.title}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										title: !elementsToggle?.title
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show price', 'wcspots')}
						checked={elementsToggle?.price}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										price: !elementsToggle?.price
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show excerpt', 'wcspots')}
						checked={elementsToggle?.excerpt}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										excerpt: !elementsToggle?.excerpt
									}
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show Add to Cart', 'wcspots')}
						checked={elementsToggle?.addToCart}
						onChange={() =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									elementsToggle: {
										...elementsToggle,
										addToCart: !elementsToggle?.addToCart
									}
								}
							})
						}
					/>
					<Button
						isLink
						isSmall
						text={__('Reset toggle', 'wcspots')}
						onClick={() => {
							resetPopoverAtts(['elementsToggle'])
						}}
						className='wcspots-reset-attributes'
					/>
				</div>
			)
		}
	];
	// Popover style tabs
	const popoverStyleTabs = [
		{
			name: 'popoverSpacing',
			title: 'Spacing',
			content: (
				<div>
					<CardDivider size="xSmall" />

					{popoverAtts.productsLayout !== 'layout3' && (
						<HeightControl
							label={__('Popover padding', 'wcspots')}
							value={popoverAtts.popoverPadding}
							onChange={(newValue) => {
								setAttributes({
									popoverAtts: {
										...popoverAtts,
										popoverPadding: newValue
									}
								});
							}}
						/>
					)}

					<HeightControl
						label={__('Product elements spacing', 'wcspots')}
						value={popoverAtts.productSpacing}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productSpacing: newValue
								}
							});
						}}
					/>
					<HeightControl
						label={__('Product elements padding', 'wcspots')}
						value={popoverAtts.productPadding}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									productPadding: newValue
								}
							});
						}}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset spacing', 'wcspots')}
						onClick={() => {
							resetPopoverAtts(['popoverPadding', 'productSpacing', 'productPadding'])
						}}
						className='wcspots-reset-attributes'
					/>
				</div>
			)
		},
		{
			name: 'popoverSizes',
			title: 'Sizes',
			content: (
				<div>
					<CardDivider size="xSmall" />

					{elementsToggle?.title && (
						<HeightControl
							label={__('Title font size', 'wcspots')}
							value={popoverAtts.titleSize}
							onChange={(newValue) => {
								setAttributes({
									popoverAtts: {
										...popoverAtts,
										titleSize: newValue
									}
								});
							}}
						/>
					)}

					{elementsToggle?.price && (
						<HeightControl
							label={__('Price font size', 'wcspots')}
							value={popoverAtts.priceSize}
							onChange={(newValue) => {
								setAttributes({
									popoverAtts: {
										...popoverAtts,
										priceSize: newValue
									}
								});
							}}
						/>
					)}

					{elementsToggle?.excerpt && (
						<HeightControl
							label={__('Short description font size', 'wcspots')}
							value={popoverAtts.excerptSize}
							onChange={(newValue) => {
								setAttributes({
									popoverAtts: {
										...popoverAtts,
										excerptSize: newValue
									}
								});
							}}
						/>
					)}

					<RangeControl
						label={__('Add to Cart size', 'wcspots')}
						value={popoverAtts.addToCartSize}
						onChange={(value) =>
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									addToCartSize: value
								}
							})
						}
						min={0.5}
						max={2}
						step={0.05}
					/>
					<Button
						isLink
						isSmall
						text={__('Reset sizes', 'wcspots')}
						onClick={() => {
							resetPopoverAtts(['titleSize', 'priceSize', 'excerptSize', 'addToCartSize'])
						}}
						className='wcspots-reset-attributes'
					/>
				</div>
			)
		},
		{
			name: 'popoverColors',
			title: 'Colors',
			content: (
				<div>
					<PanelColorSettings
						initialOpen={false}
						enableAlpha
						colorSettings={[
							{
								value: popoverAtts.productBackColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											productBackColor: newValue
										}
									}),
								label: __('Background Color', 'wcspots'),
							},
							elementsToggle?.title ? {
								value: popoverAtts.titleColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											titleColor: newValue
										}
									}),
								label: __('Title Color', 'wcspots'),
							} : null,
							elementsToggle?.price ? {
								value: popoverAtts.priceColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											priceColor: newValue
										}
									}),
								label: __('Price Color', 'wcspots'),
							} : null,
							elementsToggle?.excerpt ? {
								value: popoverAtts.excerptColor,
								onChange: (newValue) =>
									setAttributes({
										popoverAtts: {
											...popoverAtts,
											excerptColor: newValue
										}
									}),
								label: __('Excerpt Color', 'wcspots'),
							} : null,
						].filter(item => item !== null)}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset colors', 'wcspots')}
						onClick={() => {
							resetPopoverAtts(['productBackColor', 'titleColor', 'priceColor', 'excerptColor'])
						}}
						className='wcspots-reset-attributes'
					/>
				</div>
			)
		},
	];


	return (
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					title={__('Popover layout', 'wcspots')}
					icon={'images-alt2'}
					initialOpen={false}
				>
					<TabPanel className="popover-layout" tabs={popoverAttsTabs}>
						{(tab) => (
							<div>
								{tab.content}
							</div>
						)}
					</TabPanel>

					<BaseControl help={__('Style properties like colors, spacing, and font sizes are available in the editor styles tab', 'wcspots')} />



				</PanelBody>

			</InspectorControls>

			<InspectorControls group="styles">
				<PanelBody
					title={__('Popover styles', 'wcspots')}
					icon={'images-alt2'}
					initialOpen={false}
				>

					<TabPanel className="popover-style" tabs={popoverStyleTabs}>
						{(tab) => (
							<div>
								{tab.content}
							</div>
						)}
					</TabPanel>

					<CardDivider size="xSmall" />

					<HeightControl
						label={'Rounded corners'}
						value={popoverAtts.roundCorners}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									roundCorners: newValue
								}
							});
						}}
					/>

					<HeightControl
						label={'Arrow size'}
						value={popoverAtts.arrowSize}
						onChange={(newValue) => {
							setAttributes({
								popoverAtts: {
									...popoverAtts,
									arrowSize: newValue
								}
							});
						}}
					/>

					<BaseControl help={__('Arrow color is set in "Background Color" ("Colors" tab).', 'wcspots')} />

				</PanelBody>

			</InspectorControls>


		</Fragment>
	);
}

export default PopoverControls;
