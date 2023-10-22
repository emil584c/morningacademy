import { useBlockProps, InnerBlocks, RichText  } from '@wordpress/block-editor'
import classNames from 'classnames'
import { __ } from '@wordpress/i18n'

export default function edit ({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames('mt-profile-section', {
      'is-selected': isSelected,
      'not-selected': !isSelected
    })
  })

  return <>
    <section {...blockProps}>
      <div className='mt-profile-section__box-container page-container'>
        <div className="mt-profile-section__form-container">
          <RichText
              className="mt-profile-section__title"
              tagName={'h1'}
              placeholder={__('Title', 'mf')}
              value={attributes.title}
              onChange={title => setAttributes({ title })}
              allowedFormats={[]}
            />

          [wppb-edit-profile]
        </div>
        <InnerBlocks
              allowedBlocks={['ma/buttons', 'core/buttons']}
              template={[
                ['core/buttons'],
              ]}
              renderAppender={InnerBlocks.ButtonBlockAppender}
            />
      </div>
    </section>
  </>
}