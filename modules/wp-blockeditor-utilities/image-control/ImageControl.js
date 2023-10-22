import PropTypes from 'prop-types'
import MediaWrap from './MediaWrap'
import { Button, ResponsiveWrapper } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import Preview from './Preview'
import './image-control.css'

export default function ImageControl ({
  value,
  onChange,
  label = __('Select Media'),
  size,
  allowedTypes
}) {
  const hasValue = typeof value === 'object' && value !== null
  const preview = function (open) {
    return <Button
      title={label}
      onClick={open}
      className={'media-control editor-post-featured-image__preview'}
    >
      <ResponsiveWrapper
        naturalHeight={value.height}
        naturalWidth={value.width}
      >
        <Preview media={value}/>
      </ResponsiveWrapper>
    </Button>
  }
  const choose = function (open) {
    return <Button
      title={label}
      onClick={open}
      className={'media-control editor-post-featured-image__toggle'}
    >
      {label}
    </Button>
  }

  return (
    <>
      <MediaWrap value={value}
                 allowedTypes={allowedTypes}
                 onSelect={onChange}
                 size={size}
                 render={({ open }) => hasValue ? preview(open) : choose(open)}/>
      {
        hasValue &&
        <Button
          style={{ display: 'block' }}
          onClick={() => onChange(null)}
          isLink
          isDestructive
        >
          {__('Remove')}
        </Button>
      }
    </>
  )
}

ImageControl.propTypes = {
  label: PropTypes.string,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  size: PropTypes.string,
  beforeChange: PropTypes.func,
  allowedTypes: PropTypes.array,
}
