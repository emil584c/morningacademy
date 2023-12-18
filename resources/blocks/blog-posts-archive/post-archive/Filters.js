import React from "react";
import Select from "./Select";
import { PostArchiveContext } from "./PostArchiveContainer";
import usePostArchive from "./usePostArchive";
import { __ } from "@wordpress/i18n";

export default function Filters() {
  const { taxFilters, seriesFilters, years, texts } = React.useContext(PostArchiveContext);
  const { updateSearchQuery, updateDateQuery } = usePostArchive();

  if (typeof taxFilters !== "object" || taxFilters.length === 0) {
    return null;
  }

  return (
    <>
      <div className="mt-post-archive__search-container">
        <input
          className="mt-post-archive__search"
          type="search"
          placeholder={texts.searchPlaceholder}
          onChange={(e) => updateSearchQuery(e.target.value)}
        />
      </div>
      {taxFilters.map((taxFilter, i) => (
        <Select key={i} {...taxFilter} />
      ))}
      {seriesFilters.map((seriesFilter, i) => (
        <Select key={i} {...seriesFilter} />
      ))}
    </>
  );
}
