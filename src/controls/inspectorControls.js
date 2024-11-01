/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import {
	// FormTokenField,
	RangeControl,
	CardDivider,
	PanelBody,
	PanelRow,
	Button,
	IconButton,
	SelectControl,
	ToggleControl,
	TabPanel,
	BaseControl
} from '@wordpress/components';
import { InspectorControls, MediaUpload, PanelColorSettings, HeightControl } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * React dependencies.
 */
import { useState, useEffect } from 'react';
import { get } from 'lodash';
import { Fragment } from 'react';

/**
 * External dependencies (React components).
 * React select is replacement for FormTokenField Gutenberg component.
 */
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

/**
 * Internal dependencies - custom UnitRangeControl, ImageRadioSelectControl components.
 * Built from Gutenberg components.
 */
import ImageRadioSelectControl from './ImageRadioSelectControl';
import PopoverControls from './popoverControls';
import metadata from '../block.json';

/**
 * InspectorControlsComponent function.
 * @param {*} props
 * @returns
 */
const InspectorControlsComponent = ({ attributes, setAttributes, clientId }) => {
	// Get data for product post type.
	const getProducts = useEntityRecords('postType', 'product', {
		per_page: -1,
	});

	const {
		title,
		settingsTitleDesc,
		productsData,
		media,
		srcSetAtt,
		sizesAtt,
		mediaID,
		mediaURL,
		backImage,
		backimageOpacity,
		isStackedOnMobile,
		flexLayout,
		flexGap,
		flexItemsRatio,
		valign,
		productsLayout,
		productsAlign,
		columns,
		featuredImageSize,
		productsGap,
		productPadding,
		productSpacing,
		elementsToggle,
		imageSize,
		titleSize,
		priceSize,
		excerptSize,
		addToCartSize,
		productBackColor,
		titleColor,
		priceColor,
		excerptColor,
		hotspots,
		hotspotSettings,
		popoverAtts
	} = attributes;

	// Access default attribute values from block.json for reset.
	const defaultAtts = metadata.attributes;
	// Resetting the attributes.
	const resetAtts = (attsToUpdate) => {
		const savedAtts = { ...attributes };
		attsToUpdate.forEach((att) => {
			savedAtts[att] = defaultAtts[att].default;
		});
		setAttributes(savedAtts);
	};

	/**
	 * Create 'srcset' and 'sizes' img attributes for  image. Discard 'thumbnail' size.
	 */
	useEffect(() => {
		if (media && media.sizes) {
			const mediaSizes = media.sizes;
			// Filter out the 'thumbnail' media.sizes object property.
			const sizesNoThumb = Object.keys(mediaSizes)
				.filter(key => key !== 'thumbnail')
				.reduce((obj, key) => {
					obj[key] = mediaSizes[key];
					return obj;
				}, {});

			// Create 'srcset' attribute for  image. Usage of 'lodash' method 'get'.
			const createdSrcSet = Object.keys(sizesNoThumb)
				.map(size => `${get(sizesNoThumb, [size, 'url'], '')} ${get(sizesNoThumb, [size, 'width'], '')}w`)
				.join(', ');
			// Create 'sizes' img attribite for  image. Usage of 'lodash' method 'get'.
			const sizes = Object.keys(sizesNoThumb)
				.map(size => `(max-width: ${get(sizesNoThumb, [size, 'width'], '')}px) ${get(sizesNoThumb, [size, 'width'], '')}px`).join(', ')

			setAttributes({ srcSetAtt: createdSrcSet, sizesAtt: sizes })

		}
	}, [media]);

	// Retrieve registered image sizes.
	const getImageSizes = useSelect(select => select('core/editor').getEditorSettings().imageSizes);
	const imageSizes = [...[{ slug: 'automatic', name: 'Automatic' }], ...getImageSizes];

	/**
	 * FormTokenList functions
	// 'productList' must be set in attributes(!).
	const displayList = getProducts?.records
		?.filter((item) => productList?.includes(item.id))
		.map((item) => item.title.rendered);

	// FormTokenField suggestions.
	const suggestions = getProducts?.records?.map((stream) => {
		return stream.title.rendered;
	});

	// FormTokenField Adding / removing products.
	const onChangeProductList = (newList) => {
		const newProductIds = getProducts?.records
			?.filter((item) => newList.includes(item.title.rendered))
			.map((item) => item.id);
		const newProducts = getProducts?.records?.filter((item) =>
			newList.includes(item.title.rendered)
		);
		setAttributes({ productList: newProductIds, products: newProducts});
	};
	*/

	const onChangeProduct = (newList) => {
		hotspotAssignedRemove(newList);
		setAttributes({ productsData: newList })
	}

	// IMAGE and HOTSPOT CONTROLS.
	const onSelectImage = (media) => {
		if (!clearHotspotsOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: media.url, mediaID: media.id, media: media });
		}
	};
	const onRemoveImage = () => {
		if (!clearHotspotsOnImageChange()) {
			return;
		} else {
			setAttributes({ mediaURL: null, mediaID: null });
		}

	};
	const clearHotspotsOnImageChange = () => {
		if (hotspots.length > 0 && mediaID) {
			if (!confirm("All existing hotspots will be removed - are you sure?")) {
				return false;
			};
		}
		setAttributes({ hotspots: [] });
		return true;
	}

	/**
	 * HOTSPOT CONTROLS.
	 */
	// Delete hotspot.
	const hotspotRemove = (hotspotIndex) => {
		const updatedHotspots = [...hotspots];
		updatedHotspots.splice(hotspotIndex, 1);
		setAttributes({ hotspots: updatedHotspots });
	};
	// Remove hotspot if assigned product is removed.
	const hotspotAssignedRemove = (productDataUpdated) => {
		// .some will keep the items in array matching the criteria (hotspot not assigned  or matching prod id's)
		const filteredHotspots = hotspots.filter((hotspot) =>
			!hotspot.assigned || productDataUpdated.some((productDataItem) => productDataItem.value === hotspot.productId)
		);
		setAttributes({ hotspots: filteredHotspots });
	}
	// Hotspot styles.
	const hotspotStyles = [
		{ label: 'Style 1', value: 'iconstyle-1' },
		{ label: 'Style 2', value: 'iconstyle-2' },
		{ label: 'Style 3', value: 'iconstyle-3' },
	];
	const individualHotspotStyle = [...[{ label: 'Change general style', value: '' }], ...hotspotStyles];

	// Product layout tabs.
	const productLayoutTabs = [
		{
			name: 'productsLayout',
			title: 'Layout',
			content: (
				<Fragment>

					<CardDivider size="xSmall" style={{ margin: '10px 0' }} />

					<RangeControl
						label={__('Columns', 'wcspots')}
						value={columns}
						onChange={(value) =>
							setAttributes({ columns: value })
						}
						min={1}
						max={4}
					/>

					<ImageRadioSelectControl
						label={__('Product layout type', 'wcspots')}
						help={__('Pick a grid type for displaying selected products', 'wcspots')}
						options={[
							{ value: 'layout1', label: 'Layout 1', image: require('./icons/Layout_1.png') },
							{ value: 'layout2', label: 'Layout 2', image: require('./icons/Layout_2.png') },
							{ value: 'layout3', label: 'Layout 3', image: require('./icons/Layout_3.png') },
							{ value: 'layout4', label: 'Layout 3', image: require('./icons/Layout_4.png') },
						]}
						value={productsLayout}
						onChange={(selectedLayout) => {
							setAttributes({ productsLayout: selectedLayout });
						}}
						height='38px'
					/>

					{(elementsToggle.image && (productsLayout === 'layout2' || productsLayout === 'layout4')) && (
						<Fragment>
							<CardDivider size="xSmall" style={{ margin: '10px 0' }} />
							<HeightControl
								label={__('Image width', 'wcspots')}
								value={imageSize}
								onChange={(newValue) => {
									setAttributes({ imageSize: newValue });
								}}
							/>
						</Fragment>
					)}

					{elementsToggle.image && (
						<Fragment>
							<CardDivider size="xSmall" style={{ margin: '10px 0' }} />
							<SelectControl
								label={__('Product image resolution', 'wcspots')}
								value={featuredImageSize}
								options={imageSizes.map(size => ({
									value: size.slug,
									label: size.name,
								}))}
								onChange={(value) => setAttributes({ featuredImageSize: value })}
								help={__('Select the size of the source image.', 'wcspots')}
							/>
						</Fragment>
					)}


					<ImageRadioSelectControl
						label={__('Product align', 'wcspots')}
						help={__('How to align the products', 'wcspots')}
						options={[
							{ value: 'flex-start', label: 'Flex start', icon: 'align-left' },
							{ value: 'center', label: 'Center', icon: 'align-center' },
							{ value: 'flex-end', label: 'Flex end', icon: 'align-right' },
						]}
						value={productsAlign}
						onChange={(selectedAlign) => {
							setAttributes({ productsAlign: selectedAlign });
						}}
						height='28px'
					/>

					<Button
						isLink
						isSmall
						text={__('Reset products layout settings.', 'wcspots')}
						onClick={() => {
							resetAtts(['productsLayout', 'productsAlign', 'columns', 'imageSize'])
						}}
						className='wcspots-reset-attributes'
					/>

				</Fragment>
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
						checked={elementsToggle.image}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									image: !elementsToggle.image
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'wcspots')}
						checked={elementsToggle.title}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									title: !elementsToggle.title
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show price', 'wcspots')}
						checked={elementsToggle.price}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									price: !elementsToggle.price
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show excerpt', 'wcspots')}
						checked={elementsToggle.excerpt}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									excerpt: !elementsToggle.excerpt
								}
							})
						}
					/>
					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show Add to Cart', 'wcspots')}
						checked={elementsToggle.addToCart}
						onChange={() =>
							setAttributes({
								elementsToggle: {
									...elementsToggle,
									addToCart: !elementsToggle.addToCart
								}
							})
						}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset toggles', 'wcspots')}
						onClick={() => {
							resetAtts(['elementsToggle'])
						}}
						className='wcspots-reset-attributes'
					/>
				</div>
			)
		}
	];

	// Tabs for Product style section.
	const productStyleTabs = [
		{
			name: 'productsSpacing',
			title: 'Spacing',
			content: (
				<div>
					<CardDivider size="xSmall" />

					<HeightControl
						label={__('Gap between products', 'wcspots')}
						value={productsGap}
						onChange={(newValue) => {
							setAttributes({ productsGap: newValue });
						}}
					/>
					<HeightControl
						label={__('Product elements spacing', 'wcspots')}
						value={productSpacing}
						onChange={(newValue) => {
							setAttributes({ productSpacing: newValue });
						}}
					/>
					<HeightControl
						label={__('Product elements padding', 'wcspots')}
						value={productPadding}
						onChange={(newValue) => {
							setAttributes({ productPadding: newValue });
						}}
						step={0.5}
					/>

					<Button
						isLink
						isSmall
						text={__('Reset spacing', 'wcspots')}
						onClick={() => {
							resetAtts(['productsGap', 'productSpacing', 'productPadding'])
						}}
						className='wcspots-reset-attributes'
					/>
				</div>
			)
		},
		{
			name: 'productSizes',
			title: 'Sizes',
			content: (
				<div>
					<CardDivider size="xSmall" />

					{elementsToggle.title && (
						<HeightControl
							label={__('Title font size', 'wcspots')}
							value={titleSize}
							onChange={(newValue) => {
								setAttributes({ titleSize: newValue });
							}}
						/>
					)}

					{elementsToggle.price && (
						<HeightControl
							label={__('Price font size', 'wcspots')}
							value={priceSize}
							onChange={(newValue) => {
								setAttributes({ priceSize: newValue });
							}}
						/>
					)}

					{elementsToggle.excerpt && (
						<HeightControl
							label={__('Short description font size', 'wcspots')}
							value={excerptSize}
							onChange={(newValue) => {
								setAttributes({ excerptSize: newValue });
							}}
						/>
					)}

					{elementsToggle.addToCart && (
						<RangeControl
							label={__('Add to Cart size', 'wcspots')}
							value={addToCartSize}
							onChange={(value) =>
								setAttributes({ addToCartSize: value })
							}
							min={0.5}
							max={2}
							step={0.05}
						/>
					)}


					<Button
						isLink
						isSmall
						text={__('Reset sizes', 'wcspots')}
						onClick={() => {
							resetAtts(['titleSize', 'priceSize', 'excerptSize', 'excerptSize', 'addToCartSize'])
						}}
						className='wcspots-reset-attributes'
					/>

				</div>
			),
		},
		{
			name: 'colors',
			title: 'Colors',
			content: (
				<Fragment>
					<PanelColorSettings
						initialOpen={true}
						enableAlpha
						colorSettings={[
							{
								value: productBackColor,
								onChange: (newValue) => setAttributes({ productBackColor: newValue }),
								label: __('Background Color', 'wcspots'),
							},
							elementsToggle.title ? {
								value: titleColor,
								onChange: (newValue) => setAttributes({ titleColor: newValue }),
								label: __('Title color', 'wcspots'),
							} : null,
							elementsToggle.price ? {
								value: priceColor,
								onChange: (newValue) => setAttributes({ priceColor: newValue }),
								label: __('Price color', 'wcspots'),
							} : null,
							elementsToggle.excerpt ? {
								value: excerptColor,
								onChange: (newValue) => setAttributes({ excerptColor: newValue }),
								label: __('Short description color', 'wcspots'),
							} : null
						].filter(item => item !== null)}
					/>
					<Button
						isLink
						isSmall
						text={__('Reset colors', 'wcspots')}
						onClick={() => {
							resetAtts(['productBackColor', 'titleColor', 'priceColor', 'excerptColor'])
						}}
						className='wcspots-reset-attributes'
					/>
				</Fragment>

			)
		},
	];

	// For React Select component.
	const productOptions = getProducts?.records
		?.map((item) => {
			return {
				value: item.id,
				label: item.title.raw
			}
		});
	const animatedComponents = makeAnimated();


	// Return Inspector controls.
	return (
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					icon={'text'}
					title={__('Title and description', 'wcspots')}
					initialOpen={false}
				>

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show title', 'wcspots')}
						checked={settingsTitleDesc.activeTitle}
						onChange={() =>
							setAttributes({
								settingsTitleDesc: {
									...settingsTitleDesc,
									activeTitle: !settingsTitleDesc.activeTitle
								}
							})
						}
					/>

					{settingsTitleDesc.activeTitle && (
						<HeightControl
							label={'Title spacing'}
							value={settingsTitleDesc.spacingTitle}
							onChange={(newSpacing) => {
								setAttributes({
									settingsTitleDesc: {
										...settingsTitleDesc,
										spacingTitle: newSpacing
									}
								});
							}}
						/>
					)}

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show description', 'wcspots')}
						checked={settingsTitleDesc.activeDesc}
						onChange={() =>
							setAttributes({
								settingsTitleDesc: {
									...settingsTitleDesc,
									activeDesc: !settingsTitleDesc.activeDesc
								}
							})
						}
					/>

					{settingsTitleDesc.activeDesc && (
						<HeightControl
							label={'Description spacing'}
							value={settingsTitleDesc.spacingDesc}
							onChange={(newSpacing) => {
								setAttributes({
									settingsTitleDesc: {
										...settingsTitleDesc,
										spacingDesc: newSpacing
									}
								});
							}}
						/>
					)}

				</PanelBody>

				{Boolean(window.wcspotsVars?.wooActive) && (
					<PanelBody
						icon={'store'}
						title={__('WooCommerce products', 'wcspots')}
						initialOpen={true}
					>
						{/*
					<FormTokenField
						label={__(
							'Start typing product name…',
							'wcspots'
						)}
						value={displayList}
						suggestions={suggestions}
						onChange={onChangeProductList}
					/>
					*/}
						<CardDivider size="xSmall" />

						{getProducts.isResolving ? (
							__('Loading products list', 'wcspots')
						) : (
							<Select
								closeMenuOnSelect={false}
								components={animatedComponents}
								value={productsData}
								isMulti
								options={productOptions}
								onChange={onChangeProduct}
							/>
						)}
					</PanelBody>
				)}


				<PanelBody
					icon={'format-image'}
					title={__('Image for Hot Spots', 'wcspots')}
					initialOpen={false}
				>
					<PanelRow>
						<MediaUpload
							label={__(
								'Choose image for Woo HotSpots Block',
								'wcspots'
							)}
							onSelect={onSelectImage}
							allowedTypes="image"
							value={mediaID}
							render={({ open }) => (
								<Button
									isSmall
									isSecondary
									className={
										mediaID
											? 'image-button'
											: 'button button-large'
									}
									onClick={open}
								>
									{!mediaID
										? __('Add Image', 'wcspots')
										: __('Replace Image', 'wcspots')}
								</Button>
							)}
						/>
						{mediaID && (
							<PanelRow>
								<IconButton
									icon="no-alt"
									onClick={onRemoveImage}
									label={__('Remove image', 'wcspots')}
								/>
							</PanelRow>
						)}
					</PanelRow>
					<PanelRow>
						{mediaID ? (
							<img
								src={mediaURL}
								alt={__(
									'Upload image',
									'wcspots'
								)}
							/>
						) : (
							__('No image selected', 'wcspots')
						)}
					</PanelRow>

					{mediaID && (
						<Fragment>
							<SelectControl
								label={__('Background image', 'wcspots')}
								value={backImage}
								options={[
									{ label: 'No background image', value: 'backimage-none' },
									{ label: 'Same image as background', value: 'backimage-same' },
								]}
								onChange={(value) => setAttributes({ backImage: value })}
							/>
							<CardDivider size="xSmall" />
						</Fragment>
					)}


					{((backImage !== 'backimage-none') && mediaID) && (
						<RangeControl
							label={__('Background image opacity', 'wcspots')}
							value={backimageOpacity}
							onChange={(value) =>
								setAttributes({ backimageOpacity: value })
							}
							min={0}
							max={1}
							step={0.05}
						/>
					)}

				</PanelBody>

				<PanelBody
					icon={'layout'}
					title={__('Layout', 'wcspots')}
					initialOpen={false}
				>

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Stack on mobile', 'wcspots')}
						checked={isStackedOnMobile}
						onChange={() =>
							setAttributes({ isStackedOnMobile: !isStackedOnMobile })
						}
					/>

					<SelectControl
						value={flexLayout}
						options={[
							{ label: 'Row - products first', value: 'row' },
							{ label: 'Row - image first', value: 'row-reverse' },
							{ label: 'Column - products first', value: 'column' },
							{ label: 'Column - image first', value: 'column-reverse', },
							{ label: 'Image only', value: 'image-only', },
						]}
						onChange={(value) =>
							setAttributes({ flexLayout: value })
						}
					/>

					{!['image-only', 'column', 'column-reverse'].includes(flexLayout) && (
						<SelectControl
							label={__('Vertical align', 'wcspots')}
							value={valign}
							options={[
								{ label: 'Top', value: 'flex-start' },
								{ label: 'Center', value: 'center' },
								{ label: 'Bottom', value: 'flex-end' },
								{ label: 'Stretch', value: 'stretch' },
							]}
							onChange={(value) => setAttributes({ valign: value })}
						/>
					)}

					<RangeControl
						label={['image-only', 'column', 'column-reverse'].includes(flexLayout) ?
							(__('Image width (%)', 'wcspots')) :
							(__('Image / products ratio (%)', 'wcspots'))
						}
						value={flexItemsRatio}
						min={0}
						max={100}
						onChange={(value) =>
							setAttributes({ flexItemsRatio: value })
						}
					/>
					{flexLayout !== 'image-only' && (

						<HeightControl
							label={'Image/products gap'}
							value={flexGap}
							onChange={(newValue) => {
								setAttributes({ flexGap: newValue });
							}}
						/>
					)}

					<Button
						isLink
						isSmall
						text={__('Reset layout', 'wcspots')}
						onClick={() => {
							resetAtts(['isStackedOnMobile', 'flexLayout', 'valign', 'flexItemsRatio', 'flexGap'])
						}}
						className='wcspots-reset-attributes'
					/>

				</PanelBody>

				{flexLayout !== 'image-only' && (
					<PanelBody
						icon={'products'}
						title={__('Product layout', 'wcspots')}
						initialOpen={false}
					>
						<TabPanel className="product-settings" tabs={productLayoutTabs}>
							{(tab) => (
								<div>
									{tab.content}
								</div>
							)}
						</TabPanel>

						<BaseControl help={__('Style properties like colors, spacing, and font sizes are available in the editor styles tab.', 'wcspots')} />

					</PanelBody>
				)}


				<PanelBody
					icon={'marker'}
					title={__('Hotspots', 'wcspots')}
					initialOpen={false}

				>
					{hotspots.length > 0 ? (
						<Fragment>
							<ul className='hotspots-list'>
								{hotspots.map((hotspot, hotspotIndex) => (
									<Fragment >

										<li
											key={hotspotIndex}
											className='hotspot-list-item'
										>
											<p>{hotspot.productTitle ? hotspot.productTitle : hotspot.name}</p>

											<IconButton
												icon="trash"
												onClick={() => hotspotRemove(hotspotIndex)}
												label={__('Remove hotspot', 'wcspots')}
											/>
										</li>

									</Fragment>

								))}
							</ul>
							{hotspots.length > 1 && (
								<Button
									isSecondary
									isSmall
									onClick={() => setAttributes({ hotspots: [] })}
									style={{ marginTop: '20px' }}
								>
									{__('Remove All Hotspots', 'wcspots')}
								</Button>
							)}
							<BaseControl help={__('Style properties of hotspots are available in the editor styles tab.', 'wcspots')} />
						</Fragment>
					) : (
						<p>{__('Click on image to add hotspots', 'wcspots')}</p>
					)}



				</PanelBody>


			</InspectorControls>

			<InspectorControls group="styles">
				{flexLayout !== 'image-only' && (
					<PanelBody
						icon={'store'}
						title={__('Product styles', 'wcspots')}
						initialOpen={false}
					>

						<TabPanel className="product-settings" tabs={productStyleTabs}>
							{(tab) => (
								<div>
									{tab.content}
								</div>
							)}
						</TabPanel>
					</PanelBody>
				)}


				<PanelBody
					icon={'marker'}
					title={__('Hotspots - general styles', 'wcspots')}
					initialOpen={false}>

					<SelectControl
						label={__('Hotspot style', 'wcspots')}
						value={hotspotSettings.iconStyle}
						options={hotspotStyles}
						onChange={(newValue) => {
							setAttributes({
								hotspotSettings: {
									...hotspotSettings,
									iconStyle: newValue
								}
							})
						}}
					/>

					<RangeControl
						label={(__('Hotspot outer size', 'wcspots'))}
						value={hotspotSettings.size}
						min={0}
						max={3}
						step={0.05}
						onChange={(newValue) =>
							setAttributes({
								hotspotSettings: {
									...hotspotSettings,
									size: newValue
								}
							})
						}
					/>
					<RangeControl
						label={(__('Hotspot inner size', 'wcspots'))}
						value={hotspotSettings.innerSize}
						min={0}
						max={3}
						step={0.05}
						onChange={(newValue) =>
							setAttributes({
								hotspotSettings: {
									...hotspotSettings,
									innerSize: newValue
								}
							})
						}
					/>

					<PanelColorSettings
						initialOpen={true}
						className='hotspot-tools-panel'
						enableAlpha
						colorSettings={[
							{
								value: hotspotSettings.primaryColor,
								onChange: (newValue) => {
									setAttributes({
										hotspotSettings: {
											...hotspotSettings,
											primaryColor: newValue
										}
									})
								},
								label: __('Primary Color', 'wcspots'),
							},
							{
								value: hotspotSettings.secondaryColor,
								onChange: (newValue) => {
									setAttributes({
										hotspotSettings: {
											...hotspotSettings,
											secondaryColor: newValue
										}
									})
								},
								label: __('Secondary Color', 'wcspots'),
							}
						]}
					/>

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Pulsate all hotspots', 'wcspots')}
						checked={hotspotSettings.pulsateEff}
						onChange={() =>
							setAttributes({
								hotspotSettings: {
									...hotspotSettings,
									pulsateEff: !hotspotSettings.pulsateEff
								}
							})
						}
					/>
					{!hotspotSettings.pulsateEff && (
						<BaseControl help={__('To pulsate individual hotspots, enable pulsation for each hotspot in "Hotspot - individual styles"', 'wcspots')} />
					)}

					<CardDivider size="xSmall" style={{ margin: '5px 0px 20px' }} />

					<ToggleControl
						__nextHasNoMarginBottom
						label={__('Show product title', 'wcspots')}
						checked={hotspotSettings.showTitle}
						onChange={() =>
							setAttributes({
								hotspotSettings: {
									...hotspotSettings,
									showTitle: !hotspotSettings.showTitle
								}
							})
						}
					/>


					{hotspotSettings.showTitle && (
						<Fragment>
							<PanelColorSettings
								initialOpen={true}
								className='hotspot-tools-panel'
								enableAlpha
								colorSettings={[
									{
										value: hotspotSettings.titleColor,
										onChange: (newValue) => {
											setAttributes({
												hotspotSettings: {
													...hotspotSettings,
													titleColor: newValue
												}
											})
										},
										label: __('Title Color', 'wcspots'),
									},
									{
										value: hotspotSettings.titleBack,
										onChange: (newValue) => {
											setAttributes({
												hotspotSettings: {
													...hotspotSettings,
													titleBack: newValue
												}
											})
										},
										label: __('Title Background Color', 'wcspots'),
									}
								]}
							/>

							<HeightControl
								label={__('Title size', 'wcspots')}
								value={hotspotSettings.titleSize}
								onChange={(newValue) => {
									setAttributes({
										hotspotSettings: {
											...hotspotSettings,
											titleSize: newValue
										}
									})
								}}
							/>
						</Fragment>
					)}

					<Button
						isLink
						isSmall
						text={__('Reset hotspot general styles', 'wcspots')}
						onClick={() => {
							resetAtts(['hotspotSettings'])
						}}
						className='wcspots-reset-attributes'
					/>
				</PanelBody>

				{mediaID && hotspots && (
					<Fragment>

						<PanelBody
							icon={'marker'}
							title={__('Hotspot - individual styles', 'wcspots')}
							initialOpen={false}

						>
							<CardDivider size="xSmall" style={{ margin: '10px 0' }} />

							{hotspots.map((hotspot, hotspotIndex) => (
								<Fragment key={hotspot.id}>
									<div
										key={hotspotIndex}
										style={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											alignItems: 'center',
										}}
									>
										<PanelBody
											title={hotspot.productTitle ? hotspot.productTitle : hotspot.name}
											initialOpen={false}
											className="hotspot-settings"
										>
											<SelectControl
												label={__('Hotspot style', 'wcspots')}
												value={hotspot.iconStyle}
												options={individualHotspotStyle}
												onChange={(value) => {
													setAttributes({
														hotspots: [
															...hotspots.slice(0, hotspotIndex),
															{
																...hotspot,
																iconStyle: value,
															},
															...hotspots.slice(hotspotIndex + 1),
														],
													})
												}}

											/>

											<PanelColorSettings
												className='hotspot-tools-panel hotspot-colors'
												initialOpen={true}
												enableAlpha
												colorSettings={[
													{
														value: hotspot.primaryColor,
														onChange: (newValue) => {
															setAttributes({
																hotspots: [
																	...hotspots.slice(0, hotspotIndex),
																	{
																		...hotspot,
																		primaryColor: newValue,
																	},
																	...hotspots.slice(hotspotIndex + 1),
																],
															})
														},
														label: __('Primary Color', 'wcspots'),
													},
													{
														value: hotspot.secondaryColor,
														onChange: (newValue) => {
															setAttributes({
																hotspots: [
																	...hotspots.slice(0, hotspotIndex),
																	{
																		...hotspot,
																		secondaryColor: newValue,
																	},
																	...hotspots.slice(hotspotIndex + 1),
																],
															})
														},
														label: __('Secondary Color', 'wcspots'),
													}

												]}
											/>
											{!hotspotSettings.pulsateEff && (
												<ToggleControl
													label={__('Pulsate this hotspot', 'wcspots')}
													checked={hotspot.pulsateEff}
													style={{ marginTop: '10px' }}
													onChange={(value) =>
														setAttributes({
															hotspots: [
																...hotspots.slice(0, hotspotIndex),
																{
																	...hotspot,
																	pulsateEff: value,
																},
																...hotspots.slice(hotspotIndex + 1),
															],
														})
													}
												/>
											)}


										</PanelBody>

										<IconButton
											icon="trash"
											onClick={() => hotspotRemove(hotspotIndex)}
											label={__('Remove hotspot', 'wcspots')}
										/>
									</div>
								</Fragment>

							))}
							{hotspots.length > 0 && (
								<Fragment>
									<Button
										isSecondary
										isSmall
										onClick={() => setAttributes({ hotspots: [] })}
										style={{ marginTop: '20px' }}
									>
										{__('Remove All Hotspots', 'wcspots')}
									</Button>
								</Fragment>
							)}
							{hotspots.length == 0 && (<p>{__('Click on image to add hotspots', 'wcspots')}</p>)}
						</PanelBody>

					</Fragment>
				)}
			</InspectorControls>

			{mediaID && hotspots && (
				<PopoverControls
					popoverAtts={popoverAtts}
					setAttributes={setAttributes}
					clientId={clientId}
				/>
			)}
		</Fragment>
	);
};
export default InspectorControlsComponent;
