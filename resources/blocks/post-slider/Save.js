import { InnerBlocks, useBlockProps } from '@wordpress/block-editor'
import classNames from "classnames";

export default function Save ({ attributes }) {
  const blockProps = useBlockProps.save({
    className: classNames('mt-post-slider')
  })

  return (
    <div { ...blockProps }>
        <InnerBlocks.Content/>
    </div>
  )
}
