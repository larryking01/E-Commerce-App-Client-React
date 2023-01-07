import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'






const DiscountDiv = () => {

    const [ closeBtn, setCloseBtn ] = useState( false )

    return (

        <div className={ closeBtn? 'collapse-div' : 'discount-div' }>
            <div>
                {/* <p>Stay in the know</p> */}
                <h4 className='sign-up-and-save-text' href='#' >Sign up & save 15% off !!</h4>
            </div>

            <MdClose size={ 20 } className='sign-up-close-btn' onClick={ () => setCloseBtn( true )} />

            

        </div>
    )
}




export default DiscountDiv