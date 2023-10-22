import MediaWrap from './MediaWrap'
import { Icon, ToolbarButton, ToolbarGroup } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import './image-control.css'

export default function ImageToolbar ({
  value,
  onChange,
  label = __('Select Media'),
  size,
  allowedTypes
}) {
  const hasValue = typeof value === 'object' && value !== null

  return (
    <>
      <MediaWrap
        value={value}
        allowedTypes={allowedTypes}
        onSelect={onChange}
        size={size}
        render={({ open }) => <ToolbarButton icon={'format-image'} label={label} isActive={hasValue} onClick={open}/>}
      />
      {
        hasValue &&
        <ToolbarButton
          icon={'trash'}
          label={__('Remove')}
          onClick={() => onChange(null)}
        />
      }
    </>
  )
}
