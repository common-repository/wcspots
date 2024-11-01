/**
 * Hotspot events.
 * @param {*} hotspot 
 */

const AddHotspotEvents = (hotspot, lookBlockInstance) => {

	const productId = hotspot.dataset.productId;
	const primColor = hotspot.dataset.primcolor;
	const product = lookBlockInstance.querySelector(`[data-product-id="${productId}"]`);

	const highlightColor = primColor ?? ' rgba(0, 0, 0, 0.6)';

	if (product) {
		hotspot.addEventListener('mouseover', (event) => {

			product.classList.add('highlighted');
			product.style.setProperty('--highlight-color', `${highlightColor}`);
		});

		hotspot.addEventListener('mouseleave', (event) => {
			product.classList.remove('highlighted');
			// product.style.setProperty('--highlight-color', '');
		});
	}
}

export default AddHotspotEvents;
