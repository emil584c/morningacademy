<?php


use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\Guides\GuideViewComposingHandler;

Hook::action('init')
    ->handle([GuideViewComposingHandler::class, 'register']);
