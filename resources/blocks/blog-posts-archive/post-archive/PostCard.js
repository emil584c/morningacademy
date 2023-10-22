import React from 'react'
import classNames from 'classnames'

export default function PostCard ({
  cls,
  imageSrc,
  permalink,
  title,
  date,
  excerpt,
}) {

  return (
    <div className={classNames('mt-post-archive__post', {
      [cls]: cls !== ''
    })}>
      <div className="mt-post-archive__post--image object-fit ">
        {imageSrc && (
          <img className='play-button-selector' src={imageSrc} alt={title} />
        )}
      </div>
      <div className="mt-post-archive__post--text">
        <p>{title}</p>
        <span className='mt-post-archive__post--text-date'>{date}</span>
        <span className='mt-post-archive__post--text-excerpt'>{excerpt}</span>
      </div>
      {permalink && (
        <a href={permalink}></a>
      )}
    </div>
  )
}
