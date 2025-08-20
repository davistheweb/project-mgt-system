<?php

namespace App\Faker;

use Faker\Provider\Base as BaseProvider;

class ImageProvider extends BaseProvider
{
    public function imageUrl($width = 640, $height = 480, $format = 'png', $background = null, $color = null, $text = null)
    {
        $url = "https://placehold.co/{$width}x{$height}/{$format}";

        if ($background && $color) {
            $url .= "/{$background}/{$color}";
        }

        if ($text) {
            $url .= "?text=" . urlencode($text);
        }

        return $url;
    }
}