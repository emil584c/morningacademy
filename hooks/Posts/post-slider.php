<?php

use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\Posts\PostSliderViewComposerHandler;

Hook::action('init')
    ->handle([PostSliderViewComposerHandler::class, 'register']);