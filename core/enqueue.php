<?php
namespace OMG\Fields\Core;

use OMG\Fields\Directory;

function setup() {
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\scripts' );
  add_action( 'admin_enqueue_scripts', __NAMESPACE__ . '\styles' );
}

function scripts() {

	wp_enqueue_script( 'omg-fields-js', Directory\local_url( '/dist/index.bundle.js', __DIR__ ), array( 'wp-color-picker' ), OMG_FIELDS_VERSION, true );
	wp_enqueue_media();
	wp_enqueue_style( 'wp-color-picker' );
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
		Directory\local_url( '/dist/index.bundle.css', __DIR__ ),
		array(),
		OMG_FIELDS_VERSION
	);

	wp_enqueue_style(
		'dragula-css',
		'https://cdnjs.cloudflare.com/ajax/libs/dragula/3.7.2/dragula.min.css',
		array(),
		OMG_FIELDS_VERSION
	);
}
