import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'mt-secondary-cover'
  })

  return (
    <section {...blockProps}>
    <div className='mt-secondary-cover__inner page-container'>
      <div className='mt-secondary-cover__text-container'>
        <RichText.Content
          className="mt-secondary-cover__tagline mt-tagline"
          tagName={'p'}
          value={attributes.tagline}
          />
        <RichText.Content
          className="mt-secondary-cover__title"
          tagName={'h1'}
          value={attributes.title}
          />
        <RichText.Content
          className="mt-secondary-cover__text"
          tagName={'p'}
          value={attributes.text}
          />
      </div>
      <div className="mt-secondary-cover__images">
        <div className='mt-secondary-cover__image-container object-fit mt-secondary-cover__image-container--left'>
          {typeof attributes.firstImage === 'object' && attributes.firstImage !== null &&
            <img src={attributes.firstImage.src} alt={attributes.firstImage.alt ?? attributes.firstImage.title}/>
          }
        </div>
        <div className='mt-secondary-cover__image-container object-fit mt-secondary-cover__image-container--right'>
          {typeof attributes.secondImage === 'object' && attributes.secondImage !== null &&
            <img src={attributes.secondImage.src} alt={attributes.secondImage.alt ?? attributes.secondImage.title}/>
          }
      </div>
      </div>
    </div>
  </section>
  )
}
