<?php

use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\Guides\RegisterGuidePostTypeHandler;
use MA\App\Handlers\Guides\RegisterGuideTaxonomiesHandler;

Hook::action('init')
    ->handle([RegisterGuidePostTypeHandler::class, 'register']);

Hook::action('init')
    ->handle([RegisterGuideTaxonomiesHandler::class, 'register']);
