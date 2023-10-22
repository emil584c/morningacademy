import MediaWrap from './MediaWrap'
import { __ } from '@wordpress/i18n'
import { Button } from '@wordpress/components'
import Preview from './Preview'
import './image-control.css'

export default function ImageBoxInput ({
  value,
  onChange,
  label = __('Select Media'),
  fallback,
  size,
  allowedTypes,
  render,
  required = false
}) {
  const hasValue = typeof value === 'object' && value !== null

  if (typeof render !== 'function') {
    render = function (open, media) {
      return (
        <div className={'input-control--box-input'}>
          <Button label={label} onClick={open}>
            <Preview media={media}/>
          </Button>
          <div className="overlay">
            <p>{label}</p>
          </div>
          {!required && (
            <Button
              className={'remove'}
              label={__('Remove')}
              onClick={(e) => {
                e.preventDefault()
                onChange(null)
              }}
            >
              {__('Remove')}
            </Button>
          )}
        </div>
      )
    }
  }
  if (typeof fallback !== 'function') {
    fallback = function (open) {
      return (
        <div className={'input-control--box-input'}>
          <Button className={'fallback'} icon={'plus'} label={label} onClick={open}>{label}</Button>
        </div>
      )
    }
  }

  return (
    <MediaWrap value={value}
               allowedTypes={allowedTypes}
               onSelect={onChange}
               size={size}
               render={({ open }) => hasValue
                 ? render(open, value)
                 : fallback(open)
               }
    />
  )
}