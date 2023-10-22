<?php

use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\UserRedirectHandler;

Hook::action('template_redirect')
    ->handle([UserRedirectHandler::class, 'privateGuidesUserRedirect']);
