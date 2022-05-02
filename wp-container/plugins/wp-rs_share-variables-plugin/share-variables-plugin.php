<?php 
/**
 * Plugin Name: WP-RS: Share Variables with React components
 * Plugin URI: 
 * Description: Share variables to interact with React Components through localStorage.getItem("variable")
 * Version: 1
 * Author: Roberto Sánchez 
 * Author URI: 
 * License: GPLv2+
 * Text Domain: localStorage.getItem("userRole"),  localStorage.getItem("userDisplayName")
 */

// check function first:
if(!function_exists('wp_get_current_user')) {
    include(ABSPATH . "wp-includes/pluggable.php"); 
}

 //Get User ID
$user = wp_get_current_user();
$userRole = $user->roles[0];
$userDisplayName = $user->data->display_name;

//Enqueue script 
wp_register_script( 'var_handle', plugin_dir_url(__FILE__).'/js/custom.js', array( 'jquery' ), '', true );

// Localize the script with new data
$dataArray = array(
	'user' => $user,
    'userRole' => $userRole,
    'userDisplayName' => $userDisplayName
);
wp_localize_script( 'var_handle', 'values', $dataArray );

// Enqueued script with localized data.
wp_enqueue_script( 'var_handle' );


?>