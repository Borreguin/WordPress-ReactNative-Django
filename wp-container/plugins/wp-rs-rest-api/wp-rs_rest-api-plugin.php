<?php 
/**
 * Plugin Name: WP-RS: REST API MANAGEMENT
 * Plugin URI: 
 * Description: REST API for management
 * Version: 1
 * Author: Roberto Sanchez
 * Author URI: 
 * License: GPLv2+
 * Text Domain:
 */


// If this file is called directly, abort - security reason
if ( ! defined( 'WPINC' ) ) {
	die;
}

/**
 * Enqueue main script to import dynamically each entry-point.
 */
function register_entry_points_script() {
	wp_enqueue_script(
	'register-entry-points-script-js',
	plugins_url( 'build/static/js/main.js', __FILE__ ),
	[ ], 'v.0.0.1'
	);
}
add_action( 'wp_enqueue_scripts', 'register_entry_points_script' );


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

// This hide the default user bar and it is substituted by:
// add_filter( 'show_admin_bar', '__return_true');


function add_cors_http_header(){
    header("Access-Control-Allow-Headers: *");
    header("Access-Control-Allow-Origin: *");
}
add_action('init','add_cors_http_header');

// function tf_check_user_role( $roles ) {
//     // Check user logged-in
//
//     return false;
// }
// $roles = [ 'customer', 'subscriber' ];
// if ( tf_check_user_role($roles) ) {
//     add_filter('show_admin_bar', '__return_false');
// }

?>