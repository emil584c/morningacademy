<section class="mt-frontpage-cover">
    <div class="mt-frontpage-cover__inner page-container">
        <div class="mt-frontpage-cover__left">
            <p class="mt-frontpage-cover__tagline mt-tagline">Din digitale guide</p>
            <h1 class="mt-frontpage-cover__title">Velkommen tilbage
                <br>
                @if (!empty($user->first_name))
                    <span
                        class="mt-frontpage-cover__title mt-frontpage-cover__title--thin">{!! $user->first_name !!}</span>
                @endif
            </h1>
        </div>
        <div class="mt-frontpage-cover__right">
            @if (!empty($attributes['firstImage']['src']))
                <div class="mt-frontpage-cover__circle mt-frontpage-cover__circle--small object-fit">
                    <img src="{!! $attributes['firstImage']['src'] !!}" alt="{!! $attributes['firstImage']['title'] !!}">
                </div>
            @endif
            @if (!empty($attributes['secondImage']['src']))
                <div class="mt-frontpage-cover__circle mt-frontpage-cover__circle--big object-fit">
                    <img src="{!! $attributes['secondImage']['src'] !!}" alt="{!! $attributes['secondImage']['title'] !!}">
                </div>
            @endif
            @if (!empty($attributes['thirdImage']['src']))
                <div class="mt-frontpage-cover__pill">
                    <img src="{!! $attributes['thirdImage']['src'] !!}" alt="{!! $attributes['thirdImage']['title'] !!}">
                </div>
            @endif
            <div class="mt-frontpage-cover__ring mt-frontpage-cover__ring--small">
            </div>
        </div>
    </div>
</section>
