import { registerBlockType } from '@wordpress/blocks'
// The Edit and Save functions
import Edit from './Edit'

// The stylesheets
import './style.scss'
import './editor.scss'
// The block info
import metadata from './block.json'
// Register the block
registerBlockType(metadata.name, {
  edit: Edit,
  save: () => null
})
