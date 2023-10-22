import { RichText, useBlockProps } from '@wordpress/block-editor'
import classNames from 'classnames'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-button', {
      [`mt-button--${attributes.type}`]: true
    })
  })

  return <a
    {...blockProps}
    href={attributes?.post?.permalink ?? null}
    target={attributes?.post?.newTab ? '_blank' : null}
    rel={attributes?.post?.newTab ? 'noopener' : null}
  >
    {attributes.type === 'play' && <div className="mt-button__play-arrows">
      <div className="mt-button__play-arrow mt-button__play-arrow--white"/>
      <div className="mt-button__play-arrow mt-button__play-arrow--dark"/>
    </div>}
    <RichText.Content
      tagName={'span'}
      value={attributes.text}
      className="mt-button__text"
    />
    {attributes.type === 'underline-arrow' && <div className="mt-button__underline-arrows">
      <div className="mt-button__underline-arrow mt-button__underline-arrow--white"/>
      <div className="mt-button__underline-arrow mt-button__underline-arrow--prim"/>
    </div>}
  </a>
}
