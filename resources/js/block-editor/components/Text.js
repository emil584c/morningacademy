export default function Text ({ text, mt = 0, mb = 0 }) {
  const style = {
    fontWeight: '500',
    fontSize: '11px',
    lineHeight: '1.4',
    textTransform: 'uppercase'
  }

  if (typeof mt === 'number') {
    style.marginTop = mt + 'px'
  }

  if (typeof mb === 'number') {
    style.marginBottom = mb + 'px'
  }

  return <div style={style}>{text}</div>
}
