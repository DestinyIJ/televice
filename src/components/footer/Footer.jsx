import React from 'react'
import { Link } from 'react-router-dom'

import Bg from '../../assets/footer-bg.jpg'
import Logo from '../../assets/tmovie.png'

import './footer.scss'

const Footer = () => {
  return (
    <div className='footer' style={{ backgroundImage: `url(${Bg})`}}>
      <div className="footer__content container">
        <div className="footer__content__logo">
          <div className="logo">
            <img src={Logo} alt="Logo" />
            <Link to="/">Televice</Link>
          </div>
        </div>

        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to="/">Home</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">Terms of Service</Link>
            <Link to="/">About Us</Link>
          </div>

          <div className="footer__content__menu">
            <Link to="/">Live</Link>
            <Link to="/">FAQ</Link>
            <Link to="/">Premium</Link>
            <Link to="/">Privacy Policy</Link>
          </div>

          <div className="footer__content__menu">
            <Link to="/">Must Watch</Link>
            <Link to="/">Recent Release</Link>
            <Link to="/">Top TMDB</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer