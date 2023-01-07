import React, { useState, useEffect } from 'react'
import { BsArrowUpCircle } from 'react-icons/bs'



const ScrollToTopBtn = () => {

    // setting up the visibility state of the btn.
    const [ scrollToTopBtn, setScrollToTopBtnVisible ] = useState( false )

    // toggle btn visibility depending on how far downwards user has scrolled.
    useEffect(()=> {
        window.addEventListener('scroll', () => {
            if( window.scrollY > 100 ) {
                setScrollToTopBtnVisible( true )
            }
            else {
                setScrollToTopBtnVisible( false )
            }
        })

    }, [])

    // actually scrolling to the top of the page.
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }



    return (
        <div className="top-to-btm">
            {
                scrollToTopBtn && (
                    <BsArrowUpCircle className="icon-position icon-style" onClick={ scrollToTop } />
                )
            }
    
        </div>
    )

}




export default ScrollToTopBtn