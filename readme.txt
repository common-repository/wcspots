=== WCSpots - image hotspots for WooCommerce ===
Contributors:      Anydog
Tags:              woocommerce, hotspots, block, gutenberg, showcase
Requires at least: 6.0
Tested up to:      6.3
Requires PHP:      7.4
Stable tag:        1.1.0
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Create WooCommerce product showcases with image hotspots in the block editor.

== Description ==

> v.1.0.0. to v.1.1.0 UPDATE NOTICE: Upon update to v.1.1.0. no significant change or issue should occur on frontend of your WCSpots showcases. However, after update, on edit screen the "This block contains unexpected or invalid content." notice will appear. Clicking the "Attempt Block Recovery" will fix this notice, and new WCSpots v.1.1.0 features will be available.

**Introducing WCSpots** - our WooCommerce Product Hotspot Gutenberg Block – the ultimate solution for showcasing your products in a creative and interactive way!

With our plugin, you can easily create a custom image with hotspots that link to selected WooCommerce products. Simply select the products you want to showcase, upload an image, and add hotspots on top. Each hotspot is associated with a product, and when clicked, displays a product popover with all the necessary details – including price, description, and a "Add to Cart" button.

This plugin is perfect for any WooCommerce store owner looking to showcase their products in a unique and engaging way. Whether you want to highlight your best-sellers, promote new arrivals, or simply create an eye-catching product display, our plugin has got you covered.

=== Key Features ===

Here are some of the key features of WCSpots:

* Easy setup: Simply install the plugin, select your products, upload an image, and add hotspots.
* Customizable hotspots: Choose from a range of hotspot styles and customize the color and shape to match your brand.
* Build your own layout with intuitive controls and settings.
* Mobile-friendly: Our plugin is fully responsive, ensuring your hotspots and product popovers look great on any device.
* Fast loading: Our plugin is optimized for speed, ensuring your page loads quickly and efficiently.

So why wait? Download our WCSpots Block today and start showcasing your products like never before!

=== New from v.1.1.0 ===
* **Drag and drop hotspots** - easily change hotspot position.
* **Pulsating hotspot effect** - make hotspot pulsate, globally, or per hotspot.
* **Change the hotspot sizes** - separate control over inner and outer hotspot elements.
* **Product highlight color** - product higlighted with hotspot primary color, on hotspot hover.
* **Product image size** - image size controls for products and a popover.

Demonstration of WCSpots block usage:

[youtube https://www.youtube.com/watch?v=n0i9uqBsKp0]

== Installation ==

There are a couple of ways to install the WCSpots block plugin.

1. In WordPress Admin Dashboard:
	* Go to "Plugins" &rarr; "Add New" and search for "WCSpots". Once found, click "Install".
	* When the installation is done, click on "Activate" button.
2. Manually:
	* Download the WCSpots from wordpress.org and make sure the folder is zipped.
	* Upload the plugin files to the `/wp-content/plugins/wcspots` directory, or install the plugin through the WordPress plugins screen directly.
	* Activate the plugin through the "Plugins" screen in WordPress
3. Search for the block within the Block Editor (Gutenberg) and start using it.

=== Stay Connected ===

* [View on GitHub](https://github.com/Micemade/woohotspots)
* [Follow on Twitter](https://twitter.com/theMicemade)

== Frequently Asked Questions ==

= Does WCSpots require WooCommerce plugin being installed and activated? =

Yes, in current version, the WCSpots requires that WooCommerce plugin is installed and active.There is also a roadmap with custom hotspot products or content included.

= Are there any upgrades planned for the WCSpots block?

Yes, more controls over products and popover layout, as well as hotspot options. Feature requests in the Support page of plugin are more than welcome.

== Screenshots ==

1. Here's a screenshot of the newly-added WCSpots block using the inserter. The basic block layout prompts you to upload (or select an existing) image, choose products from the sidebar in block settings, and add an optional title and description to the block.

2. Select an image to showcase the product and choose the products to include. Also, you can set the basic settings and styles, add a title and description, and the next step is to place the hotspots and assign products to each one. To add hotspots, you just need to click on the image.

3. After you added the hotspots, and double-click on each one, a modal prompt appears with a selection of products. Once you choose a product, the hotspot will be linked to it.

4. Once you've assigned a product to a hotspot, a popover with the product details immediately appears. In the editor, the popover's visibility can be toggled only by clicking on the hotspot. This allows for easy visual control of changing popover properties and styles. On the frontend, the popover can be disabled by clicking anywhere on the page.

5. You can change the appearance of the block using intuitive controls located under the block settings and styles tabs. In the "Settings" tab, you'll find product and image selection, as well as layout properties for products, images, and popovers. Meanwhile, under the "Styles" tab, you can adjust colors, sizes, spacings, and other style properties.

6. The WCSpots block in action on the frontend, showing off the products with the showcase image and hotspots.

7. Showcasing audio product, with different layout and hotspot styles.

8. Showcasing cosmetic products, with variation of popup style, this time without the product image.

== Licence ==

The plugin uses, other than WordPress and React modules and packages, third party modules, licenced under MIT or MPL-2.0, GPL compatible licences:
* [ClassNames](https://www.npmjs.com/package/classnames)
* [React Select](https://react-select.com/home)
* [React Tiny Popover](https://www.npmjs.com/package/react-tiny-popover)
* [DOMPurify](https://www.npmjs.com/package/dompurify)
* [uuid](https://www.npmjs.com/package/uuid)

== Changelog ==

= 1.1.0 =

* Added drag and drop hotspots functionality in the editor.
* Added conditional display of controls (showcase image and product styles), depending on the state of other controls.
* Added a list of hotspots to the block settings tab (accessible also in the block styles tab).
* Added product image width and height in products list and in popover.
* Added product image resoluion, selection of registered image sizes.
* Additional layouts for product and popover.
* Added hotspot general outer and inner size controls.
* Hotspot primary color is now a product highlight color.
* Added pulsating effect to hotspot, with general and individual toggle control.

= 1.0.0 =

* Fixed the bug with Add to Cart (Read more) button when the product has no price.
* Fixed the decoding of special HTML characters for product titles.
* Added load_plugin_textdomain for PHP translated strings.
* Added WC Store API nonce sanitization
* Added conditional controls for products layout, depending on block layout.

= 0.1.0 =

* Inital release

== Feedback ==

If you would like to have more features in this block, please suggest them in the Support section. This also applies to pointing out to bugs, or UI/UX improvements. Bugfixes or improvements will be added to free version of plugin, but some new features may only apply to commercial version. The commercial version will enable us to contiue working on free version and support it for a longer time period.
