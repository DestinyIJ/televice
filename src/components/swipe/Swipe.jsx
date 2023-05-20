import React, { useState, useEffect, useRef, useCallback } from 'react'
import ImageSkeleton from '../skeleton/ImageSkeleton';
import './swipe.scss'

const Swipe = ({ children, autoPlay = false, duration = 2000 }) => {
    const [index, setIndex] = useState(0);
    const [inView, setInView] = useState(true)

    
    const handleSwipe = useCallback((direction) => {
      if (direction === 'left') {
        setIndex((prevIndex) => (prevIndex >= children.length - 1 ? 0 : prevIndex + 1));
    
      } else if (direction === 'right') {
        setIndex((prevIndex) => (prevIndex <= 0 ? children.length - 1 : prevIndex - 1));
      }
    }, [index])

    const swipeRef = useRef(null)
  
    useEffect(() => {
      let touchStartX = 0;
      let touchEndX = 0;
      let timeout;
      
      if(autoPlay) {
        timeout = setTimeout(() => {
          handleSwipe('left')
        }, duration);
      }

      // if(!swipeRef) return

      const onTouchStart = (event) => {
        touchStartX = event.touches[0].clientX;
      }
  
      const onTouchEnd = (event) => {
        touchEndX = event.changedTouches[0].clientX;
        
        if (touchEndX < touchStartX) {
            handleSwipe('left')
        } else if (touchEndX > touchStartX) {
            handleSwipe('right')
            console.log('swiping right')
        }
      }

      const options = {
        root: null,
        rootMargin: '0px',
        threshold: 1.0, // Set threshold to 1.0 so that the last child is fully in view
      };

      const swipeObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          window.addEventListener('keydown', (event) => {
            if (event.key === 'ArrowRight') {
              inView && handleSwipe('left')
            } else if(event.key === 'ArrowLeft') {
              inView && handleSwipe('right')
            }
          })
        } else {
          setInView(false)
        }
      }, options);

      
      swipeObserver.observe(swipeRef.current)

      swipeRef.current.addEventListener('touchstart', onTouchStart);
      swipeRef.current.addEventListener('touchend', onTouchEnd);

      return () => {
        clearTimeout(timeout);
        if(swipeRef.current) {
          swipeRef.current.removeEventListener('touchstart', onTouchStart)
          swipeRef.current.removeEventListener('touchend', onTouchEnd)
          // swipeObserver.unobserve(swipeRef.current)
        }
      }
    }, [index])



    
  return (
    <>
      <div ref={swipeRef} className='swipe__container'>
        {React.Children.map(children, (child, i) => (
          <React.Fragment key={i}>
          <div
            className='swipe__item'
            style={{
              flex: 1,
              transition: `transform 0.65s`,
              transform: `translateX(${(-index) * 100}%)`,
            }}
          >
            {React.cloneElement(child, { activeIndex: index })}
          </div>
          </React.Fragment>
        ))}

        
    </div>
    <div className="swiper-pagination"></div>
    <div className="swiper-button-prev"></div>
    <div className="swiper-button-next"></div>
    </>
  )
}


export default Swipe
