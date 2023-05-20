const apiConfig = {
    baseUrl: "https://api.themoviedb.org/3/",
    apiKey: import.meta.env.VITE_TMDB_API_KEY,
    originalImage: (imgPath) => `https://image.tmdb.org/t/p/original/${imgPath}`,
    w500Image: (imgPath) => `https://image.tmdb.org/t/p/w500/${imgPath}`,
}

export default apiConfig