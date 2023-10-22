import { Icon, SearchControl, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { useState, useEffect } from '@wordpress/element'
import { useDebounce } from '@wordpress/compose'
import { useCallback } from '@wordpress/element'
import { useFirstRender } from '../helpers/_useFirstRender'

export default function SinglePostSearch ({
  value,
  onChange,
  endpoint = 'ma/v1/posts-search',
  label = __('Search Post'),
  noResultsLabel = __('No posts found'),
  postType = 'post',
  type = 'default',
  placeholder = __('Search')
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
    onChange(result)
    setResults([])
    setHasSearched(false)
    setSearchString('')
  }

  const handleOnDelete = () => {
    onChange({})
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
        type: type
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

  return <div className="post-search">
    <div className="post-search__input-wrapper">
      <SearchControl
        value={searchString}
        onChange={handleOnSearch}
        onClose={handleOnClose}
        label={label}
        placeholder={placeholder}
      />
      {isLoading && (
        <div className="post-search__spinner">
          <Spinner />
        </div>
      )}
    </div>
    {value?.id && (
      <div className="post-search__selected">
        <div className="post-search__selected-text"><b>{value.id === 'link' ? 'Link: ' : 'Post: '}</b>{value.title}</div>
        <div className="post-search__delete-icon">
          <Icon
            icon={'trash'}
            onClick={handleOnDelete}
          />
        </div>
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
