import React from 'react'
import usePostArchive from './usePostArchive'
import { PostArchiveContext } from './PostArchiveContainer'

export default function Select ({
  label,
  taxonomy,
  terms
}) {

  const { updateTaxQuery } = usePostArchive()
  const { taxQuery } = React.useContext(PostArchiveContext)

  if (typeof terms !== 'object' || terms.length === 0) {
    return null
  }

  return (
    <select className="mt-news-archive__filter-container--years" onChange={(e) => updateTaxQuery(taxonomy, e.target.value)}>
      <option value={''}>{label}</option>
      {terms.map((term) => <option
        key={term.id}
        value={term.id}
        selected={term.id === taxQuery?.category?.[0] ?? null}
      >
        {term.name}
      </option>)}
    </select>
  )
}
