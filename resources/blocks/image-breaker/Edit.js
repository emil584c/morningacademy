import { useBlockProps, InspectorControls } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { ImageControl } from 'wp-blockeditor-utilities'
import { PanelBody } from '@wordpress/components'

export default function Edit ({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: 'mt-image-breaker'
  })

  return (
    <>
    <InspectorControls>
        <PanelBody
          title={__('Billede', 'mf')}
        >
          <p className={'mt-text'}>{__('Billede (400px * 580px)', 'mf')}</p>
          <ImageControl
            value={attributes.firstImage}
            onChange={(firstImage) => setAttributes({firstImage})}
          />
          <p className={'mt-text'}>{__('Billede (400px * 580)', 'mf')}</p>
          <ImageControl
            value={attributes.secondImage}
            onChange={(secondImage) => setAttributes({secondImage})}
          />
          <p className={'mt-text'}>{__('Billede (400px * 580)', 'mf')}</p>
          <ImageControl
            value={attributes.thirdImage}
            onChange={(thirdImage) => setAttributes({thirdImage})}
          />
        </PanelBody>
    </InspectorControls>
    <section {...blockProps}>
      <div className='mt-image-breaker__inner page-container'>
        <div className='mt-image-breaker__image-container object-fit mt-image-breaker__image-container--left'>
          {typeof attributes.firstImage === 'object' && attributes.firstImage !== null ?
            <img src={attributes.firstImage.src} alt={attributes.firstImage.alt ?? attributes.firstImage.title}/> :
            <div className={'mt-image-placeholder'}>{__('Tilføj et billede', 'mf')}</div>
          }
        </div>
        <div className='mt-image-breaker__image-container object-fit mt-image-breaker__image-container--center'>
          {typeof attributes.secondImage === 'object' && attributes.secondImage !== null ?
            <img src={attributes.secondImage.src} alt={attributes.secondImage.alt ?? attributes.secondImage.title}/> :
            <div className={'mt-image-placeholder'}>{__('Tilføj et billede', 'mf')}</div>
          }
        </div>
        <div className='mt-image-breaker__image-container object-fit mt-image-breaker__image-container--right'>
          {typeof attributes.thirdImage === 'object' && attributes.thirdImage !== null ?
            <img src={attributes.thirdImage.src} alt={attributes.thirdImage.alt ?? attributes.thirdImage.title}/> :
            <div className={'mt-image-placeholder'}>{__('Tilføj et billede', 'mf')}</div>
          }
        </div>
      </div>
    </section>
    </>
  )
}
