<?php

namespace MA\App\Services;

class PostSearchService
{
    /**
     * Callback for post search endpoint
     *
     * @param  \WP_REST_Request  $request
     * @return \WP_REST_Response
     */
    public static function postSearchCallback(\WP_REST_Request $request): \WP_REST_Response
    {
        $data = json_decode($request->get_body(), true);

        $results = [];

        $search = $data['search'] ?? '';
        $postType = $data['postType'] ?? ['page', 'post'];
        $type = $data['type'] ?? 'default';
        $exclude = $data['exclude'] ?? [];

        if (!empty($search)) {
            $results = self::search($search, $postType, $exclude, $type);
        }

        return new \WP_REST_Response(['results' => $results]);
    }

    /**
     * Search for posts
     *
     * @param  string  $s
     * @param  string|array  $postType
     * @return array
     */
    public static function search(string $s, string|array $postType = ['page', 'post'], array $exclude = [], string $type = 'default'): array
    {
        $args = [
            'post_type' => $postType,
            'post_status' => 'publish',
            's' => $s,
            'posts_per_page' => -1,
            'fields' => 'ids',
            'suppress_filters' => false
        ];

        if (!empty($exclude)) {
            $args['post__not_in'] = $exclude;
        }

        $query = new \WP_Query($args);

        $postIds = $query->get_posts();

        return array_map(function ($postId) use ($type) {
            return match ($type) {
                default => self::getPostData($postId)
            };
        }, $postIds);
    }

    /**
     * Get data for post
     *
     * @param  int  $postId
     * @return array
     */
    public static function getPostData(int $postId): array
    {
        return [
            'id' => $postId,
            'title' => html_entity_decode(\get_the_title($postId)),
            'permalink' => \get_the_permalink($postId)
        ];
    }
}
