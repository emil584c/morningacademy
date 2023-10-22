export default function Spacer ({ spacing = 32, showBorder = false }) {
  const style = {}

  if (typeof spacing === 'number' && spacing > 0) {
    style.marginBottom = spacing + 'px'
  }

  if (typeof showBorder === 'boolean' && showBorder) {
    style.marginTop = spacing + 'px'
    style.borderTop = '1px solid #e0e0e0'
  }

  return <div style={style}/>
}
