<?php
namespace OMG\Fields;

if ( ! defined('ABSPATH') ) {
	exit;
}

function register_specification_field( $post, $name, $label, $args = [], $width = '50%' ) {
	$values = get_text_list_values( $post, $name );
	ob_start(); ?>

	<div class="row-wrapper table-list">
		<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
			<p><?php echo esc_html( $args['description'] ); ?></p>
		<?php endif; ?>
		<?php echo build_specification_list( $values, 'table-list-list', $args ); ?>
		<div class="text-list-wrapper">
			<label for="<?php echo esc_attr( $name ); ?>">
				<?php echo esc_html( $label ); ?>
			</label>
			<input
					class="table-list-key"
					type="text"
					style="width: <?php echo esc_attr( $width ); ?>;"
			/>
			<input
					class="table-list-value"
					type="text"
					style="width: <?php echo esc_attr( $width ); ?>;"
			/>
			<button class="button button-primary table-list-add"><?php esc_html_e( 'Add', 'omg-fields' ); ?></button>
			<input
					class="table-list-hidden"
					name="<?php echo esc_attr( $name ); ?>"
					type="hidden"
					value="<?php echo esc_attr( wp_json_encode( $values ) ); ?>"
			/>
		</div>
	</div>

	<?php
}

function build_specification_list( $list_items, $class, $args ) {
	ob_start();
	?>

	<?php if ( isset( $args['headings'] ) && ! empty( $args['headings'] ) ) : ?>
		<div class="table-list-header">
			<span class="table-list-heading">
				<?php echo esc_html( $args['headings']['column_one'] ); ?>
			</span>
			<span class="table-list-heading">
				<?php echo esc_html( $args['headings']['column_two'] ); ?>
			</span>
			<span class="table-list-heading-spacer"></span>
		</div>
	<?php endif; ?>
	<ul class="<?php echo esc_attr( $class ); ?>">
		<?php foreach ( $list_items as $item ) : ?>
			<li class="text-list-item table-list-item">
				<span class="table-list-key"><?php echo esc_html( $item->key ); ?></span>
				<span class="table-list-value"><?php echo esc_html( $item->value ); ?></span>
				<svg viewBox="0 0 20 20">
					<path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
				</svg>
			</li>
		<?php endforeach; ?>
	</ul>
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
function update_table_list( $post_id, $values, $name, $sanitization_cb ) {
	if ( empty( $values ) ) {
		update_post_meta( $post_id, $name, $values );
	}

	$values = json_decode( $values );

	if ( ! is_array( $values ) ) {
		return false;
	}

	if ( is_callable( $sanitization_cb ) ) {
		$values = array_map( $sanitization_cb, $values );
	}

	update_post_meta( $post_id, $name, $values );
}
