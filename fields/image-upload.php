<?php
namespace OMG\Fields;

function custom_media_uploader( $image_id = 0, $field_name, $text ) {
	$image_data = array();
	$image_url = '';
	if ( ! empty( $image_id ) ) {
		$image_data = wp_get_attachment_image_src( $image_id, 'thumbnail' );
		$image_url = set_custom_image_uploader_url( $image_data, $image_id );
	}

	ob_start(); ?>
	<div class="custom-media-upload<?php echo ( ! empty( $image_data[0] ) ) ? ' has-image' : ''; ?>">
		<p id="<?php echo esc_attr( $field_name ); ?>-image-wrap" class="featured-image">
				<span class="thumbnail-wrapper"><?php
					printf( '<a class="replace-image" title="%s" href="#"><img src="%s"></a>',
						$text['replace_button'],
						esc_url( $image_url )
					); ?>
				</span>
			<a class="set-image <?php echo esc_attr( $text['link_type'] ); ?>" href="#"><?php echo $text['upload_button']; ?></a>
			<a class="remove-image" href="#"><?php echo $text['remove_button']; ?></a>

			<input type="hidden" name="<?php echo esc_attr( $field_name ); ?>" value="<?php echo esc_attr( $image_id ); ?>">
		</p>
	</div>
	<?php return ob_get_clean();
}

function set_custom_image_uploader_url( $image_data, $image_id ) {
	if ( ! $image_data && ! $image_id ) {
		return '';
	} else if ( ! $image_data ) {
		return esc_url( site_url( 'wp-includes/images/media/text.png' ) );
	} else {
		return $image_data[0];
	}
}
