import React from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { AiFillTwitterCircle } from 'react-icons/ai'
import { FaFacebook, FaInstagram } from 'react-icons/fa'




const Footer = () => {


  return (

    <div className='footer-container'>
        <Row className='footer-row'>
            <Col>
                <h4 className='footer-header-text'>Help</h4> 
                <Link to='/contact-us' className='footer-link'>
                    <h6 className='footer-sub-text'>Contact Us</h6>
                </Link>

                <Link to='/faqs' className='footer-link'>
                    <h6 className='footer-sub-text'>FAQs</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Delivery info</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Track Your Order</h6>
                </Link>

            </Col>

            <Col>
                <h4 className='footer-header-text'>Shop</h4> 
                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Adidas</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Nike</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Puma</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Reebok</h6>
                </Link>
            </Col>

            <Col>
                <h4 className='footer-header-text'>Company</h4> 
                <Link to='/about-us' className='footer-link'>
                    <h6 className='footer-sub-text'>Who We Are</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Read Our Reviews</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Offers</h6>
                </Link>

                <Link to='#' className='footer-link'>
                    <h6 className='footer-sub-text'>Our Partners</h6>
                </Link>

            </Col>

            <Col>
                <h4 className='footer-header-text social'>Social</h4> 

                <div className='social-div'>

                <Link className='social-link' to='#'>
                    <AiFillTwitterCircle size={ 25 } />
                </Link>

                <Link className='social-link' to='#'>
                    <FaFacebook size={ 25 } />
                </Link>

                <Link className='social-link' to='#'>
                    <FaInstagram size={ 25 } />
                </Link>


                </div>




            </Col>
        </Row>

    
    </div>

  )

}




export default Footer