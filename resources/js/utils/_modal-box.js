// Modalbox class {
//     1. To append youtube video to modalbox, give the btnSelector a data-url attribute with the youtube url
//     1. To append mp4 video to modalbox, give the btnSelector a data-url attribute with the complete path to the mp4 video
// }

// Accepts 1 parameter which is the btnSelector etc. new Modalbox('.play-btn');

export default class Modalbox {
  constructor(btnSelector) {
    this.opened = false;
    this.removed = true;

    // Selecting all buttons, provided in btnSelector
    const PLAY_BTNS = document.querySelectorAll(btnSelector);

    // Adding click event listeners on all buttons
    for (let i = PLAY_BTNS.length - 1; i >= 0; i--) {
      const PLAY_BTN = PLAY_BTNS[i];
      PLAY_BTN.addEventListener("click", (e) => {
        e.preventDefault();
        const URL = PLAY_BTN.getAttribute("data-url");
        const ID = PLAY_BTN.getAttribute("data-video-id");

        this.open();
        this.play(URL, ID);
      });
    }

    // Adding escape press event listeners
    document.addEventListener("keydown", (e) => {
      const KEY_NAME = e.key;
      if (KEY_NAME === "Escape" && this.opened === true) {
        this.close();
      }
    });
  }

  // Creates html for the modalbox and adding click event on overlay
  create() {
    const MODAL = document.querySelector(".video-modal");
    if (!MODAL) {
      // Creating the video modal box
      this.modalbox = document.createElement("div");
      this.modalbox.className = "video-modal";
      this.modalboxInner = document.createElement("div");
      this.modalboxInner.className = "video-modal-content";

      // Creating close button
      this.closeButton = document.createElement("div");
      this.closeButton.className = "video-modal-close-button";

      // Appending modalbox and content
      document.body.appendChild(this.modalbox);
      this.modalbox.appendChild(this.modalboxInner);
      this.modalboxInner.appendChild(this.closeButton);

      // Creating and appending the video modal box overlay
      this.modalboxOverlay = document.createElement("div");
      this.modalboxOverlay.className = "video-overlay";
      document.body.appendChild(this.modalboxOverlay);

      // Adding click event listeners on overlay
      document
        .getElementsByClassName("video-overlay")[0]
        .addEventListener("click", () => {
          this.close();
        });

      jQuery("body").on("click", ".video-modal-close-button", () => {
        this.close();
      });

      this.removed = false;
    }
  }

  // Removing html making the html more clean when not using it
  remove() {
    if (this.modalbox) {
      document.body.removeChild(this.modalbox);
      document.body.removeChild(this.modalboxOverlay);
    }
  }

  // Appends mobdalbox and Adds open-video class to body and active to this.modalbox
  open() {
    if ((this.removed = true)) {
      this.opened = true;
      this.create();
      // Setting a small timeout to make the modalbox append before animating
      setTimeout(() => {
        document.body.className += " open-video";
      }, 10);
    }
  }

  // Adds close-video class to body to begin close animation and removing open-video after a certain delay relative to window.innerWidth
  close() {
    this.opened = false;

    
    document.body.className += " close-video";

    setTimeout(() => {
      document.body.className = document.body.className.replace(
        /\bopen-video\b/g,
        ""
      );
      this.modalboxInner.innerHTML = "";
    }, 500);

    const WIDTH = window.innerWidth;

    if (this.removed === false) {
      this.removed = true;
      if (WIDTH < 980) {
        setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\bclose-video\b/g,
            ""
          );
          this.modalbox.className = this.modalbox.className.replace(
            /\bactive\b/g,
            ""
          );
          this.remove();
        }, 1000);
      } else {
        setTimeout(() => {
          document.body.className = document.body.className.replace(
            /\bclose-video\b/g,
            ""
          );
          this.modalbox.className = this.modalbox.className.replace(
            /\bactive\b/g,
            ""
          );
          this.remove();
        }, 700);
      }
    }
  }

  // Appends an iframe or mp4 file to this.modalboxInner
  play(videoUrl, videoId) {
    const VIDEO_ID = this.getId(videoUrl);

    if (VIDEO_ID !== "error") {
      this.modalboxInner.innerHTML +=
        '<iframe id="video-modal-player" width="560" height="315" src="//www.youtube.com/embed/' +
        VIDEO_ID +
        '?autoplay=1&enablejsapi=1&rel=0" frameborder="0" allowfullscreen></iframe>';
    } else {
      this.modalboxInner.innerHTML +=
        '<video controls autoplay controlsList="nodownload" id="video-modal-player" data-video-id="' + videoId + '"><source src="' +
        videoUrl +
        '" type="video/mp4">Your browser does not support HTML5 video.</video>';
    }
  }

  getVideoPlayTime(videoEl) {
    videoEl.currentTime = WatchTime.getVideoPlayTime(videoEl).time
  }

  // Turns youtube url into the last id
  getId(url) {
    const REG_EXP =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const MATCH = url.match(REG_EXP);

    if (MATCH && MATCH[2].length === 11) {
      return MATCH[2];
    } else {
      return "error";
    }
  }
}
