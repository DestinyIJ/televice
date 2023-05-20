import React, { useState, useEffect, useDeferredValue } from 'react'

import './movie-grid.scss'
import MovieCard from '../movie-card/MovieCard'
import { useNavigate, useParams } from 'react-router-dom'
import { CATEGORY, MOVIE_TYPE, tmdbApi, TV_TYPE } from '../../api/tmdbApi'
import Button, { OutlineButton } from '../buttons/Buttons'
import Input from '../input/Input'
import { useMemo } from 'react'
import { useCallback } from 'react'

const MovieGrid = ({ category, movieList }) => {
    const [movies, setMovies] = useState([])

    useEffect(() => {
        setMovies(movieList)
    }, [movieList])

    return (
        <>
            <div className="section mb-3">
                <MovieSearch category={category} keyword={keyword} />
            </div>
            <div className='movie-grid'>
                {
                    movies.length > 0 ? movies.map((movie, i) => (
                        <MovieCard category={category} movie={movie} key={i} />
                    )) : <div>Nothing here yet...</div>
                }
            </div>
        </>
    )
}

const MovieSearch = (props) => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

    const goToSearch = useCallback(() => {
        if(keyword.trim().length > 0) {
            // navigate(`${CATEGORY[props.category]}/search/${keyword}`)
        }
    }, [keyword, props.category])

    const onTypeSearch = (input) => {
        console.log(input)
        const deferredInput = useDeferredValue(input)
        useMemo(() => {
            setKeyword(deferredInput)
        }, [deferredInput])
    }

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if(e.keycode === 13) {
                goToSearch()
            }
        }

        document.addEventListener('keyup', enterEvent)

        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [keyword, goToSearch])

    return (
        <div className="movie-search">
            <Input 
                type="search"
                placeholder="Type Movie Name..."
                value={keyword}
                onChange = {(e) => onTypeSearch(e.target.value)}
            />
            <Button className="small" onClick={goToSearch}>Search</Button>
        </div>
    )
}

export default MovieGrid