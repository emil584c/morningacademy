import { InnerBlocks, useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor'
import { __ } from '@wordpress/i18n'
import { ImageControl } from 'wp-blockeditor-utilities'
import { PanelBody } from '@wordpress/components'

export default function Edit ({ attributes, setAttributes, isSelected, clientId }) {
  const blockProps = useBlockProps({
    className: 'mt-secondary-cover'
  })

  return (
   <>
   <InspectorControls>
        <PanelBody
          title={__('Billede', 'ma')}
        >
          <p className={'mt-text'}>{__('Billede (840px * 580px)', 'ma')}</p>
          <ImageControl
            value={attributes.firstImage}
            onChange={(firstImage) => setAttributes({firstImage})}
          />
          <p className={'mt-text'}>{__('Billede (400px * 580px)', 'ma')}</p>
          <ImageControl
            value={attributes.secondImage}
            onChange={(secondImage) => setAttributes({secondImage})}
          />
          
          <p
            className={'mt-help-text'}>{__('Tilføj en afspil knap og åben video i et popup', 'mf')}</p>
        </PanelBody>
    </InspectorControls>
    <section {...blockProps}>
      <div className='mt-secondary-cover__inner page-container'>
        <div className='mt-secondary-cover__text-container'>
          <RichText
            className="mt-secondary-cover__tagline mt-tagline"
            tagName={'p'}
            placeholder={__('tagline', 'ma')}
            value={attributes.tagline}
            onChange={tagline => setAttributes({ tagline })}
            allowedFormats={[]}
            />
          <RichText
            className="mt-secondary-cover__title"
            tagName={'h1'}
            placeholder={__('Title', 'mf')}
            value={attributes.title}
            onChange={title => setAttributes({ title })}
            allowedFormats={[]}
            />
          <RichText
            className="mt-secondary-cover__text"
            tagName={'p'}
            placeholder={__('Tekst', 'ma')}
            value={attributes.text}
            onChange={text => setAttributes({ text })}
            allowedFormats={[]}
            />
        </div>
        <div className="mt-secondary-cover__images">
        <div className='mt-secondary-cover__image-container object-fit mt-secondary-cover__image-container--left'>
          {typeof attributes.firstImage === 'object' && attributes.firstImage !== null ?
            <img src={attributes.firstImage.src} alt={attributes.firstImage.alt ?? attributes.firstImage.title}/> :
            <div className={'mt-image-placeholder'}>{__('Tilføj et billede', 'mf')}</div>
          }
        </div>
          <div className='mt-secondary-cover__image-container object-fit mt-secondary-cover__image-container--right'>
          {typeof attributes.secondImage === 'object' && attributes.secondImage !== null ?
            <img src={attributes.secondImage.src} alt={attributes.secondImage.alt ?? attributes.secondImage.title}/> :
            <div className={'mt-image-placeholder'}>{__('Tilføj et billede', 'mf')}</div>
          }
        </div>
        </div>
      </div>
    </section>
    </>
  )
}
