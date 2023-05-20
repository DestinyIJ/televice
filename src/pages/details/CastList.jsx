import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../../api/apiConfig'
import { tmdbApi } from '../../api/tmdbApi'



const CastList = ({ id }) => {
    const { category } = useParams()

    const [casts, setCasts] = useState([])

    useEffect(() => {
        const getCredits = async () => {
            const response = await tmdbApi.getVideoCredits(category, id)
            setCasts(response.cast.slice(0,7))
        }
       

        getCredits()
    }, [ category, id])

    return (
        <div className='casts'>
            {
                casts.map((cast, i) => (
                    <div key={i} className="casts__item">
                        <div className="casts__item__img" 
                            style={{
                                backgroundImage: `url(${ apiConfig.w500Image(cast.profile_path)})` 
                            }}
                        />
                        <p className="casts__item__name">{cast.name}</p>
                    </div>
                ))
            }
        </div>
    )
}

export default CastList