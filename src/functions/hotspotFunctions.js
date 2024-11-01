/**
 * WordPress dependenices.
 */
import { __ } from '@wordpress/i18n';

/**
 * External dependecies.
 */
import { v4 as uuidv4 } from 'uuid'; // For creating unique id's.

/**
 * Adding hotspots when clicked on image (in div container)
 * captures click coordinates relative to image container
 * and adds hotspot to hotspot objects, with x,y and other properties.
 * 
 * @param {Event} event 
 * @param {Object} hotspots 
 * @param {Function} setAttributes 
 */
export const addNewHotspot = (event, hotspots, setAttributes) => {
	const rect = event.target.getBoundingClientRect();
	const xPos = ((event.clientX - rect.left) / rect.width) * 100;
	const yPos = ((event.clientY - rect.top) / rect.height) * 100;
	const newHotspot = {
		x: xPos,
		y: yPos,
		id: uuidv4(),
		name: __('Double click on hotspot to assign a product.', 'wcspots'),
		productId: null,
		productTitle: null,
		assigned: false,
		iconStyle: null,
		primaryColor: null,
		secondaryColor: null,
		size: 1,
		innerSize: 1,
		pulsateEff: false
	};
	const updatedHotspots = hotspots?.concat(newHotspot);
	setAttributes({ hotspots: updatedHotspots });
};

/**
 * When a hotspot is clicked, the modal opens to assign product to the hotspot.
 * @param {object} hotspot 
 * @param {Function} setAttributes 
 */
export const modalProductToHotspot = (hotspot, setAttributes) => {
	setAttributes({ selectedHotspot: hotspot.id });
	setAttributes({ selectedProduct: null });
	setAttributes({ editModal: true });
};

/**
 * Select product from products object and assign to hotspot.
 * Select component is in modal component.
 * @param {number} value 
 * @param {object} hotspots 
 * @param {string} selectedHotspot 
 * @param {Function} setAttributes 
 */
export const onProductSelect = (value, hotspots, selectedHotspot, setAttributes) => {
	const [productId, productTitle] = JSON.parse(value);
	const updatedHotspots = hotspots?.map((hotspot) => {
		if (hotspot.id === selectedHotspot) {
			return {
				...hotspot,
				productId,
				productTitle,
				assigned: true
			};
		}
		return hotspot;
	});
	setAttributes({ hotspots: updatedHotspots });
	setAttributes({ selectedProduct: value });
	setAttributes({ selectedHotspot: null });
	setAttributes({ editModal: false });
};


/**
 * Add 'highlight' class name to assigned product
 * @param {event} event 
 * @param {object} hotspot 
 * @param {string} clientId 
 */
export const onHotspotOver = (event, hotspot, clientId, primaryColor) => {
	// Get "WCSpots" block instance specific to this hotspot.
	const thisBlock = event.target.closest(".wp-block-micemade-wcspots");
	// Bailing early.
	if (!thisBlock) return;

	const thisBlockId = thisBlock.dataset.block;
	const productId = hotspot?.productId;
	const product = thisBlock.querySelector(`[data-product-id="${productId}"]`);
	if (product && thisBlockId == clientId) {
		product.classList.add('highlighted');
		product.style.setProperty('--highlight-color', `${primaryColor}`);
	}
}


/**
 * Remove highligt class name from assigned product.
 * @param {*} event 
 * @param {*} hotspot 
 * @param {*} clientId 
 */
export const onHotspotOut = (event, hotspot, clientId) => {
	// Get "WCSpots" block instance specific to this hotspot.
	const thisBlock = event.target.closest(".wp-block-micemade-wcspots");
	// Bailing early.
	if (!thisBlock) return;

	const thisBlockId = thisBlock.dataset.block;
	const productId = hotspot?.productId;
	const product = thisBlock.querySelector(`[data-product-id="${productId}"]`);
	if (product && thisBlockId == clientId) {
		product.classList.remove('highlighted');
		product.style.setProperty('--highlight-color', '')
	}
}

/**
 * Un-assign product to hotspot.
 * @param {object} hotspots 
 * @param {Function} setAttributes 
 * @param {string} hotspotId 
 */
export const unassignProduct = (hotspots, setAttributes, hotspotId) => {
	const updatedHotspots = hotspots?.map((hotspot) => {
		if (hotspot.id === hotspotId) {
			return {
				...hotspot,
				productId: null,
				productTitle: null,
				assigned: false
			};
		}
		return hotspot;
	});
	setAttributes({ hotspots: updatedHotspots });
}

/**
 * Delete hotspot.
 * @param {object} hotspots 
 * @param {Function} setAttributes 
 * @param {string} hotspotId 
 */
export const removeHotspot = (hotspots, setAttributes, hotspotId) => {
	const updatedHotspots = hotspots.filter((hotspot) => {
		return hotspotId !== hotspot.id
	});

	setAttributes({ hotspots: updatedHotspots });
};

/**
 * Clear all hotspots when removeing/replacing  image.
 *
 * @param {object} hotspots 
 * @param {number} mediaID 
 * @param {Function} setAttributes 
 * @returns boolean.
 */
export const clearHotspotsOnImageChange = (hotspots, mediaID, setAttributes) => {
	if (hotspots.length > 0 && mediaID) {
		if (!confirm("All existing hotspots will be removed - are you sure?")) {
			return false;
		};
	}
	setAttributes({ hotspots: [] });
	return true;
}
