<?php

use Morningtrain\WP\View\View;
use MA\App\Handlers\Setup\SetupThemeHandler;

View::composer('header', function (\Illuminate\View\View $view) {
    $view->with([
        'logo' => View::render('logo'),
        'logoUrl' => \home_url(),
        'loginUrl' => \get_field('login_page_url', 'option'),
        'logoutUrl' => \get_field('logout_page_url', 'option'),
        'profilePageUrl' => \get_field('profile_page_url', 'option'),
        'heartUrl' => \get_field('heart_page_url', 'option'),
        'user' => wp_get_current_user(),
        'menu' => \wp_nav_menu([
            'echo' => false,
            'container' => false,
            'theme_location' => SetupThemeHandler::THEME_PRIM_MENU_LOCATION,
            'menu_class' => 'mt-header__menu',
            'depth' => 1 // Remove submenus
        ]),
        'menuSecondary' => \wp_nav_menu([
            'echo' => false,
            'container' => false,
            'theme_location' => SetupThemeHandler::THEME_SEC_MENU_LOCATION,
            'menu_class' => 'mt-header__menu mt-header__menu--secondary',
            'depth' => 1 // Remove submenus
        ])
    ]);
});
