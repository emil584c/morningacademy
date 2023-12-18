<?php

namespace MA\App\Handlers\Posts;

use MA\App\Services\CategoryTaxonomyService;
use MA\App\Services\Posts\PostService;
use MA\App\Services\Guides\GuideService;
use Morningtrain\WP\View\View;

class PostSliderViewComposerHandler
{
    public static function register(): void
    {
        static::composeArticlesLoop();
    }

    public static function composeArticlesLoop(): void
    {
        View::composer('post-slider/post-slider', function (\Illuminate\View\View $view) {
            $initialCategory = !empty($view['attributes']['termId']) ? $view['attributes']['termId'] : 0;
            $terms = CategoryTaxonomyService::getCategories($initialCategory);
            $termIds = array_map(fn ($term) => $term->term_id, $terms);

            $posts = PostService::getPostsFromCategory($initialCategory !== 0 ? $initialCategory : []);

            $view->with([
                'posts' => array_map(function ($post) {
                    return PostService::getBlogCardData($post);
                }, $posts['posts']),
                'terms' => $terms,
                'initialActiveTerms' => $initialCategory === 0 ? implode(',', $termIds) : $initialCategory
            ]);
        });

        View::composer('post-slider/post-slide', function (\Illuminate\View\View $view) {
            $post = isset($view['post']) && !empty($view['post']) ? $view['post'] : null;
            $postId = !empty($post) && isset($post['id']) ? $post['id'] : null;

            if (empty($post) || empty($postId)) {
                return;
            }

            $view->with(PostService::getBlogCardData($postId));
        });

    }
}
