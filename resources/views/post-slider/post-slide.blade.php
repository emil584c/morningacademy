@php

/**
* @var string $imageUrl
* @var array $terms
* @var string $postTitle
* @var string $excerpt
* @var string $readTime
* @var WP_Term[] $tags
*/

@endphp

<div class="mt-post-slider__post swiper-slide">

    <div class="mt-post-slider__post-image-container object-fit">
        <img src="{{ $imageUrl }}" class="play-button-selector" alt="" data-url={{ $video["url"]}} data-video-id={{$video["ID"]}}>
    </div>


    <div class="mt-post-slider__post-inner">
        @if(!empty($terms))
        @include('blog.tags', ['categories' => $terms])
        @endif
        @if (!empty($postTitle))
        <div class="mt-post-slider__post-title">{!! wp_trim_words($postTitle, 11) !!}</div>
        @endif
        @if (!empty($excerpt))
        <div class="mt-post-slider__post-text">{!! wp_trim_words($excerpt, 20) !!}</div>
        @endif
        @if (!empty($tags))
        <div class="mt-post-slider__post-bottom-container">
            @foreach ($tags as $tag)
            <div class="mt-post-slider__post-mini-tag mt-mini-tag">{{ $tag->name }}</div>
            @endforeach
        </div>
        @endif
    </div>
    @if(!empty($permalink))
    <a href="{{$permalink }}" class="mt-post-slider__post-link"></a>
    @endif
</div>