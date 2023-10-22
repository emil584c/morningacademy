import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'

export default function Edit ({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: 'mt-text-fact-box'
  })

  return (
    <div {...blockProps}>
      <div className='mt-text-fact-box__divider'></div>
      <div className='mt-text-fact-box__text-container'>
          <RichText
              className="mt-text-fact-boxes__title"
              tagName={'h4'}
              placeholder={__('Title', 'ma')}
              value={attributes.title}
              onChange={title => setAttributes({ title })}
              allowedFormats={[]}
            />
            <RichText
              className="mt-text-fact-boxes__text"
              tagName={'p'}
              placeholder={__('Text', 'ma')}
              value={attributes.text}
              onChange={text => setAttributes({ text })}
              allowedFormats={[]}
            />
      </div>
    </div>
  )
}
