import { InnerBlocks, useBlockProps, RichText} from '@wordpress/block-editor'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'mt-text-fact-box'
  })

  return (
    <div {...blockProps}>
      <div className='mt-text-fact-box__divider'></div>
      <div className="mt-text-fact-box__text-container">
            <RichText.Content
              className="mt-text-fact-boxes__title"
              tagName={'h4'}
              value={attributes.title}
            />
            <RichText.Content
              className="mt-text-fact-boxes__text"
              tagName={'p'}
              value={attributes.text}
            />
        </div>
    </div>
  )
}
