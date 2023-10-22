export default function Message ({
  content,
  position = '', // top|bottom
  status = 'info', // info|warning|success|error
  shouldDisplay = true,
  extraClasses = ['page-container']
}) {

  if (!content || shouldDisplay === false) {
    return null
  }

  const classes = [
    'mt-message',
    position ? `mt-message--position-${position}` : '',
    `mt-message--status-${status}`
  ].concat(extraClasses)

  return (
    <div className={classes.join(' ')}>
      <div className={'mt-message__text'}>{content}</div>
    </div>
  )
}
