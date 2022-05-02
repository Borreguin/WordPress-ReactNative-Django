<?php
/**
 * Register admin menu elements.
 *
 * @since   1.0.5
 * @package WPZOOM_Portfolio
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class for admin menu.
 */
class WPZOOM_Porfolio_Admin_Menu {

	/**
	 * The Constructor.
	 */
	public function __construct() {

		// Let's add menu item with subitems
		add_action( 'admin_menu', array( $this, 'register_menus' ) );
	}

	/**
	 * Register admin menus.
	 */
	public function register_menus() {
		
		$page_title = esc_html__( 'WPZOOM Portfolio Settings Page', 'wpzoom-portfolio' );

        // Remove Add New submenu item.
        remove_submenu_page( 'edit.php?post_type=portfolio_item', 'post-new.php?post_type=portfolio_item' );

		// WPZOOM Portfolio sub menu item.
		// add_submenu_page(
		// 	'edit.php?post_type=portfolio_item',
		// 	$page_title,
		// 	esc_html__( 'Settings', 'wpzoom-portfolio' ),
		// 	'manage_options',
		// 	'wpzoom-portfolio-settings',
		// 	array( $this, 'admin_page' )
		// );

	}

	/**
	 * Wrapper for the hook to render our custom settings pages.
	 *
	 * @since 1.0.5
	 */
	public function admin_page() {
		do_action( 'wpzoom_portfolio_admin_page' );
	}

}

new WPZOOM_Porfolio_Admin_Menu();