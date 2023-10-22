import { __ } from '@wordpress/i18n'

export default function getDefaultSpacingControls () {
  return [
    {
      label: 'Top Spacing',
      position: 'top',
      controls: [
        {
          label: 'S',
          title: __('Small'),
          spacing: 'small'
        }, {
          label: 'M',
          title: __('Medium'),
          spacing: 'medium'
        }, {
          label: 'L',
          title: __('Large'),
          spacing: 'large'
        }, {
          label: 'XL',
          title: __('Extra Large'),
          spacing: 'extraLarge'
        }
      ]
    },
    {
      label: 'Bottom Spacing',
      position: 'bottom',
      controls: [
        {
          label: 'S',
          title: __('Small'),
          spacing: 'small'
        }, {
          label: 'M',
          title: __('Medium'),
          spacing: 'medium'
        }, {
          label: 'L',
          title: __('Large'),
          spacing: 'large'
        }, {
          label: 'XL',
          title: __('Extra Large'),
          spacing: 'extraLarge'
        }
      ]
    }
  ]
}
