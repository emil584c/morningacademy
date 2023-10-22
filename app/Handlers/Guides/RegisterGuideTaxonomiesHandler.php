<?php

namespace MA\App\Handlers\Guides;

use MA\App\Services\Guides\GuideService;
use MA\App\Services\TaxonomyLabelService;

class RegisterGuideTaxonomiesHandler
{
    public static function register(): void
    {
        \register_taxonomy(GuideService::CATEGORY_SLUG, GuideService::SLUG, array(
            'hierarchical' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'update_count_callback' => '_update_post_term_count',
            'query_var' => true,
            'labels' => TaxonomyLabelService::getLabels('Kategori', 'Kategorier')
        ));

        \register_taxonomy(GuideService::SERIES_SLUG, GuideService::SLUG, array(
            'hierarchical' => true,
            'show_ui' => true,
            'show_in_rest' => true,
            'show_admin_column' => true,
            'update_count_callback' => '_update_post_term_count',
            'query_var' => true,
            'labels' => TaxonomyLabelService::getLabels('Serie', 'Serier')
        ));
    }
}
