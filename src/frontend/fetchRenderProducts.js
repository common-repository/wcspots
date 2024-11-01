/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

/**
 * if DOMPurify doesn't sanitize:
 * import { createInterpolateElement } from '@wordpress/element'; //
 * https://make.wordpress.org/core/2020/07/17/introducing-createinterpolateelement/
 */

/**
 * React and external dependencies.
 */
import { render } from 'react-dom';
import DOMPurify from 'dompurify';
import { Fragment } from 'react';

/**
 * Internal dependencies.
 */
import addToCartPost from '../functions/addToCartPost';
import decode from '../functions/decode';
import FeaturedImageBySize from './FeaturedImageBySize';

const fetchRenderProducts = (productIds, blockId) => {

	// Block instance by 'data-block-id' att.
	const thisBlock = document.querySelector(`[data-block-id="${blockId}"]`);
	const featuredImageSize = thisBlock.dataset.featuredImageSize;
	const SanitizeHTML = DOMPurify.sanitize;

	// Prepare product ID's for query arg (array to string).
	const _productIds = productIds.map((item) => item.toString()).join(",");

	apiFetch({
		path: `/wc/store/v1/products/?include=${_productIds}&_fields=id,name,short_description,price_html,images,permalink,add_to_cart, type`

	}).then((products) => {

		products.forEach((product) => {

			// Fetched product properties.
			const productId = product.id;
			const name = product.name ? product.name : null;
			const permalink = product.permalink ? product.permalink : '#';
			const description = product.short_description ? product.short_description : null;
			const priceHtml = product.price_html ? product.price_html : null;
			const addToCart = product.add_to_cart ? product.add_to_cart : null;
			const type = product.type ? product.type : null;

			// Product images.
			const hasImages = product.images && product.images.length > 0;
			const featWcImage = hasImages ? product.images[0] : null;
			const imgSrcSet = featWcImage?.srcset;
			const imgSrc = featWcImage?.src;
			// Fallback to WC placholder, or plain text.
			const fallBack = typeof wc === 'object' ? (<img src={wc?.wcSettings?.PLACEHOLDER_IMG_SRC} alt={name} />) : (__('Product has no featured image', 'wcspots'));

			let imageToRender = null;
			if (!featuredImageSize || featuredImageSize === 'automatic') {
				// If no registered image size is set, get image source url from WC Store API.
				imageToRender = hasImages ? <img {...(imgSrcSet ? { srcSet: imgSrcSet } : {})} src={imgSrc} alt={name} sizes="(max-width: 599px) 100vw, calc(100vw / 3)" /> : <Fragment>{fallBack}</Fragment>;
			} else {
				// If registered image size is set, get featured image using WP Rest API.
				imageToRender = hasImages ? <FeaturedImageBySize productId={productId} featuredImageSize={featuredImageSize} name={name} /> : <Fragment>{fallBack}</Fragment>
			}

			/**
			 * Containers to render elements.
			 */
			const imageContainer = thisBlock.querySelector(`[data-product-image="${productId}"]`);
			const titleContainer = thisBlock.querySelector(`[data-product-title="${productId}"]`);
			const priceContainer = thisBlock.querySelector(`[data-product-price="${productId}"]`);
			const excerptContainer = thisBlock.querySelector(`[data-product-excerpt="${productId}"]`);
			const addToCartContainer = thisBlock.querySelector(`[data-product-addtocart="${productId}"]`);

			// Product image.
			{
				(imageContainer && imageToRender) && (
					render(imageToRender, imageContainer)
				)
			}
			// Product title.
			{
				titleContainer && (
					render(<a href={permalink} title={decode(name)}>{decode(name)}</a>, titleContainer)
				)
			}
			// Price (HTML sanitized).
			{
				priceContainer && (
					render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(priceHtml) }} />, priceContainer)
				)
			}
			// Excerpt (HTML sanitized).
			{
				excerptContainer && (
					render(<div dangerouslySetInnerHTML={{ __html: SanitizeHTML(description) }} />, excerptContainer)
				)
			}

			// Add to cart button classes.
			const addToCartClasses = "wp-block-button__link wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart";
			{
				addToCartContainer && (
					render(
						<>
							<a
								className={addToCartClasses}
								href={type !== 'simple' || !priceHtml && (addToCart?.url)}
								title={addToCart?.description}
								onClick={() => {
									{ (type === 'simple' && priceHtml) && (addToCartPost(event, productId)) }
								}}
							>
								{addToCart?.text}
							</a>
							{type === 'simple' && (
								<small className='view-cart'></small>
							)}

						</>,
						addToCartContainer
					)
				)
			}
		});

	}).catch((error) => {
		console.error(error);
	});

};

export default fetchRenderProducts;
