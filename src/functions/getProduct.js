/**
 * WordPress and React Dependencies.
 */

import { useState, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';

const getProduct = (productId, featuredImageSize) => {
	const [product, setProduct] = useState(null);
	const [loading, setLoading] = useState(true);
	// const [featuredImage, setFeaturedImage] = useState(null);

	useEffect(() => {
		async function fetchProduct() {
			try {
				const product = await apiFetch({
					path: `/wc/store/v1/products/${productId}?_fields=id,name,short_description,price_html,images,permalink,add_to_cart,type`,
				});
				setProduct(product);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching products via WC Store API:", error);
			}
		}
		fetchProduct();
		/*
				// If "featuredImageSize" is not set (is 'automatic'), get image source url from registered sizes.
				const fetchFeaturedImage = async () => {
					try {
						setLoading(true);
						const response = await apiFetch({
							path: `/wp/v2/product/${productId}?_embed`,
						});

						if (
							typeof featuredImageSize !== "automatic" &&
							typeof response._embedded['wp:featuredmedia'] !== 'undefined'
						) {
							const featuredImage = response._embedded['wp:featuredmedia'][0].media_details.sizes[featuredImageSize]?.source_url;
							setFeaturedImage(featuredImage);
						}
						setLoading(false);
					} catch (error) {
						console.error("Error fetching featured image size source url via WP Rest API:", error);
					}

				};
				fetchFeaturedImage();
		 */
		// }, [productId, featuredImageSize]);
	}, [productId]);

	return { product, loading };
};

export default getProduct;
