import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '../buttons/Buttons'
import Swipe from '../swipe/Swipe'
import { CATEGORY, tmdbApi } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import MovieCard from '../movie-card/MovieCard'

import './movie-list.scss'

const MovieList = ({ id, category, type }) => {
    const [movieList, setMovieList] = useState([])

    useEffect(() => {
        const getList = async () => {
            let response = null
            const params = {}

            if(type !== 'similar') {
                switch (category) {
                    case CATEGORY.movie:
                        response = await tmdbApi.getMovieList(type, {params})
                        break;
                
                    default:
                        response = await tmdbApi.getTvList(type, {params})
                        break;
                }
            } else {
                response = await tmdbApi.similar(category, id)
            }

            setMovieList(response.results)
        }

        getList()
    }, [])

  return (
    <div className="movie-list">
        <Swipe>
            {
                movieList.map((movie, i) => (
                    <MovieCard key={i} movie={movie} category={category} />
                ))
            }
        </Swipe>
    </div>
  )
}

export default MovieList