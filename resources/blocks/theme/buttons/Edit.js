import { BlockControls, InnerBlocks, useBlockProps } from '@wordpress/block-editor'

export default function Edit ({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: 'mt-buttons'
  })

  return <>
    <BlockControls>

    </BlockControls>
    <div {...blockProps}>
      <InnerBlocks
        allowedBlocks={['ma/button']}
        template={[['ma/button']]}
        orientation="horizontal"
      />
    </div>
  </>
}
