@php
    $c = $attributes['className'] ?? '';
@endphp

@if (!empty($authorGuides))
    <section @class(['mt-guide-overview', $c])>
        <div class="mt-guide-overview__inner page-container">
            <div class="mt-guide-overview__title-container">
                <div class="mt-guide-overview__title-text">
                    <h2 class="mt-guide-overview__title">Guides til dig</h2>
                    @if (!empty($attributes['paragraph']))
                        <p class="mt-guide-overview__text">{!! $attributes['paragraph'] !!}</p>
                    @endif
                </div>
            </div>
            <div class="swiper">
                <div class="mt-guide-overview__card-container swiper-wrapper">
                    @foreach ($authorGuides as $authorGuide)
                        @include('guides/guide-card', $authorGuide)
                    @endforeach
                </div>
                <div class="swiper-pagination"></div>
            </div>
            @if (count($authorGuides) >= 2)
                <div class="mt-guide-overview__button-container"><a class="mt-button mt-button--primary"
                        href="{!! $archiveUrl['url'] !!}">{{ __('Se alle', 'mf') }}</a></div>
            @endif
        </div>
    </section>
@endif

<section @class(['mt-guide-overview', $c])>
    <div class="mt-guide-overview__inner page-container">
        <div class="mt-guide-overview__title-container">
            <div class="mt-guide-overview__title-text">
                <h2 class="mt-guide-overview__title">Guides</h2>
                @if (!empty($attributes['paragraph2']))
                    <p class="mt-guide-overview__text">{!! $attributes['paragraph2'] !!}</p>
                @endif
            </div>
        </div>
        <div class="swiper">
            <div class="mt-guide-overview__card-container swiper-wrapper">
                @foreach ($guides as $guide)
                    @include('guides/guide-card', $guide)
                @endforeach
            </div>
            <div class="swiper-pagination"></div>
        </div>
        @if (count($guides) >= 2)
            <div class="mt-guide-overview__button-container"><a class="mt-button mt-button--primary"
                    href="{!! $archiveUrl['url'] !!}">{{ __('Se alle', 'mf') }}</a></div>
        @endif
    </div>
</section>
