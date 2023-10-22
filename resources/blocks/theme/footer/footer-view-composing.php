<?php

use Morningtrain\WP\View\View;
use MA\App\Handlers\Setup\SetupThemeHandler;

View::composer('footer', function (\Illuminate\View\View $view) {

    $footerOptions = \get_field('footerOptions', 'option');

    if (!empty($footerOptions)) {
        foreach ($footerOptions as $key => $value) {
            if ($key === 'copyrightLine') {
                $value = \str_replace('::year::', \date('Y'), $value);
            }
            $view->with($key, $value);
        }
    }

    $view->with([
        'logo' => View::render('mt-logo', ['isWhite' => true]),
        'logoUrl' => \home_url(),
        'menu' => \wp_nav_menu([
            'echo' => false,
            'container' => false,
            'theme_location' => SetupThemeHandler::THEME_FOOTER_MENU_LOCATION,
            'menu_class' => 'mt-footer__main-menu',
            'depth' => 2
        ]),
        'bottomMenu' => \wp_nav_menu([
            'echo' => false,
            'container' => false,
            'theme_location' => SetupThemeHandler::THEME_FOOTER_BOTTOM_MENU_LOCATION,
            'menu_class' => 'mt-footer__bottom-menu',
            'depth' => 1
        ])
    ]);
});
