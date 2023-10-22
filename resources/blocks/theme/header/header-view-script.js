document.addEventListener('DOMContentLoaded', () => {
  new Navigation()
})

class Navigation {
  constructor () {
    this.element = document.querySelector('.mt-header')

    if (this.element) {
      this.init()
    }
  }

  init () {
    // Add scroll handler
    new NavigationScrollHandler({
      onEnter: () => document.body.classList.add('mt-header-scrolled'),
      onExit: () => document.body.classList.remove('mt-header-scrolled')
    })
  }
}

class NavigationScrollHandler {
  constructor ({ scrollDistance = 80, onEnter = () => {}, onExit = () => {} } = {}) {
    this.scrollDistance = scrollDistance
    this.onEnter = onEnter
    this.onExit = onExit
    this.lastKnownScrollY = 0
    this.ticking = false

    window.addEventListener('scroll', () => this.onScroll(), false)
    this.onScroll()
  }

  onScroll () {
    this.lastKnownScrollY = window.pageYOffset
    this.requestTick()
  }

  requestTick () {
    if (!this.ticking) {
      requestAnimationFrame(this.update.bind(this))
    }

    this.ticking = true
  }

  update () {
    let currentScrollY = this.lastKnownScrollY
    this.ticking = false

    this.checkScrollDistance(currentScrollY)
  }

  checkScrollDistance (scrolledDistance) {
    if (this.scrollDistance < 1) {
      return false
    }

    if (scrolledDistance > this.scrollDistance) {
      this.onEnter()
    } else if (scrolledDistance < this.scrollDistance) {
      this.onExit()
    }
  }
}
