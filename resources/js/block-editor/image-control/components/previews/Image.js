export default function Image ({ media }) {
  return <img
    className={'media-preview__image'}
    style={{ width: 'auto', maxHeight: media.height + 'px' }}
    src={media.url} alt={media?.alt}
  />
}
