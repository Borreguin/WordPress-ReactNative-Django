<?php 
/**
 * Plugin Name: WP-RS: REST API MANAGEMENT
 * Plugin URI: 
 * Description: REST API for management
 * Version: 1
 * Author: Roberto Sánchez 
 * Author URI: 
 * License: GPLv2+
 * Text Domain:
 */


// If this file is called directly, abort - security reason
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Enqueue frontend scripts.
 */
function frontend_scripts() {
	wp_enqueue_script(
	'wds-wwe-frontend-js',
	plugins_url( 'build/static/js/frontend.js', __FILE__ ),
	[ ], 'v.0.0.1'
	);
}
add_action( 'wp_enqueue_scripts', 'frontend_scripts' );

/**
 * Enqueue admin scripts.
 */
function admin_scripts() {
	wp_enqueue_script(
	'wds-wwe-admin-js',
	plugins_url( 'build/static/js/admin.js', __FILE__ ),
	[ ]
	);
}
add_action( 'admin_enqueue_scripts', 'admin_scripts' );

// This allows to hide endpoints to non-authenticated users:
add_filter( 'rest_authentication_errors', function( $result ) {
  if ( ! empty( $result ) ) {
    return $result;
  }
  if ( ! is_user_logged_in() ) {
    global $wp;
    // To obtain url of the requested resource, this allows access for not logged in users:
    $request = $wp->request;
    $route = empty( $request) ? $wp->query_vars['rest_route']: $request;
    // whitelist for non-authenticated users
    switch ($route) {
      case '/jwt-login/v1/auth':
        return $result;
      default:
        return new WP_Error( 'rest_not_logged_in', 'You are not currently logged in.', array( 'status' => 401 ) );
    }
  }
  if ( ! current_user_can( 'administrator' ) ) {
    return new WP_Error( 'rest_not_admin', 'You are not an administrator.', array( 'status' => 401 ) );
  }
  return $result;
});

function add_cors_http_header(){
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');



?>