import React from 'react'
import PostArchivePosts from './PostArchivePosts'
import PostCard from './PostCard'
import usePostArchive from './usePostArchive'
import PostArchiveFilters from './PostArchiveFilters'
import PostArchivePagination from './PostArchivePagination'
import { PostArchiveContext } from './PostArchiveContainer'
import classNames from 'classnames'

export default function PostArchiveContent () {

  const { search, searchParams, totalPages, updatePage, isLoading } = usePostArchive()
  const { setContainerRef } = React.useContext(PostArchiveContext)
  const containerRef = React.useRef(null)

  React.useEffect(search, [searchParams])

  React.useEffect(() => {
    setContainerRef(containerRef)
  }, [containerRef])

  return (
    <section className={classNames('mt-post-archive', {
      'mt-post-archive--is-loading': isLoading
    })} ref={containerRef}>
      <div className={'mt-post-archive__inner'}>
        <PostArchiveFilters/>
        <div className={'mt-post-archive__content page-container'}>
          <PostArchivePosts
            renderPost={post => <PostCard key={post.id} {...post}/>}
          />
          <PostArchivePagination
            onPageChange={(page) => updatePage(page)}
            activePage={searchParams.page}
            totalPages={totalPages}
          />
        </div>
      </div>
    </section>
  )
}
