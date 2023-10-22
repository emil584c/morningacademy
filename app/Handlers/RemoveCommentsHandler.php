<?php

namespace MA\App\Handlers;

class RemoveCommentsHandler
{
    public static function disableCommentsForPostTypes(): void
    {
        // Redirect any user trying to access comments page
        global $currentPage;

        if ($currentPage === 'edit-comments.php') {
            \wp_redirect(admin_url());
            exit;
        }

        // Remove comments metabox from dashboard
        \remove_meta_box('dashboard_recent_comments', 'dashboard', 'normal');

        // Disable support for comments and trackbacks in post types
        $post_types = \get_post_types();
        if (!empty($post_types)) {
            foreach ($post_types as $post_type) {
                if (\post_type_supports($post_type, 'comments')) {
                    \remove_post_type_support($post_type, 'comments');
                    \remove_post_type_support($post_type, 'trackbacks');
                }
            }
        }
    }

    public static function removeCommentsPage(): void
    {
        \remove_menu_page('edit-comments.php');
    }

    public static function removeCommentsLink(): void
    {
        if (\is_admin_bar_showing()) {
            \remove_action('admin_bar_menu', 'wp_admin_bar_comments_menu', 60);
        }
    }

}
