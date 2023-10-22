import PropTypes from 'prop-types'
import MediaWrap from './MediaWrap'
import { Button, ResponsiveWrapper } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import Preview from './components/Preview'
import './styles/image-control.scss'

export default function ImageControl ({
  value,
  onChange,
  label = __('Select Media'),
  size,
  allowedTypes
}) {

  const hasValue = typeof value === 'object' && value !== null

  const preview = function (open) {
    return <div className={'image-control'}>
      <Button
        title={label}
        onClick={open}
        className={'image-control__preview-button editor-post-featured-image__preview'}
      >
        <div
          style={{
            aspectRatio: `${value.width}/${value.height}`
          }}
        >
          <Preview media={value}/>
        </div>
      </Button>
    </div>
  }
  const choose = function (open) {
    return <div className={'image-control'}>
      <Button
        title={label}
        onClick={open}
        className={'image-control__toggle-button editor-post-featured-image__toggle'}
      >
        {label}
      </Button>
    </div>
  }

  return <>
    <MediaWrap
      value={value}
      allowedTypes={allowedTypes}
      onSelect={onChange}
      size={size}
      render={({ open }) => hasValue ? preview(open) : choose(open)}
    />
    {
      hasValue &&
      <Button
        className={'image-control__remove-button'}
        onClick={() => onChange(null)}
        isLink
        isDestructive
      >
        {__('Remove')}
      </Button>
    }
  </>
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
