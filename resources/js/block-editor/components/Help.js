export default function Help ({ text, mt = 8, mb = 0 }) {
  const style = {
    color: '#757575'
  }

  if (typeof mt === 'number') {
    style.marginTop = mt + 'px'
  }

  if (typeof mb === 'number') {
    style.marginBottom = mb + 'px'
  }

  return <div style={style}>{text}</div>
}
