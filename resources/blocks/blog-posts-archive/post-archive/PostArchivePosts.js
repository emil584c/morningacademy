import React from 'react'
import { PostArchiveContext } from './PostArchiveContainer'

export default function PostArchivePosts ({ renderPost }) {

  const { posts, texts } = React.useContext(PostArchiveContext)

  if (posts === null) {
    return null
  }

  return (
    <div className={'mt-post-archive__posts'}>
      {posts.length > 0 ?
        posts.map(post => renderPost(post)):
        (<div className={'mt-post-archive__error-message wysiwyg'} dangerouslySetInnerHTML={{ __html: texts.errorMessage }}/>)
      }
    </div>
  )
}
