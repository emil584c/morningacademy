export default function LogoAnimation () {
  const logos = document.querySelectorAll('.logo-animation')

  if (logos.length === 0) {
    return
  }

  logos.forEach(logo => {
    logo.addEventListener('mouseenter', () => {
      logo.classList.add('logo-animation--animate')
      setTimeout(() => logo.classList.remove('logo-animation--animate'), 1000)
    })
  })
}
