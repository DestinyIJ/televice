import React from 'react'
import { Outlet } from 'react-router-dom'


import Header from '../header/Header'
import Footer from '../footer/Footer'
import PageRoutes from '../../route/Routes'


const Layout = () => {
  return (
    <>
        <Header />
        <PageRoutes />
        <Footer />
        <Outlet />
    </>
  )
}

export default Layout