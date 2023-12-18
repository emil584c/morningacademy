@php

    /**
     * @var string $logo
     * @var string $logoUrl
     * @var string $menu
     * @var string $menuSecondary
     */
@endphp

<header class="mt-header">
    <div class="mt-header__inner page-container">
        <div class="mt-header__left">
            <a href="{{ $logoUrl ?? home_url() }}" class="mt-header__logo">
                {!! $logo !!}
            </a>
        </div>

        <div class="mt-header__center">
            {!! $menu !!}
        </div>

        <div class="mt-header__right">
            <ul class="mt-header__menu">
                <li class="menu-item">
                    <a href="{!! $profilePageUrl['url'] !!}">Konto</a>
                </li>
                @if (!empty($heartUrl['url']))
                    <div class="mt-header__heart">
                        <a href="{!! $heartUrl['url'] !!}">@include('icons/heart')</a>
                    </div>
                @endif
            </ul>
            <div class="mt-header__navigation-toggle">
                <div></div>
            </div>
        </div>
    </div>
    <div class="mt-header__mobile-container">
        <div class="mt-header__mobile-container-top">
            <div class="mt-header__mobile-logo"></div>
        </div>
        <div class="mt-header__mobile-container-menu">
            <li class="menu-item">
                <a href="{!! $profilePageUrl['url'] !!}">Forside</a>
            </li>
            {!! $menu !!}
            <li class="menu-item">
                <a href="{!! $profilePageUrl['url'] !!}">Konto</a>
            </li>
        </div>
    </div>
    <div class="dark-mode-animation-background"></div>
</header>
