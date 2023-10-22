<?php

use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\Posts\PostArchiveViewComposingHandler;
use MA\App\Handlers\Posts\PostRestHandler;

Hook::action('init')
    ->handle([PostArchiveViewComposingHandler::class, 'registerComposers']);

Hook::action('init')
    ->handle([PostRestHandler::class, 'registerPostRest']);
