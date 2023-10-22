import React from 'react'

const PostArchiveContext = React.createContext({})

export default function PostArchiveContainer ({
  children,
  postType,
  taxFilters = [],
  taxQuery = {},
  currentPageIndex = 1,
  years = [],
  texts = []
}) {
  const [posts, setPosts] = React.useState(null)
  const [totalPosts, setTotalPosts] = React.useState(0)
  const [totalPages, setTotalPages] = React.useState(1)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [isLoading, setIsLoading] = React.useState(false)
  const [containerRef, setContainerRef] = React.useState(null)
  const [searchParams, setSearchParams] = React.useState({
    postType: postType,
    page: currentPageIndex,
    searchString: '',
    taxQuery: taxQuery,
    year: '',
  })

  return (
    <PostArchiveContext.Provider value={{
      posts,
      setPosts,
      totalPosts,
      setTotalPosts,
      totalPages,
      setTotalPages,
      currentPage,
      setCurrentPage,
      isLoading,
      setIsLoading,
      containerRef,
      setContainerRef,
      searchParams,
      setSearchParams,
      taxFilters,
      taxQuery,
      years,
      texts
    }}>
      { children }
    </PostArchiveContext.Provider>
  )
}

export { PostArchiveContext }
