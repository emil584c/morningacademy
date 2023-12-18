document.addEventListener("DOMContentLoaded", () => {
  const HEADER = document.querySelector(".mt-header");
  const TOGGLE_BUTTON = document.querySelector(".mt-header__navigation-toggle");

  TOGGLE_BUTTON.addEventListener("click", () => {
    HEADER.classList.toggle("open");
  });
});
