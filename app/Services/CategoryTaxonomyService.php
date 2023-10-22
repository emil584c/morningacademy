<?php

namespace MA\App\Services;

class CategoryTaxonomyService
{
    public static string $slug = 'guide_categories';

    public static function getCategoriesForPost(int|string $postId): array
    {
        $terms = \get_the_terms($postId, static::$slug);

        if (\is_wp_error($terms) || empty($terms)) {
            return [];
        }

        return $terms;
    }

    public static function getFirstCategoryForPost(int|string $postId): ?\WP_Term
    {
        $terms = static::getCategoriesForPost($postId);

        if (empty($terms)) {
            return null;
        }

        return $terms[0];
    }

    public static function getCategories(int|string $parentCategory = 0): array|\WP_Error|string
    {
        return get_terms([
            'taxonomy' => static::$slug,
            'hide_empty' => true,
            'parent' => $parentCategory,
            'exclude' => [1] // Exclude "Uncategorized"
        ]);
    }

    public static function getCategoryDataForTag(?\WP_Term $term): array
    {
        if (empty($term)) {
            return [];
        }

        return [
            'text' => $term->name,
            'color' => \get_field('taxonomy_color', $term),
            'url' => \get_term_link($term)
        ];
    }
}
