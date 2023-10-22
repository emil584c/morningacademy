<?php

namespace MA\App\Services\Posts;

class PostArchiveService
{
    public const CATEGORY_SLUG = 'category';

    public static function getTerms(): array|\WP_Error|string
    {
        return get_terms([
            'taxonomy' => 'category',
            'hide_empty' => true,
        ]);
    }

    public static function getTermsForFilter(): array
    {
        $terms = static::getTerms();

        if (empty($terms)) {
            return [];
        }

        $termArray = [];

        foreach ($terms as $term) {
            $termArray[] = [
                'id' => $term->term_id,
                'name' => $term->name,
                'slug' => $term->slug,
            ];
        }

        return $termArray;
    }

    public static function getNewsDate(int $postId): string
    {
        if (empty($postId)) {
            return '';
        }

        return \get_the_date('j. F Y', $postId);
    }

    public static function getPostsYears($type = 'post'): array
    {
        global $wpdb;
        $result = [];
        $years = $wpdb->get_results(
            "SELECT YEAR(post_date) FROM {$wpdb->posts} WHERE post_status = 'publish' AND wp_posts.post_type = '{$type}' GROUP BY YEAR(post_date) ORDER BY post_date ASC",
            ARRAY_N
        );
        if (is_array($years) && count($years) > 0) {
            foreach ($years as $year) {
                $result[] = $year[0];
            }
        }

        return $result;
    }
}
