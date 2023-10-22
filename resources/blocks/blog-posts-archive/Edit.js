import {useBlockProps, InspectorControls} from '@wordpress/block-editor'
import {PanelBody, SelectControl} from "@wordpress/components";
import classNames from "classnames";

export default function Edit ({ attributes, setAttributes, isSelected }) {
  const blockProps = useBlockProps({
    className: classNames('mt-post-archive', {
      'is-selected': isSelected,
      'not-selected': !isSelected
    })
  })
  return (
    <>
      <InspectorControls>
        <PanelBody
          title={'Vælg type'}
        >
          <SelectControl
            onChange={(type) => {setAttributes({type})}}
            options={[
              {
                disabled: true,
                label: 'Vælg type',
                value: ''
              },
              {
                label: 'Posts',
                value: 'post'
              },
              {
                label: 'Guide',
                value: 'guide'
              },
            ]}
          />
        </PanelBody>
      </InspectorControls>
      <section { ...blockProps }>
        <div className="mt-post-archive__container page-container">
          <p className={'editor-desc'}>Dine indlæg vil blive vist her dynamisk...</p>
        </div>
      </section>
    </>
  )
}
