import { InspectorControls, useBlockProps, RichText } from '@wordpress/block-editor'
import { PanelBody, TextControl, __experimentalGrid as Grid } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { Spacer, Text, UrlSearch } from '../../../js/block-editor'
import classNames from 'classnames'
import { useEffect } from '@wordpress/element'

export default function Edit ({ attributes, setAttributes, isSelected, context }) {
  const blockProps = useBlockProps({
    className: classNames('mt-button', {
      [`mt-button--${attributes.type}`]: true
    })
  })

  const types = context['button/types'] || ['primary', 'secondary', 'arrow']

  useEffect(() => {
    if (types.length === 1 && attributes.type !== types[0]) {
      setAttributes({ type: types[0] })
    }
  }, [])

  return <>
    <InspectorControls>
      <PanelBody title={__('Button Options', 'mt')}>
        {types.length > 0 && <>
          <Text
            text={__('Type', 'mt')}
            mb={8}
          />
          <Grid
            columns={2}
            className="mt-button-grid"
          >
            {types.map((type) => (
              <div
                key={type}
                className={classNames('mt-button-grid__item', {
                  'mt-button-grid__item--active': attributes.type === type
                })}
                onClick={() => setAttributes({ type })}
              >
                <div className={classNames('mt-button mt-button--admin-display', {
                  [`mt-button--${type}`]: true
                })}>
                  {type === 'play' && <div className="mt-button__play-arrows">
                    <div className="mt-button__play-arrow mt-button__play-arrow--white"/>
                    <div className="mt-button__play-arrow mt-button__play-arrow--dark"/>
                  </div>}
                  <div className="mt-button__link">Button</div>
                  {type === 'underline-arrow' && <div className="mt-button__underline-arrows">
                    <div className="mt-button__underline-arrow mt-button__underline-arrow--white"/>
                    <div className="mt-button__underline-arrow mt-button__underline-arrow--prim"/>
                  </div>}
                </div>
              </div>
            ))}
          </Grid>
          <Spacer
            spacing={24}
          />
        </>}
        <TextControl
          label={__('Text', 'mt')}
          value={attributes.text}
          onChange={(text) => setAttributes({ text })}
        />
        <UrlSearch
          value={attributes.post}
          onChange={(post) => setAttributes({ post })}
        />
      </PanelBody>
    </InspectorControls>
    <a
      {...blockProps}
      target={attributes?.post?.newTab ? '_blank' : null}
      rel={attributes?.post?.newTab ? 'noopener' : null}
    >
      {attributes.type === 'play' && <div className="mt-button__play-arrows">
        <div className="mt-button__play-arrow mt-button__play-arrow--white"/>
        <div className="mt-button__play-arrow mt-button__play-arrow--dark"/>
      </div>}
      <RichText
        tagName={'span'}
        value={attributes.text}
        className="mt-button__text"
        onChange={text => setAttributes({ text })}
        placeholder={__('Button text', 'mt')}
        allowedFormats={[]}
      />
      {attributes.type === 'underline-arrow' && <div className="mt-button__underline-arrows">
        <div className="mt-button__underline-arrow mt-button__underline-arrow--white"/>
        <div className="mt-button__underline-arrow mt-button__underline-arrow--prim"/>
      </div>}
    </a>
  </>
}
