<?php

if ( !defined( 'OMG_FIELDS_DIR' ) ) {
	define( 'OMG_FIELDS_DIR', dirname( __FILE__ ) );
}
//
//if ( !defined( 'OMG_FIELDS_URL' ) ) {
//	$locate = locate_template( '/vendor/omg-fields/omg-fields.php' );
//	if ( ! empty( $locate ) ) {
//		define( 'OMG_FIELDS_URL', get_stylesheet_directory_uri() . '/vendor' );
//		define( 'OMG_FIELDS_CONTEXT', 'wordpress-theme' );
//	} else {
//		define( 'OMG_FIELDS_URL', plugin_dir_url( __FILE__ ) );
//		define( 'OMG_FIELDS_CONTEXT', 'wordpress-plugin' );
//	}
//
//}

if ( !defined( 'OMG_FIELDS_FILE' ) ) {
	define( 'OMG_FIELDS_FILE', __FILE__ );
}

if ( !defined( 'OMG_FIELDS_VERSION' ) ) {
	define( 'OMG_FIELDS_VERSION', '0.6.0' );
}

require_once __DIR__ . '/core/autoload.php';

\OMG\Autoload\autoload( __DIR__. '/core' );
\OMG\Autoload\autoload( __DIR__. '/fields' );

OMG\Fields\Core\setup();
