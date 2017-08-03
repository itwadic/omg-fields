<?php

if ( ! defined( 'OMG_FIELDS_VERSION' ) ) {
	define( 'OMG_FIELDS_VERSION', '0.0.1' );
}

require_once __DIR__ . '/core/enqueue.php';
require_once __DIR__ . '/core/autoload.php';

\OMG\Autoload\autoload( __DIR__. '/fields' );
