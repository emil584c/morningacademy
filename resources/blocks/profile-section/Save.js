import { useBlockProps, InnerBlocks, RichText  } from '@wordpress/block-editor'
import classNames from 'classnames'
import { __ } from '@wordpress/i18n'

export default function save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-profile-section')
  })

  return (
    <section {...blockProps}>
      <div className='mt-profile-section__box-container page-container'>
        <div className="mt-profile-section__form-container">
           <RichText.Content
              className="mt-profile-section__title"
              tagName={'h1'}
              value={attributes.title}
            />
          [wppb-edit-profile]
        </div>
        <InnerBlocks.Content/>
      </div>
    </section>
  )
}