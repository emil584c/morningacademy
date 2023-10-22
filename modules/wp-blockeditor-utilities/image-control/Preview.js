export default function Preview ({ media }) {
  return (
    <img class={'input-control--preview'}
      style={{ width: 'auto', maxHeight: media.height + 'px' }}
      src={media.url}/>
  )
}