class WatchTime {
   
    constructor(){
        this.LOCAL_STORAGE_KEY = "watch_times"
        this.watchTimes = null
        this.fetchWatchTimes()
    }

    getLocalStorageWatchTimes() {
      let data = localStorage.getItem(this.LOCAL_STORAGE_KEY)

      try {
        data = JSON.parse(data)
      } catch (error) {
        data = null
      }

      if (data === null) {
        return {}
      }

      return data
    }

    setLocalStorageWatchTimes(data) {
        localStorage.setItem(this.LOCAL_STORAGE_KEY, JSON.stringify(data))
    }

    deleteLocalStorageWatchTimes() {
        localStorage.removeItem(this.LOCAL_STORAGE_KEY)
    }

    fetchWatchTimes() {
        this.watchTimes = this.getLocalStorageWatchTimes()
    }

    getWatchTime(id) {
        return this.watchTimes[id] ?? {
            time: 0
        }
    }

    setWatchTime(id, watchTime) {
        this.watchTimes[id] = watchTime
        this.setLocalStorageWatchTimes(this.watchTimes)
    }

    deleteWatchTime(id) {
        delete this.watchTimes[id]
    }

    extractIdAndTimeFromElement(videoEl){
        let watchTime = {
            time:videoEl.currentTime,
            duration:videoEl.duration
        }
        return [videoEl.dataset.videoId, watchTime]
    }

    setVideoPlayTime(videoEl) {
        this.setWatchTime(...this.extractIdAndTimeFromElement(videoEl))
    }

    getVideoPlayTime(videoEl) { 
        return this.getWatchTime(this.extractIdAndTimeFromElement(videoEl)[0])
    }

}

if (typeof window.watchTime === 'undefined') {
    window.watchTime = new WatchTime()
}

export default window.watchTime