import { InspectorControls, BlockControls, RichText, useBlockProps } from '@wordpress/block-editor'
import { PanelBody, ToolbarGroup, __experimentalGrid as Grid } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { useEffect } from '@wordpress/element'
import classNames from 'classnames'
import { Text, HeadingSelector } from '../../../js/block-editor'

export default function Edit ({ attributes, setAttributes, isSelected, context }) {
  const blockProps = useBlockProps({
    className: classNames('mt-tagline', {
      'is-selected': isSelected,
      'not-selected': !isSelected
    })
  })

  const capitalizeFLetter = (text) => {
    const firstLetter = text[0]
    const rest = text.slice(1)
    return firstLetter.toUpperCase() + rest
  }

  return <>
    <BlockControls>
      <ToolbarGroup>
        <HeadingSelector
          value={attributes.tag}
          onChange={tag => setAttributes({ tag })}
        />
      </ToolbarGroup>
    </BlockControls>
    <RichText
      {...blockProps}
      tagName={attributes.tag}
      value={attributes.content}
      onChange={content => setAttributes({ content })}
      placeholder={__('Your tagline here...', 'mt')}
      allowedFormats={[]}
    />
  </>
}
