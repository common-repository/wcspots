<?php
/**
 * Plugin Name:       WCSpots
 * Description:       Create WooCommerce product showcases with image hotspots in the block editor.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           1.1.0
 * Author:            Micemade
 * Author URI:        https://micemade.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       wcspots
 *
 * @package           micemade
 */

/**
 * Initialize the plugin.
 *
 * @return void
 */
function wcspots_block_init() {

	/**
	 * Registers the block using the metadata loaded from the `block.json` file.
	 * Behind the scenes, it registers also all assets so they can be enqueued
	 * through the block editor in the corresponding context.
	 *
	 * @see https://developer.wordpress.org/reference/functions/register_block_type/
	 */
	register_block_type( __DIR__ . '/build' );

	if ( defined( 'WC_PLUGIN_FILE' ) ) {

		// Create nonce value for apiFetch.
		$nonce    = wp_create_nonce( 'wc_store_api' );
		$cart_url = wc_get_cart_url();

		// Javascript variables.
		$js_vars = array(
			'wooActive' => true,
			'nonce'     => sanitize_key( $nonce ),
			'cartUrl'   => esc_url( $cart_url ),
		);

	} else {
		$js_vars = array(
			'wooActive' => false,
		);

		/**
		 * Admin notice for missing WooCommerce plugin.
		 *
		 * @return void
		 */
		function wcspots_admin_plugin_notice() {
			?>
			<div class="notice notice-info is-dismissible wcspots-admin-notice">
				<div class="wcspots-admin-notice-wrapper" style="margin-bottom: 15px;">
					<h2><?php esc_html_e( 'WCSpots Notice', 'wcspots' ); ?></h2>
					<p><?php esc_html_e( 'WCSpots plugin is a block plugin for creating WooCommerce product showcases with image hotspots. To enable the WCSpots, please install and activate the WooCommerce plugin.', 'wcspots' ); ?></p>
					<a target="_blank" class="button-primary button" href="<?php echo esc_url( 'https://wordpress.org/plugins/woocommerce/' ); ?>"><?php esc_html_e( 'Get WooCommerce', 'wcspots' ); ?></a>
				</div>
			</div>
			<?php
		}
		add_action( 'admin_notices', 'wcspots_admin_plugin_notice' );
	}

	// Add JS vars to frontend and editor.
	wp_localize_script(
		'micemade-wcspots-view-script',
		'wcspotsVars',
		$js_vars
	);
	wp_localize_script(
		'micemade-wcspots-editor-script',
		'wcspotsVars',
		$js_vars
	);

	wp_set_script_translations( 'micemade-wcspots-view-script', 'wcspots', plugin_dir_path( __FILE__ ) . 'languages/' );
	wp_set_script_translations( 'micemade-wcspots-editor-script', 'wcspots', plugin_dir_path( __FILE__ ) . 'languages/' );

	load_plugin_textdomain( 'wcspots', false, dirname( plugin_basename( __FILE__ ) ) . '/languages' );

}

add_action( 'init', 'wcspots_block_init' );
