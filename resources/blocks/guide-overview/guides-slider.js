import Swiper from "swiper";
import ld from "lodash";

let __ = ld.noConflict();

document.addEventListener("DOMContentLoaded", () => {
  const EVENT_SLIDERS = document.querySelectorAll(".mt-guide-overview__inner");
  console.log(EVENT_SLIDERS)

  if (EVENT_SLIDERS.length > 0) {
    EVENT_SLIDERS.forEach((SLIDER) => {
      const SWIPER_ELEMENT = SLIDER.querySelector(".swiper");
      let swiperInitialized = false;

      if (!SWIPER_ELEMENT) {
        return;
      }

      const swiperOptions = {
        init: false,
        speed: 800,
        spaceBetween: 0,
        watchOverflow: true,
        threshold: 15,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
          dynamicBullets: true,
        },
        breakpoints: {
          400: { slidesPerView: 1, spaceBetween: 12 },
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
  return (
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth
  );
}
