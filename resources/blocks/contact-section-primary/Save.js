import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import classNames from 'classnames'
import RightSVG from './RightSVG'
import LeftSVG from './LeftSVG'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-contact-section-primary')
  })

  return (
    <section {...blockProps}>
      <div className="mt-contact-section-primary__inner">
        <LeftSVG attributes={attributes}/>
        <div className="mt-contact-section-primary__content page-container">
          <div className="mt-contact-section-primary__text-container">
            <InnerBlocks.Content/>
          </div>
        </div>
        <RightSVG attributes={attributes}/>
      </div>
    </section>
  )
}
