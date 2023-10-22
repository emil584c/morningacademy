import { useBlockProps, InspectorControls, RichText, InnerBlocks, BlockControls } from '@wordpress/block-editor'
import classNames from 'classnames'
import { __ } from '@wordpress/i18n'
import { PanelBody, ToolbarGroup, TextControl } from '@wordpress/components'
import { HeadingSelector, UrlSearch } from '../../js/block-editor'
import React from 'react'

export default function edit ({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames('mt-text-section', {
      'is-selected': isSelected,
      'not-selected': !isSelected
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
    <InspectorControls>
      <PanelBody title={__('Options', 'ma')}>
        <HeadingSelector.SelectControl
          value={attributes.tag}
          onChange={tag => setAttributes({ tag })}
        />
      </PanelBody>
    </InspectorControls>
    <section {...blockProps}>
      <div className="mt-text-section__inner page-container">
        <div className="mt-text-section__title-container">
          <RichText
            tagName={attributes.tag}
            className="mt-text-section__title"
            placeholder={__('Title', 'ma')}
            value={attributes.title}
            onChange={title => setAttributes({ title })}
            allowedFormats={[]}
          />
        </div>
        <div className="ma-text-section__text-container">
          <InnerBlocks
            allowedBlocks={['core/paragraph', 'core/list', 'ma/button']}
            template={[
              ['core/paragraph'],
              ['ma/button']
            ]}
            renderAppender={InnerBlocks.ButtonBlockAppender}
          />
        </div>
      </div>
    </section>
  </>
}
