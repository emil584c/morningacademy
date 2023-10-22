<?php

namespace MA\App\Services;

class RestService
{
    // Namespace
    public const NAMESPACE = 'ma/v1';

    // Endpoints
    public const POST_SEARCH_ENDPOINT = 'posts-search';

    public static function getPostSearchEndpoint(): string
    {
        return \rest_url(static::NAMESPACE . '/' . static::POST_SEARCH_ENDPOINT);
    }
}
