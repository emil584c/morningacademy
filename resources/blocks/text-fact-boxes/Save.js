import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'mt-text-fact-boxes'
  })

  return (
    <section {...blockProps}>
      <div className='mt-text-fact-boxes__inner page-container'>
        <div className="mt-text-fact-boxes__text-container">
          <RichText.Content
              className="mt-text-fact-boxes__tagline tagline"
              tagName={'p'}
              value={attributes.tagline}
            />
          <RichText.Content
              className="mt-text-fact-boxes__title"
              tagName={attributes.tag}
              value={attributes.title}
            />
        </div>
        <div className='mt-text-fact-boxes__box-container'>
          <InnerBlocks.Content />
        </div>
      </div>
    </section>
  )
}
