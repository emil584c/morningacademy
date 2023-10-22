import { render, createRoot } from '@wordpress/element'
import domReady from '@wordpress/dom-ready'
import PostArchive from './post-archive/PostArchive'

domReady(function () {
  document.querySelectorAll('div[data-react-class="PostArchive"]').forEach(node => {
    let props = JSON.parse(node.attributes['data-react-props'].value)
    // render(<PostArchive {...props}/>, node)

    if ( createRoot ) {
      createRoot( node ).render( <PostArchive {...props}/> );
    } else {
      render( <PostArchive {...props}/>, node );
    }
  })  
})
