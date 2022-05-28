<?php 
/**
 * Plugin Name: WP-RS: Hide REST API
 * Plugin URI: 
 * Description: Hide REST API for user that are not logged
 * Version: 1
 * Author: Roberto Sánchez 
 * Author URI: 
 * License: GPLv2+
 * Text Domain:
 */

add_filter( 'rest_authentication_errors', function( $result ) {
  if ( ! empty( $result ) ) {
    return $result;
  }
  if ( ! is_user_logged_in() ) {
    global $wp;
    // To obtain url of the requested resource, this allows access for not logged in users:
    // To obtain url of the requested resource, this allows access for not logged in users:
    $request = $wp->request;
    $route = empty( $request) ? $wp->query_vars['rest_route']: $request;
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


?>