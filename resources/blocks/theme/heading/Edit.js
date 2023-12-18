import { BlockControls, RichText, useBlockProps } from '@wordpress/block-editor'
import { ToolbarGroup } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { HeadingSelector } from '../../../js/block-editor'
import classNames from 'classnames'

export default function Edit ({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames('mt-heading',{
      'mt-heading--has-bold': attributes.content.indexOf('<strong>') !== -1
    })
  })

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
      placeholder={__('Your title here...', 'mt')}
      allowedFormats={['core/bold', 'core/italic']}
    />
  </>
}
