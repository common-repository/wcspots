import React, { useState, useEffect } from 'react';
import apiFetch from '@wordpress/api-fetch';

const FeaturedImageBySize = ({ productId, featuredImageSize, name }) => {
	const [featuredImageSrc, setFeaturedImageSrc] = useState(null);

	const fetchProductImage = async () => {
		try {
			const response = await apiFetch({ path: `/wp/v2/product/${productId}?_embed` });

			if (
				typeof featuredImageSize !== "automatic" &&
				typeof response._embedded['wp:featuredmedia'] !== 'undefined'
			) {
				const imageSrc = response._embedded['wp:featuredmedia'][0].media_details.sizes[featuredImageSize]?.source_url;
				setFeaturedImageSrc(imageSrc);
			}
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		fetchProductImage();
	}, [productId, featuredImageSize]);

	if (!featuredImageSrc) {
		return null;
	}

	return <img src={featuredImageSrc} alt={name} />;
};

export default FeaturedImageBySize;
