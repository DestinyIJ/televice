import { useRef, useEffect } from 'react'
import { Link, useRoutes, useLocation } from 'react-router-dom'

import './header.scss'

import Logo from '../../assets/tmovie.png'
import { headerNav } from './header.data'



const Header = () => {
    const { pathname } = useLocation()

    const headerRef = useRef(null)

    useEffect(() => {
      const shrinkHeader = () => {
        if(document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            headerRef.current.classList.add('shrink')
        } else {
            headerRef.current.classList.remove('shrink')
        }
      }

      window.addEventListener("scroll", shrinkHeader)
    
      return () => {
        window.removeEventListener("scroll", shrinkHeader)
      }
    }, [])
    

    const active = headerNav.findIndex(e => e.path === pathname)


    return (
        <div ref={headerRef} className="header">
            <div className="header__wrap container">
                <div className="logo">
                    <img src={Logo} alt="televice" />
                    <Link to={"/"}>Televice</Link>
                </div>
                <ul className="header__nav">
                    {
                        headerNav.map((e ,i) => (
                            <li key={i} className={`${i === active ? 'active' : ''}`}>
                                <Link to={e.path} >{e.display}</Link>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    )
}

export default Header