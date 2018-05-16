<?php
/*
Plugin Name:  OMG Fields
Plugin URI:   https://github.com/mrbobbybryant/omg-fields
Description:  A small fields API for WordPress.
Version:      1.0.0
Author:       Bobby Bryant
Author URI:   https://github.com/mrbobbybryant
License:      GPL2
License URI:  https://www.gnu.org/licenses/gpl-2.0.html
*/

if ( ! defined('ABSPATH') ) {
	exit;
}

if ( !defined( 'OMG_FIELDS_DIR' ) ) {
	define( 'OMG_FIELDS_DIR', dirname( __FILE__ ) );
}

if ( !defined( 'OMG_FIELDS_FILE' ) ) {
	define( 'OMG_FIELDS_FILE', __FILE__ );
}

if ( !defined( 'OMG_FIELDS_VERSION' ) ) {
	define( 'OMG_FIELDS_VERSION', '1.0.1' );
}

require_once 'includes/index.php';

OMG\Fields\Core\setup();
