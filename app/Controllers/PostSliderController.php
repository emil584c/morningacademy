<?php

namespace MA\App\Controllers;

use MA\App\Services\CategoryTaxonomyService;
use Morningtrain\WP\View\View;
use MA\App\Services\Posts\PostService;
use Symfony\Component\HttpFoundation\Request;

class PostSliderController
{
    public function __invoke(Request $request)
    {
        $requestContent = json_decode($request->getContent(), true);
        $termId = $requestContent['termId'];

        $allPosts = PostService::getPostsFromCategory((int)$termId);

        $articles = array_map(function ($post) {
            return PostService::getBlogCardData($post);
        }, $allPosts['posts']);

        $markup = "<div class='swiper'><div class='swiper-wrapper'>";
        foreach ($articles as $article) {
            $markup .= View::render('guides/guide-card', $article);
        }
        $markup .= "</div></div>";

        wp_send_json(
            [
                'markup' => $markup,
            ]
        );
        exit;
    }
}
