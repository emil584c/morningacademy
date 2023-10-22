<?php

namespace MA\App\Handlers\Posts;

use Morningtrain\WP\View\View;
use MA\App\Services\Guides\GuideService;
use MA\App\Services\Posts\PostArchiveService;

class PostArchiveViewComposingHandler
{

    public static function registerComposers()
    {
        View::composer('post-archive', function (\Illuminate\View\View $view) {
            $categoryId = is_category() ? \get_queried_object_id() : null;
            $currentPageIndex = $_GET['pageNumber'] ?? 1;
            $postType = $view["attributes"]['type'];
            if ($postType === 'post') {
                $searchPlaceholder = __('Søg blandt nyheder', 'ma');
                $taxFilters = [
                    [
                        'label' => __('Alle kategorier', 'ma'),
                        'taxonomy' => PostArchiveService::CATEGORY_SLUG,
                        'terms' => PostArchiveService::getTermsForFilter()
                    ]
                ];
            } else {
                $searchPlaceholder = __('Søg blandt guides', 'ma');
                $taxFilters = [
                    [
                        'label' => __('Alle kategorier', 'ma'),
                        'taxonomy' => GuideService::CATEGORY_SLUG,
                        'terms' => GuideService::getTermsForFilter()
                    ]
                ];
            }

            $view->with([
                'postType' => $postType,
                'taxFilters' => $taxFilters,
                'years' => PostArchiveService::getPostsYears($postType),
                'currentCategory' => $categoryId,
                'currentPageIndex' => $currentPageIndex,
                'searchPlaceholder' => $searchPlaceholder,
            ]);
        });
    }
}
