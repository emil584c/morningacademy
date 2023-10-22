import { createElement } from '@wordpress/element'

import { __ } from '@wordpress/i18n'
import {
  Dropdown,
  MenuGroup,
  ToolbarButton,
  Button, Tooltip
} from '@wordpress/components'
import { DOWN } from '@wordpress/keycodes'
import getDefaultSpacingControls from './default-spacing-controls'

export default function SpacingControl ({
  value,
  onChange,
  spacingControls = getDefaultSpacingControls(),
  label = __('Spacings'),
}) {
  return createElement(Dropdown, {
    popoverProps: {
      className: 'block-editor-spacing-control__popover',
      headerTitle: label
    },
    renderToggle: ({
      isOpen,
      onToggle
    }) => {
      const openOnArrowDown = event => {
        if (!isOpen && event.keyCode === DOWN) {
          event.preventDefault()
          onToggle()
        }
      }

      return createElement(ToolbarButton, {
        showTooltip: true,
        onClick: onToggle,
        'aria-haspopup': 'true',
        'aria-expanded': isOpen,
        onKeyDown: openOnArrowDown,
        label: label,
        icon: 'align-wide'
      })
    },
    renderContent: () => createElement(MenuGroup, {},
      <SpacingControlGroups spacingControls={spacingControls} onChange={onChange} value={value}/>
    )
  })
}

// Handles validation and update of change and render each spacingControl
function SpacingControlGroups ({ spacingControls, onChange, value }) {
  const handleOnChange = function (position, spacing) {
    // if value has not yet been set then set it to an empty object
    if (typeof value !== 'object' || value === null) {
      value = {}
    }
    // If the clicked spacing for this position is already selected then unselect
    if (value?.[position] === spacing) {
      delete value[position]
    } else {
      value[position] = spacing
    }
    // Clone object and set to make sure that state is seen as updated
    onChange({ ...value })
  }
  return spacingControls.map((el, i) =>
    <SpacingControlGroup key={i} label={el.label} position={el.position} controls={el.controls}
                         onChange={handleOnChange} value={value}/>
  )
}

// For each spacing position render a group with a title
function SpacingControlGroup ({ label, position, controls, onChange, value }) {
  // Add position to the change event
  function handleOnChange (val) {
    onChange(position, val)
  }

  const buttons = controls.map((el, i) =>
    <Tooltip key={i} text={el.title}>
      <Button label={el.title} isPressed={value?.[position] === el.spacing}
              onClick={() => handleOnChange(el.spacing)}>{el.label}</Button>
    </Tooltip>)

  return (
    <div style={{ marginBottom: '16px' }}>
      <div className={'components-menu-group__label'}>{label}:</div>
      <div style={{ display: 'inline-flex' }}>
        {buttons}
      </div>
    </div>
  )
}
