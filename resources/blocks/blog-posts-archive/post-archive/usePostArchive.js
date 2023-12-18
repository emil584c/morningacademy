import React from "react";
import { PostArchiveContext } from "./PostArchiveContainer";
import useScroll from "./useScroll";

export default function usePostArchive() {
  const { scrollToContainer } = useScroll();

  const {
    posts,
    setPosts,
    totalPosts,
    setTotalPosts,
    totalPages,
    setTotalPages,
    isLoading,
    setIsLoading,
    searchParams,
    setSearchParams,
    userId,
  } = React.useContext(PostArchiveContext);

  const search = () => {
    let restUrl = window?.mtwpRestRoutes?.["post-archive"];

    setIsLoading(true);

    const filteredParams = {};
    Object.keys(searchParams.taxQuery).forEach((param) => {
      if (searchParams.taxQuery[param].length > 0) {
        filteredParams[param] = searchParams.taxQuery[param];
      }
    });

    fetch(restUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...searchParams, taxQuery: filteredParams, userId: userId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setTotalPosts(data.totalPosts);
        setTotalPages(data.totalPages);
        setPosts(data.posts);
      })
      .finally(() => setIsLoading(false));
  };

  const update = (key, val) => {
    setSearchParams((params) => {
      return { ...params, [key]: val };
    });
  };

  const updateAndSearch = (key, val) => {
    update(key, val);
  };

  const updateTaxQuery = (taxonomy, termId) => {
    removeUrlParams();
    update("page", 1);
    updateAndSearch("taxQuery", { ...searchParams.taxQuery, [taxonomy]: termId });
  };

  const updateSearchQuery = (search) => {
    removeUrlParams();
    update("page", 1);
    updateAndSearch("searchString", search);
  };

  const updateDateQuery = (year) => {
    removeUrlParams();
    update("page", 1);
    updateAndSearch("year", year);
  };

  const updatePage = (page) => {
    scrollToContainer();
    updateAndSearch("page", page);
  };

  const removeUrlParams = () => {
    window.history.replaceState(null, null, window.location.pathname);
  };

  return {
    posts,
    totalPosts,
    totalPages,
    isLoading,
    searchParams,
    search,
    update,
    updateAndSearch,
    updateTaxQuery,
    updateSearchQuery,
    updateDateQuery,
    updatePage,
  };
}
