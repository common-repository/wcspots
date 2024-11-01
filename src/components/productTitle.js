/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import getProduct from '../functions/getProduct';
import decode from '../functions/decode';

/**
 * External dependencies
 */
// import { decode } from 'he';

const ProductTitle = ({ productId }) => {
	const { product, loading } = getProduct(productId);

	if (loading) {
		return <small>{__('Loading product title...', 'wcspots')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'wcspots')}</div>;
	}

	return <a href={product.permalink}>{decode(product.name)}</a>;
};

export default ProductTitle;
