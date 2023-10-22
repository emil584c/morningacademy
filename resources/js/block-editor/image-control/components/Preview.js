import Image from './previews/Image'
import Video from './previews/Video'
import '../styles/media-preview.scss'

export default function Preview ({ media }) {
  if (media === null || typeof media === 'undefined') {
    return null
  }

  const fileExtension = media?.url.split('.').pop()

  const imageExtensions = ['jpg', 'jpeg', 'png', 'bmp', 'svg']
  if (imageExtensions.indexOf(fileExtension) >= 0) {
    return <div className={'media-preview'}>
      <Image media={media}/>
    </div>
  }

  const videoExtensions = ['mp4', 'webm']
  if (videoExtensions.indexOf(fileExtension) >= 0) {
    return <div className={'media-preview'}>
      <Video media={media}/>
    </div>
  }

  return <div className={'media-preview'}>
    <figure className={'media-preview__figure'}>
      <span>{fileExtension.toUpperCase()}</span>
    </figure>
  </div>
}
