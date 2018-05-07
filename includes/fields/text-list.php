<?php
namespace OMG\Fields;

if ( ! defined('ABSPATH') ) {
	exit;
}

/**
 * Function will display a meta field  used for creating lists.
 *
 * @param [Object] $post WordPress Post Object.
 * @param [string] $name The postmeta key.
 * @param [string] $label Human Readable name for field.
 * @param [array]  $args Array of setting used by field. i.e. Description.
 * @param [string] $width Input field width.
 * @return [string] Returns a string representing the HTML markup for this field.
 */
function register_textlist_field( $post, $name, $label, $args = [], $width = '100%' ) {
	$placeholder = ( isset( $args['placeholder'] ) ) ? $args['placeholder'] : '';
	$values      = get_text_list_values( $post, $name );

	if ( isset( $args['callback'] ) && function_exists( $args['callback'] ) ) {
		$values = call_user_func_array( $args['callback'], [ $values ] );
	}

	ob_start();
	?>
	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php esc_html( $label ); ?>
		</label>
		<div class="row-wrapper text-list">
			<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
				<p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
			<?php echo build_text_list( $values, 'text-list-list' ); ?>
			<div class="text-list-wrapper">
				<input
						class="input__field text-list-input"
						placeholder="<?php echo esc_attr( $placeholder ); ?>"
						type="text"
						id="<?php echo esc_attr( $name ); ?>"
						style="width: <?php echo esc_attr( $width ); ?>;"
				/>
				<button class="button button-primary text-list-add"><?php esc_html_e( 'Add', 'omg-fields' ); ?></button>
				<input
						class="input__field text-list-hidden"
						name="<?php echo esc_attr( $name ); ?>"
						type="hidden"
						value="<?php echo esc_attr( wp_json_encode( $values ) ); ?>"
				/>
			</div>
		</div>
	</div>

	<?php

	return ob_get_clean();
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
function update_text_list( $post_id, $values, $name, $sanitization_cb ) {
	if ( empty( $values ) ) {
		return false;
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
function get_text_list_values( $post, $name ) {
	$values = get_post_meta( $post->ID, $name, true );
	return ( ! empty( $values ) ) ? $values : [];
}

/**
 * Function handles building the HTML markup of the list.
 *
 * @param [array]  $list_items An array of items that make up the list.
 * @param [string] $class A class name for the list UL element.
 * @return string Returns the list html markup as a string.
 */
function build_text_list( $list_items, $class ) {
	ob_start();
	?>

	<ul class="<?php echo esc_attr( $class ); ?>">
		<?php foreach ( $list_items as $value ) : ?>
			<li class="text-list-item">
				<span><?php echo esc_html( $value ); ?></span>
				<svg viewBox="0 0 20 20">
					<path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
				</svg>
			</li>
		<?php endforeach; ?>
	</ul>
	<?php

	return ob_get_clean();
}
