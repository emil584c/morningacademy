import { __ } from '@wordpress/i18n'

export default function ButtonStyles () {
  wp.hooks.addFilter('blocks.registerBlockType', 'mt-blocks/button-styles', (settings, name) => {
    if (name === 'core/button') {
      settings.styles = [
        { name: 'primary', label: __('Primary'), isDefault: true },
        { name: 'secondary', label: __('Secondary') },
        { name: 'arrow', label: __('Arrow (inline link)') }
      ]
    }
    return settings
  })
}
