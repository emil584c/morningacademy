<?php

use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\RemoveCommentsHandler;

Hook::action('admin_init')
    ->handle([RemoveCommentsHandler::class, 'disableCommentsForPostTypes']);

Hook::filter('comments_open')
    ->returnFalse();

Hook::filter('pings_open')
    ->returnFalse();

Hook::filter('comments_array')
    ->return(fn() => []);

Hook::action('admin_menu')
    ->handle([RemoveCommentsHandler::class, 'removeCommentsPage']);

Hook::action('init')
    ->handle([RemoveCommentsHandler::class, 'removeCommentsLink']);
