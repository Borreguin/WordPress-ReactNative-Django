<?php
/**
 * WPZOOM Portfolio Custom Posts
 *
 * @since   1.0.5
 * @package WPZOOM_Portfolio
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'WPZOOM_Portfolio_Custom_Posts' ) ) {
	/**
	 * Main WPZOOM_Portfolio_Custom_Posts Class.
	 *
	 * @since 1.0.5
	 */
	class WPZOOM_Portfolio_Custom_Posts {

		/**
		 * This class instance.
		 *
		 * @var WPZOOM_Portfolio_Custom_Posts
		 * @since 1.0.5
		 */
		private static $instance;

		/**
		 * Provides singleton instance.
		 *
		 * @since 1.0.5
		 * @return self instance
		 */
		public static function instance() {			

			if ( null === self::$instance ) {
				self::$instance = new WPZOOM_Portfolio_Custom_Posts();
			}

			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.5
		 * @access public
		 */
		public function __construct() {

			global $wp_version;

			add_action( 'init', array( $this, 'register_custom_post_type' ) );
			add_action( 'restrict_manage_posts', array( $this, 'add_admin_filters' ), 10 );

			if ( version_compare( $wp_version, '5.8', '<' ) ) {
				add_filter( 'allowed_block_types', array( __CLASS__, 'allowed_block_types' ), 10, 2 );
			} else {
				add_filter( 'allowed_block_types_all', array( __CLASS__, 'allowed_block_types' ), 10, 2 );
			}
			add_filter( 'default_content', array( __CLASS__, 'default_portfolio_layout_content' ), 10, 2 );

			// Update the columns shown on the custom post type edit.php view - so we also have custom columns
			add_filter( 'manage_portfolio_layout_posts_columns' , array( $this, 'portfolio_layouts_columns' ) );
			add_action( 'manage_portfolio_layout_posts_custom_column' , array( $this,'fill_portfolio_layouts_columns' ), 10, 2 );
		
		}

		/**
		 * Add custom post type
		 */
		public function register_custom_post_type() {

			// Add the portfolio post type
			register_post_type(
				'portfolio_item', 
				array(
					'can_export'          => true,
					'description'         => esc_html__( 'A portfolio type for featuring items in your portfolio.', 'wpzoom-portfolio' ),
					'has_archive'         => true,
					'hierarchical'        => true,
					'labels'              => array(
						'add_new'                  => esc_html_x( 'Add New', 'portfolio_item', 'wpzoom-portfolio' ),
						'add_new_item'             => esc_html__( 'Add New Portfolio Post', 'wpzoom-portfolio' ),
						'all_items'                => esc_html__( 'Portfolio Items', 'wpzoom-portfolio' ),
						'archives'                 => esc_html_x( 'Portfolio Archives', 'The post type archive label used in nav menus. Default "Post Archives". Added in 4.4', 'wpzoom-portfolio' ),
						'attributes'               => esc_html__( 'Portfolio Post Attributes', 'wpzoom-portfolio' ),
						'edit_item'                => esc_html__( 'Edit Portfolio Post', 'wpzoom-portfolio' ),
						'filter_items_list'        => esc_html_x( 'Filter portfolio items list', 'Screen reader text for the filter links heading on the post type listing screen. Default "Filter posts list". Added in 4.4', 'wpzoom-portfolio' ),
						'insert_into_item'         => esc_html_x( 'Insert into portfolio item', 'Overrides the "Insert into post" phrase (used when inserting media into a post). Added in 4.4', 'wpzoom-portfolio' ),
						'items_list'               => esc_html_x( 'Portfolio Items list', 'Screen reader text for the items list heading on the post type listing screen. Default "Posts list". Added in 4.4', 'wpzoom-portfolio' ),
						'items_list_navigation'    => esc_html_x( 'Portfolio Items list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default "Posts list navigation". Added in 4.4', 'wpzoom-portfolio' ),
						'item_published'           => esc_html__( 'Portfolio Post published.', 'wpzoom-portfolio' ),
						'item_published_privately' => esc_html__( 'Portfolio Post published privately.', 'wpzoom-portfolio' ),
						'item_reverted_to_draft'   => esc_html__( 'Portfolio Post reverted to draft.', 'wpzoom-portfolio' ),
						'item_scheduled'           => esc_html__( 'Portfolio Post scheduled.', 'wpzoom-portfolio' ),
						'item_updated'             => esc_html__( 'Portfolio Post updated.', 'wpzoom-portfolio' ),
						'menu_name'                => esc_html_x( 'Portfolio', 'Admin Menu text', 'wpzoom-portfolio' ),
						'name'                     => esc_html_x( 'Portfolio', 'Post type general name', 'wpzoom-portfolio' ),
						'name_admin_bar'           => esc_html_x( 'Portfolio Post', 'Add New on Toolbar', 'wpzoom-portfolio' ),
						'new_item'                 => esc_html__( 'New Portfolio Post', 'wpzoom-portfolio' ),
						'not_found'                => esc_html__( 'No portfolio posts found.', 'wpzoom-portfolio' ),
						'not_found_in_trash'       => esc_html__( 'No portfolio posts found in Trash.', 'wpzoom-portfolio' ),
						'parent_item_colon'        => esc_html__( 'Parent Portfolio Items:', 'wpzoom-portfolio' ),
						'search_items'             => esc_html__( 'Search Portfolio Posts', 'wpzoom-portfolio' ),
						'singular_name'            => esc_html_x( 'Portfolio Post', 'Post type singular name', 'wpzoom-portfolio' ),
						'uploaded_to_this_item'    => esc_html_x( 'Uploaded to this portfolio item', 'Overrides the "Uploaded to this post" phrase (used when viewing media attached to a post). Added in 4.4', 'wpzoom-portfolio' ),
						'view_item'                => esc_html__( 'View Portfolio Post', 'wpzoom-portfolio' ),
						'view_items'               => esc_html__( 'View Portfolio Posts', 'wpzoom-portfolio' )
					),
				'show_in_menu'        => true,
				'menu_icon'           => 'dashicons-portfolio',
				'public'              => true,
				'publicly_queryable'  => true,
				'show_ui'             => true,
                'taxonomies'          => array(
					'portfolio',
                ),
				/* The rewrite handles the URL structure. */
				'rewrite'             => array(
					'slug'       => 'project',
					'with_front' => false,
					'pages'      => true,
					'feeds'      => true,
					'ep_mask'    => EP_PERMALINK,
				),
				'show_in_rest'        => true,
				'supports'            => array( 'author', 'custom-fields', 'editor', 'excerpt', 'revisions', 'thumbnail', 'title' ),
			) );

			// Add the portfolio categories taxonomy
			register_taxonomy( 
				'portfolio', 
				'portfolio_item', 
				array(
				'description'        => esc_html__( 'Categories for portfolio items.', 'wpzoom-portfolio' ),
				'hierarchical'       => true,
                'publicly_queryable' => true,
				'labels'             => array(
					'add_new_item'               => esc_html__( 'Add New Category', 'wpzoom-portfolio' ),
					'add_or_remove_items'        => esc_html__( 'Add or remove categories', 'wpzoom-portfolio' ),
					'all_items'                  => esc_html__( 'All Categories', 'wpzoom-portfolio' ),
					'back_to_items'              => esc_html__( '&larr; Back to Categories', 'wpzoom-portfolio' ),
					'choose_from_most_used'      => esc_html__( 'Choose from the most used categories', 'wpzoom-portfolio' ),
					'edit_item'                  => esc_html__( 'Edit Category', 'wpzoom-portfolio' ),
					'items_list'                 => esc_html__( 'Categories list', 'wpzoom-portfolio' ),
					'items_list_navigation'      => esc_html__( 'Categories list navigation', 'wpzoom-portfolio' ),
					'most_used'                  => esc_html_x( 'Most Used', 'categories', 'wpzoom-portfolio' ),
					'name'                       => esc_html_x( 'Categories', 'taxonomy general name', 'wpzoom-portfolio' ),
					'new_item_name'              => esc_html__( 'New Category Name', 'wpzoom-portfolio' ),
					'no_terms'                   => esc_html__( 'No categories', 'wpzoom-portfolio' ),
					'not_found'                  => esc_html__( 'No categories found.', 'wpzoom-portfolio' ),
					'parent_item'                => esc_html__( 'Parent Category', 'wpzoom-portfolio' ),
					'parent_item_colon'          => esc_html__( 'Parent Category:', 'wpzoom-portfolio' ),
					'popular_items'              => esc_html__( 'Popular Categories', 'wpzoom-portfolio' ),
					'search_items'               => esc_html__( 'Search Categories', 'wpzoom-portfolio' ),
					'separate_items_with_commas' => esc_html__( 'Separate categories with commas', 'wpzoom-portfolio' ),
					'singular_name'              => esc_html_x( 'Category', 'taxonomy singular name', 'wpzoom-portfolio' ),
					'update_item'                => esc_html__( 'Update Category', 'wpzoom-portfolio' ),
					'view_item'                  => esc_html__( 'View Category', 'wpzoom-portfolio' )
				),
				'public'            => true,
				'rewrite'             => array(
					'slug'       => 'portfolio',
					'with_front' => false,
					'pages'      => true,
					'feeds'      => true,
					'ep_mask'    => EP_PERMALINK,
				),
				'show_in_nav_menus'  => true,
				'show_admin_column' => true,
				'show_in_rest'      => true
			) );

			// Register the post meta fields for storing a video for a portfolio item
			register_post_meta( 'portfolio_item', '_wpzb_portfolio_video_type', array(
				'show_in_rest'      => true,
				'type'              => 'string',
				'single'            => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () { return current_user_can( 'edit_posts' ); }
			) );
			register_post_meta( 'portfolio_item', '_wpzb_portfolio_video_id', array(
				'show_in_rest'      => true,
				'type'              => 'integer',
				'single'            => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () { return current_user_can( 'edit_posts' ); }
			) );
			register_post_meta( 'portfolio_item', '_wpzb_portfolio_video_url', array(
				'show_in_rest'      => true,
				'type'              => 'string',
				'single'            => true,
				'sanitize_callback' => 'sanitize_text_field',
				'auth_callback'     => function () { return current_user_can( 'edit_posts' ); }
			) );

			// Register a custom image size for use as the default image size
			add_image_size( 'portfolio_item-thumbnail', 600, 400, true );

			// Ensure there is a Uncategorized category for the portfolio post type
			if ( is_null( term_exists( 'uncategorized', 'portfolio' ) ) ) {
				wp_insert_term( esc_html__( 'Uncategorized', 'wpzoom-portfolio' ), 'portfolio', array( 'slug' => 'uncategorized' ) );
			}

			// Ensure the Uncategorized category is the default for the portfolio post type
			$term = get_term_by( 'slug', 'uncategorized', 'portfolio' );
			if ( false === get_option( 'default_portfolio', false ) && $term ) {
				update_option( 'default_portfolio', $term->term_id );
			}

			// portfolio layouts post type.
			register_post_type(
				'portfolio_layout',
				array(
					'labels'                 => array(
						'name'               => _x( 'Portfolio Layouts', 'Post Type General Name', 'wpzoom-portfolio' ),
						'singular_name'      => _x( 'Portfolio Layout', 'Post Type Singular Name', 'wpzoom-portfolio' ),
						'menu_name'          => _x( 'Portfolio Layouts', 'Post Type General Name', 'wpzoom-portfolio' ),
						'parent_item_colon'  => __( 'Parent Portfolio Item', 'wpzoom-portfolio' ),
						'all_items'          => __( 'Portfolio Layouts', 'wpzoom-portfolio' ),
						'view_item'          => __( 'View Portfolio Layout', 'wpzoom-portfolio' ),
						'add_new_item'       => __( 'Add New Portfolio Layout', 'wpzoom-portfolio' ),
						'add_new'            => __( 'Add New', 'wpzoom-portfolio' ),
						'edit_item'          => __( 'Edit Portfolio Layout', 'wpzoom-portfolio' ),
						'update_item'        => __( 'Update Portfolio Layout', 'wpzoom-portfolio' ),
						'search_items'       => __( 'Search Portfolio Layout', 'wpzoom-portfolio' ),
						'not_found'          => __( 'Not Found', 'wpzoom-portfolio' ),
						'not_found_in_trash' => __( 'Not found in Trash', 'wpzoom-portfolio' ),
					),
					'public'          => false,
					'has_archive'     => false,
					'show_ui'         => true,

					// adding to custom menu manually.
					'show_in_menu'    => 'edit.php?post_type=portfolio_item',
					'show_in_rest'    => true,
					'map_meta_cap'    => true,
					'rewrite'         => true,
					'supports'        => array(
						'title',
						'editor',
						'revisions',
					)
				)
			);
		}

		public function add_admin_filters( $post_type ){
			if( 'portfolio_item' !== $post_type ){
				return;
			}
			$taxonomies_slugs = array(
				'portfolio'
			);
			// loop through the taxonomy filters array
			foreach( $taxonomies_slugs as $slug ){
				$taxonomy = get_taxonomy( $slug );
				$selected = '';
				// if the current page is already filtered, get the selected term slug
				$selected = isset( $_REQUEST[ $slug ] ) ? $_REQUEST[ $slug ] : '';
				// render a dropdown for this taxonomy's terms
				wp_dropdown_categories( array(
					'show_option_all' =>  $taxonomy->labels->all_items,
					'taxonomy'        =>  $slug,
					'name'            =>  $slug,
					'orderby'         =>  'name',
					'value_field'     =>  'slug',
					'selected'        =>  $selected,
					'hierarchical'    =>  true,
					'show_count'      => true
				) );
			}
		}

		/**
		 * Add filter by custom taxonomies
		 *
		 * @param String $post_type - post type name.
		 */
		public function filter_custom_post_by_taxonomies( $post_type ) {
			
			// Apply this only on a specific post type.
			if ( 'portfolio_item' !== $post_type ) {
				return;
			}

			// A list of taxonomy slugs to filter by.
			$taxonomies = array( 'portfolio' );

			foreach ( $taxonomies as $taxonomy_slug ) {
				// Retrieve taxonomy data.
				$taxonomy_obj  = get_taxonomy( $taxonomy_slug );
				$taxonomy_name = $taxonomy_obj->labels->name;

				// Retrieve taxonomy terms.
				$terms = get_terms( $taxonomy_slug );

				// Display filter HTML.
				echo '<select name="' . esc_attr( $taxonomy_slug ) . '" id="' . esc_attr( $taxonomy_slug ) . '" class="postform">';
				// translators: %s - taxonomy name.
				echo '<option value="">' . sprintf( esc_html__( 'Show All %s', 'wpzoom-portfolio' ), esc_html( $taxonomy_name ) ) . '</option>';
				foreach ( $terms as $term ) {
					printf(
						'<option value="%1$s" %2$s>%3$s (%4$s)</option>',
						esc_attr( $term->slug ),
						// phpcs:ignore
						isset( $_GET[ $taxonomy_slug ] ) && $_GET[ $taxonomy_slug ] === $term->slug ? ' selected="selected"' : '',
						esc_html( $term->name ),
						esc_html( $term->count )
					);
				}
				echo '</select>';
			}
		}

		/**
		 * Set allowed block types for the Portfolio Layout CPT.
		 *
		 * @since 1.0.5
		 */
		public static function allowed_block_types( $allowed_block_types, $post ) {
			
			if ( self::get_current_post_type( 'portfolio_layout' ) ) {
				return array( 'wp:visual-portfolio/block' );
			}
			return $allowed_block_types;
			
		}

		/**
		 * Set default content for the Portfolio Layout CPT.
		 *
		 * @since 1.0.5
		 */
		public static function default_portfolio_layout_content( $content, $post ) {

			if ( self::get_current_post_type( 'portfolio_layout' ) ) {
				return '<!-- wp:wpzoom-blocks/portfolio {"align":"full"} /-->';
			}
			return $content;

		}

		/**
		 * Add shortcode column to the portfolio layouts list.
		 *
		 * @since 1.0.5
		 */
		public function portfolio_layouts_columns( $columns ) {
			return array(
					'cb'        => '<input type="checkbox" />',
					'title'     => esc_html__( 'Portfolio Layout Title', 'wpzoom-portfolio' ),					
					'shortcode' => esc_html__( 'Shortcode', 'wpzoom-portfolio' ),
					'date'      => esc_html__( 'Date', 'wpzoom-portfolio' )
			);
		}
	
		/**
		 * Add shortcode to the column.
		 *
		 * @since 1.0.5
		 */
		public function fill_portfolio_layouts_columns( $column, $post_id ) {
			
			// Fill in the columns with meta box info associated with each post
			switch ( $column ) {
				case 'shortcode' :
					echo '<input type=\'text\' size=\'28\' id=\'wpzoom-porfolio-layout-shortcode\' onClick=\'this.select();\' value=\'[wpzoom_portfolio_layout id="' . $post_id . '"]\'>';
				break;
			}
		}

		/**
		 * Get current post type.
		 *
		 * @since 1.0.5
		 */
		public static function get_current_post_type( $post_type = '' ) {
			
			$type = false;
		
			if( isset( $_GET['post'] ) ) {
				$id = $_GET['post'];
				$post = get_post( $id );
				if( is_object( $post ) && $post->post_type == $post_type ) {
					$type = true;
				}
			} elseif ( isset( $_GET['post_type'] ) && $_GET['post_type'] == $post_type ) {
				$type = true;
			}
			
			return $type;	
		}

	}
}
new WPZOOM_Portfolio_Custom_Posts;