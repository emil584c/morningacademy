<?php

require __DIR__ . "/vendor/autoload.php";

use Morningtrain\WP\ACFHelper\ACFHelper;
use Morningtrain\WP\Blocks\Blocks;
use Morningtrain\WP\Enqueue\Enqueue;
use Morningtrain\WP\Hooks\Hook;
use Morningtrain\WP\Route\Route;
use Morningtrain\WP\View\View;

ACFHelper::registerJsonFolder(__DIR__ . "/resources/acf-fields")->useAsSaveFolder('mf');
Blocks::setup(__DIR__ . "/public/build/blocks");
Enqueue::setup(get_stylesheet_directory_uri() . "/public/build", get_stylesheet_directory() . "/public/build");
Hook::loadDir(__DIR__ . "/hooks");
Route::loadDir(__DIR__ . '/routes');
View::setup(__DIR__ . '/resources/views');

\add_theme_support('menus');
