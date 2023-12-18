import { InnerBlocks, useBlockProps, RichText } from '@wordpress/block-editor'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'mt-image-breaker'
  })

  return (
    <section {...blockProps}>
      <div className='mt-image-breaker__inner page-container'>
        <div className='mt-image-breaker__image-container object-fit object-fit mt-image-breaker__image-container--left'>
          {typeof attributes.firstImage === 'object' && attributes.firstImage !== null &&
            <img src={attributes.firstImage.src} alt={attributes.firstImage.alt ?? attributes.firstImage.title}/>
          }
        </div>
        <div className='mt-image-breaker__image-container object-fit object-fit mt-image-breaker__image-container--center'>
          {typeof attributes.secondImage === 'object' && attributes.secondImage !== null &&
            <img src={attributes.secondImage.src} alt={attributes.secondImage.alt ?? attributes.secondImage.title}/>
          }
        </div>
        <div className='mt-image-breaker__image-container object-fit object-fit mt-image-breaker__image-container--right'>
          {typeof attributes.thirdImage === 'object' && attributes.thirdImage !== null &&
            <img src={attributes.thirdImage.src} alt={attributes.thirdImage.alt ?? attributes.thirdImage.title}/>
          }
        </div>
      </div>
    </section>
  )
}
