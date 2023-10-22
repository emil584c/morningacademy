@php
/**
* @var array $taxFilters
* @var string $postType
* @var int|null $currentCategory
* @var array $years
* @var string $currentPageIndex
* @var string searchPlaceholder
*/

$taxQuery = [];

if(!empty($currentCategory)) {
$taxQuery['category'] = [$currentCategory];
}

@endphp

@react('PostArchive', [
'postType' => $postType,
'taxFilters' => $taxFilters,
'taxQuery' => $taxQuery,
'years' => $years,
'currentPageIndex' => (int) $currentPageIndex,
'texts' => [
'totalPosts' => __('indlæg fundet', 'ma'),
'errorMessage' => __('Ingen indlæg fundet', 'ma'),
'searchPlaceholder' => $searchPlaceholder
]
])