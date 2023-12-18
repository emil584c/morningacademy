<section class="mt-guide-cover">
    <div class="mt-guide-cover__content page-container">
        <div class="mt-guide-cover__text-section">
            <p class="mt-guide-cover__date">{{ $date }}</p>
            <div class="mt-guide-cover__info-container">
                @if (!empty($series->name))
                    <p class="mt-guide-cover__series">{!! $series->name !!}</p>
                @endif
                @if (!empty($terms) & !empty($series))
                    /
                @endif
                <div class="mt-guide-cover__categories">
                    @if (!empty($terms))
                        @foreach ($terms as $term)
                            @if ($term['text'] !== 'Guides til dig')
                                <div class="mt-guide-cover__category-container">
                                    <p class="mt-guide-cover__category-text">{!! $term['text'] !!}</p>
                                </div>
                            @endif
                        @endforeach
                    @endif
                </div>
            </div>
            <h2 class="mt-guide-cover__title">{!! $title !!}</h2>
            @if (!empty($description))
                {!! $description !!}
            @endif
        </div>
        <div class="object-fit mt-guide-cover__image-container">
            @if (!empty($video))
                <video class="cover-video" src="{{ $video['url'] }}" playsinline controls poster="{{ $imageUrl }}"
                    data-video-id={{ $video['ID'] }}></video>
            @endif
        </div>
    </div>
</section>
