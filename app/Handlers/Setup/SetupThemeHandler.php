<?php

namespace MA\App\Handlers\Setup;

use Morningtrain\WP\Enqueue\Enqueue;
// use MA\App\Services\ImageService;
// use MA\App\Services\Rest\RestService;

class SetupThemeHandler
{
    const THEME_PRIM_MENU_LOCATION = 'primary_menu';
    const THEME_SEC_MENU_LOCATION = 'secondary_menu';
    const THEME_FOOTER_MENU_LOCATION = 'footer_menu';
    const THEME_FOOTER_BOTTOM_MENU_LOCATION = 'footer_bottom_menu';
    const THEME_ACF_OPTIONS_SLUG = 'mt-settings';
    const THEME_ACF_NAV_OPTIONS_SLUG = 'mt-navigation-settings';

    const FONT_URL = 'https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600&display=swap';

    public static function enqueueMain()
    {
        Enqueue::style('theme-main-style', 'css/main.css')
            ->enqueue();
        Enqueue::script('theme-main-script', 'js/main.js')
            ->deps('jquery')
            ->enqueue();

        static::enqueueGoogleFonts();

        Enqueue::style('swiper-style', 'css/swiper-style.css')
            ->register();

        Enqueue::style('case-card', 'css/case-card.css')
            ->register();
    }

    public static function enqueueGoogleFonts()
    {
        \wp_enqueue_style('google-fonts', static::FONT_URL);
    }

    public static function enqueueLoginPage()
    {
        \wp_enqueue_style('login-style', get_template_directory_uri() . '/public/build/css/login-page.css');
    }

    public static function enqueueAdmin()
    {
        Enqueue::style('admin-style', 'css/admin.css')
            ->enqueue();

        static::enqueueGoogleFonts();
    }

    public static function register()
    {
        \register_nav_menus([
            static::THEME_PRIM_MENU_LOCATION => __('Main menu', 'mt'),
            static::THEME_SEC_MENU_LOCATION => __('Secondary menu', 'mt'),
            static::THEME_FOOTER_MENU_LOCATION => __('Footer menu', 'mt'),
            static::THEME_FOOTER_BOTTOM_MENU_LOCATION => __('Footer bottom menu', 'mt'),
        ]);
    }

    public static function removeAdminBarWordPressLogo(\WP_Admin_Bar $adminBar)
    {
        $adminBar->remove_menu('wp-logo');
    }

    public static function addProjectAdminBarMenuItem(\WP_Admin_Bar $adminBar)
    {
        $icon = \get_site_icon_url();
        $icon = !empty($icon) ? $icon : \get_template_directory_uri() . '/public/img/logos/mini-logo.svg';
        $menuSlug = 'mt';

        $adminBar->add_menu([
            'id' => $menuSlug,
            'title' => "<img src='{$icon}' style='height: 18px; margin: 8px 2px;' />",
            'href' => \get_home_url(),
        ]);

        if (function_exists('acf_add_options_page')) {
            $adminBar->add_node([
                'parent' => $menuSlug,
                'id' => static::THEME_ACF_OPTIONS_SLUG,
                'title' => __('Indstillinger', 'mt'),
                'href' => \admin_url('admin.php') . "?" . http_build_query(['page' => static::THEME_ACF_OPTIONS_SLUG]),
            ]);
            $adminBar->add_node([
                'parent' => $menuSlug,
                'id' => static::THEME_ACF_NAV_OPTIONS_SLUG,
                'title' => __('Navigation', 'mt'),
                'href' => \admin_url('admin.php') . "?" . http_build_query(['page' => static::THEME_ACF_NAV_OPTIONS_SLUG]),
            ]);
        }
    }

    public static function registerAcfOptionsPage()
    {
        $mainPage = \acf_add_options_page([
            'page_title' => __('Indstillinger', 'mt'),
            'menu_title' => __('Indstillinger', 'mt'),
            'menu_slug' => static::THEME_ACF_OPTIONS_SLUG,
            'icon_url' => \get_template_directory_uri() . '/public/img/logos/mini-logo.svg',
            'capability' => 'manage_options',
            'redirect' => false,
        ]);

        \acf_add_options_sub_page([
            'page_title' => 'Navigation',
            'menu_title' => 'Navigation',
            'menu_slug' => static::THEME_ACF_NAV_OPTIONS_SLUG,
            'parent' => $mainPage['menu_slug'],
            'capability' => 'manage_options',
        ]);
    }

    /**
     * For loading additional assets for the block editor
     * Run on enqueue_block_editor_assets
     */
    public static function enqueueBlockEditorAssets(): void
    {
        Enqueue::script('blockeditor-script')
            ->src('js/blockeditor-settings.js')
            ->applyAssetFile()
            ->enqueue();

        Enqueue::style('blockeditor-style')
            ->src('css/block-editor.css')
            ->enqueue();
    }

    /**
     * Add theme supports
     *
     * @return void
     */
    public static function addThemeSupport(): void
    {
        \add_theme_support('menus');
        \add_theme_support('editor-styles');
        \add_theme_support('wp-block-styles');

        // Add font
        \add_editor_style(str_replace([';', '@'], ['%3B', '%40'], static::FONT_URL));
    }

    /**
     * Allow svg
     *
     * @param  array  $mimes
     * @return array
     */
    public static function addSvgUploadSupport(array $mimes): array
    {
        $mimes['svg'] = 'image/svg+xml';

        return $mimes;
    }

    /**
     * Add Morningtrain category
     *
     * @param  array  $block_categories
     * @param  \WP_Block_Editor_Context  $block_editor_context
     * @return array
     */
    public static function addBlockCategories(array $block_categories, \WP_Block_Editor_Context $block_editor_context): array
    {
        array_unshift($block_categories, array(
            'slug'    => 'morningtrain',
            'title' => 'Morningtrain'
        ));
        return $block_categories;
    }
}
