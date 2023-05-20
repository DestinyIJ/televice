import React, { useState, useEffect, useRef, createContext, useContext } from 'react'
import { useLocation, useRoutes, useNavigate } from 'react-router-dom'

import SwiperCore, { Autoplay } from 'swiper'
// import 'swiper/scss';

import { CATEGORY, MOVIE_TYPE, tmdbApi } from '../../api/tmdbApi'
import apiConfig from '../../api/apiConfig'

import './hero-slide.scss'
import Swipe from '../swipe/Swipe'
import Button, { OutlineButton } from '../buttons/Buttons'
import ImageSkeleton from '../skeleton/ImageSkeleton'
import Modal, { ModalContent } from '../modal/Modal'
import LazyImage from '../lazy-image/LazyImage'


const HeroSlide = () => {
    const [movies, setMovies] = useState([])


    useEffect(() => {
        const getMovies = async () => {
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMovieList(MOVIE_TYPE.popular, {params})
                const results = response.results
                const limit = Math.floor(Math.random() * (results.length - 1)) + 1;
                // Shuffle the array using the Fisher-Yates algorithm
                // for (let i = results.length - 1; i > 0; i--) {
                //     const j = Math.floor(Math.random() * (i + 1));
                //     [results[i], results[j]] = [results[j], results[i]];
                // }

                // Get the first 4 items from the shuffled array
                const randomMovies = results.slice(0, limit);
            
                setMovies(randomMovies)
            } catch (error) {
                console.log(error)
            }
        }

        getMovies();
    }, [])

    return (
        <div className='hero-slide'>
            <Swipe autoPlay={true}>
                {
                    movies.map((movie, index) => (
                        <HeroSlideItem key={index} index={index} item={movie} />
                    ))
                }
            </Swipe>
            
            {
                movies.map((movie, index) => (
                    <TrailerModal key={index} movie={movie} />
                ))
            }
        </div>
    )
}

const HeroSlideItem = ({ item, activeIndex, index }) => {
    const navigate = useNavigate()
    const background = apiConfig.originalImage(item.backdrop_path || item.poster_path)

    const setModalActive = async () => {
        const modal = document.querySelector(`#modal_${item.id}`)

        const videos = await tmdbApi.getVideos(CATEGORY.movie, item.id)

        if(videos?.results?.length > 0) {
            const videoSrc = `https://www.youtube.com/embed/${videos?.results[0]?.key}`
            modal.querySelector('.modal__content > iframe').setAttribute('src', videoSrc)
        } else {
            modal.querySelector('.modal__content').innerHTML = "No Trailer available"
        }

        modal.classList.toggle('active')
    }

    return (
        <>
        <div 
            className={`hero-slide__item ${activeIndex === index ? 'active' : ''}`}
            style={{
                backgroundImage: `url(${background})`
            }}
        >
            
            <div className="hero-slide__item__content container">
                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item?.title}</h2>
                    <div className="overview">{item?.overview}</div>
                    <div className="btns">
                        <Button onClick={() => navigate(`/movie/${item.id}`)}>
                            Watch now
                        </Button>
                        <OutlineButton onClick={() => setModalActive()}>
                            Watch Trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className="hero-slide__item__content__poster">
                        <LazyImage src={apiConfig.w500Image(item.poster_path)} alt={item.title} />
                </div>
            </div>
        </div>
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

export default HeroSlide
