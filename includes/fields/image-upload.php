<?php
namespace OMG\Fields;

if ( ! defined('ABSPATH') ) {
	exit;
}

function custom_media_uploader( $post, $name, $label, $args ) {
	$meta  = isset($args['meta']) ? $args['meta'] : false; 
	if($meta)
		$image_data = array("url"=>$post->$name,"id"=>$post->term_id);
	else
		$image_data = get_custom_image_uploader_url( $post, $name, $meta);

	ob_start(); ?>
    <div class="admin-row">
        <label class="input__label" for="<?php echo esc_attr( $name ); ?>">
		    <?php echo esc_html( $label ) ?>
        </label>
        <div class="custom-media-upload <?php echo ( ! empty( $image_data[ 'url' ] ) ) ? ' has-image' : ''; ?>">
	        <?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
                <p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
	        <?php endif; ?>
            <div id="<?php echo esc_attr( $name ); ?>-image-wrap" class="featured-image">
				<div class="thumbnail-wrapper"><?php
					printf( '<a class="replace-image" title="%s" href="#"><img src="%s"></a>',
						$args['replace_button'],
						esc_url( $image_data[ 'url' ])
					); ?>
				</div>
                <?php if ( isset( $args['show_title'] ) && ! empty( $args['show_title'] ) ) : ?>
                    <p class="thumbnail-title">
	                    <?php echo basename( get_attached_file( $image_data[ 'id' ] ) ); ?>
                    </p>
                <?php endif; ?>
                <a class="set-image <?php echo esc_attr( $args['link_type'] ); ?>" href="#"><?php echo $args['upload_button']; ?></a>
                <a class="remove-image <?php echo esc_attr( $args['link_type'] ); ?>" href="#"><?php echo $args['remove_button']; ?></a>

                <input type="hidden" name="<?php echo esc_attr( $name ); ?>" value="<?php echo esc_attr( $image_data[ 'id' ] ); ?>">
            </div>
        </div>
    </div>

	<?php return ob_get_clean();
}

function get_custom_image_uploader_url( $post, $field_name,$term = false ) {
	//in case of term $post will have the whole $_POST object
	if(!$term)
		$image_id = get_post_meta( $post->ID, $field_name, true );
	else
		$image_id = isset($post[$field_name]) ? $post[$field_name] : '';

	if ( empty( $image_id ) ) {
	    return [
            'url'   =>  '',
            'id'    =>  ''
        ];
    }

    $image_url = wp_get_attachment_image_url( $image_id, 'thumbnail' );

	if ( empty( $image_url ) ) {
	    return [
		    'url'   =>  site_url( 'wp-includes/images/media/text.png' ),
		    'id'    =>  $image_id
	    ];
    }

    return [
	    'url'   =>  $image_url,
	    'id'    =>  $image_id
    ];
}
