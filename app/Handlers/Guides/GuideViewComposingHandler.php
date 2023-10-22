<?php

namespace MA\App\Handlers\Guides;

use Morningtrain\WP\View\View;
use MA\App\Services\Guides\GuideService;
use MA\App\Services\CategoryTaxonomyService;

class GuideViewComposingHandler
{
    public static function register()
    {
        static::composeGuideOverview();
        static::composeFrontPageCover();
        static::composeGuidePostCover();
    }

    public static function composeGuideOverview(): void
    {
        View::composer('guides/guide-overview', function (\Illuminate\View\View $view) {
            $termId = !empty($view['termId']) ? $view['termId'] : null;
            $guides = GuideService::getPublicGuidesForOverview($termId);
            $authorGuides = GuideService::getPrivateGuidesForOverview($termId);
            $view->with([
                'guides' => $guides,
                'authorGuides' => $authorGuides,
                'archiveUrl' => \get_field('guide_archive_url', 'option')
            ]);
        });
    }

    public static function composeGuidePostCover(): void
    {
        View::composer('guides/guide-cover', function (\Illuminate\View\View $view) {
            $termId = !empty($view['termId']) ? $view['termId'] : 0;
            $view->with([
                'src' => get_the_post_thumbnail_url(),
                'title' => get_the_title(),
                'date' => get_the_date(),
                'video' => \get_field('guide_video'),
                'description' => \get_field('guide_description'),
            ]);
        });
    }


    public static function composeFrontPageCover(): void
    {
        View::composer('covers/frontpage-cover', function (\Illuminate\View\View $view) {
            $view->with([
                'user' => wp_get_current_user(),
            ]);
        });
    }

    public static function getCategories(int|string $parentCategory = 0): array|\WP_Error|string
    {
        return get_terms([
            'taxonomy' => 'category',
            'hide_empty' => true,
            'parent' => $parentCategory,
            'exclude' => [1] // Exclude "Uncategorized"
        ]);
    }

    public static function formatDateLongForm($input, $showYear = true)
    {
        $date = strtotime($input);
        $monthNames = [
            'January'   => 'januar',
            'February'  => 'februar',
            'March'     => 'marts',
            'April'     => 'april',
            'May'       => 'maj',
            'June'      => 'juni',
            'July'      => 'juli',
            'August'    => 'august',
            'September' => 'september',
            'October'   => 'oktober',
            'November'  => 'november',
            'December'  => 'december'
        ];
        $englishMonth = date('F', $date);
        $danishMonth = $monthNames[$englishMonth];
        $formatted_date = date('j. ', $date) . $danishMonth . date($showYear ? ' Y' : '', $date);
        return $formatted_date;
    }
}
