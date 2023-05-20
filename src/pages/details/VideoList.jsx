import React, { useState, useEffect, useRef  } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import { tmdbApi } from '../../api/tmdbApi'

const VideoList = ({ id }) => {
    const { category } = useParams()

    const [videos, setVideos] = useState([])

    useEffect(() => {
        const getVideos = async () => {
            const response = await tmdbApi.getVideos(category, id)
            setVideos(response.results.slice(0,10))
        }
       

        getVideos()
    }, [ category, id])

    return (
        <div>
            {
                videos.map((video, i) => (
                    <Video key={i} video={video} />
                ))
            }
        </div>
    )
}

const Video = ({ video }) => {
    const iframeRef = useRef()

    useEffect(() => {
        if(iframeRef.current == null) return
        const height = iframeRef.current.offsetWidth * 9 / 16 + 'px'
        iframeRef.current.setAttribute('height', height)
    }, [])

    return (
        <div className="video">
            <div className="video__title">
                <h2>{video.name}</h2>
            </div>
            <iframe 
                src={`https://www.youtube.com/embed/${video.key}`} 
                ref={iframeRef}
                width="100%"
                title='video'
            />
        </div>
    )
}

export default VideoList