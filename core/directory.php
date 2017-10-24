<?php
namespace OMG\Fields\Directory;

function local_url($relative_path, $plugin_path) {
	$template_dir = get_template_directory();
	foreach ( array( 'template_dir', 'plugin_path' ) as $var ) {
		$$var = str_replace( '\\', '/', $$var ); // sanitize for Win32 installs
		$$var = preg_replace( '|/+|', '/', $$var );
	}
	if ( 0 === strpos( $plugin_path, $template_dir ) ) {
		$url = get_template_directory_uri();
		$folder = str_replace( $template_dir, '', dirname( $plugin_path ) );
		if ( '.' != $folder ) {
			$url .= '/' . ltrim( $folder, '/' );
		}
		if ( !empty( $relative_path ) && is_string( $relative_path ) && strpos( $relative_path, '..' ) === false ) {
			$url .= '/' . ltrim( $relative_path, '/' );
		}
		return $url;
	} else {
		return plugins_url( $relative_path, $plugin_path );
	}
}