import React, { lazy, Suspense } from 'react'
import { Routes, Route,  } from 'react-router-dom';
import { ErrorBoundary } from '../components';


const HomePage = lazy(() => import("../pages/home"))
const DetailsPage = lazy(() => import("../pages/details/details"))
const CatalogPage = lazy(() => import("../pages/catalog"))
const WatchListPage = lazy(() => import("../pages/watchlist/watchlist"))
const Error404Page = lazy(() => import("../pages/404"))


const PageRoutes = () => {
  return (
    <Routes>
        <Route 
            path='/:category/search/:keyword' 
            element={
                <Suspense fallback={<>...</>}>
                    <CatalogPage />
                </Suspense>
            } 
            errorElement={<ErrorBoundary />}
        />

        <Route 
            path='/:category/:id' 
            element={
                <Suspense fallback={<>...</>}>
                    <DetailsPage />
                </Suspense>
            } 
            errorElement={<ErrorBoundary />}
        />

        <Route 
            path='/watchlist' 
            element={
                <Suspense fallback={<>...</>}>
                    <WatchListPage />
                </Suspense>
            } 
            errorElement={<ErrorBoundary />}
        />

        <Route 
            path='/:category' 
            element={
                <Suspense fallback={<>...</>}>
                    <CatalogPage />
                </Suspense>
            } 
            errorElement={<ErrorBoundary />}
        />

        <Route 
            path='/' 
            exact
            element={
                <Suspense fallback={<>Loading...</>}>
                    <HomePage />
                </Suspense>
            } 
            errorElement={<ErrorBoundary />}
        />

        <Route path="*" element={<Error404Page />}/>
    </Routes>
  )
}

export default PageRoutes