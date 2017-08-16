<?php
namespace OMG\Fields;

function register_select( $post, $slug, $label, $description, $options, $show_empty = true ) {
  $value = get_post_meta( $post->ID, $slug, true );
  ob_start(); ?>

  <div class="admin-row">
        <label class="input__label" for="<?php echo esc_attr( $slug ); ?>">
            <?php echo esc_html( $label ); ?>
        </label>
        <div id="taxonomy-select" class="row-wrapper taxonomy-select">
            <p class="row-wrapper-description"><?php echo esc_html( $description ); ?></p>
            <select id="taxonomy-select-list" name="<?php echo esc_attr( $slug ); ?>" class="board-members-select">
                <?php if ( true === $show_empty ) : ?>
                <option value=""></option>
                <?php endif; ?>
                <?php foreach( $options as $option ) :?>
                    <option value="<?php echo esc_attr( $option[ 'id' ] ); ?>" <?php selected( $value, $option[ 'id' ] ); ?>>
                        <?php echo esc_html( $option[ 'name' ] ); ?>
                    </option>
                <?php endforeach; ?>
            </select>
        </div>
    </div>

  <?php return ob_get_clean();
}
