<section class="mt-blog-archive">
    <div class="mt-blog-archive__container page-container">
        @foreach ($posts as $post)
        @include('blog/single-blog', $post)
        @endforeach
    </div>
    <div class="mt-blog-archive__show-more-container">
        <button class="mt-blog-archive__show-more">
            show more
        </button>
    </div>
</section>