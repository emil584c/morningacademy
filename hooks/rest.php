<?php

namespace MA\App\Hooks;

use MA\App\Handlers\RestHandler;
use Morningtrain\WP\Hooks\Hook;

Hook::action('rest_api_init', [RestHandler::class, 'registerRestRoutes']);
