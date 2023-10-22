import classNames from 'classnames'
import { SVG } from '@wordpress/components'

export default function Circle ({ className = '', type = '', size = 20 }) {
  return <SVG
    width={size}
    height={size}
    className={classNames('mt-circle', {
      [`mt-circle--type-${type}`]: type !== '',
      [className]: className !== ''
    })}
  >
    <circle
      cx={size / 2}
      cy={size / 2}
      r={size / 2}
    />
  </SVG>
}
