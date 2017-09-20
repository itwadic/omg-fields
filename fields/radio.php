<?php
namespace OMG\Fields;

function register_radio_buttons( $post, $name, $label, $options ) {
	$value = get_post_meta( $post->ID, $name, true );
	if ( empty( $value ) ) {
	    $value = get_term_meta( $post->term_id, $name, true );
	}
	ob_start(); ?>

	<div class="admin-row">
		<label class="input__label">
			<?php esc_html_e( $label ); ?>
		</label>
		<div class="row-wrapper radio-buttons">
		<?php if ( isset( $args['description'] ) && ! empty( $options['description'] ) ) : ?>
                <p class="admin-row-description"><?php echo esc_html( $options['description'] ); ?></p>
			<?php endif; ?>
		<?php foreach ( $options as $option ) : ?>
			<label class="input__radio_label">
				<input
					class="input__field_radio"
					name="<?php echo esc_attr( $name ); ?>"
					type="radio"
					value="<?php echo esc_attr( $option['value'] ) ?>"
					<?php checked( $value, $option['value'] ); ?> />
				<span><?php echo esc_html( $option['label'] ); ?></span>
			</label>

		<?php endforeach;
		echo '</div>';
	echo '</div>';
	return ob_get_clean();
}
