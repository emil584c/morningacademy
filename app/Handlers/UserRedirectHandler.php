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

    public static function redirectAfterLogin($url, $request, $user)
    {
        if ($user && is_object($user) && is_a($user, 'WP_User')) {
            if ($user->has_cap('subscriber') || $user->has_cap('eksamensbruger')) {
                $url = site_url('');
            } else {
                $url = admin_url();
            }
        }
        return $url;
    }
}
