import { InnerBlocks, RichText, useBlockProps } from '@wordpress/block-editor'
import classNames from 'classnames'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-post-slider-posts-container')
  })

  return (
    <section { ...blockProps }>
      <div className="mt-post-slider__inner page-container">
        <div className="mt-post-slider__top-container">
          <div className="mt-post-slider__text-container">
            {attributes.tagline && (
              <RichText.Content
                className={'mt-post-slider__tagline tagline'}
                tagName={'p'}
                value={attributes.tagline}
              />
            )}
            {attributes.title && (
              <RichText.Content
                className={'mt-post-slider__title title'}
                tagName={'h2'}
                value={attributes.title}
              />
            )}
          </div>
          <div className="mt-post-slider__navigation-container">
            <div className="mt-post-slider__navigation mt-post-slider__navigation--add-margin">
              <div className="swiper-button-prev swiper-button-prev--blue"></div>
              <div className="swiper-button-next swiper-button-next--blue"></div>
              {attributes.link && (
                <div className="mt-post-slider__top-button wp-block-button is-style-primary">
                  <a className="wp-block-button__link" href={attributes.link}>{attributes.linkText}</a>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mt-post-slider__post-wrapper">
          <div className="swiper">
            <div className="swiper-wrapper">
              <InnerBlocks.Content/>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
