@php
    /**
     * @var array $taxFilters
     * @var array $seriesFilters
     * @var string $postType
     * @var int|null $currentCategory
     * @var array $years
     * @var string $currentPageIndex
     * @var string searchPlaceholder
     */

    $taxQuery = [];

    if (!empty($currentCategory)) {
        $taxQuery['category'] = [$currentCategory];
    }
@endphp

@react('PostArchive', [
    'postType' => $postType,
    'taxFilters' => $taxFilters,
    'seriesFilters' => $seriesFilters,
    'taxQuery' => $taxQuery,
    'years' => $years,
    'currentPageIndex' => (int) $currentPageIndex,
    'texts' => [
        'totalPosts' => __('indlæg fundet', 'ma'),
        'errorMessage' => __('Ingen indlæg fundet', 'ma'),
        'searchPlaceholder' => $searchPlaceholder,
    ],
    'userId' => get_current_user_id(),
])
