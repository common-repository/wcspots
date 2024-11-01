import { render } from "react-dom";

/**
 * Internal dependencies.
 */
import fetchRenderProducts from "./fetchRenderProducts";
import AddHotspotEvents from "./hotspotEvents";
import AddHotspotPopover from "./addHotspotPopover";
import { correctTitlePosition } from "../functions/hotspotFunctions";

/**
 * WordPress dependencies.
 */
/* 
// TODO: responsive.
import { select } from '@wordpress/data';
import { store } from '@wordpress/viewport';
window.addEventListener('resize', (event) => {
	const isSmall = select(store).isViewportMatch('< large');
	console.log(isSmall) 
}, true);
 */

document.addEventListener('DOMContentLoaded', () => {

	// Get every WCSpots instance.
	const wcspotsInstances = document.querySelectorAll('.wp-block-micemade-wcspots');

	wcspotsInstances.forEach((blockInstance) => {

		// Block datasets.
		const productIds = JSON.parse(blockInstance.dataset.productIds);
		const blockId = blockInstance.dataset.blockId;
		const popoverAtts = blockInstance.dataset.popoverAtts;

		// Look for products container to render products (for the only image with hotspots case).
		const productsContainer = blockInstance.getElementsByClassName('products-grid-container');
		if (productsContainer.length > 0) {
			fetchRenderProducts(productIds, blockId);
		}

		// Get every hotspot item.
		const productHotspots = blockInstance.querySelectorAll('.product-hotspot');
		productHotspots.forEach((hotspot) => {

			const assocProdId = hotspot.dataset.productId;

			// Popover on each hotspot.
			const eventsHolder = hotspot.getElementsByClassName('events-holder')[0];
			if (assocProdId) {
				render(<AddHotspotPopover assocProdId={assocProdId} popoverAtts={JSON.parse(popoverAtts)} />, eventsHolder);
			}

			// Hotspot highlighting product on hover.
			AddHotspotEvents(hotspot, blockInstance);

		});
	});



});
