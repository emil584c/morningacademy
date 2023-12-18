import { RichText, useBlockProps } from '@wordpress/block-editor'
import classNames from 'classnames'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-heading',{
      'mt-heading--has-bold': attributes.content.indexOf('<strong>') !== -1
    })
  })

  return <RichText.Content
    {...blockProps}
    tagName={attributes.tag}
    value={attributes.content}
  />
}
