import React from 'react'
import PostArchiveContainer from './PostArchiveContainer'
import PostArchiveContent from './PostArchiveContent'

export default function PostArchive ({
  postType,
  taxFilters = [],
  years = [],
  taxQuery = {},
  currentPageIndex = 1,
  texts = []
}) {
  return (
    <PostArchiveContainer
      postType={postType}
      taxFilters={taxFilters}
      taxQuery={taxQuery}
      currentPageIndex={currentPageIndex}
      years={years}
      texts={texts}
    >
      <PostArchiveContent/>
    </PostArchiveContainer>
  )
}
