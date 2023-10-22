@php
$c = $attributes['className'] ?? '';
@endphp


@if(!empty($authorGuides))
<section @class([ 'mt-guide-overview' , $c ])>
    <div class="mt-guide-overview__inner page-container">
        <div class="mt-guide-overview__title-container">
            <h2 class="mt-guide-overview__title">Videoer til dig</h2>
            @if (count($authorGuides) >= 4)
            <a class="mt-button mt-button--primary" href="{!! $archiveUrl['url'] !!}">{{__('Se alle', 'mf')}}</a>
            @endif
        </div>
        <div class="swiper">
            <div class="mt-guide-overview__card-container swiper-wrapper">
                @foreach($authorGuides as $authorGuide)
                @include('guides/guide-card', $authorGuide)
                @endforeach
            </div>
        </div>
    </div>
</section>
@endif

<section @class([ 'mt-guide-overview' , $c ])>
    <div class="mt-guide-overview__inner page-container">
        <div class="mt-guide-overview__title-container">
            <h2 class="mt-guide-overview__title">Videoer</h2>
            @if (count($guides) >= 4)
            <a class="mt-button mt-button--primary" href="{!! $archiveUrl['url'] !!}">{{__('Se alle', 'mf')}}</a>
            @endif
        </div>
        <div class="swiper">
            <div class="mt-guide-overview__card-container swiper-wrapper">
                @foreach($guides as $guide)
                @include('guides/guide-card', $guide)
                @endforeach
            </div>
        </div>
    </div>
</section>