/**
 * Vanilla JS slideToggle alternative to jQuery.slideToggle
 *
 * @param element
 * @param durationInMs
 * @param className
 * @param onOpen
 * @param onClose
 */
export default function slideToggle ({
  element,
  durationInMs = 300,
  className = 'active',
  onOpen = () => {},
  onClose = () => {}
}) {

  if (!element.classList.contains(className)) {

    onOpen()

    element.classList.add(className)
    element.style.height = 'auto'

    const height = element.clientHeight + 'px'

    element.style.height = '0px'
    element.setAttribute('data-height', height)

    setTimeout(() => element.style.height = height, 0)
    setTimeout(() => element.style.height = 'auto', durationInMs)

  } else {

    onClose()

    element.style.height = element.getAttribute('data-height')

    setTimeout(() => element.style.height = '0px', 0)

    element.addEventListener('transitionend', () => {
      element.classList.remove(className)
    }, { once: true })

  }
}
