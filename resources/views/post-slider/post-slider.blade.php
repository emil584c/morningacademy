@php

/**
* @var string $className
* @var string $tagline
* @var string $title
* @var string $linkText
* @var array $link
* @var array $mtSpacing
* @var array $posts
* @var array $terms
*/

$anchor = !empty($anchor) ? 'id="' . $anchor . '"' : '';
$c = $className ?? '';


@endphp
<section {!! $anchor !!} @class([ 'mt-post-slider' , $c ])>
    <div class="mt-post-slider__inner page-container">
        <div class="mt-post-slider__top-container">
            <div class="mt-post-slider__text-container">
                @if (!empty($tagline))
                <p class="mt-post-slider__tagline tagline hide-in-admin">{!! $tagline !!}</p>
                @endif
                @if (!empty($title))
                <h2 class="mt-post-slider__title title hide-in-admin">{!! $title !!}</h2>
                @endif
            </div>
            <div class="mt-post-slider__navigation-container">
                @if (!empty($terms))
                <div class="mt-post-slider__categories-wrapper">
                    <div class="mt-post-slider__categories">
                        <a href="#" class="mt-post-slider__category active" data-term-id="">{{ __('Alle', 'morningtrain') }}</a>
                        @foreach ($terms as $term)
                        <a href="#" class="mt-post-slider__category" data-term-id="{{ $term->term_id }}">{{ $term->name }}</a>
                        @endforeach
                    </div>
                </div>
                @endif
                <div @class([ 'mt-post-slider__navigation'=> true,
                    'mt-post-slider__navigation--add-margin' => !empty($terms)
                    ])>
                    <div class="swiper-button-prev swiper-button-prev--blue"></div>
                    <div class="swiper-button-next swiper-button-next--blue"></div>
                    @if (!empty($linkText) && !empty($link))
                    <div class="mt-post-slider__top-button wp-block-button is-style-primary">
                        <a class="wp-block-button__link" href="{{ $link['url'] }}">{{ $linkText }}</a>
                    </div>
                    @endif
                </div>
            </div>
        </div>
        <div class="mt-post-slider__post-wrapper">
            @if (!empty($posts))
            <div class="swiper">
                <div class="swiper-wrapper">
                    @foreach ($posts as $post)
                    @include('post-slider.post-slide', $post)
                    @endforeach
                </div>
            </div>
            @endif
        </div>
        @if (!empty($linkText) && !empty($link))
        <div class="mt-post-slider__bottom-button wp-block-button is-style-primary wp-block-button--full-width">
            <a class="wp-block-button__link" href="{{ $link['url'] }}">{{ $linkText }}</a>
        </div>
        @endif
    </div>
    <div class="mt-loader"></div>
</section>