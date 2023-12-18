<section class="mt-blog-cover">
    <div class="mt-blog-cover__content page-container">
        <div class="mt-blog-cover__text-section">
            <p class="mt-blog-cover__date">{{ $date }}</p>
            <div class="mt-blog-cover__categories">
                @foreach($terms as $term)
                <p class="mt-blog-cover__category">{{ $term["text"] }}</p>
                @endforeach
            </div>
            <h2 class="mt-blog-cover__title">{{ $postTitle }}</h2>
            <p class="mt-blog-cover__text">{{ $excerpt }}</p>
        </div>
        <div class="object-fit mt-blog-cover__image-container">
            @if(!empty($video))
            <video class="cover-video" src="{{$video["url"]}}" playsinline controls poster="{{$imageUrl}}" data-video-id={{$video["ID"]}}></video>
            @endif
        </div>
    </div>
</section>