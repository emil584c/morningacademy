<?php

namespace MA\App\Handlers\Posts;

use Morningtrain\WP\Facades\Rest;
use Symfony\Component\HttpFoundation\Request;


class PostRestHandler
{

    public static function registerPostRest()
    {
        Rest::namespace('morningtrain/v1')->group(function () {
            Rest::post('post-archive', function (Request $request) {
                $searchArgs = json_decode($request->getContent(), true);
                \wp_send_json(PostArchiveRestEndpointHandler::postArchiveSearch(...$searchArgs));
                exit;
            })
                ->name('post-archive')
                ->public()
                ->expose();
        });
    }
}
