import React from 'react'
import ReactPaginate from 'react-paginate'

export default function PostArchivePagination ({
  onPageChange,
  activePage,
  totalPages
}) {


  const handleOnPageChange = (e) => {
    onPageChange(e.selected + 1)
    const url = new URL(window.location.href);
    url.searchParams.set('pageNumber', e.selected + 1);
    window.history.replaceState(null, null, url);
  }

  const buildHref = (pageIndex) => {
    const url = new URL(window.location.href);
    url.searchParams.set('pageNumber', pageIndex);

    return url
  }

  if (totalPages < 2) {
    return null
  }

  return (
    <ReactPaginate
      className={'mt-pagination'}
      pageClassName="mt-pagination__link"
      previousClassName="mt-pagination__link mt-pagination__link--previous"
      nextClassName="mt-pagination__link mt-pagination__link--next"
      activeClassName="mt-pagination__link--active"
      disabledClassName="mt-pagination__link--disabled"
      breakClassName="mt-pagination__link"
      breakLabel="..."
      pageRangeDisplayed={3}
      marginPagesDisplayed={3}
      pageCount={totalPages}
      previousLabel=""
      nextLabel=""
      onPageChange={(e) => handleOnPageChange(e)}
      hrefBuilder={(pageIndex, pageCount, selectedPage) => buildHref(pageIndex, pageCount, selectedPage)}
      forcePage={activePage - 1}
    />
  )
}
