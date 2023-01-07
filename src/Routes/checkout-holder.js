import React, { useState } from 'react'
import { gql, useQuery } from '@apollo/client'
import { Row, Col, Container, Form, Button } from 'react-bootstrap'
import visaCard1 from '../Static Files/visa-card1.png'
import payPal1 from '../Static Files/paypal1.png'
import mobileMoney1 from '../Static Files/mobile-money1.png'
import Footer from './Footer'
import { BsTrash } from 'react-icons/bs'
// import { MdClose } from 'react-icons/md'




// the query to fetch all user cart items.
const FETCH_USER_CART_ITEMS = gql `
    query FETCHUSERCARTITEMS {
        FetchUserCartItems {
            cartItemID
            name
            price
            quantity
            coverPhotoUrl

        }
    }

`







const Checkout = () => {


    // setting state.
    const [ visaChecked, setVisaChecked ] = useState( false )
    const [ paypalChecked, setPaypalChecked ] = useState( false )
    const [ momoChecked, setMomoChecked ] = useState( false )


    const { loading, error, data } = useQuery( FETCH_USER_CART_ITEMS )


    // handling visa payment checked.
    const HandleVisaPaymentChecked = () => {
        setPaypalChecked( false )
        setMomoChecked( false )
        setVisaChecked( true )
        console.log(`visa checked === ${ visaChecked }`)
    }

    // handling paypal payment checked.
    const HandlePaypalPaymentChecked = () => {
        setVisaChecked( false )
        setMomoChecked( false )
        setPaypalChecked( true )
        console.log(`paypal checked === ${ paypalChecked }`)
    }

    // handling momo payment checked.
    const HandleMomoPaymentChecked = () => {
        setVisaChecked( false )
        setPaypalChecked( false )
        setMomoChecked( true )
        console.log(`momo checked === ${ momoChecked }`)
    }

    


    return (
        <div>
           { loading && <h3>loading....</h3> }

           { error && <h3>{ error.message }</h3> }

           {  data && 
                <>
                <h3 className='mb-5 cart-header'>Order summary</h3>

                <div className='checkout-wrapper-div'>
                <Container>
                    {
                        data.FetchUserCartItems.map( ( selectedCartItem, index ) => (
                            <>
                            <Row key={ index } >
                                <Col xs={ 6 } className='cart-item-image-col'>
                                    <p className='cart-item-name'><b>{ selectedCartItem.name }</b></p>
                                    <img src={ selectedCartItem.coverPhotoUrl } className='cart-item-image' alt='' />
                                </Col>

                                <Col xs={ 4 } className='cart-item-desc-col mt-4'>
                                    <p className='cart-item-size'>Size: { selectedCartItem.size } </p>
                                    <p className='cart-item-qty'>Quantity: { selectedCartItem.quantity } </p>
                                    <p className='cart-item-price'>{ selectedCartItem.price }</p>
                                </Col>

                                <Col xs={ 2 } className='mt-4' style={{ cursor: 'pointer' }} >
                                    {/* <MdClose title='remove' /> */} <BsTrash title='remove' />
                                </Col>

                            </Row>
                            <hr />
                            </>
                            
                        ))
                    }

                </Container>


                <Container className='mt-5'>
                    <h3 className='mb-4'>Contact information and billing address</h3>
                    <Form>
                        <Row className='mb-3'>
                            <Col>
                                <Form.Control type='text' placeholder='first name *' />
                            </Col>

                            <Col>
                                <Form.Control type='text' placeholder='last name *' />
                            </Col>
                        </Row>

                        <Row className='mb-3'>
                            <Col>
                                <Form.Control type='email' placeholder='email *' />
                            </Col>

                            <Col>
                                <Form.Control type='text' placeholder='country *' />
                            </Col>
                        </Row>

                        <Row className='mb-3'>
                            <Col>
                                <Form.Control type='text' placeholder='city / suburb *' />
                            </Col>

                            <Col>
                                <Form.Control type='text' placeholder='mobile phone (in case we need to contact you about your order) *' />
                            </Col>
                        </Row>


                        <Row className='mb-3'>
                            <Col>
                                <Form.Control type='text' placeholder='digital address *' />
                            </Col>

                            <Col>
                                <Form.Control type='text' placeholder='zip / postcode *' />
                            </Col>
                        </Row>


                        <Row className='mb-3'>
                            <Col>
                                <Form.Control type='text' placeholder='company (required for business addresses)' />
                            </Col>
                        </Row>

                        <h3 className='mt-5'>Payment</h3>
                        <p>Please choose your preferred payment method</p>
                        <div>
                            <div className='payment-method-div mb-4'>
                                <Form.Check type='radio' label='Credit card' className='me-3 radio-cursor' onChange={ HandleVisaPaymentChecked } checked={ visaChecked } />
                                <img src={ visaCard1 } alt='' width={ 100 } />
                            </div>

                            <div className='payment-method-div mb-4'>
                                <Form.Check type='radio' label='PayPal' onChange={ HandlePaypalPaymentChecked } checked={ paypalChecked } className='radio-cursor' />
                                <img src={ payPal1 } alt='' width={ 100 } />
                            </div>

                            <div className='payment-method-div mb-5'>
                                <Form.Check type='radio' label='Mobile money' onChange={ HandleMomoPaymentChecked } checked={ momoChecked } className='radio-cursor' />
                                <img src={ mobileMoney1 } alt='' width={ 100 } />
                            </div>

                            {
                            visaChecked &&
                                <div style={{ width: '70%' }}>
                                <Row className='mb-3'>
                                    <h3>Pay with credit card</h3>
                                    <Col>
                                        <Form.Control type='text' placeholder='Card number *' />
                                    </Col>
                                </Row>

                                <Row className='mb-3'>
                                    <Col>
                                        <Form.Control type='text' placeholder='Name on card *' />
                                    </Col>
                                </Row>

                                <Row>
                                    <Col xs={ 12 } md={ 6 } className='mb-3'>
                                        <Form.Control type='text' placeholder='Expiration date (MM/YY) *' />
                                    </Col>

                                    <Col className='mb-3'>
                                        <Form.Control type='text' placeholder='Security code *' />
                                    </Col>
                                </Row>
                                </div>
                            }


                            {
                                paypalChecked && 
                                <div>
                                    <h3>Pay with paypal</h3>
                                    <p>After clicking “Complete order”, you will be redirected to PayPal to complete your purchase securely.</p>
                                </div>
                            }


                            {
                                momoChecked && 
                                <div>
                                    <h3>Pay with momo</h3>
                                    <p>After clicking “Complete order”, you will be redirected to Hubtel to complete your purchase securely.</p>
                                </div>
                            }


                            <Button variant='primary' className='mb-4 mt-3' style={{ width: '70%' }}> { visaChecked? 'Pay now' : 'Complete order' } </Button>
                            <p>By placing this order, you agree to our <b className='bold-terms'>Terms of Service</b> and understand our <b className='bold-terms'>Privacy Policy</b>.</p>

                        </div>

                    </Form>

                </Container>
                </div>

                </>
           }

           <Footer />

        </div>
    )

}



export default Checkout