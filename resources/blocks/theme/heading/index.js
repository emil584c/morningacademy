import { registerBlockType } from '@wordpress/blocks'

// The Edit and Save functions
import Edit from './Edit'
import Save from './Save'

// The stylesheets
import './style.scss'
import './editor.scss'

// The icon
import Icon from '../../../js/block-editor/components/Icon'

// The block info
import metadata from './block.json'

// Register the block
registerBlockType(metadata.name, {
  icon: {
    foreground: '#FF8B43',
    src: Icon
  },
  edit: Edit,
  save: Save
})
