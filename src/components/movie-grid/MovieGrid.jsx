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
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(0)

    console.log(category)

    const { keyword } = useParams()

    const getMovies = useCallback(async (page = 1) => {
        if(movieList) {
            setMovies(movieList)
            return
        }

        console.log('we got here')

        let response = null

        if(keyword == undefined) {
            const params = {
                page
            }

            switch (category) {
                case CATEGORY.tv:
                    response = await tmdbApi.getTvList(TV_TYPE.popular, { params })
                    break;
                default:
                    response = await tmdbApi.getMovieList(MOVIE_TYPE.upcoming, { params })
                    break;
            }
        } else {
            const params = {
                query : keyword,
                page
            }

            response = await tmdbApi.search(category, {params})
        }

        
        setMovies(prev => Array.from(new Set([...prev, ...response?.results])))
        setTotalPage(response?.total_pages)
        console.log(movies)
    }, [category])

    

    useEffect(() => {
        getMovies()
    }, [])

    const loadMore = async () => {
        try {
            await getMovies(page + 1)
            setPage(prev => prev + 1)
        } catch (error) {
            console.log(error)
        }
    }

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
            {
                page < totalPage ? (
                    <div className='movie-grid__loadmore'>
                        <OutlineButton className="small" onClick={loadMore}>Load More</OutlineButton>
                    </div>
                ) : null
            }
        </>
    )
}

const MovieSearch = (props) => {
    const navigate = useNavigate()
    const [keyword, setKeyword] = useState(props.keyword ? props.keyword : '')

    const goToSearch = useCallback(() => {
        if(keyword.trim().length > 0) {
            navigate(`${CATEGORY[props.category]}/search/${keyword}`)
        }
    }, [keyword, props.category])

    const onTypeSearch = (input) => {
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