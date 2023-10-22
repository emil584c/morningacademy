export default function Video ({ media }) {
  return (
    <video
      className={'media-preview__video'}
      style={{ width: 'auto', maxHeight: media.height + 'px' }}
      autoPlay
      muted
    >
      <source src={media.url}/>
    </video>
  )
}
