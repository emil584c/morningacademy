import classNames from 'classnames'
import Text from './Text'
import Help from './Help'
import { __ } from '@wordpress/i18n'
import ImageControl from '../image-control/ImageControl'

const Avatar = ({
  value,
  className = '',
  type = '',
  width = 80,
  height = 80
}) => {

  // Make sure the width and height are not too big
  width = width > 100 ? 100 : width
  height = height > 100 ? 100 : height

  return <div
    className={classNames('mt-avatar', {
      [`mt-avatar--type-${type}`]: type !== '',
      [className]: className !== ''
    })}
    style={{
      width: `${width}px`,
      height: `${height}px`
    }}
  >
    {value && <img
      src={value?.url}
      alt={value?.alt}
      width={width}
      height={height}
    />}
  </div>
}

Avatar.Controls = ({
  value,
  onChange,
  label,
  help
}) => {
  return <>
    <Text
      text={label ?? __('Choose Avatar', 'mt')}
      mb={8}
    />
    <ImageControl
      value={value}
      onChange={(image) => onChange(image)}
      size={'thumbnail'}
    />
    <Help
      text={help ?? __('The optimal size is 100px * 100px. Make sure to crop your image beforehand, as the image will be cropped into a square!', 'mt')}
    />
  </>
}

export default Avatar
