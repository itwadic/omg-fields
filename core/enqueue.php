<?php
namespace OMG\Fields\Core;

function setup() {
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\scripts' );
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\styles' );
}

function scripts() {
  wp_enqueue_script( 'omg-fields-js', OMG_FIELDS_URL . '/omg-fields/dist/index.bundle.js', array(), OMG_FIELDS_VERSION, true );

	wp_localize_script(
		'omg-fields-js',
		'OMGFields',
		[
			'baseURL'   =>  site_url()
		]
	);
}

function styles() {
  wp_enqueue_style(
		'omg-fields-css',
		OMG_FIELDS_URL . '/omg-fields/dist/index.bundle.css',
		array(),
		OMG_FIELDS_VERSION
	);

	wp_enqueue_style(
		'dragula-css',
		OMG_FIELDS_URL . '/omg-fields/node_modules/dragula/dist/dragula.min.css',
		array(),
		OMG_FIELDS_VERSION
	);
}
