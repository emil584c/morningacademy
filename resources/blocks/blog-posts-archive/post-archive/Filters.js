import React from 'react'
import Select from './Select'
import { PostArchiveContext } from './PostArchiveContainer'
import usePostArchive from './usePostArchive'
import { __ } from '@wordpress/i18n'

export default function Filters () {

  const { taxFilters, years, texts} = React.useContext(PostArchiveContext)
  const { updateSearchQuery, updateDateQuery } = usePostArchive()

  if (typeof taxFilters !== 'object' || taxFilters.length === 0) {
    return null
  }

  return (
    <>
      <input className="mt-news-archive__filter-container--search" type="search" placeholder={texts.searchPlaceholder} onChange={(e) => updateSearchQuery(e.target.value)}/>
      {taxFilters.map((taxFilter, i) => <Select key={i} {...taxFilter} />)}
      <select onChange={(e) => updateDateQuery(e.target.value)}>
        <option value="">{__('Alle år', 'ma')}</option>
        {years.map((year, i) => <option key={i} value={years[i]}>{years[i]}</option> )}
      </select>
    </>
  )
}
