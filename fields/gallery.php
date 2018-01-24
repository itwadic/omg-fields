<?php
namespace OMG\Fields;


function register_gallery( $post, $name, $label, $args = [] ) {
	$images      = get_gallery_images( $post, $name );
	$button_text = ( isset( $args['description'] ) && ! empty( $args['description'] ) )
		? $args['description']
		: esc_html__( 'Add Images' );
	?>

	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php echo esc_html( $label ); ?>
		</label>
		<div class="row-wrapper">
			<div class="gallery-wrapper">
				<div id="gallery_images_container">
					<ul class="gallery-images">
						<?php echo build_gallery_list( $images ); ?>
					</ul>

					<input
						type="hidden"
						class="image-gallery-hidden"
						name="<?php echo esc_attr( $name ); ?>"
						value="<?php echo esc_attr( wp_json_encode( $images ) ); ?>" />

				</div>
				<p class="add-gallery-images hide-if-no-js">
					<a href="#"><?php echo esc_html( $button_text ); ?></a>
				</p>
			</div>
		</div>
	</div>
	<?php
}

/**
 * Helper function for saving the JSON Encoded data store in the hidden field.
 *
 * @param [int]      $post_id WP Post ID.
 * @param [string]   $values JSON Encoded array of values.
 * @param [string]   $name Meta Field key name.
 * @param [callable] $sanitization_cb Callback function which gives you a way to modify the date
 *                                    before it gets saved to the database.
 * @return void|boolean Function returns false if there is not any data to save.
 */
function update_gallery( $post_id, $values, $name, $sanitization_cb ) {
	if ( empty( $values ) ) {
		update_post_meta( $post_id, $name, $values );
	}

	$values = json_decode( stripslashes( $values ) );

	if ( ! is_array( $values ) ) {
		return false;
	}

	$values = array_map( $sanitization_cb, $values );

	update_post_meta( $post_id, $name, $values );
}

/**
 * Helper function for fetching text list from the databases.
 *
 * @param [int]    $post WP Post ID.
 * @param [string] $name Meta Key Name.
 * @return mixed Returns meta value, or an empty array if not value is found.
 */
function get_gallery_images( $post, $name ) {
	$values = get_post_meta( $post->ID, $name, true );
	return ( ! empty( $values ) ) ? $values : [];
}

/**
 * Function handles building the HTML markup of the list.
 *
 * @param [array] $gallery_items An array of items that make up the list.
 * @return string Returns the list html markup as a string.
 */
function build_gallery_list( $gallery_items ) {
	ob_start();

	foreach ( $gallery_items as $value ) :
		$url = wp_get_attachment_url( $value );
	?>
		<li class="gallery-image-item">
			<span class="gallery-iamge-id"><?php echo esc_html( $value ); ?></span>
			<img src="<?php echo esc_url( $url ); ?>" class="gallery-image"/>
			<span>
				<svg class="remove-gallery-image" viewBox="0 0 20 20">
				<path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
				</svg>
			</span>
		</li>
	<?php endforeach; ?>
	<?php

	return ob_get_clean();
}
