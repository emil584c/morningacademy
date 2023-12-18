<?php


namespace MA\App\Handlers\Posts;


use MA\App\Services\ImageService;
use MA\App\Services\Posts\PostArchiveService;
use MA\App\Services\CategoryTaxonomyService;

class PostArchiveRestEndpointHandler
{

    /**
     * Search
     *
     * @param  string  $searchString
     * @param  string  $postType
     * @param  int  $page
     * @param  int  $postsPerPage
     * @param  array  $taxQuery
     * @return array
     */
    public static function search(string $searchString = '', string $postType = 'post', int $page = 1, int $postsPerPage = 7, array $taxQuery = [], string $year = '',  $currentUserId = 0): array
    {
        $args = [
            'post_type' => $postType,
            'posts_per_page' => $postsPerPage,
            'paged' => $page,
            'orderby' => 'menu_order',
            'order' => 'DESC',
            'suppress_filters' => false,
            'meta_query' => [
                'relation' => 'OR',
                [
                    'key' => 'public',
                    'value' => '1',
                    'compare' => '='
                ],
                [
                    'key' => 'guide_user',
                    'value' => '"' . $currentUserId . '"',
                    'compare' => 'LIKE'
                ]
            ]
        ];

        if (!empty($searchString)) {
            $args['s'] = $searchString;
        }

        if (!empty($taxQuery)) {
            $args['tax_query'] = [];

            if (count($taxQuery) > 1) {
                $args['tax_query']['relation'] = 'AND';
            }

            foreach ($taxQuery as $taxonomy => $terms) {
                $args['tax_query'][] = [
                    'taxonomy' => $taxonomy,
                    'field' => 'term_id',
                    'terms' => $terms
                ];
            }
        }

        if (!empty($year)) {
            $args['date_query'] = [
                ['year' => $year]
            ];
        }

        $query = new \WP_Query($args);
        $totalPosts = $query->found_posts;
        $totalPages = ceil($totalPosts / $postsPerPage);

        return [
            'currentUser' => $currentUserId,
            'posts' => $query->get_posts(),
            'totalPosts' => $totalPosts,
            'totalPages' => $totalPages,
        ];
    }

    /**
     * Search for post archive
     *
     * @param  string  $searchString
     * @param  string  $postType
     * @param  int  $page
     * @param  int  $postsPerPage
     * @param  array  $taxQuery
     * @return array
     */
    public static function postArchiveSearch(string $searchString = '', string $postType = 'post', int $page = 1, int $postsPerPage = 8, array $taxQuery = [], string $year = '', $userId = 0): array
    {
        $currentUserId = $userId;

        $searchResults = static::search($searchString, $postType, $page, $postsPerPage, $taxQuery, $year, $currentUserId);

        $searchResults['posts'] = array_map(function (\WP_Post $post) {
            return static::getPostCardData($post);
        }, $searchResults['posts']);

        return $searchResults;
    }

    /**
     * Get card data from product
     *
     * @param  \WP_Post  $post
     * @param  string  $cardCls
     * @return array
     */
    public static function getPostCardData(\WP_Post $post, string $cardCls = ''): array
    {
        if (empty($post)) {
            return [];
        }

        $src = get_the_post_thumbnail_url($post->ID);
        $categories = CategoryTaxonomyService::getCategoriesForPost($post->ID);
        $series = CategoryTaxonomyService::getFirstSeriesForPost($post->ID);

        return [
            'image' => $src,
            'title' => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'link' => get_post_permalink($post->ID),
            'date' => get_the_date('j. F', $post->ID),
            'circleColor' => \get_field('taxonomy_color', $series),
            'fullImage' => \get_field('guide_full_image', $post->ID),
            'guide_user' => \get_field('guide_user', $post->ID),
            'terms' => !empty($categories) ? array_map(function ($term) {
                return CategoryTaxonomyService::getCategoryDataForTag($term);
            }, $categories) : [],
            'series' => $series,
        ];
    }
}
