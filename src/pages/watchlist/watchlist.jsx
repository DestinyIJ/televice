import React, { useState } from 'react'
import { useAppContext } from '../../App.context'
import { MovieGrid, PageHeader } from '../../components'

const watchlist = () => {
  const [category, setCategory] = useState('Movie')
  const { movieList, addToMovieList, removeFromMovieList,
    tvList, addToTvList, removeFromTvList } = useAppContext()
  
  return (
    <div>
      <PageHeader>{category}</PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={'movie'} movieList={movieList} />
        </div>
      </div>
    </div>
  )
}

export default watchlist