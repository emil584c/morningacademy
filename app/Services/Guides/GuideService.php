<?php

namespace MA\App\Services\Guides;

use Morningtrain\WP\View\View;
use MA\App\Handlers\Guides\GuideViewComposingHandler;
use MA\App\Services\CategoryTaxonomyService;

class GuideService
{
    public const SLUG = 'guide';
    public const CATEGORY_SLUG = 'guide_categories';
    public const SERIES_SLUG = 'guide_series';

    /**
     * @param ?int[] $terms
     */

    public static function getPublicGuidesForOverview(?array $terms = null): ?array
    {
        $guides = [];

        $args = [
            'post_type' => static::SLUG,
            'order' => 'DSC',
            'post_status' => 'publish',
            'posts_per_page'    => 4,
            'meta_query' => [
                [
                    'key' => 'public',
                    'value' => '1',
                    'compare' => '='
                ]
            ]
        ];

        if ($terms !== null) {
            $args['tax_query'] = [
                [
                    'taxonomy' => self::CATEGORY_SLUG,
                    'field' => 'term_id',
                    'terms' => $terms
                ]
            ];
        }

        $query = new \WP_Query($args);

        if (!empty($query->posts)) {
            foreach ($query->posts as $guide) {
                $src = get_the_post_thumbnail_url($guide->ID);
                $categories = CategoryTaxonomyService::getCategoriesForPost($guide->ID);
                $guides[] = [
                    'src' => $src,
                    'title' => $guide->post_title,
                    'excerpt' => $guide->post_excerpt,
                    'link' => get_post_permalink($guide->ID),
                    'date' => get_the_date('j. F', $guide->ID),
                    'circleColor' => \get_field('background_circle_color', $guide->ID),
                    'fullImage' => \get_field('guide_full_image', $guide->ID),
                    'guide_user' => \get_field('guide_user', $guide->ID),
                    'terms' => !empty($categories) ? array_map(function ($term) {
                        return CategoryTaxonomyService::getCategoryDataForTag($term);
                    }, $categories) : [],
                ];
            }
        }

        return $guides;
    }


    /**
     * @param ?int[] $terms
     */
    public static function getPrivateGuidesForOverview(?array $terms = null): ?array
    {
        $authorGuides = [];

        $args = [
            'post_type' => static::SLUG,
            'order' => 'DSC',
            'post_status' => 'publish',
            'posts_per_page'    => 4,
            'meta_query' => [
                'relation' => 'AND',
                [
                    'key' => 'public',
                    'value' => '1',
                    'compare' => '!='
                ],
                [
                    'key' => 'guide_user',
                    'value' => '"' . get_current_user_id() . '"',
                    'compare' => 'LIKE'
                ]
            ]
        ];

        if ($terms !== null) {
            $args['tax_query'] = [
                [
                    'taxonomy' => self::CATEGORY_SLUG,
                    'field' => 'term_id',
                    'terms' => $terms
                ]
            ];
        }

        $query = new \WP_Query($args);

        if (!empty($query->posts)) {
            foreach ($query->posts as $guide) {
                $src = get_the_post_thumbnail_url($guide->ID);
                $postId = $guide->ID;
                $categories = CategoryTaxonomyService::getCategoriesForPost($postId);
                $authorGuides[] = [
                    'src' => $src,
                    'title' => $guide->post_title,
                    'excerpt' => $guide->post_excerpt,
                    'link' => get_post_permalink($guide->ID),
                    'date' => get_the_date('j. F', $guide->ID),
                    'circleColor' => \get_field('background_circle_color', $guide->ID),
                    'fullImage' => \get_field('guide_full_image', $guide->ID),
                    'guide_user' => \get_field('guide_user', $guide->ID),
                    'terms' => !empty($categories) ? array_map(function ($term) {
                        return CategoryTaxonomyService::getCategoryDataForTag($term);
                    }, $categories) : [],
                ];
            }
        }

        return $authorGuides;
    }

    public static function getTerms(): array|\WP_Error|string
    {
        return get_terms([
            'taxonomy' => 'guide_categories',
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
}
