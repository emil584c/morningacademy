<?php

use Morningtrain\WP\Hooks\Hook;
use MA\App\Handlers\Setup\SetupThemeHandler;

// Load main.js and main.css
Hook::action('wp_enqueue_scripts', [SetupThemeHandler::class, 'enqueueMain']);
Hook::action('login_head', [SetupThemeHandler::class, 'enqueueLoginPage']);
Hook::action('admin_enqueue_scripts', [SetupThemeHandler::class, 'enqueueAdmin']);

// Register Menus
Hook::action('init', [SetupThemeHandler::class, 'register']);

Hook::action('admin_bar_menu')
    ->priority(11)
    ->handle([SetupThemeHandler::class, 'removeAdminBarWordPressLogo']);

Hook::action('admin_bar_menu')
    ->priority(11)
    ->handle([SetupThemeHandler::class, 'addProjectAdminBarMenuItem']);

Hook::action('acf/init',  [SetupThemeHandler::class, 'registerAcfOptionsPage']);

Hook::action('enqueue_block_editor_assets')
    ->handle([SetupThemeHandler::class, 'enqueueBlockEditorAssets']);

Hook::action('after_setup_theme')
    ->handle([SetupThemeHandler::class, 'addThemeSupport']);

Hook::filter('upload_mimes')
    ->return([SetupThemeHandler::class, 'addSvgUploadSupport']);

Hook::filter('block_categories_all')
    ->return([SetupThemeHandler::class, 'addBlockCategories']);

Hook::action('wp_footer')
    ->handle(function () {
        echo '<div class="dark-mode-animation-background"></div>';
    });
