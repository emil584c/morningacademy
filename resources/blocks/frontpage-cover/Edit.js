import { useBlockProps, RichText } from '@wordpress/block-editor'
import ServerSideRender from '@wordpress/server-side-render'
import classNames from 'classnames'
import {__} from '@wordpress/i18n'
import metadata from './block.json'

export default function Edit({attributes, setAttributes, isSelected}) {
  const blockProps = useBlockProps({
    className: classNames('mt-frontpage-cover', 'page-container', {
      'is-selected': isSelected,
      'not-selected': !isSelected
    })
  })

  return (
    <section {...blockProps}>
      <RichText
        className={'mt-frontpage-cover__tagline tagline'}
        placeholder={__('Skriv din tagline', 'ma')}
        tagName={'p'}
        value={attributes.tagline}
        onChange={(tagline) => setAttributes({tagline})}
        allowedFormats={[]}
      />

      <ServerSideRender
        block={metadata.name}
      />
    </section>
  )
}
