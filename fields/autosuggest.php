<?php
namespace OMG\Fields;

/**
 * Function will display a meta field  used for creating lists.
 *
 * @param [Object] $post WordPress Post Object
 * @param [string] $name The postmeta key
 * @param [string] $label Human Readable name for field.
 * @param array $args
 * @param string $width
 * @return [string] Returns a string representing the HTML markup for this field.
 */
function register_autosuggest_field( $post, $name, $label, $args = [], $width = '100%' ) {
	$placeholder = ( isset( $args[ 'placeholder' ] ) ) ? $args[ 'placeholder' ] : '';
	$value = get_autosuggest_value( $post->ID, $name );

	if ( isset( $args['callback'] ) && function_exists( $args['callback'] ) ) {
		$value = call_user_func_array( $args['callback'], [ $value ] );
	}

	$localized_key = sprintf( 'autoList_%s', $name );

	wp_localize_script(
		'omg-fields-js',
		$localized_key,
		[
			'resource'  =>  isset( $args[ 'resource' ] ) ? $args[ 'resource' ] : 'posts'
		]
	);

	ob_start();
	?>
	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php esc_html_e( $label ) ?>
		</label>
		<div class="row-wrapper autosuggest">
			<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
				<p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
			<div class="autosuggest-wrapper">
				<input
					class="input__field autosuggest-input"
					placeholder="<?php echo esc_attr( $placeholder ); ?>"
					type="text"
					style="width: <?php echo esc_attr( $width ); ?>;"
					list="<?php echo esc_attr( $name ); ?>"
				    value="<?php echo esc_attr( ( isset( $value['title'] ) ) ? $value['title'] : '' ); ?>"
				/>
				<div class="autosuggest-spinner"></div>
				<datalist id="<?php echo esc_attr( $name ); ?>"></datalist>
				<input
					class="input__field autosuggest-hidden"
					name="<?php echo esc_attr( $name ); ?>"
					type="hidden"
					value="<?php echo esc_attr( json_encode( $value ) ); ?>"
				/>
			</div>
		</div>
	</div>

	<?php return ob_get_clean();
}

function get_autosuggest_value( $post_id, $name ) {
	$value_id = get_post_meta( $post_id, $name, true );

	if ( empty( $value_id ) ) {
	    return '';
    }

	$title = get_the_title( $value_id );

	if ( empty( $title ) ) {
		return '';
	}

	return [
		'id' => absint( $value_id ),
		'title' => $title
	];
}

function update_autosugggest( $post_id, $value, $name ) {
	if ( empty( $value ) ) {
		return update_post_meta( $post_id, $name, '' );
	}

	$value = json_decode( stripslashes( $value ) );

	if ( ! is_object( $value ) ) {
		return false;
	}

	$value_id = absint( $value->id );

	update_post_meta( $post_id, $name, $value_id );
}