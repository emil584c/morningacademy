import { Icon, SearchControl, TextControl, CheckboxControl, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { useState, useEffect } from '@wordpress/element'
import { useDebounce } from '@wordpress/compose'
import { useCallback } from '@wordpress/element'
import { useFirstRender } from '../helpers/_useFirstRender'
import { Spacer, Text } from '../index'

export default function UrlSearch ({
  value,
  onChange,
  label = __('Search'),
  noResultsLabel = __('No posts found'),
  placeholder = __('Search')
}) {

  const fullEndpoint = window.location.origin + '/wp-json/ma/v1/posts-search'

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
    // Check if value is an array or an object
    onChange({ newTab: value.newTab })
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
        search: searchString
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

  const debouncedSearch = useCallback(useDebounce(search, 500), [searchString, results])

  useEffect(() => {
    if (firstRender) {
      return
    }

    debouncedSearch()
  }, [searchString])

  const handleAddAsLink = () => {
    onChange({ id: 'link', title: searchString, permalink: searchString, newTab: false })
    setSearchString('')
    setResults([])
    setHasSearched(false)
  }

  return <div className="post-search">
    <Text
      text={__('Link', 'mt')}
      mb={8}
    />
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
        <div className="post-search__selected-text">
          {value.id === 'link'
            ? <>
              <b>{__('Link: ')}</b>
              <TextControl
                className="post-search__selected-text-input"
                value={value.permalink}
                onChange={(permalink) => onChange({ ...value, permalink })}
              />
            </>
            : <>
              <b>{__('Post: ', 'mt')}</b>
              <span>{value.title}</span>
            </>
          }
        </div>
        <div className="post-search__delete-icon">
          <Icon
            icon={'trash'}
            onClick={handleOnDelete}
          />
        </div>
      </div>
    )}
    {results.length > 0 && (
      <ul className="post-search__results">
        {results.map((result, index) => (
          <li
            key={index}
            className="post-search__result"
            onClick={() => handleOnChange({ ...result, newTab: value?.newTab || false })}
          >
            {result.title}
          </li>
        ))}
        <li className="post-search__result post-search__result--add-link"
            onClick={handleAddAsLink}>{__('Add as link', 'mt')}</li>
      </ul>
    )}
    {results.length === 0 && hasSearched && <ul className="post-search__results">
      <li className="post-search__result">{noResultsLabel}</li>
      <li className="post-search__result post-search__result--add-link"
          onClick={handleAddAsLink}>{__('Add as link', 'mt')}</li>
    </ul>}
    <Spacer spacing={16}/>
    <CheckboxControl
      label={__('Open In New Tab?', 'mt')}
      checked={value?.newTab || false}
      onChange={(newTab) => onChange({ ...value, newTab })}
    />
  </div>
}
