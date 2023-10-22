import React from 'react'
import { PostArchiveContext } from './PostArchiveContainer'

export default function useScroll () {

  const {
    containerRef
  } = React.useContext(PostArchiveContext)

  const getHeaderHeight = () => {
    let height = 0
    const adminBar = document.getElementById('wpadminbar')
    height += adminBar ? adminBar.getBoundingClientRect().height : 0
    const header = document.querySelector('.mt-header')
    height += header ? header.getBoundingClientRect().height : 0
    return height
  }

  const scrollToContainer = () => {
    if (!containerRef?.current) {
      return
    }

    const top = containerRef.current.getBoundingClientRect().top
    const offset = top + window.pageYOffset - getHeaderHeight()

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    })
  }

  return {
    scrollToContainer
  }
}
