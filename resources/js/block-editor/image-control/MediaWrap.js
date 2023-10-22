import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor'

export default function MediaWrap ({ onSelect, value, children, size, render, allowedTypes = ['image'] }) {
  const handleOnChange = function (selectedMedia) {
    let newValue = {
      id: selectedMedia.id,
      src: selectedMedia.url,
      url: selectedMedia.url,
      name: selectedMedia.name ?? '',
      title: selectedMedia.title ?? '',
      alt: selectedMedia.alt_text ?? '',
      caption: selectedMedia.caption ?? '',
      description: selectedMedia.description ?? '',
      width: selectedMedia.width,
      height: selectedMedia.height,
      type: selectedMedia.type,
      subType: selectedMedia.subtype
    }
    if (size && selectedMedia.sizes?.[size]) {
      let sizeInfo = selectedMedia.sizes[size]
      newValue.src = sizeInfo.url
      newValue.url = sizeInfo.url
      newValue.width = sizeInfo.width
      newValue.height = sizeInfo.height
    }

    onSelect(newValue)
  }
  return (
    <MediaUploadCheck
      fallback={children}
    >
      <MediaUpload
        onSelect={handleOnChange}
        allowedTypes={allowedTypes}
        value={value}
        render={render}
      />
    </MediaUploadCheck>
  )
}
