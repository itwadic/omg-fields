<?php
namespace OMG\Fields;

function register_checkbox_buttons( $post, $name, $label, $args ) {
	if ( ! isset( $args['option'] ) ) {
		throw new \Exception( 'The Checkbox Field requires you to have an option key in the $args array.' );
	}

	$value = get_checkbox_value( $post, $name );

	if ( isset( $args['callback'] ) && function_exists( $args['callback'] ) ) {
		$value = call_user_func_array( $args['callback'], [ $value ] );
	}

	ob_start(); ?>

	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php esc_html_e( $label ); ?>
		</label>
		<div class="row-wrapper checkbox-buttons">
			<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
                <p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
			<input
				class="input__field_radio"
                id="<?php echo esc_attr( $name ); ?>"
				name="<?php echo esc_attr( $name ); ?>"
				type="checkbox"
				value="1"
				<?php checked( $value, 1 ); ?> />
		</div>
	</div>

	<?php return ob_get_clean();
}

function get_checkbox_value( $post, $name ) {
	$value = get_post_meta( $post->ID, $name, true );

	if ( empty( $value ) ) {
		return get_term_meta( $post->term_id, $name, true );
	}

	return $value;
}

function update_checkbox_value( $post_id, $data, $name ) {
    if ( ! isset( $data[ $name ] ) ) {
	    update_post_meta( $post_id, $name, 0 );
    } else {
	    update_post_meta( $post_id, $name, 1 );
    }
}