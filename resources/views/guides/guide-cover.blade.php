<section class="mt-guide-cover">
    <div class="mt-guide-cover__content page-container">
        <div class="mt-guide-cover__text-section">
            <p class="mt-guide-cover__date">{{ $date }}</p>
            <h2 class="mt-guide-cover__title">{!! $title !!}</h2>
            @if(!empty($description))
            {!! $description !!}
            @endif
        </div>
        <div class="object-fit mt-guide-cover__image-container">
            @if(!empty($video))
            <video class="cover-video" src="{{$video["url"]}}" playsinline controls poster="{{$imageUrl}}" data-video-id={{$video["ID"]}}></video>
            @endif
        </div>
    </div>
</section>