<?php
/**
 * File bootstraps all of the file inside the include directory.
 *
 * @package WordPress.
 */

if ( ! defined('ABSPATH') ) {
	exit;
}

require_once  'enqueue.php';

require_once  'fields/autosuggest-list.php';
require_once  'fields/autosuggest.php';
require_once  'fields/checkbox.php';
require_once  'fields/color-picker.php';
require_once  'fields/datepicker.php';
require_once  'fields/editor.php';
require_once  'fields/gallery.php';
require_once  'fields/image-upload.php';
require_once  'fields/radio.php';
require_once  'fields/select.php';
require_once  'fields/table-list.php';
require_once  'fields/text-list.php';
require_once  'fields/text.php';
require_once  'fields/textarea.php';
