import classNames from 'classnames'
import ImageControl from '../image-control/ImageControl'
import { RangeControl } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import Spacer from './Spacer'
import Text from './Text'
import Help from './Help'
import { SVG, Rect, G } from '@wordpress/components'

const ImagePill = ({
  value,
  className = '',
  type = '',
  width,
  height,
  sizes = [],
  noAnimation = false
}) => {

  const calculatedX = (value?.x ?? 50) * -1

  const inlineStyleTag = () => {

    // Add main size
    let css = `
      [data-id="${value?.id}"] {
        width: ${width}px;
        height: ${height}px;
      }
      [data-id="${value?.id}"] .mt-image-pill__image {
        transform: translateX(calc(${calculatedX}% + ${(width / 100) * (value?.x ?? 50)}px));
      }
    `

    // Add additional sizes
    if (sizes.length > 0) {
      css += sizes.map((size) => {
        return `
          @media screen and (max-width: ${size.bp}px) {
            [data-id="${value?.id}"] {
              width: ${size.width}px;
              height: ${size.height}px;
            }
            [data-id="${value?.id}"] .mt-image-pill__image {
              transform: translateX(calc(${calculatedX}% + ${(size.width / 100) * (value?.x ?? 50)}px));
            }
          }
        `
      }).join('')
    }

    return css ? <style>{css}</style> : null
  }

  return <>
    {inlineStyleTag()}
    <div
      className={classNames('mt-image-pill', {
        [`mt-image-pill--type-${type}`]: type !== '',
        [className]: className !== '',
        'mt-image-pill--no-animation': noAnimation
      })}
      data-id={value?.id}
    >
      <div className="mt-image-pill__inner">
        <div className="mt-image-pill__bg"/>
        {value?.image && (
          <img
            src={value?.image?.url}
            alt={value?.image?.alt}
            className={'mt-image-pill__image'}
            style={{
              height: `${value?.height ?? 90}%`
            }}
          />
        )}
      </div>
    </div>
  </>
}

ImagePill.Background = ({
  children,
  width,
  height,
  viewBoxWidth,
  viewBoxHeight,
  blur = 300
}) => {
  return <div
    className="mt-image-pill-background"
    style={{
      width: `${viewBoxWidth}px`,
      height: `${viewBoxHeight}px`
    }}
  >
    <SVG
      className="mt-image-pill-background__svg"
      width={viewBoxWidth}
      height={viewBoxHeight}
    >
      <defs>
        <filter
          id="mt-image-pill-filter"
          x={-(viewBoxWidth - width) / 2}
          y={-(viewBoxHeight - height) / 2}
          width={viewBoxHeight}
          height={viewBoxHeight}
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={blur} />
        </filter>
        <linearGradient id="mt-image-pill-gradient">
          {children}
        </linearGradient>
      </defs>
      <Rect
        filter="url(#mt-image-pill-filter)"
        width={width}
        height={height}
        x={(viewBoxWidth - width) / 2}
        y={(viewBoxHeight - height) / 2}
        rx="999"
        fill="url(#mt-image-pill-gradient)"
      />
    </SVG>
  </div>
}

ImagePill.Controls = ({
  value,
  onChange
}) => {
  return <>
    <Text
      text={__('Choose Image', 'mf')}
      mb={8}
    />
    <ImageControl
      value={value?.image}
      onChange={(image) => onChange({ ...value, image })}
      size={'large'}
    />
    <Spacer/>
    <RangeControl
      label={__('Image Height', 'mf')}
      initialPosition={90}
      value={value?.height}
      onChange={(height) => onChange({ ...value, height })}
      min={90}
      max={110}
      renderTooltipContent={(value) => `${value}%`}
      withInputField={false}
      color="#dddddd"
      railColor="#dddddd"
      marks={[
        { 'value': 90, 'label': '90%' },
        { 'value': 100, 'label': '100%' },
        { 'value': 110, 'label': '110%' }
      ]}
    />
    <Help
      text={__('Choose the height of the image. It can range from 90% to 110% of the pill.', 'mf')}
      mt={-24}
    />
    <Spacer/>
    <RangeControl
      label={__('Image Horizontal Position', 'mf')}
      initialPosition={50}
      value={value?.x}
      onChange={(x) => onChange({ ...value, x })}
      min={0}
      max={100}
      renderTooltipContent={(value) => `${value}%`}
      withInputField={false}
      color="#dddddd"
      railColor="#dddddd"
      marks={[
        { 'value': 0, 'label': '0%' },
        { 'value': 50, 'label': '50%' },
        { 'value': 100, 'label': '100%' }
      ]}
    />
    <Help
      text={__('Choose the horizontal position of the image. The image can only move between the edges of the pill.', 'mf')}
      mt={-24}
    />
  </>
}

export default ImagePill
