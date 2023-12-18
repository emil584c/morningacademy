import Swiper from "swiper";
import { Navigation } from "swiper/modules";

document.addEventListener("DOMContentLoaded", () => {
  const POST_SLIDERS = document.querySelectorAll(".mt-post-slider");
  if (POST_SLIDERS.length > 0) {
    POST_SLIDERS.forEach((POST_SLIDER) => {
      const postSlider = new PostSlider(POST_SLIDER);
      postSlider.init();
    });
  }
});

class PostSlider {
  constructor(POST_SLIDER) {
    this.POST_SLIDER = POST_SLIDER;
    this.CATEGORY = 0;
  }

  init() {
    this.addEventListeners();
    this.createSwiper();
  }

  createSwiper() {
    const SWIPER_ELEMENT = this.POST_SLIDER.querySelector(".swiper");
    const PREV_BUTTON = this.POST_SLIDER.querySelector(".swiper-button-prev");
    const NEXT_BUTTON = this.POST_SLIDER.querySelector(".swiper-button-next");

    if (!SWIPER_ELEMENT) {
      return;
    }

    const swiperOptions = {
      modules: [Navigation],
      speed: 800,
      spaceBetween: 24,
      slidesPerView: 1.2,
      watchOverflow: false,
      threshold: 15,
      parallax: true,
      navigation: {
        nextEl: NEXT_BUTTON,
        prevEl: PREV_BUTTON,
      },
      breakpoints: {
        780: {
          slidesPerView: 1,
        },
        1150: {
          slidesPerView: 2,
        },
      },
    };

    this.swiper = new Swiper(SWIPER_ELEMENT, swiperOptions);
  }

  addEventListeners() {
    this.FILTER_BUTTONS = this.POST_SLIDER.querySelectorAll(".mt-post-slider__category");
    this.ARTICLES_GRID = this.POST_SLIDER.querySelector(".mt-post-slider__post-wrapper");

    if (this.FILTER_BUTTONS.length > 0) {
      for (let index = 0; index < this.FILTER_BUTTONS.length; index++) {
        const button = this.FILTER_BUTTONS[index];

        button.addEventListener("click", (e) => {
          e.preventDefault();
          this.CATEGORY = button.getAttribute("data-term-id");

          this.changeActiveCategory();
          this.getArticles();
        });
      }
    }
  }

  changeActiveCategory() {
    this.POST_SLIDER.querySelector(".mt-post-slider__category.active").classList.remove("active");
    this.POST_SLIDER.querySelector('.mt-post-slider__category[data-term-id="' + this.CATEGORY + '"]').classList.add(
      "active"
    );
  }

  getArticles() {
    this.POST_SLIDER.querySelector(".mt-loader").classList.add("show");
    const data = {
      termId: this.CATEGORY,
    };

    if (window.mtwpRestRoutes?.["post-slider"]) {
      fetch(window.mtwpRestRoutes?.["post-slider"], {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          this.ARTICLES_GRID.innerHTML = data.markup;
          this.POST_SLIDER.querySelector(".mt-loader").classList.remove("show");
          this.createSwiper();
        });
    } else {
      this.POST_SLIDER.querySelector(".mt-loader").classList.remove("show");
    }
  }
}
