import React, { useState, useContext, useEffect } from 'react'
import { gql, useQuery, useMutation } from '@apollo/client'
import { Row, Col, Container, Form, Button, Modal } from 'react-bootstrap'
import visaCard1 from '../Static Files/visa-card1.png'
import payPal1 from '../Static Files/paypal1.png'
import mobileMoney1 from '../Static Files/mobile-money1.png'
import Footer from './Footer'
import { BsTrash } from 'react-icons/bs'
import { ExistingUserContextObject } from '../App'
// import { MdClose } from 'react-icons/md'
import { ColorRing } from 'react-loader-spinner'
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"





// query to fetch cart items of logged in user.
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



// mutation to test stripe payment.
const TEST_PAYMENT = gql `
    mutation PAYMENT {
        Payment 
    }


`










const Checkout = () => {

    // handling state.
    const [ cartItemsArray, setCartItemsArray ] = useState([ ])
    const [ visaChecked, setVisaChecked ] = useState( false )
    const [ paypalChecked, setPaypalChecked ] = useState( false )
    const [ momoChecked, setMomoChecked ] = useState( false )

    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ country, setCountry ] = useState('')
    const [ city, setCity ] = useState('')
    const [ mobilePhone, setMobilePhone ] = useState('')
    const [ digitalAddress, setDigitalAddress ] = useState('')
    const [ postCode, setPostCode ] = useState('')
    const [ companyAddress, setCompanyAddress ] = useState('')

    const [ cardNumber, setCardNumber ] = useState('')
    const [ nameOnCard, setNameOnCard ] = useState('')
    const [ expirationDate, setExpirationDate ] = useState('')
    const [ securityCode, setSecurityCode ] = useState('')
    const [ validateForm, setValidateForm ] = useState( false )

    const [ showConfirmModal, setShowConfirmModal ] = useState( false )

    // destructuring the context object.
    const { user, setUser } = useContext( ExistingUserContextObject )


    // executing the query to fetch user cart items.
    const { loading, error, data } = useQuery( FETCH_USER_CART_ITEMS )


    // executing the mutation to try payment.
    const [ paymentMutFunc, testPaymentObject ] = useMutation( TEST_PAYMENT )


    // the effect hook to track user status.
    useEffect(() => {
        console.log(`from cart, user === ${ user }`)

    }, [ user ])


    // the effect hook to track status of user cart query.
    useEffect(() => {
        if ( data !== undefined && data !== null ) {
            if ( data.FetchUserCartItems !== null ) {
                if ( Array.isArray( data.FetchUserCartItems )) {
                    console.log(`is array === ${ Array.isArray( data.FetchUserCartItems )}`)
                    setCartItemsArray( data.FetchUserCartItems )
                }
                else {
                    console.log(`is array === ${ Array.isArray( data.FetchUserCartItems )}`)
                }
            }

            else {
                console.log('sorry, failed to fetch user cart items as no user found')
            }
        }

        else if( data === undefined ) {
            console.log('from cart, data is undefined')
        }
        else {
            console.log('from cart, data is null')
        }

    }, [ data, user ])


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


    // handling first name value update.
    const HandleFirstNameValueUpdate = ( event ) => {
        setFirstName( event.target.value )
    }


    // handling last name value update.
    const HandleLastNameValueUpdate = ( event ) => {
        setLastName( event.target.value )
    }


    // handling email value update.
    const HandleEmailValueUpdate = ( event ) => {
        setEmail( event.target.value )
    }


    // handling country value update.
    const HandleCountryValueUpdate = ( event ) => {
        setCountry( event.target.value )
    }

    
    // handling city value update.
    const HandleCityValueUpdate = ( event ) => {
        setCity( event.target.value )
    }


    // handling mobile phone value update.
    const HandleMobilePhoneValueUpdate = ( event ) => {
        setMobilePhone( event.target.value )
    }


    // handling digital address value update.
    const HandleDigitalAddressValueUpdate = ( event ) => {
        setDigitalAddress( event.target.value )
    }


    // handling post code value update.
    const HandlePostCodeValueUpdate = ( event ) => {
        setPostCode( event.target.value )
    }


    // handling company address value update.
    const HandleCompanyAddressValueUpdate = ( event ) => {
        setCompanyAddress( event.target.value )
    }


    // handling card number value update.
    const HandleCardNumberValueUpdate = ( event ) => {
        setCardNumber( event.target.value )
    }


    // handling name on card value update.
    const HandleNameOnCardValueUpdate = ( event ) => {
        setNameOnCard( event.target.value )
    }


    // handling expiration date value update.
    const HandleExpirationDateValueUpdate = ( event ) => {
        setExpirationDate( event.target.value )
    }


    // handling security code value update.
    const HandleSecurityCodeValueUpdate = ( event ) => {
        setSecurityCode( event.target.value )
    }
    


    // handling form submit.
    const ValidateAndSubmitForm = () => {
        setValidateForm( true )

        if ( visaChecked ) {
            if ( firstName.length > 0 && lastName.length > 0 && email.length > 0 && country.length > 0 && city.length > 0 && mobilePhone.length > 0 && digitalAddress.length > 0 && postCode.length > 0 && companyAddress.length > 0 && cardNumber.length > 0 && nameOnCard.length > 0 && expirationDate.length > 0 && securityCode.length > 0 ) {
                setValidateForm( false )
                setShowConfirmModal( true )
            }
            else {
                setValidateForm( true )
            }
            
        }

    }





    return (

        <div>
            { error && ( <h3> error while fetching your cart items... </h3>) }

            { loading && ( <div className='load-animation-div'>
                            <ColorRing 
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} 
                                /> 
                                <h6> loading cart items... </h6>
                           </div>
            )}

                            

            { data && 
                (
                    <div className='checkout-wrapper-div'>
                        {
                            user !== null ? 
                                cartItemsArray.length > 0 ? 
                                <>
                                    <h3 className='mb-5 cart-header'> Order summary </h3>
                                    <Row>
                                        <Col md={ 9 } xs={ 6 }>
                                            <h6 className='cart-info'> <b>({ cartItemsArray.length }) items</b> </h6>
                                        </Col>

                                        <Col md={ 3 } xs={ 6 }>
                                            <h6 className='cart-info'><b>Total: GHS 1000.00 </b></h6>
                                        </Col>
                                    </Row>
                                    <hr />
                                    <Container>
                                        <div>
                                        {
                                            cartItemsArray.map(( item, index ) => (
                                                <>
                                                    <Row key={ index }>
                                                        <Col xs={ 6 } className='cart-item-image-col'>
                                                            <p className='cart-item-name'><b>{ item.name }</b></p>
                                                            <img src={ item.coverPhotoUrl } className='cart-item-image' alt=''/> 
                                                        </Col>

                                                        <Col xs={ 4 } className='cart-item-desc-col mt-4'>
                                                            <p className='cart-item-size'>Size: { item.size } </p>
                                                            <p className='cart-item-qty'>Quantity: { item.quantity } </p>
                                                            <p className='cart-item-price'>{ item.price }</p>
                                                        </Col>

                                                        <Col xs={ 2 } className='mt-4' style={{ cursor: 'pointer' }} >
                                                            <BsTrash title='remove' />
                                                            {/* <MdClose title='remove' /> */} 
                                                        </Col>

                                                    </Row>
                                                    <hr />
                                                </>
                                            ))
                                        }
                                        </div>

                                    </Container>


                                    <Container className='mt-5'>
                                        <h3 className='mb-4'>Contact information and billing address</h3>
                                        <Form validated={ validateForm } >
                                            <Row className='mb-3'>
                                                <Col>
                                                    <Form.Control type='text' required placeholder='first name *' onChange={ HandleFirstNameValueUpdate } value={ firstName } />
                                                </Col>

                                                <Col>
                                                    <Form.Control type='text' required placeholder='last name *' onChange={ HandleLastNameValueUpdate } value={ lastName } />
                                                </Col>
                                            </Row>

                                            <Row className='mb-3'>
                                                <Col>
                                                    <Form.Control type='email' required placeholder='email *' onChange={ HandleEmailValueUpdate }  value={ email } />
                                                </Col>

                                                <Col>
                                                    <Form.Control type='text' required placeholder='country *' onChange={ HandleCountryValueUpdate } value={ country } />
                                                </Col>
                                            </Row>

                                            <Row className='mb-3'>
                                                <Col>
                                                    <Form.Control type='text' required placeholder='city / suburb *'  onChange={ HandleCityValueUpdate } value={ city } />
                                                </Col>

                                                <Col>
                                                    <Form.Control type='text' required placeholder='mobile phone (in case we need to contact you about your order) *' onChange={ HandleMobilePhoneValueUpdate } value={ mobilePhone }  />
                                                </Col>
                                            </Row>


                                            <Row className='mb-3'>
                                                <Col>
                                                    <Form.Control type='text' required placeholder='digital address *' onChange={ HandleDigitalAddressValueUpdate } value={ digitalAddress } />
                                                </Col>

                                                <Col>
                                                    <Form.Control type='text' required placeholder='zip / postcode *' onChange={ HandlePostCodeValueUpdate } value={ postCode } />
                                                </Col>
                                            </Row>


                                            <Row className='mb-3'>
                                                <Col>
                                                    <Form.Control type='text' required placeholder='company (required for business addresses)' onChange={ HandleCompanyAddressValueUpdate }  value={ companyAddress } />
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
                                                    <div className='visa-details-form'>
                                                    <Row className='mb-3'>
                                                        <h3 className='mb-4'>Pay with credit card</h3>
                                                        <Col>
                                                            <Form.Control type='text' required placeholder='Card number *' onChange={ HandleCardNumberValueUpdate } value={ cardNumber } />
                                                        </Col>
                                                    </Row>

                                                    <Row className='mb-3'>
                                                        <Col>
                                                            <Form.Control type='text' required placeholder='Name on card *' onChange={ HandleNameOnCardValueUpdate } value={ nameOnCard } />
                                                        </Col>
                                                    </Row>

                                                    <Row>
                                                        <Col xs={ 12 } md={ 6 } className='mb-3'>
                                                            <Form.Control type='text' required placeholder='Expiration date (MM/YY) *' onChange={ HandleExpirationDateValueUpdate } value={ expirationDate } />
                                                        </Col>

                                                        <Col className='mb-3'>
                                                            <Form.Control type='text' required placeholder='Security code *' onChange={ HandleSecurityCodeValueUpdate } value={ securityCode } />
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


                                                <Button variant='custom' className='mb-4 mt-3 payment-btn'  onClick={ ValidateAndSubmitForm } > { visaChecked? 'Pay now' : 'Complete order' } </Button>
                                                <p>By placing this order, you agree to our <b className='bold-terms'>Terms of Service</b> and understand our <b className='bold-terms'>Privacy Policy</b>.</p>

                                                <Button variant='custom' className='mb-4 mt-3 payment-btn'  onClick={ paymentMutFunc } > Test Stripe </Button>
                                            </div>

                                        </Form>

                                        {
                                            <Modal centered show={ showConfirmModal } onHide={() => setShowConfirmModal( false )}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>Confirm shipping details</Modal.Title>
                                                </Modal.Header>

                                                <Modal.Body>
                                                    Do you confirm that the contact information and payment details entered are correct?
                                                </Modal.Body>

                                                <Modal.Footer className='confirm-details-btn-div'>
                                                    <Button>Confirm and pay</Button>
                                                    <Button onClick={() => setShowConfirmModal( false )}>Make changes</Button>
                                                </Modal.Footer>

                                            </Modal>
                                        }

                                </Container>
                                </>

                                    :
                                    <div> 
                                        <h3 className='mb-5 cart-header'> Cart is empty. Add items to your cart to view their details </h3>
                                        <hr />
                                    </div>
                                         :
                                    <>
                                        <h3 className='mb-5 cart-header'> You need to be logged in to view checkout </h3>
                                        <hr />
                                    </>
                         
                        }
                    
                    </div>

                )

            }
        
        <Footer />

        </div>
    )

}



export default Checkout