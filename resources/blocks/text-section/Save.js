import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor'
import classNames from 'classnames'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-text-section')
  })

  return (
    <section {...blockProps}>
      <div className="mt-text-section__inner page-container">
        <div className="mt-text-section__title-container">
          <RichText.Content
            tagName={attributes.tag}
            className="mt-text-section__title"
            value={attributes.title}
          />
        </div>
        <div className="mt-text-section__text-container">
          <InnerBlocks.Content />
        </div>
      </div>
    </section>
  )
}
