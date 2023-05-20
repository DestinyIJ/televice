import React from 'react'
import { Link } from 'react-router-dom'

import { HeroSlide, MovieList } from '../components';
import { OutlineButton } from '../components/buttons/Buttons';

import { CATEGORY, MOVIE_TYPE, TV_TYPE } from '../api/tmdbApi';

const Home = () => {
  return (
    <>
      <HeroSlide />
      <div className="container">
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList category={CATEGORY.movie} type={MOVIE_TYPE.popular} />
        </div>  

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top-Rated Movies</h2>
            <Link to="/movie">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList category={CATEGORY.movie} type={MOVIE_TYPE.top_rated} />
        </div> 

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList category={CATEGORY.tv} type={TV_TYPE.popular} />
        </div>  

        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top-Rated TV</h2>
            <Link to="/tv">
              <OutlineButton className="small">
                View More
              </OutlineButton>
            </Link>
          </div>
          <MovieList category={CATEGORY.tv} type={TV_TYPE.top_rated} />
        </div>   
      </div>
    </>
  ) 
}

export default Home