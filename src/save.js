/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, RichText } from '@wordpress/block-editor';

import classNames from 'classnames';

/**
 * Internal dependencies.
 */
import './style.scss';
import ProductGrid from './components/productGrid';
import Hotspot from './components/hotspot';
import WCSpotsBlockTitle from './components/WCSpotsBlockTitle';

const Save = ({ attributes }) => {

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

	// Array of selected product ID's for blocks 'data-product-ids' attribute.
	// Used for frontend rendering.
	const productIds = productsData.map((item) => {
		return item.value;
	});
	const blockProps = useBlockProps.save({
		'data-block-id': id,
		'data-product-ids': JSON.stringify(productIds),
		'data-popover-atts': JSON.stringify(popoverAtts),
		'data-featured-image-size': featuredImageSize
	});

	// Block Flex container and product grid styles.
	const flexAlignItems = (layout) => {
		// If flexLayout is 'column' or 'column-reverse' set align fixed.
		return layout.substring(0, 6) == 'column' ? 'center' : valign; // or layout.startsWith() ?
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

	return (
		<>
			<div {...blockProps}>
				{(backImage !== 'backimage-none' && mediaURL) &&
					(<div className='cover-image' style={{ backgroundImage: `url(${mediaURL})`, opacity: backimageOpacity }}></div>)
				}

				{title && settingsTitleDesc.activeTitle && (
					<WCSpotsBlockTitle
						attributes={attributes}
					/>
				)}

				{settingsTitleDesc.activeDesc && (
					<RichText.Content
						tagName="p"
						value={description}
						style={{
							textAlign: settingsTitleDesc.align,
							margin: `${settingsTitleDesc.spacingDesc} 0`
						}} />
				)}

				<div className={`${flexContainerClasses} flex-container`} style={flexContainerStyles}>

					{flexLayout !== 'image-only' && (
						<div className={`${flexItemClasses}flex-block products-grid-container`} style={productsContainerStyle}>

							<ProductGrid
								context="save"
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

						</div>
					)}

					{mediaURL && (
						<div className={`${flexItemClasses}flex-block image-container`} style={{ width: `${flexItemsRatio}%` }}>
							<img
								className="hotspot-image"
								src={mediaURL}
								srcSet={srcSetAtt}
								sizes={sizesAtt}
								alt={__('Lookbook image', 'wcspots')}
							/>
							{hotspots?.length > 0 &&
								hotspots.filter((hotspot) => {
									if (!hotspot.productId) return false;
									return true;
								})
									.map((hotspot, index) => (

										<Hotspot
											key={`hotspot-${index}`}
											hotspot={hotspot}
											hotspotSettings={hotspotSettings}
											clientId={id}
										/>
									))}
						</div>
					)}

				</div>
			</div>
		</>
	);
};

export default Save;
