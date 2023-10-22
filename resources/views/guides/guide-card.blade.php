@php
use Illuminate\Support\Str;

$limitedExcerpt = Str::of($excerpt)->limit(50);
@endphp

<div class="mt-guide-card swiper-slide">
    <div class="mt-guide-card__inner">
        @if(empty($fullImage))
        <div class="mt-guide-card__text-container">
            <h4>Hacks med Hauritz</h4>
            @if(!empty($excerpt))
            <p class="mt-guide-card__excerpt">{!! $limitedExcerpt !!}</p>
            @endif
        </div>
        <div class="mt-guide-card__image-container object-fit">
            <img src="{!! $src !!}" alt="">
        </div>
        <div style="background-color: {!! $circleColor!!};" class="mt-guide-card__color-circle"></div>
        @else
        <div class="mt-guide-card__full-image-container object-fit">
            <img src="{!! $fullImage['url'] !!}" alt="">
        </div>
        @endif
    </div>
    <div class="mt-guide-card__outer">
        <div class="mt-guide-card__info">
            <p class="mt-guide-card__info-item">{!! $date !!}</p>
            @if(!empty($terms))
            @foreach ($terms as $term)
            <p class="mt-guide-card__info-item">{!! $term["text"] !!}</p>
            @endforeach
            @endif
        </div>
        <h3 class="mt-guide-card__title">{!! $title !!}</h3>
    </div>
    <a class="mt-guide-card__link" href="{!! $link !!}"></a>
</div>