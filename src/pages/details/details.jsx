import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import { tmdbApi } from '../../api/tmdbApi'
import { LazyImage, MovieList } from '../../components'
import CastList from './CastList'

import './details.scss'
import VideoList from './VideoList'



const Details = () => {
  const { category, id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const getDetails = async () => {
      const response = await tmdbApi.details(category, id, {params: {}})
      setMovie(response)
      window.scrollTo(0, 0)
    }

    getDetails()
  }, [category, id])

  return (
    <>
      {
        movie &&
        (
          <>
          <div className='banner'
            style={{
              backgroundImage: `url(${apiConfig.originalImage(movie.backdrop_path || movie.poster_path)})`
            }}
          />
    
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <div className="movie-content__poster__img">
                <LazyImage src={apiConfig.originalImage(movie.poster_path || movie.backdrop_path)} alt={movie.title} />
              </div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">{movie.title || movie.name}</h1>
              <div className="genres">
                {
                  movie.genres && movie.genres.slice(0, 5).map((genre, i) => (
                    <span key={i} className="genres__item">{genre.name}</span>
                  ))
                }
              </div>
              <p className="overview">{movie.overview}</p>
              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={movie.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={movie.id} />
            </div>
            <div className="section mb-3">
              <div className="section__header">
                <h2>Others You Might Like</h2>
              </div>
              <MovieList id={movie.id} category={category} type="similar" />
            </div>
          </div>
          </>
        )
      }
    </>
  )
}

export default Details