<?php

if ( !defined('ABSPATH') ) {
	die();
}

if ( !defined( 'OMG_FIELDS_DIR' ) ) {
	define( 'OMG_FIELDS_DIR', dirname( __FILE__ ) );
}

if ( !defined( 'OMG_FIELDS_FILE' ) ) {
	define( 'OMG_FIELDS_FILE', __FILE__ );
}

if ( !defined( 'OMG_FIELDS_VERSION' ) ) {
	define( 'OMG_FIELDS_VERSION', '0.14.1' );
}

\AaronHolbrook\Autoload\autoload( dirname( __FILE__ ) . '/core' );
\AaronHolbrook\Autoload\autoload( dirname( __FILE__ ) . '/fields' );

OMG\Fields\Core\setup();
