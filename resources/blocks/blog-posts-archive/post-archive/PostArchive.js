import React from "react";
import PostArchiveContainer from "./PostArchiveContainer";
import PostArchiveContent from "./PostArchiveContent";

export default function PostArchive({
  postType,
  taxFilters = [],
  seriesFilters = [],
  years = [],
  taxQuery = {},
  currentPageIndex = 1,
  texts = [],
  userId,
}) {
  return (
    <PostArchiveContainer
      postType={postType}
      taxFilters={taxFilters}
      seriesFilters={seriesFilters}
      taxQuery={taxQuery}
      currentPageIndex={currentPageIndex}
      years={years}
      texts={texts}
      userId={userId}
    >
      <PostArchiveContent />
    </PostArchiveContainer>
  );
}
