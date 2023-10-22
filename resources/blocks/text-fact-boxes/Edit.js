import { BlockControls, InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'
import { ToolbarGroup } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { HeadingSelector } from '../../js/block-editor'

export default function Edit ({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: 'mt-text-fact-boxes'
  })

  return (
    <>
    <BlockControls>
      <ToolbarGroup>
        <HeadingSelector
          value={attributes.tag}
          onChange={tag => setAttributes({ tag })}
        />
      </ToolbarGroup>
    </BlockControls>
    <section {...blockProps}>
      <div className='mt-text-fact-boxes__inner page-container'>
        <div className="mt-text-fact-boxes__text-container">
          <RichText
              className="mt-text-fact-boxes__tagline tagline"
              tagName={'p'}
              placeholder={__('Tagline', 'ma')}
              value={attributes.tagline}
              onChange={tagline => setAttributes({ tagline })}
              allowedFormats={[]}
            />
          <RichText
              className="mt-text-fact-boxes__title"
              tagName={attributes.tag}
              placeholder={__('Title', 'ma')}
              value={attributes.title}
              onChange={title => setAttributes({ title })}
              allowedFormats={[]}
            />
        </div>
        <div className='mt-text-fact-boxes__box-container'>
          <InnerBlocks
            allowedBlocks={['ma/text-fact-box']}
            template={[
              ['ma/text-fact-box'],
              ['ma/text-fact-box'],
              ['ma/text-fact-box'],
              ['ma/text-fact-box']
            ]}
            renderAppender={InnerBlocks.ButtonBlockAppender}
          />
        </div>
      </div>
    </section>
    </>
  )
}
