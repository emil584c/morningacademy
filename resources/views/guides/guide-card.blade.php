<div class="mt-guide-card swiper-slide">
    <div class="mt-guide-card__inner">
        @if (empty($fullImage))
            <div class="mt-guide-card__text-container">
                @if (!empty($title))
                    <h4>{!! $title !!}</h4>
                @endif

                <div>
                    <div class="mt-guide-card__info">
                        @if (!empty($series->name))
                            <p class="mt-guide-card__series">Serie: {!! $series->name !!}</p>
                        @endif
                        <div class="mt-guide-card__info-row ">
                            <div class="mt-guide-card__category-row">
                                @if (!empty($terms))
                                    @foreach ($terms as $term)
                                        @if ($term['text'] !== 'Guides til dig')
                                            <div class="mt-guide-card__info-item-container">
                                                <p class="mt-guide-card__info-item">{!! $term['text'] !!}</p>
                                            </div>
                                        @endif
                                    @endforeach
                                @endif
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mt-guide-card__image-container object-fit">
                <img src="{!! $src !!}" alt="">
            </div>
            <div @if (!empty($circleColor)) style="background-color: {!! $circleColor !!};" @else style="background-color: #F8CFB1;" @endif
                class="mt-guide-card__color-circle"></div>
        @else
            <div class="mt-guide-card__full-image-container object-fit">
                <img src="{!! $fullImage['url'] !!}" alt="">
            </div>
        @endif
    </div>
    <a class="mt-guide-card__link" href="{!! $link !!}"></a>
</div>
