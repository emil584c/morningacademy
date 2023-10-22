import domReady from '@wordpress/dom-ready'
import ButtonStyles from './block-editor/settings/ButtonStyles'
import Spacing from './block-editor/settings/Spacing'

domReady(() => {
  ButtonStyles()
  Spacing()
})
