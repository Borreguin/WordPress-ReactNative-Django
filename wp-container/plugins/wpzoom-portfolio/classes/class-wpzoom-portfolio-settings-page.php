<?php
/**
 * WPZOOM Portfolio Settings Page
 *
 * @since   1.0.5
 * @package WPZOOM Portfolio
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The main PHP class for WPZOOM Portfolio Settings Page.
 */
class WPZOOM_Portfolio_Settings_Page {

	/**
	 * This class's instance.
	 *
	 * @var WPZOOM_Portfolio_Settings_Page
	 * @since 1.0.5
	 */
	private static $instance;

	/**
	 * Main WPZOOM_Portfolio_Settings_Page Instance.
	 *
	 * Insures that only one instance of WPZOOM_Portfolio_Settings_Page exists in memory at any one
	 * time. Also prevents needing to define globals all over the place.
	 *
	 * @since 1.0.5
	 * @static
	 * @return object|WPZOOM_Portfolio_Settings_Page The one true WPZOOM_Portfolio_Settings_Page
	 */
	public static function instance() {
		if ( null === self::$instance ) {
			self::$instance = new WPZOOM_Portfolio_Settings_Page();
		}
		return self::$instance;
	}

	/**
	 * Class constructor.
	 *
	 * @since 1.0.5
	 */
	function __construct() {

		add_action( 'admin_menu', array( $this, 'add_settings_page' ) );
		add_action( 'admin_init', array( $this, 'option_panel_init' ) );
	
	}

	/**
	 * Add plugin page to menu settings
	 *
	 * @since 1.0.0
	 */
	public function add_settings_page() {

		add_menu_page(
			'WPZOOM Portfolio Settings Page',
			'WPZOOM Portfolio',
			'manage_options',
			'wpzoom-portfolio-settings',
			array( $this, 'create_settings_page' ),
			'dashicons-portfolio', 
			35
		);

	}

	/**
	 * Add settings panel to select the size for the feature image
	 *
	 * @since 1.0.0
	 */
	public function create_settings_page() {

		if ( ! current_user_can( 'manage_options' ) ){
			wp_die( __( 'You do not have enough permission to view this page', 'preload-featured-images' ) );
		}

		printf('<div class="wrap">
			<h2>%s</h2>
			<ul>
				<li><a href="https://wordpress.org/support/plugin/preload-featured-images" target="_blank" >%s</a></li>
			</ul>', esc_html__( 'Preload Featured Image', 'preload-featured-images' ), esc_html__( 'Support Forum on WordPress.org', 'preload-featured-images' )
		);

		printf( '<form method="post" action="options.php">' );
		settings_fields( 'preload_featured_images_option_group' );
		do_settings_sections( 'preload-featured-images' );
		submit_button();
		printf( '</form></div>' );

	}

	/**
	 * Init options fields and sections
	 *
	 * @since 1.0.0
	 */
	public function option_panel_init() {

		register_setting(
				'preload_featured_images_option_group',
				'preload_featured_images_option_name',
				array( $this, 'sanitize_field' )
		);
		add_settings_section(
			'preload_featured_images_setting_section',
			esc_html__( 'Preload Featured Images Settings', 'preload-featured-images' ),
			array( $this, 'section_info' ),
			'preload-featured-images'
		);
		add_settings_field(
				'image_size',
				esc_html__( 'Featured Images Size', 'preload-featured-images'), array( $this, 'select_field_image_sizes' ),
				'preload-featured-images',
				'preload_featured_images_setting_section'
		);
	}

	/**
	 * Saniteze values from the inputs of the options form
	 *
	 * @since 1.0.0
	 */
	public function sanitize_field( $values ) {
		return $values;
	}

	public function reset_option_values( $old_name, $old_theme ) {
		update_option( 'preload_featured_images_option_name', null );
	}

	/**
	 * Output the section info
	 *
	 * @since 1.0.0
	 */
	public function section_info() {}

	/**
	 * The select field of the featured image size
	 *
	 * @since 1.0.0
	 */
	public function select_field_image_sizes() {

		$html_field = '';
	
		global $_wp_additional_image_sizes;
		$image_sizes = get_intermediate_image_sizes();
		$image_sizes[] = 'full';

		echo '<select name="preload_featured_images_option_name[image_size]" id="wpzoom_preload_featured_images_size">';
		foreach( $image_sizes as $size ) { 
			echo '<option ' . selected( $size, self::$featured_images_size, false ) . ' value="' . esc_attr( $size ) . '">' . esc_html( $size ) . '</option>';
		}
		echo '</select><p class="description">'. wp_kses_post( __( 'Select the correct image size for the Featured Image on the single post', 'preload-featured-images' ) ) . '</p>';

	}

}

new WPZOOM_Portfolio_Settings_Page;