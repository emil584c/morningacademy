import slideToggle from '../../../js/utils/_slide-toggle'

document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.mt-footer__main-menu > li > a')

  if (items.length === 0) {
    return
  }

  items.forEach(item => {
    const submenu = item.nextElementSibling
    if (submenu.className.indexOf('sub-menu') !== -1) {
      item.addEventListener('click', (e) => {
        e.preventDefault()
        slideToggle({
          element: submenu,
          onOpen: () => item.classList.add('submenu-open'),
          onClose: () => item.classList.remove('submenu-open')
        })
      })
    }
  })
})
