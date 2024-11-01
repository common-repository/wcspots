/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependencies.
 */
import DOMPurify from 'dompurify';
/**
 * Internal dependecies.
 */
import getProduct from '../functions/getProduct';


const ProductExcerpt = ({ productId }) => {
	const { product, loading } = getProduct(productId);
	const sanitizer = DOMPurify.sanitize;

	if (loading) {
		return <small>{__('Loading short description...', 'wcspots')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'wcspots')}</div>;
	}

	// Product price HTML sanitized.
	return <div dangerouslySetInnerHTML={{ __html: sanitizer(product.short_description) }} />

};

export default ProductExcerpt;
