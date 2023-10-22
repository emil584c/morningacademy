<?php

namespace MA\App\Handlers\Guides;

use MA\App\Services\Guides\GuideService;

class RegisterGuidePostTypeHandler
{
    public static function register(): void
    {
        \register_post_type(GuideService::SLUG, [
            'labels' => [
                'name' => __('Guides', 'mf'),
                'singular_name' => __('Guide', 'mf')
            ],
            'public' => true,
            'show_ui' => true,
            'show_in_menu' => true,
            'supports' => array('title', 'thumbnail', 'excerpt', 'editor', 'author'),
            'rewrite' => ['slug' => 'guides'],
            'has_archive' => true,
            'show_in_rest' => true, // Necessary for Gutenberg
            'menu_icon' => 'dashicons-admin-multisite',
            'exclude_from_search' => true,
        ]);
    }
}
