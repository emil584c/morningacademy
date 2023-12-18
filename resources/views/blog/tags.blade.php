@php

    /**
     * @var array $categories
     */

    if (empty($categories)) {
        return;
    }
@endphp

<div
    @class([
        'mt-tags'
    ])
>
    @foreach ($categories as $category)
        @include('blog.tag', $category)
    @endforeach
</div>
