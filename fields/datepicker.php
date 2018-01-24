<?php
namespace OMG\Fields;

/**
 * Function created a datepicker field.
 *
 * @param [Object] $post WordPress Post Object.
 * @param [string] $name The postmeta key.
 * @param [string] $label Human Readable name for field.
 * @param [array]  $args Array of setting used by field. i.e. Description.
 * @param [string] $width Input field width.
 * @return [string] Returns a string representing the HTML markup for this field.
 */
function register_datepicker( $post, $name, $label, $args = [], $width = '50%' ) {
	$placeholder = ( isset( $args['placeholder'] ) ) ? $args['placeholder'] : 'Select Date...';
	$value       = get_post_meta( $post->ID, $name, true );

	if ( isset( $args['callback'] ) && function_exists( $args['callback'] ) ) {
		$value = call_user_func_array( $args['callback'], [ $value ] );
	}

	ob_start();
	?>
	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php echo esc_html( $label ); ?>
		</label>
		<div class="row-wrapper">
			<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
				<p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
			<input
				class="input__field datepicker-input"
				placeholder="<?php echo esc_attr( $placeholder ); ?>"
				name="<?php echo esc_attr( $name ); ?>"
				type="text"
				id="<?php echo esc_attr( $name ); ?>"
				style="width: <?php echo esc_attr( $width ); ?>;"
				data-date="<?php echo esc_attr( ( ! empty( $value ) ? $value : '' ) ); ?>"
			/>
		</div>
	</div>

	<?php

	return ob_get_clean();
}
