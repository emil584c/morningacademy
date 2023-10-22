import { SVG, Rect } from '@wordpress/components'

export default function SvgBackground ({
  children,
  width,
  height,
  viewBoxWidth,
  viewBoxHeight,
  blur = 300
}) {
  return <div
    className="mt-svg-background"
    style={{
      width: `${viewBoxWidth}px`,
      height: `${viewBoxHeight}px`
    }}
  >
    <SVG
      className="mt-svg-background__svg"
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
