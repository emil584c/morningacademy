<?php

namespace MA\App\Services\Posts;

use MA\App\Services\ImageService;
use Morningtrain\WP\View\View;
use MA\App\Services\CategoryTaxonomyService;


class PostService
{
    public const SLUG = 'post';

    /**
     * Get post data for the cover block.
     *
     * @param  int|string|\WP_Post  $post
     * @param  bool  $showPermalink
     * @return array
     */
    public static function getBlogCoverData(int|string|\WP_Post $post, bool $showPermalink = false): array
    {
        if (!is_a($post, \WP_Post::class)) {
            $post = get_post((int) $post);
        }

        $postId = $post->ID;
        $category = CategoryTaxonomyService::getFirstCategoryForPost($postId);
        $src = get_the_post_thumbnail_url($guide->ID);
        $categories = CategoryTaxonomyService::getCategoriesForPost($postId);
        $series = CategoryTaxonomyService::getFirstSeriesForPost($postId);

        return [
            'src' => $src,
            'title' => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'link' => get_post_permalink($postId),
            'date' => get_the_date('j. F', $postId),
            'circleColor' => \get_field('taxonomy_color', $series),
            'fullImage' => \get_field('guide_full_image', $postId),
            'guide_user' => \get_field('guide_user', $postId),
            'terms' => !empty($categories) ? array_map(function ($term) {
                return CategoryTaxonomyService::getCategoryDataForTag($term);
            }, $categories) : [],
            'series' => $series,
            'termCount' => get_term($series),
        ];
    }

    public static function getBlogCardData(int|string|\WP_Post $post): array
    {
        if (!is_a($post, \WP_Post::class)) {
            $post = get_post((int) $post);
        }

        $postId = $post->ID;
        $category = CategoryTaxonomyService::getFirstCategoryForPost($postId);
        $src = get_the_post_thumbnail_url($postId);
        $categories = CategoryTaxonomyService::getCategoriesForPost($postId);
        $series = CategoryTaxonomyService::getFirstSeriesForPost($postId);

        return [
            'src' => $src,
            'title' => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'link' => get_post_permalink($postId),
            'date' => get_the_date('j. F', $postId),
            'circleColor' => \get_field('taxonomy_color', $series),
            'fullImage' => \get_field('guide_full_image', $postId),
            'guide_user' => \get_field('guide_user', $postId),
            'terms' => !empty($categories) ? array_map(function ($term) {
                return CategoryTaxonomyService::getCategoryDataForTag($term);
            }, $categories) : [],
            'series' => $series,
            'termCount' => get_term($series),
        ];
    }

    public static function getPostsFromCategory(int|array $categories = [], int $postsPerPage = -1, int $paged = 1, array $excludedPosts = []): array
    {
        $args = [
            'post_type' => 'guide',
            'post_status' => ['publish'],
            'suppress_filters' => false, // for wpml
            'posts_per_page' => $postsPerPage,
            'orderby' => 'menu_order',
            'order' => 'DESC',
            'paged' => $paged,
            'post__not_in' => array(get_the_ID())
        ];

        if (!empty($categories)) {
            $args['tax_query'] = [
                [
                    'taxonomy' => 'guide_categories',
                    'field' => 'term_id',
                    'terms' => $categories
                ],
            ];
        }

        if (!empty($excludedPosts)) {
            $args['post__not_in'] = $excludedPosts;
        }

        $query = new \WP_Query($args);

        return [
            'posts' => $query->get_posts(),
            'totalPages' => (int) ceil($query->found_posts / $postsPerPage),
        ];
    }

    public static function getLatestPostId(?int $categoryID = null): ?int
    {
        $args = [
            'post_type' => 'guide',
            'status' => 'publish',
            'suppress_filters' => false,
            'posts_per_page' => 1,
            'orderby' => 'menu_order',
            'order' => 'DESC',
        ];

        if (!empty($categoryID)) {
            $args['tax_query'] = [[
                'taxonomy' => CategoryTaxonomyService::$slug,
                'field' => 'term_id',
                'terms' => $categoryID
            ]];
        }

        $latestPost = get_posts($args);

        if (empty($latestPost)) {
            return null;
        }

        return (int) $latestPost[0]->ID;
    }

    /**
     * Callback for Articles Slider
     *
     * @return void
     */
    public static function filterArticles(): void
    {
        $term_ids = [];
        if ($_POST['termId']) {
            $term_ids = explode(',', \sanitize_text_field($_POST['termId']));
        }
        $allPosts = static::getPostsFromCategory($term_ids);

        $articles = array_map(function ($post) {
            return static::getBlogCardData($post);
        }, $allPosts['posts']);

        \ob_start();
        echo "<div class='swiper'><div class='swiper-wrapper'>";
        foreach ($articles as $article) {
            echo View::render('guides/guide-card', $article);
        }
        echo "</div></div>";

        $markup = \ob_get_clean();

        wp_send_json(
            [
                'markup' => $markup,
            ]
        );

        exit();
    }
}
