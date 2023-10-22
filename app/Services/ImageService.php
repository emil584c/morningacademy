<?php

namespace MA\App\Services;

class ImageService
{
    public static function getImgFolderUrl(): string
    {
        return get_template_directory_uri() . '/public/img/';
    }

    public static function fromPath($fileName): string
    {
        return static::getImgFolderUrl() . $fileName;
    }

    public static function fromId($id, $size = 'large'): bool|string
    {
        return wp_get_attachment_image_url($id, $size);
    }
}
