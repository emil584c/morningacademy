/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n'
import { hasBlockSupport, getBlockSupport } from '@wordpress/blocks'
import { createHigherOrderComponent } from '@wordpress/compose'
import { Platform } from '@wordpress/element'
import { BlockControls } from '@wordpress/block-editor'
import classNames from 'classnames'
import SpacingControl from '../spacing-control/SpacingControl'

export default function Spacing () {
  wp.hooks.addFilter('blocks.registerBlockType', 'morningtrain/mtSpacing/attribute', addAttribute)
  wp.hooks.addFilter('editor.BlockEdit', 'morningtrain/mtSpacing/with-block-control', withBlockControl)
}

const SPACING_SCHEMA = {
  type: 'object',
  default: {}
}

const DEFAULT_POSITIONS = [
  'bottom',
  'top'
]
const DEFAULT_SIZES = [
  'extraSmall',
  'small',
  'medium',
  'large',
  'extraLarge'
]

function resolveSpacingOptions (supportObject) {
  let options = {}
  let positions = Object.keys(supportObject)
  if (positions.length === 0) {
    positions = DEFAULT_POSITIONS
  }
  let positionsLength = positions.length
  for (let i = positionsLength - 1; i >= 0; i--) {
    let positionName = positions[i]
    let sizes = DEFAULT_SIZES
    if (supportObject?.[positionName] !== null && typeof supportObject[positionName] === 'object') {
      sizes = supportObject[positionName]
    }
    options[positionName] = sizes
  }
  return options
}

/**
 * Filters registered block settings, extending attributes with anchor using ID
 * of the first node.
 *
 * @param {Object} settings Original block settings.
 *
 * @return {Object} Filtered block settings.
 */
function addAttribute (settings) {
  // Allow blocks to specify their own attribute definition with default values if needed.
  if ('type' in (settings.attributes?.mtSpacing ?? { top: 'medium', bottom: 'medium' })) {
    return settings
  }

  if (hasBlockSupport(settings, 'mtSpacing')) {
    // Gracefully handle if settings.attributes is undefined.
    settings.attributes = {
      ...settings.attributes,
      mtSpacing: SPACING_SCHEMA,
    }
  }

  return settings
}

/**
 * Override the default edit UI to include a new block inspector control for
 * assigning the anchor ID, if block supports anchor.
 *
 * @param {WPComponent} BlockEdit Original component.
 *
 * @return {WPComponent} Wrapped component.
 */
const withBlockControl = createHigherOrderComponent(
  (BlockEdit) => {
    return (props) => {
      const hasSpacing = hasBlockSupport(props.name, 'mtSpacing')

      // Update the spacing classes and attribute
      const updateSpacing = function (attributes, setAttributes, spacing) {
        // First remove all existing spacing classes so that we don't duplicate them
        const classString = attributes.className ? attributes.className.replace(/mtSpacing-(\w+)-(\w+)( ?)/g, '') : ''
        setAttributes({
          className: classNames(
            classString, // The current classes without those starting with mtSpacing
            Object.keys(attributes.mtSpacing).map(position => {
              return `mtSpacing-${position}-${attributes.mtSpacing[position]}` // Add our new spacing classes!
            })
          ),
          mtSpacing: spacing // Save the attribute so that we can use it on load
        })
      }

      const getLabel = (key) => {
        const labels = {
          extraSmall: '56px',
          small: '80px',
          medium: '104px',
          large: '120px',
          extraLarge: '152px'
        }
        return labels[key]
      }

      if (hasSpacing && props.isSelected) {
        const spacingOptions = resolveSpacingOptions(getBlockSupport(props.name, 'mtSpacing'))
        const isWeb = Platform.OS === 'web'

        return (
          <>
            <BlockEdit {...props} />
            {isWeb && (
              <BlockControls>
                <SpacingControl
                  value={props.attributes.mtSpacing}
                  onChange={spacing => updateSpacing(props.attributes, props.setAttributes, spacing)}
                  spacingControls={Object.keys(spacingOptions).map(position => {
                    return {
                      label: __(position, 'morningtrain'),
                      position,
                      controls: spacingOptions[position].map(size => {
                        return {
                          label: getLabel(size),
                          title: size.toUpperCase(),
                          spacing: size
                        }
                      })
                    }
                  })}
                />
              </BlockControls>
            )}
          </>
        )
      }

      return <BlockEdit {...props} />
    }
  },
  'withBlockControl'
)
