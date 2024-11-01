/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls, MediaPlaceholder, MediaUpload, RichText } from '@wordpress/block-editor';
import { SelectControl, Modal, ToolbarGroup, ToolbarButton } from '@wordpress/components';
import { useEffect, useState } from '@wordpress/element';


/**
 * External dependecies.
 */
import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import './editor.scss';
import InspectorControlsComponent from './controls/inspectorControls';
import ProductGrid from './components/productGrid';
import Hotspot from './components/hotspot';
import WCSpotsBlockTitle from './components/WCSpotsBlockTitle';

// Functions.
import { addNewHotspot, modalProductToHotspot, onProductSelect, onHotspotOver, onHotspotOut, unassignProduct, removeHotspot, clearHotspotsOnImageChange, correctTitlePosition } from './functions/hotspotFunctions';

/**
 * The edit function.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
const Edit = ({ clientId, attributes, setAttributes }) => {

	const {
		id,
		title,
		settingsTitleDesc,
		description,
		productsData,
		media,
		srcSetAtt,
		sizesAtt,
		mediaURL,
		mediaID,
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
		productSpacing,
		productPadding,
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
		selectedHotspot,
		selectedProduct,
		editModal,
		popoverAtts
	} = attributes;

	// Set unique block ID using 'clientId' (For duplicating block).
	useEffect(() => {
		if (0 === id.length || id !== clientId) {
			setAttributes({ id: clientId });
		}
	}, []);

	// Set Popover (React Tiny Popover) parent element in Editor.
	const [popoverParent, setPopoverParent] = useState();
	useEffect(() => {
		const popoverParentDesktop = document.getElementsByClassName('editor-styles-wrapper')[0];
		const iframe = document.querySelector('[name="editor-canvas"]');
		const popoverParentMobile = iframe ? iframe.contentDocument.getElementsByClassName('editor-styles-wrapper')[0] : null;
		const _popoverParent = popoverParentMobile ? popoverParentMobile : popoverParentDesktop;
		setPopoverParent(_popoverParent);
	}, []);

	// Array of selected product ID's for blocks 'data-product-ids' attribute (frontend rendering).
	const productIds = productsData.map((item) => {
		return item.value;
	});
	const blockProps = useBlockProps({
		'data-block-id': clientId,
		'data-product-ids': JSON.stringify(productIds),
		'data-popover-atts': JSON.stringify(popoverAtts),
		'data-featured-image-size': featuredImageSize
	});

	// Modal products select options, on hotspot double click.
	const productOptionsStart = [{ value: '', label: 'Choose one of selected products' }];
	const productOptionsPrepare = productsData?.map((item) => ({
		label: item.label,
		value: JSON.stringify([item.value, item.label]),
	}));
	const productOptions = productOptionsStart.concat(productOptionsPrepare);


	// STYLES AND CLASSES for block Flex container and product grid.
	const flexAlignItems = (dir) => {
		// If flexLayout is 'column' or 'column-reverse' set align fixed.
		return dir.substring(0, 6) == 'column' ? 'center' : valign; // or dir.startsWith() ?
	};
	const flexContainerStyles = {
		alignItems: flexAlignItems(flexLayout),
		gap: flexGap,
		justifyContent: 'center'
	}
	const flexContainerClasses = classNames(
		flexLayout,
		{ ['is-stacked-on-mobile ']: isStackedOnMobile }
	);
	// Flex items.
	const productsContainerStyle = {
		width: (flexLayout.substring(0, 6) == 'column') ? `${flexItemsRatio}%` : `${100 - flexItemsRatio}%`
	}
	const flexItemClasses = classNames({
		['is-stacked-on-mobile ']: isStackedOnMobile
	})


	// Image controls in Block toolbar.
	const onSelectImage = (media) => {
		if (!clearHotspotsOnImageChange(hotspots, mediaID, setAttributes)) {
			return;
		} else {
			setAttributes({ mediaURL: media.url, mediaID: media.id, media: media });
		}
	};
	const onRemoveImage = () => {
		if (!clearHotspotsOnImageChange(hotspots, mediaID, setAttributes)) {
			return;
		} else {
			setAttributes({ mediaURL: null, mediaID: null });
		}
	};
	const onUploadError = (error) => {
		console.error('Media upload error:', error);
	};
	const blockToolbarControls = (
		<ToolbarGroup>
			<MediaUpload
				onSelect={onSelectImage}
				onError={onUploadError}
				allowedTypes={['image']}
				value={mediaID}
				render={({ open }) => (
					<ToolbarButton
						icon="edit"
						title="Replace Image"
						onClick={open}
					/>
				)}
			/>

			<ToolbarButton
				icon="no-alt"
				label="Remove Image"
				onClick={onRemoveImage}
			/>
		</ToolbarGroup>
	);

	const noProductsNotice = __('Pick your products in the sidebar "WooCommerce products" section.', 'wcspots');

	const [position, setPosition] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);

	return (
		<>

			<InspectorControlsComponent
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>

			<BlockControls>
				{mediaURL && blockToolbarControls}
			</BlockControls>

			<div {...blockProps}>

				{(backImage !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})`, opacity: backimageOpacity }}></div>)
				}

				<div className='prepended'>
					{settingsTitleDesc.activeTitle && (
						<WCSpotsBlockTitle
							attributes={attributes}
							setAttributes={setAttributes}
							context="edit"
						/>
					)}

					{settingsTitleDesc.activeDesc && (
						<RichText
							tagName="p"
							value={description}
							onChange={(newDesc) => {
								setAttributes({ description: newDesc });
							}}
							style={{
								textAlign: settingsTitleDesc.align,
								margin: `${settingsTitleDesc.spacingDesc} 0`
							}}
							placeholder={__('Enter your description here', 'wcspots')}
							keepPlaceholderOnFocus
						/>
					)}
				</div>

				<div className={`${flexContainerClasses} flex-container`} style={flexContainerStyles}>

					{(flexLayout !== 'image-only') && (
						<div className={`${flexItemClasses}flex-block products-grid-container`} style={productsContainerStyle}>

							{productsData.length > 0 && (
								<ProductGrid
									context="edit"
									productList={productIds}
									columns={productsData.length <= columns ? productsData.length : columns}
									featuredImageSize={featuredImageSize}
									productsGap={productsGap}
									productsLayout={productsLayout}
									productsAlign={productsAlign}
									productPadding={productPadding}
									productSpacing={productSpacing}
									elementsToggle={elementsToggle}
									imageSize={imageSize}
									titleSize={titleSize}
									priceSize={priceSize}
									excerptSize={excerptSize}
									addToCartSize={addToCartSize}
									productBackColor={productBackColor}
									fontColors={{ titleColor, priceColor, excerptColor }}
								/>
							)}

							{productsData.length === 0 && (
								<p>{noProductsNotice}</p>
							)}

						</div>
					)}

					<div className={`${flexItemClasses}flex-block image-container`} style={{ width: `${flexItemsRatio}%` }}>
						{!mediaURL && (
							<MediaPlaceholder
								icon="format-image"
								onSelect={onSelectImage}
								onSelectURL={onSelectImage}
								allowedTypes={['image']}
								labels={{
									title: __('Add image', 'wcspots'),
									instructions: __('Drag & drop or select an image file', 'wcspots'),
								}}
							/>
						)}
						{mediaURL && (
							<img
								className="hotspot-image"
								src={mediaURL}
								srcSet={srcSetAtt}
								sizes={sizesAtt}
								alt={__('WCSpots image', 'wcspots')}
								onClick={() => addNewHotspot(event, hotspots, setAttributes)}
							/>
						)}

						{hotspots?.length > 0 &&
							hotspots.map((hotspot, index) => (

								<Hotspot
									context="edit"
									key={`hotspot-${hotspot.id}`}
									hotspot={hotspot}
									hotspotSettings={hotspotSettings}
									onDoubleClick={() => modalProductToHotspot(hotspot, setAttributes)}
									onMouseOver={onHotspotOver}
									onMouseOut={onHotspotOut}
									clientId={clientId}
									unassignProduct={unassignProduct}
									removeHotspot={removeHotspot}
									hotspots={hotspots}
									setAttributes={setAttributes}
									popoverAtts={popoverAtts}
									popoverParent={popoverParent}
								/>

							))}

						<div className={`hotspots-editor-bottomtip ${classNames({ ['visible']: hotspots?.length == 0 && mediaURL })}`}>
							{__('Click on image to add hotspots.', 'wcspots')}
						</div>

					</div>

				</div>

				<div className='appended'></div>

			</div>

			{editModal && (
				<Modal
					title={__('Assign a product to this hotspot', 'wcspots')}
					onRequestClose={() =>
						setAttributes({
							editModal: false,
							selectedHotspot: null,
						})
					}
				>
					{productsData.length > 0 && (
						<SelectControl
							label={__('Products', 'wcspots')}
							value={
								selectedProduct
									? JSON.stringify([
										selectedProduct.id,
										selectedProduct.name,
									])
									: ''
							}
							options={productOptions}
							onChange={(value) => {
								onProductSelect(value, hotspots, selectedHotspot, setAttributes);
							}}
						/>
					)}
					{productsData.length === 0 && (
						<p>{noProductsNotice}</p>
					)}

				</Modal>
			)}

		</>
	);
}

export default Edit;
