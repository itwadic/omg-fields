<?php
namespace OMG\Fields;

function setup() {
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\scripts' );
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\styles' );
}

function scripts() {
  wp_enqueue_script( 'omg-fields-js', OMG_FIELDS_URL . '/dist/index.bundle.js', array(), OMG_FIELDS_VERSION, true );
}

function styles() {
  wp_enqueue_style(
		'omg-fields-js',
		OMG_FIELDS_URL . "/dist/index.bundle.css",
		array(),
		OMG_FIELDS_VERSION
	);
}
