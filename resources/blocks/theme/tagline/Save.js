import { RichText, useBlockProps } from '@wordpress/block-editor'
import classNames from 'classnames'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-tagline')
  })

  return <RichText.Content
    {...blockProps}
    tagName={attributes.tag}
    value={attributes.content}
  />
}
