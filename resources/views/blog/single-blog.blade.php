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

<div class="mt-single-blog">
    <div class=" mt-single-blog__image-container object-fit">
        <img src="{{ $imageUrl }}" alt="">
        @if(!empty($video))
        <div class="mt-package__play-button play-button open-video-modal" data-url={{ $video["url"]}} data-video-id={{$video["ID"]}}></div>
        @endif
    </div>


    <div class="mt-single-blog__inner">
        @if(!empty($terms))
        @include('blog.tags', ['categories' => $terms])
        @endif
        @if (!empty($postTitle))
        <div class="mt-single-blog__title">{!! wp_trim_words($postTitle, 11) !!}</div>
        @endif
        @if (!empty($excerpt))
        <div class="mt-single-blog__text">{!! wp_trim_words($excerpt, 20) !!}</div>
        @endif
        @if (!empty($tags))
        <div class="mt-single-blog__bottom-container">
            @foreach ($tags as $tag)
            <div class="mt-single-blog__mini-tag mt-mini-tag">{{ $tag->name }}</div>
            @endforeach
        </div>
        @endif
    </div>
    @if(!empty($permalink))
    <a href="{{$permalink }}" class="mt-single-blog__link"></a>
    @endif
</div>