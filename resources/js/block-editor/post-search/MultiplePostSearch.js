import { SearchControl, Spinner, Button, Disabled } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { useState, useEffect } from '@wordpress/element'
import { useDebounce } from '@wordpress/compose'
import { useCallback } from '@wordpress/element'
import { useFirstRender } from '../helpers/_useFirstRender'
import { Text } from '../index'

export default function MultiplePostSearch ({
  posts,
  onChange,
  endpoint = 'ma/v1/posts-search',
  title = __('Search Posts'),
  label = __('Search Posts'),
  noResultsLabel = __('No posts found'),
  postType = 'post',
  type = 'default',
  placeholder = __('Search'),
  limit = 10
}) {

  const fullEndpoint = window.location.origin + '/wp-json/' + endpoint

  const firstRender = useFirstRender()

  const [searchString, setSearchString] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [results, setResults] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const handleOnSearch = (s) => {
    setIsLoading(true)
    setHasSearched(true)
    setSearchString(s)
  }

  const handleOnChange = (result) => {
    onChange([...posts, result])
    setResults([])
    setHasSearched(false)
    setSearchString('')
  }

  const handleOnDelete = (id) => {
    let newPosts = [...posts]
    newPosts = newPosts.filter(p => p.id !== id)
    onChange(newPosts)
  }

  const handleMoveUp = (id) => {
    const newPosts = [...posts]
    const indexToMove = newPosts.findIndex(p => p.id === id)
    const postToMove = newPosts.splice(indexToMove, 1)[0]
    newPosts.splice(indexToMove - 1, 0, postToMove)
    onChange(newPosts)
  }

  const handleMoveDown = (id) => {
    const newPosts = [...posts]
    const indexToMove = newPosts.findIndex(p => p.id === id)
    const postToMove = newPosts.splice(indexToMove, 1)[0]
    newPosts.splice(indexToMove + 1, 0, postToMove)
    onChange(newPosts)
  }

  const handleOnClose = () => {
    setSearchString('')
    setResults([])
    setHasSearched(false)
  }

  const search = () => {
    fetch(fullEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', },
      body: JSON.stringify({
        search: searchString,
        postType: postType,
        type: type,
        exclude: posts.map(p => p.id)
      })
    })
      .then(response => response.json())
      .then(data => {
        setResults(data.results)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const debouncedSearch = useCallback(useDebounce(search, 500), [searchString])

  useEffect(() => {
    if (firstRender) {
      return
    }

    debouncedSearch()
  }, [searchString])

  return <div className="post-search post-search--multiple">
    {title && <Text
      text={title + ` (${posts.length}/${limit})`}
      mb={8}
    />}
    <div className="post-search__input-wrapper">
      <Disabled isDisabled={posts.length >= limit}>
        <SearchControl
          value={searchString}
          onChange={handleOnSearch}
          onClose={handleOnClose}
          label={label}
          placeholder={placeholder}
        />
      </Disabled>
      {isLoading && (
        <div className="post-search__spinner">
          <Spinner />
        </div>
      )}
    </div>
    {posts.length > 0 && (
      <div className="post-search__selected-posts">
        {posts.map((post) => (
          <div key={post.id} className="post-search__selected">
            <div className="post-search__selected-text"><span>{post.title}</span></div>
            <div className="post-search__actions">
              <Button
                icon={'arrow-up-alt2'}
                onClick={() => handleMoveUp(post.id)}
                style={{ padding: '0', minWidth: '20px', height: '20px' }}
                disabled={posts[0].id === post.id}
              />
              <Button
                icon={'arrow-down-alt2'}
                onClick={() => handleMoveDown(post.id)}
                style={{ padding: '0', minWidth: '20px', height: '20px' }}
                disabled={posts[posts.length - 1].id === post.id}
              />
              <Button
                icon={'trash'}
                onClick={() => handleOnDelete(post.id)}
                style={{ padding: '0', minWidth: '20px', height: '20px' }}
              />
            </div>
          </div>
        ))}
      </div>
    )}
    {results.length > 0 && <ul className="post-search__results">
      {results.map((result, index) => (
        <li
          key={index}
          className="post-search__result"
          onClick={() => handleOnChange(result)}
        >
          {result.title}
        </li>
      ))}
    </ul>}
    {results.length === 0 && hasSearched && <ul className="post-search__results">
      <li className="post-search__result">{noResultsLabel}</li>
    </ul>}
  </div>
}
