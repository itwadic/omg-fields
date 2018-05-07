<?php
namespace OMG\Fields;

if ( ! defined('ABSPATH') ) {
	exit;
}

function register_editor( $id, $args = [] ) {
	$meta = get_post_meta( get_the_ID(), $id, true );
	$value = ( ! empty( $meta ) ) ? $meta : '';
	$args = wp_parse_args(
		$args,
		[
			'editor_height' => 300,
			'teeny' => false,
			'media_buttons' => false,
		]
	);

	wp_editor(
		wp_kses_post( $value ), $id, $args );
}
