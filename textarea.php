<?php
namespace Crossfield\Theme\Fields;

function register_textarea_field( $post, $name, $label ) {
	ob_start();
	?>
	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php esc_html_e( $label ) ?>
		</label>
		<div class="textarea-wrapper">
			<textarea
				class="input__field"
				name="<?php echo esc_attr( $name ); ?>"
				type="text"
				id="<?php echo esc_attr( $name ); ?>"
				style="height: 75px;"
			><?php echo esc_textarea( get_post_meta( $post->ID, $name, true ) ); ?></textarea>
		</div>
	</div>

	<?php return ob_get_clean();
}