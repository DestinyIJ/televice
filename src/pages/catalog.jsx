import React from 'react'
import { useParams } from 'react-router-dom'

import { PageHeader, MovieGrid } from '../components'
import { CATEGORY } from '../api/tmdbApi'

const Catalog = () => {
  const { category } = useParams()

  return (
    <div>
      <PageHeader>
        {category === CATEGORY.movie ? 'Movies' : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </div>
  )
}

export default Catalog