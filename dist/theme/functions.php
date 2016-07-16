<?php
add_theme_support( 'post-thumbnails' );

// Add Featured Image to WP-API JSON response
function my_rest_prepare_post( $data, $post, $request ) {
	$_data = $data->data;
	$thumbnail_id = get_post_thumbnail_id( $post->ID );
	$thumbnail = wp_get_attachment_image_src( $thumbnail_id, 'full' );
	$_data['featured_image'] = $thumbnail[0];

	$data->data = $_data;
	return $data;
}
add_filter( 'rest_prepare_post', 'my_rest_prepare_post', 10, 3 );

add_filter('json_query_vars', function ($vars) {
    $vars[] = 'date_query';
    return $vars;
});
