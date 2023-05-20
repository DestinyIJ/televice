import React from 'react'

import './skeleton.scss'

const ImageSkeleton = () => {
  return (
    <div className='skeleton-wrapper'>
      <div className="skeleton-article">
        <div className="skeleton image" />
      </div>
      <div className="shimmer-wrapper">
        <div className="shimmer" />
      </div>
    </div>
  )
}

export default ImageSkeleton
