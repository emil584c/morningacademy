<?php

namespace MA\App\Services;

class TaxonomyLabelService
{
    public static function getLabels(string $singular, string $plural, string $textDomain = 'ma'): array
    {
        return [
            'name'                       => _x($plural, $textDomain),
            'singular_name'              => _x($singular, $textDomain),
            'menu_name'                  => __($singular, $textDomain),
            'all_items'                  => __("All {$plural}", $textDomain),
            'parent_item'                => __("Parent {$singular}", $textDomain),
            'parent_item_colon'          => __("Parent {$singular}:", $textDomain),
            'new_item_name'              => __("New {$singular} Name", $textDomain),
            'add_new_item'               => __("Add New {$singular}", $textDomain),
            'edit_item'                  => __("Edit {$singular}", $textDomain),
            'update_item'                => __("Update {$singular}", $textDomain),
            'view_item'                  => __("View {$singular}", $textDomain),
            'separate_items_with_commas' => __("Separate {$plural} with commas", $textDomain),
            'add_or_remove_items'        => __("Add or remove {$plural}", $textDomain),
            'choose_from_most_used'      => __('Choose from the most used', $textDomain),
            'popular_items'              => __("Popular {$plural}", $textDomain),
            'search_items'               => __("Search {$plural}", $textDomain),
            'not_found'                  => __('Not Found', $textDomain),
            'no_terms'                   => __("No {$plural}", $textDomain),
            'items_list'                 => __("{$plural} list", $textDomain),
            'items_list_navigation'      => __("{$plural} list navigation", $textDomain),
        ];
    }
}
