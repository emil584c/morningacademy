@php

    /**
     * @var string $logo
     * @var string $logoUrl
     * @var string $menu
     * @var string $bottomMenu
     * @var string $partnersTitle
     * @var array $partners
     * @var string $locationName
     * @var string $locationMaps
     * @var array $socials
     * @var string $copyrightLine
     */

    use MA\App\Services\ImageService;

@endphp

<footer class="mt-footer">
    <div class="mt-footer__inner page-container">
        <a href="https://morningacademy.dk.bluebird.pw/" class="mt-footer__logo">
            {!! $logo !!}
        </a>
        <div class="mt-footer__middle-top">
            <div class="mt-footer__middle-top-left">
                @if (!empty($partnersTitle))
                    <p class="mt-footer__partners-title">{{ $partnersTitle }}</p>
                @endif
                @if (!empty($partners))
                    <ul class="mt-footer__partners">
                        @foreach ($partners as $partner)
                            <li class="mt-footer__partner">
                                <a href="{{ $partner['link'] }}" class="mt-footer__partner-link">
                                    {{ $partner['name'] }}
                                </a>
                            </li>
                        @endforeach
                    </ul>
                @endif
            </div>
            <div class="mt-footer__middle-top-right">
                @if (!empty($locationName))
                    @if (!empty($locationMaps))
                        <a href="{{ $locationMaps }}" target="_blank" class="mt-footer__location">
                            <img src="{{ ImageService::fromPath('icons/location.svg') }}" alt="Location" width="16"
                                height="16">
                            {{ $locationName }}
                        </a>
                    @else
                        <p class="mt-footer__location">
                            <img src="{{ ImageService::fromPath('icons/location.svg') }}" alt="Location" width="16"
                                height="16">
                            {{ $locationName }}
                        </p>
                    @endif
                @endif
            </div>
        </div>

        <div class="mt-footer__middle-bottom">
            <div class="mt-footer__middle-bottom-left">
                @if (!empty($socials))
                    <ul class="mt-footer__socials">
                        @foreach ($socials as $name => $link)
                            @if (!empty($link))
                                <li class="mt-footer__social">
                                    <a href="{{ $link }}" class="mt-footer__social-link">
                                        <img src="{{ ImageService::fromPath('social/' . $name . '.svg') }}"
                                            alt="{{ $name }}" height="16" width="16">
                                    </a>
                                </li>
                            @endif
                        @endforeach
                    </ul>
                @endif
            </div>
        </div>

        <div class="mt-footer__bottom">
            <div class="mt-footer__bottom-left">
                @if (!empty($copyrightLine))
                    <p class="mt-footer__copyright">{!! $copyrightLine !!}</p>
                @endif
            </div>
            <div class="mt-footer__bottom-right">
                @if (!empty($bottomMenu))
                    {!! $bottomMenu !!}
                @endif
            </div>
        </div>

    </div>
</footer>
