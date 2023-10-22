import { useBlockProps } from '@wordpress/block-editor'
import ServerSideRender from '@wordpress/server-side-render'
import metadata from './block.json'

export default function Edit ({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps()
  return (
    <section {...blockProps}>
      <ServerSideRender
        block={metadata.name}
      />
    </section>
  )
}
