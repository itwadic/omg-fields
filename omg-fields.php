<?php

if ( !defined( 'OMG_FIELDS_DIR' ) ) {
	define( 'OMG_FIELDS_DIR', dirname( __FILE__ ) );
}

if ( !defined( 'OMG_FIELDS_FILE' ) ) {
	define( 'OMG_FIELDS_FILE', __FILE__ );
}

if ( !defined( 'OMG_FIELDS_VERSION' ) ) {
	define( 'OMG_FIELDS_VERSION', '0.8.0' );
}

require_once __DIR__ . '/core/autoload.php';

\OMG\Autoload\autoload( __DIR__. '/core' );
\OMG\Autoload\autoload( __DIR__. '/fields' );

OMG\Fields\Core\setup();
