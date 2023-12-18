import React from "react";
import Filters from "./Filters";
import usePostArchive from "./usePostArchive";
import { PostArchiveContext } from "./PostArchiveContainer";
import { __ } from "@wordpress/i18n";

export default function PostArchiveFilters() {
  const { totalPosts } = usePostArchive();

  const { texts } = React.useContext(PostArchiveContext);

  return (
    <>
      <div className="mt-post-archive__filter">
        <div className="mt-post-archive__filter-container page-container">
          <div className="mt-post-archive__filter-container--inputs">
            <Filters />
          </div>
        </div>
      </div>
      <div className={"mt-post-archive__results-info page-container"}>{totalPosts + " " + texts.totalPosts}</div>
    </>
  );
}
