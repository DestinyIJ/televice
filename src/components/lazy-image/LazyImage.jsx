import React, { useState, useEffect, useRef, useCallback } from 'react';
import ImageSkeleton from '../skeleton/ImageSkeleton';

function LazyImage({ src, alt }) {
  const [imageSrc, setImageSrc] = useState(null);

  const imageObserver = useCallback((imageRef) => {
    if(imageRef === null) return

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            setImageSrc(src);
            observer.unobserve(entry.target);
        }
        });
    });

    observer.observe(imageRef);
    },[src])
  

  return <img ref={imageObserver} src={imageSrc} alt={alt} /> 
}


export default LazyImage