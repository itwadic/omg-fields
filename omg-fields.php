<?php
/*
Plugin Name: Oh My God Fields
Plugin URI:  https://github.com/mrbobbybryant/omg-fields
Description: A small fields API for WordPress.
Version:     0.0.1
Author:      Bobby Bryant
Author URI:  https://developwithwp.com
License:     GPL2
License URI: https://www.gnu.org/licenses/gpl-2.0.html
Text Domain: omg-fields
Domain Path: /languages
*/

if ( !defined( 'OMG_FIELDS_DIR' ) ) {
	define( 'OMG_FIELDS_DIR', plugin_dir_path( __FILE__ ) );
}
if ( !defined( 'OMG_FIELDS_URL' ) ) {
	define( 'OMG_FIELDS_URL', plugin_dir_url( __FILE__ ) );
}
if ( !defined( 'OMG_FIELDS_FILE' ) ) {
	define( 'OMG_FIELDS_FILE', __FILE__ );
}
if ( !defined( 'OMG_FIELDS_VERSION' ) ) {
	define( 'OMG_FIELDS_VERSION', '0.0.1' );
}

require_once OMG_FIELDS_DIR . '/core/enqueue.php';

\OMG\Fields\setup();
