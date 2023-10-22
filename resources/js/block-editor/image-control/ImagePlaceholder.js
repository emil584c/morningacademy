import MediaWrap from './MediaWrap'
import { Button, Placeholder, Icon } from '@wordpress/components'
import './styles/image-placeholder.scss'

export default function ImagePlaceholder ({
  value,
  onChange,
  renderPlaceholder,
  removeLabel = 'Remove image',
  previewLabel = 'Replace image',
  previewStyle = {},
  renderPreview,
  size,
  allowedTypes,
  showUploadButton = true,
  showActions = true
}) {

  if (typeof renderPlaceholder !== 'function') {
    renderPlaceholder = (open) => {
      return <div className={'image-placeholder__placeholder-container'}>
        {showUploadButton && (
          <Button
            onClick={open}
            variant="primary"
            className={'image-placeholder__placeholder-upload'}
          >
            <Icon icon={'upload'}/>
          </Button>
        )}
        <Placeholder
          className={'image-placeholder__placeholder'}
          withIllustration
        />
      </div>
    }
  }

  if (typeof renderPreview !== 'function') {
    renderPreview = (open, value) => {
      return <div className={'image-placeholder__preview-container'}>
        <img src={value?.url} alt={value?.alt} style={previewStyle} className={'image-placeholder__preview'} />
        {showActions && <>
          <Button
            onClick={open}
            className={'image-placeholder__preview-replace'}
          >
            {previewLabel}
          </Button>
          <Button
            onClick={() => onChange(null)}
            isDestructive
            className={'image-placeholder__preview-remove'}
          >
            {removeLabel}
          </Button>
        </>}
      </div>
    }
  }

  return <MediaWrap
    value={value}
    allowedTypes={allowedTypes}
    onSelect={onChange}
    size={size}
    render={({ open }) => {
      return !value
        ? renderPlaceholder(open)
        : renderPreview(open, value)
    }}
  />
}
