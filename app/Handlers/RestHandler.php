<?php

namespace MA\App\Handlers;

use MA\App\Services\RestService;
use MA\App\Services\PostSearchService;

class RestHandler
{
    public static function registerRestRoutes(): void
    {
        \register_rest_route(RestService::NAMESPACE, RestService::POST_SEARCH_ENDPOINT, [
            'methods' => 'POST',
            'callback' => [PostSearchService::class, 'postSearchCallback'],
            'permission_callback' => '__return_true',
        ]);
    }
}
