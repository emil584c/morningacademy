import { registerBlockType } from '@wordpress/blocks'
// The Edit and Save functions
import Edit from './Edit'

// The stylesheets
import './style.scss'
import './editor.scss'
// Block icon SVG
import Icon from './icon'
// The block info
import metadata from './block.json'
// Register the block
registerBlockType(metadata.name, {
  icon: {
    foreground: '#FF8B43',
    src: Icon
  },
  edit: Edit,
  save: () => null
})
