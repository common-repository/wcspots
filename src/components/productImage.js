/**
 * WordPress dependencies.
 */
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

/** React dependencies. */
import { Fragment } from 'react';

/**
 * Internal dependencies.
 */
import getProduct from '../functions/getProduct';
import getFeaturedImage from '../functions/getFeaturedImage';

const ProductImage = ({ productId, featuredImageSize }) => {
	const { product, loading } = getProduct(productId);
	const { loadingFeaturedImg, featuredImage } = getFeaturedImage(productId, featuredImageSize);

	if (loading || loadingFeaturedImg) {
		return <Spinner />;
	}

	if (!product) {
		return <div>{__('Product not found', 'wcspots')}</div>;
	}

	// If product has images attached to it.
	const hasImages = product.images && product.images.length > 0;
	// Get featured image.
	const featWcImage = hasImages ? product.images[0] : null;
	// Get image srcset.
	const imgSrcSet = hasImages ? featWcImage.srcset : null;
	// Get image src (full size).
	const imgSrc = hasImages ? featWcImage.src : null;

	// Image fallback (WC placeholder image or notice.)
	const fallback = typeof wc == 'object' ? (<img src={wc?.wcSettings?.PLACEHOLDER_IMG_SRC} alt={product.name} />) : (__('Product has no featured image', 'wcspots'));

	return (hasImages) ? (
		<img {...((imgSrcSet && !featuredImage) ? { srcSet: imgSrcSet } : {})} src={featuredImage ?? imgSrc} alt={product.name} />
	) : (
		<Fragment>{fallback}</Fragment>
	);
};

export default ProductImage;
