/**
 * WordPress dependencies.
 */
import apiFetch from '@wordpress/api-fetch';
import { __ } from '@wordpress/i18n';

/**
 * React dependencies.
 */
import { render } from 'react-dom';

/**
 * API Fetch POST method to add product to cart.
 * Nonce header is required for cart/add-item endpoint.
 * Nonce created with wp_create_nonce( 'wc_store_api' ) php, added to 'wcspotsVars'
 * object with wp_localize_script.
 *
 * @param {number} productId 
 */
const addToCartPost = (event, productId) => {

	event.preventDefault();

	render(__('Adding...', 'wcspots'), event.target)

	apiFetch({
		path: '/wc/store/v1/cart/add-item',
		method: 'POST',
		data: {
			id: productId,
			quantity: 1
		},
		headers: {
			'Nonce': window?.wcspotsVars?.nonce
		}
	})
		.then((response) => {
			render(
				__('Product added', 'wcspots'),
				event.target
			);
			render(
				<a href={window.wcspotsVars.cartUrl}>{__('View Cart', 'wcspots')}</a>,
				event.target.nextElementSibling
			);

			return response;
		})
		.catch((error) => {
			console.log(error);
			throw error;
		});
}
export default addToCartPost;
/* 
// AJAX VERSION (for non-block mini cart)
const addToCartPost = (productId) => {
	jQuery.ajax({
		url: '/?wc-ajax=add_to_cart',
		method: 'POST',
		data: {
			product_id: productId,
			quantity: 1
		},
		success: function (response) {
			console.log(response);
			// Update the Mini Cart block or the cart template, depending on the page
			if (jQuery('.widget_shopping_cart_content').length) {
				// Update the Mini Cart widget contents
				jQuery('.widget_shopping_cart_content').html(response.fragments['div.widget_shopping_cart_content']);
			} else {
				// Update the cart template contents
				jQuery('.cart').html(response.fragments['div.cart']);
			}
		},
		error: function (error) {
			console.log(error);
		}
	});
};

export default addToCartPost;
 */