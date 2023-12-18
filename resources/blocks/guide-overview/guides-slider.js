import Swiper from "swiper";
import ld from "lodash";
import { Pagination } from "swiper/modules";

let __ = ld.noConflict();

document.addEventListener("DOMContentLoaded", () => {
  const EVENT_SLIDERS = document.querySelectorAll(".mt-guide-overview__inner");

  if (EVENT_SLIDERS.length > 0) {
    EVENT_SLIDERS.forEach((SLIDER) => {
      const SWIPER_ELEMENT = SLIDER.querySelector(".swiper");
      let swiperInitialized = false;

      if (!SWIPER_ELEMENT) {
        return;
      }

      const swiperOptions = {
        modules: [Pagination],
        init: false,
        speed: 800,
        spaceBetween: 24,
        watchOverflow: false,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        breakpoints: {
          400: { slidesPerView: 1.1, spaceBetween: 24 },
          800: { slidesPerView: 1.4, spaceBetween: 12 },
        },
      };
      let swiper = new Swiper(SWIPER_ELEMENT, swiperOptions);

      if (getScreenWidth() <= 970) {
        swiper.init();
        swiperInitialized = true;
      }

      window.addEventListener(
        "resize",
        __.debounce(() => {
          if (getScreenWidth() <= 899) {
            if (!swiperInitialized) {
              swiper = new Swiper(SWIPER_ELEMENT, swiperOptions);
              swiper.init();
              swiperInitialized = true;
            }
          } else {
            if (swiperInitialized) {
              swiper.destroy(true, true);
              swiperInitialized = false;
            }
          }
        }, 200)
      );
    });
  }
});

function getScreenWidth() {
  return window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
}
