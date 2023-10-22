import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: 'mt-buttons'
  })

  return <div {...blockProps}>
    <InnerBlocks.Content />
  </div>
}
