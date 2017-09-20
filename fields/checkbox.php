<?php
namespace OMG\Fields;

function register_checkbox_buttons( $post, $name, $label, $option ) {
	$value = get_post_meta( $post->ID, $name, true );
	if ( empty( $value ) ) {
		$value = get_term_meta( $post->term_id, $name, true );
	}
	ob_start(); ?>

	<div class="admin-row">
		<label class="input__label">
			<?php esc_html_e( $label ); ?>
		</label>
		<div class="autosuggest answer-status">
			<?php if ( isset( $args['description'] ) && ! empty( $option['description'] ) ) : ?>
                <p class="admin-row-description"><?php echo esc_html( $option['description'] ); ?></p>
			<?php endif; ?>
			<input
				class="input__field_radio"
				name="<?php echo esc_attr( $name ); ?>"
				type="checkbox"
				value="<?php echo esc_attr( $option ) ?>"
				<?php checked( $value, $option ); ?> />
		</div>
	</div>

	<?php return ob_get_clean();
}
