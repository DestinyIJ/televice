import React, { useRef } from 'react'
import './movie-card.scss'

import { Link, useNavigate } from 'react-router-dom'
import Button from '../buttons/Buttons'
import { CATEGORY, tmdbApi } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'
import LazyImage from '../lazy-image/LazyImage'
import Modal, { ModalContent } from '../modal/Modal'
import { useAppContext } from '../../App.context'

const MovieCard = ({ movie, category }) => {
    const { movieList, addToMovieList, removeFromMovieList,
        tvList, addToTvList, removeFromTvList } = useAppContext()

    const navigate = useNavigate()

    const link = `/${CATEGORY[category]}/${movie.id}`

    if (movie.poster_path == null || movie.backdrop_path == null) return null

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${movie.id}`)

        const videos = await tmdbApi.getVideos(CATEGORY.movie, movie.id)

        if(videos?.results?.length > 0) {
            const videoSrc = `https://www.youtube.com/embed/${videos?.results[0]?.key}`
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
        } else {
            modal.querySelector('.modal__content').innerHTML = "No Trailer available"
        }

        modal.classList.toggle('active')
    }

    const addToWatchlist = (movie) => {
        switch (category) {
            case "tv":
                addToTvList(movie)
                break;
            default:
                addToMovieList(movie)
                break;
        }
    }

    const removeFromWatchlist = (movie) => {
        switch (category) {
            case "tv":
                removeFromTvList(movie)
                break;
            default:
                removeFromMovieList(movie)
                break;
        }
    }

    const inWatchList = (movie) => {
        switch (category) {
            case "tv":
                return tvList.includes(movie)
            default:
                return movieList.includes(movie)
        }
    }


    return (
        <>
            <div className="movie-card">
                <LazyImage src={apiConfig.w500Image(movie.poster_path || movie.backdrop_path)} />
                <div className='movie-card__overlay'>
                    <Button onClick={() => setModalActive()}>
                        <i className='bx bx-play'></i>
                        <span>Watch Trailer</span>
                    </Button>
                    <Button onClick={() => navigate(link)}>
                        <i className='bx bx-detail'></i>
                        <span>Movie details</span>
                    </Button>
                    {
                        inWatchList(movie) ? 
                        <Button onClick={() => removeFromWatchlist(movie)}>
                            <i className='bx bx-folder-minus'></i>
                            <span>Remove from WatchList</span>
                        </Button> 
                        : 
                        <Button onClick={() => addToWatchlist(movie)}>
                            <i className='bx bx-folder-plus'></i>
                            <span>Add to WatchList</span>
                        </Button>
                    }
                </div>
            </div>
            {/* <h3>{movie.title || movie.name}</h3> */}
            <TrailerModal movie={movie} />
        </>
    )
}

const TrailerModal = ({ movie }) => {
    const iFrameRef = useRef(null)

    const onClose = () => iFrameRef.current.setAttribute('src', '')

    return (
        <Modal active={false} id={`modal_${movie.id}`}>
            <ModalContent onClose={onClose}>
                <iframe 
                ref={iFrameRef} 
                width={'100%'} 
                height="500px" 
                title='Trailer' src=""></iframe>
            </ModalContent>
        </Modal>
    )
}

export default MovieCard