<?php

namespace MA\App\Handlers;

class UserRedirectHandler
{
    public static function privateGuidesUserRedirect()
    {
        $allowedUsers = \get_field('guide_user');

        if (is_array($allowedUsers) && (!current_user_can('administrator') && !in_array(get_current_user_id(), $allowedUsers))) {
            wp_redirect(home_url());
            exit();
        }
    }
}
