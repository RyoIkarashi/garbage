<?php
add_filter('json_query_vars', function ($vars) {
    $vars[] = 'date_query';
    return $vars;
});
