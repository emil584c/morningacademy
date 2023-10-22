<?php


namespace MA\App\Handlers\Posts;


use MA\App\Services\ImageService;
use MA\App\Services\Posts\PostArchiveService;

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
    public static function search(string $searchString = '', string $postType = 'post', int $page = 1, int $postsPerPage = 7, array $taxQuery = [], string $year = ''): array
    {

        $args = [
            'post_type' => $postType,
            'posts_per_page' => $postsPerPage,
            'paged' => $page,
            'suppress_filters' => false
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
            'posts' => $query->get_posts(),
            'totalPosts' => $totalPosts,
            'totalPages' => $totalPages
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
    public static function postArchiveSearch(string $searchString = '', string $postType = 'post', int $page = 1, int $postsPerPage = 7, array $taxQuery = [], string $year = ''): array
    {
        $searchResults = static::search($searchString, $postType, $page, $postsPerPage, $taxQuery, $year);

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

        return [
            'id' => $post->ID,
            'cls' => $cardCls ?? '',
            'permalink' => \get_the_permalink($post->ID),
            'title' => $post->post_title,
            'excerpt' => $post->post_excerpt,
            'video' => \get_field('post_video', $post->ID),
            'imageSrc' => ImageService::fromId(get_post_thumbnail_id($post->ID), 'mt600'),
            'date' => PostArchiveService::getNewsDate($post->ID),
        ];
    }
}
