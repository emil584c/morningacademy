export default function Spacer ({ position, spacings = {} }) {
  let classname = [
    'spacer',
    position
  ]

  if (typeof spacings[position] !== 'string') {
    return null
  }

  classname.push(spacings[position])

  return (
    <div className={classname.join('-')}/>
  )
}
