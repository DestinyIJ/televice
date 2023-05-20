import { useContext, createContext, useState, useEffect } from "react";


const AppContext = createContext()

const AppProvider = ({ children }) => {
    const [movieList, setMovieList] = useState([])
    const [tvList, setTvList] = useState([])

    const getMovieList = () => {
        const list = localStorage.getItem("televice:movielist")
        if(list) setMovieList(JSON.parse(list))
    }
    const addToMovieList = (movie) => {
        const movies = Array.from(new Set([...movieList, movie]))
        localStorage.setItem("televice:movielist", JSON.stringify(movies))
        setMovieList(movies)
        getMovieList()
        window.alert("Added to watchlist")
    }
    const removeFromMovieList = (movieToRemove) => {
        if(movieList.length === 0) return
        const updatedMovies = movieList.filter(movie => movie !== movieToRemove);
        localStorage.removeItem("televice:movielist")
        localStorage.setItem("televice:movielist", JSON.stringify(updatedMovies))
        getMovieList()
        setMovieList(updatedMovies)
    }

    const getTvList = () => {
        const list = localStorage.getItem("televice:tvlist")
        if(list) setTvList(JSON.parse(list))
    }
    const addToTvList = (tv) => {
        const series = Array.from(new Set([...tvList, tv]))
        localStorage.setItem("televice:tvlist", JSON.stringify(series))
        setTvList(series)
        getTvList()
    }
    const removeFromTvList = (tvToRemove) => {
        if(tvList.length === 0) return
        const updatedTvList = tvList.filter(tv => tv !== tvToRemove);
        localStorage.removeItem("televice:tvlist")
        localStorage.setItem("televice:tvlist", JSON.stringify(updatedTvList))
        setMovieList(updatedTvList )
        getTvList()
    }

    useEffect(() => {
        getMovieList()
        getTvList()
    }, [])


    return (
        <AppContext.Provider value={{
            movieList, addToMovieList, removeFromMovieList,
            tvList, addToTvList, removeFromTvList
        }}>
          {children}
        </AppContext.Provider>
      );
    
    // Create a custom hook for accessing the app context
}

export const useAppContext = () => useContext(AppContext);

export default AppProvider