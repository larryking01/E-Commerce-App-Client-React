import React, { useState, useEffect, useContext } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BsTrash } from 'react-icons/bs'
// import { MdClose } from 'react-icons/md'
import Footer from './Footer'
import { ExistingUserContextObject } from '../App'
import { ColorRing } from 'react-loader-spinner'




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


// mutation to delete cart item.
const DELETE_CART_ITEM = gql `
    mutation DELETECARTITEM ( $cartItemName: String! ) {
        DeleteCartItem ( cartItemName: $cartItemName )
    }
`







const Cart = () => {

    // handling state.
    const [ cartItemsArray, setCartItemsArray ] = useState([ ])


    // destructuring the context object.
    const { user, setUser } = useContext( ExistingUserContextObject )


    // executing the query to fetch user cart items.
    const { loading, error, data } = useQuery( FETCH_USER_CART_ITEMS )


    // executing the mutation to delete cart items.
    const [ deleteCartItemMutFunc ] = useMutation( DELETE_CART_ITEM, {
        variables: {
            cartItemName: 'ABCDEFGHIJKL'
        }
    } )


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
                    <div className='cart-div'>
                        {
                            user !== null ? 
                                cartItemsArray.length > 0 ? 
                                <>
                                    <h3 className='mb-5 cart-header'> Your cart </h3>
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
                                                            <BsTrash title='remove' onClick={ () => { deleteCartItemMutFunc({ variables: { cartItemName: item.name }}) } }/>
                                                            {/* <MdClose title='remove' /> */} 
                                                        </Col>

                                                    </Row>
                                                    <hr />
                                                </>
                                            ))
                                        }

                                        <Row>
                                            <Col>
                                                <Link to='/checkout'>
                                                    <Button variant='custom' className='go-to-checkout-btn'>Go to checkout</Button>
                                                </Link>
                                            </Col>

                                            <Col>
                                                <Link to='#'>
                                                    <Button variant='outline-primary' style={{ width: '100%', marginTop: '4%' }}>Reset cart</Button>
                                                </Link>
                                            </Col>

                                            
                                        </Row>

                                        </div>

                                    </Container>
                                    </>

                                         :
                                    <div> 
                                        <h3 className='mb-5 cart-header'> Cart is empty. Add items to your cart to view their details </h3>
                                        <hr />
                                    </div>
                                         :
                                    <>
                                        <h3 className='mb-5 cart-header'> You need to be logged in to view your cart </h3>
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



export default Cart