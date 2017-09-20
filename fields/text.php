<?php
namespace OMG\Fields;

function register_text_field( $post, $name, $label, $args = [], $width = '100%' ) {
	ob_start();
	?>
	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php esc_html_e( $label ) ?>
		</label>
		<div class="row-wrapper">
			<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
                <p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
			<input
				class="input__field"
				name="<?php echo esc_attr( $name ); ?>"
				placeholder="<?php echo esc_attr( $args[ 'placeholder' ] ); ?>"
				type="text"
				id="<?php echo esc_attr( $name ); ?>"
				style="width: <?php echo esc_attr( $width ); ?>;"
				value="<?php echo esc_attr( get_post_meta( $post->ID, $name, true ) ); ?>"
			/>
		</div>
	</div>

	<?php return ob_get_clean();
}
