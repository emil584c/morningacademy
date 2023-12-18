import WatchTime from "../../../resources/js/modules/_watch-time";

document.addEventListener("DOMContentLoaded", () => {
  const VIDEO = document.querySelector(".cover-video");

  VIDEO.addEventListener("loadeddata", () => {
    VIDEO.currentTime = WatchTime.getVideoPlayTime(VIDEO).time;
  });

  VIDEO.addEventListener("pause", () => {
    WatchTime.setVideoPlayTime(VIDEO);
  });

  addEventListener("beforeunload", () => {
    const isVideoPlaying = (VIDEO) =>
      !!(VIDEO.currentTime > 0 && !VIDEO.paused && !VIDEO.ended && VIDEO.readyState > 2);

    if (isVideoPlaying) {
      WatchTime.setVideoPlayTime(VIDEO);
    }
  });
});
