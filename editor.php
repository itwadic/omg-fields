<?php
namespace Crossfield\Theme\Fields;

function register_editor( $id ) {
	$meta = get_post_meta( get_the_ID(), $id, true );
	if ( ! empty( $meta ) ) {
		$value = $meta;
	} else {
		$value = '';
	}
	wp_editor(
		wp_kses_post( $value ),
		$id,
		[
			'editor_height' => 300,
			'teeny' => false,
			'media_buttons' => false,
		] );
}