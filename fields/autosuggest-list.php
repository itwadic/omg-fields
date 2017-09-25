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
function register_autosuggest_list_field( $post, $name, $label, $args = [], $width = '100%' ) {
	$placeholder = ( isset( $args[ 'placeholder' ] ) ) ? $args[ 'placeholder' ] : '';
	$values = get_autosuggest_list_values( $post, $name );
	ob_start();
	?>
	<div class="admin-row">
		<label class="input__label" for="<?php echo esc_attr( $name ); ?>">
			<?php esc_html_e( $label ) ?>
		</label>
		<div class="row-wrapper autosuggest-list">
			<?php if ( isset( $args['description'] ) && ! empty( $args['description'] ) ) : ?>
				<p class="admin-row-description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
			<?php echo build_autosuggest_list( $values, 'autosuggest-list-list' ); ?>
			<div class="autosuggest-list-wrapper">
				<input
					class="input__field autosuggest-list-input"
					placeholder="<?php echo esc_attr( $placeholder ); ?>"
					type="text"
					style="width: <?php echo esc_attr( $width ); ?>;"
					list="<?php echo esc_attr( $name ); ?>"
				/>
				<div class="autosuggest-spinner"></div>
				<datalist id="<?php echo esc_attr( $name ); ?>"></datalist>
				<input
					class="input__field autosuggest-list-hidden"
					name="<?php echo esc_attr( $name ); ?>"
					type="hidden"
					value="<?php echo esc_attr( json_encode( $values ) ); ?>"
				/>
			</div>
		</div>
	</div>

	<?php return ob_get_clean();
}

function update_autosugggest_list( $post_id, $values, $name ) {
	if ( empty( $values ) ) {
		return false;
	}

	$values = json_decode( stripslashes( $values ) );

	if ( ! is_array( $values ) ) {
		return false;
	}

	$values = array_map( function( $value ) {
		return absint( $value->id );
	}, $values );

	update_post_meta( $post_id, $name, $values );
}

function get_autosuggest_list_values( $post, $name ) {
	$values = get_post_meta( $post->ID, $name, true );

	if ( empty( $values ) ) {
		return [];
	}

	return array_map( function( $value ) {
		return [
			'id'    =>  $value,
			'title' =>  get_the_title( $value )
		];
	}, $values );
}

function build_autosuggest_list( $listItems, $class ) {
	ob_start(); ?>
	<ul class="<?php echo esc_attr( $class ); ?>">
		<?php foreach( $listItems as $value ) : ?>
			<li class=text-list-item data-id="<?php echo esc_attr( $value['id'] ); ?>">
				<span><?php echo esc_html( $value['title'] ); ?></span>
				<svg viewBox="0 0 20 20">
					<path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
				</svg>
			</li>
		<?php endforeach; ?>
	</ul>
	<?php return ob_get_clean();
}