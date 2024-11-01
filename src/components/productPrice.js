import { __ } from '@wordpress/i18n';
import getProduct from '../functions/getProduct';
import DOMPurify from 'dompurify';


const ProductPrice = ({ productId }) => {
	const { product, loading } = getProduct(productId);
	const sanitizer = DOMPurify.sanitize;

	if (loading) {
		return <small>{__('Loading product price...', 'wcspots')}</small>;
	}

	if (!product) {
		return <div>{__('Product not found', 'wcspots')}</div>;
	}

	// Product price HTML sanitized.
	return <div dangerouslySetInnerHTML={{ __html: sanitizer(product.price_html) }} />

};

export default ProductPrice;
