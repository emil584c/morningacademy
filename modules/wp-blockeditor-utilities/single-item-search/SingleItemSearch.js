import { useEffect, useState } from '@wordpress/element'
import { Popover, SearchControl, Spinner } from '@wordpress/components'
import { __ } from '@wordpress/i18n'
import { select } from '@wordpress/data'
import { useDebounce } from '@wordpress/compose'
import Results from './components/Results'
import './single-post-search.scss'

const classNames = require('classnames')

export default function SingleItemSearch ({
  onChange,
  placeholder = __('Search'),
  subType = 'post,page',
  perPage = 3,
  type = 'post',
  renderResults = undefined,
  usePopover = false,
  className = ''
}) {
  const [searchString, setSearchString] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState([])
  const { getSettings } = select('core/block-editor')

  const fetchData = async (string) => {
    return await getSettings().__experimentalFetchLinkSuggestions(string, {
      type: type,
      subtype: subType,
      perPage: perPage
    })
  }

  const search = function () {
    if (typeof searchString === 'string' && searchString !== '') {
      setIsLoading(true)
      fetchData(searchString).then(function (results) {
        typeof results === 'object' && results !== null ? setResults(results) : setResults([])
      }).finally(() => {
        setIsLoading(false)
      })
    } else {
      setResults([])
    }
  }

  const debouncedFetchData = useDebounce(search, 500)

  useEffect(() => {
    debouncedFetchData()
  }, [searchString])

  const handleOnChange = function (result) {
    setResults([])
    setSearchString(null)
    onChange(result)
  }

  if (typeof renderResults === 'undefined') {
    renderResults = (results, handleMethod) => {
      return <Results results={results} onChange={handleMethod}/>
    }
  }

  const Wrap = usePopover ? Popover : SimpleWrap

  return (
    <div className={classNames(className, 'sp-search', {
      'sp-search--popover': usePopover,
      'is-loading': isLoading
    })}>
      <SearchControl
        value={searchString}
        onChange={setSearchString}
        placeholder={placeholder}
      />
      {isLoading && <Spinner/>}
      {!isLoading && results.length > 0 && (
        <Wrap>
          {renderResults(results, handleOnChange)}
        </Wrap>
      )}
    </div>
  )
}

function SimpleWrap ({ children }) {
  return <div>{children}</div>
}
