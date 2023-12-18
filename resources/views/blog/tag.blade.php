@php

    /**
     * @var string $text
     * @var string $color
     * @var string $url
     */

    if (empty($text)) {
        return;
    }

    $color = !empty($color) ? $color : '';

@endphp

<a
    @class([
        'mt-tag',
        'mt-tag--' . $color => !empty($color)
    ])
    {!! !empty($url) ? "href='$url'" : "" !!}
>
    {{ $text }}
</a>
