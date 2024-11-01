/**
 * WordPress dependencies.
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies.
 */
import getProduct from '../functions/getProduct';
import addToCartPost from "../functions/addToCartPost";


const ProductAddToCart = ({ productId }) => {

	const { product, loading } = getProduct(productId);

	if (loading) {
		return <small>{__('Loading...', 'wcspots')}</small>;
	}
	if (!product) {
		return <div>{__('Product not found', 'wcspots')}</div>;
	}

	const { text, description, url } = product.add_to_cart;

	const classNames = "wp-block-button__link wc-block-components-product-button__button add_to_cart_button ajax_add_to_cart";

	// Product Add to cart HTML.
	return (
		<>
			<a
				className={classNames}
				href={(product?.type !== 'simple' || !product?.price_html) && url}
				title={description}
				onClick={() => {
					{ (product?.type === 'simple' && product?.price_html) && (addToCartPost(event, productId)) }
				}}
			>{text}</a>
			{product?.type === 'simple' && (
				<small className='view-cart'></small>
			)}
		</>
	)

};

export default ProductAddToCart;
