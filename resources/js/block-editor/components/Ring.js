import classNames from 'classnames'
import { SVG } from '@wordpress/components'

export default function Ring ({ className = '', type = '', size = 20, strokeWidth = 4 }) {
  return <SVG
    width={size}
    height={size}
    className={classNames('mt-ring', {
      [`mt-ring--type-${type}`]: type !== '',
      [className]: className !== ''
    })}
  >
    <circle
      cx={size / 2}
      cy={size / 2}
      r={(size - strokeWidth) / 2}
      strokeWidth={strokeWidth}
      fill="none"
    />
  </SVG>
}
