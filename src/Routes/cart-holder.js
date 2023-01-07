import React, { useState, useEffect, useContext } from 'react'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { BsTrash } from 'react-icons/bs'
// import { MdClose } from 'react-icons/md'
import Footer from './Footer'
import { ExistingUserContextObject } from '../App'



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

            { loading && ( <h3> fetching your cart items... </h3>) }

            { 
            
            data &&

                <div className='cart-div'>
                <h3 className='mb-5 cart-header'> { user === null ? 'Please login to view your cart' : 'Your cart' } </h3>
                <hr />

                    <Container>
                        {
                            cartItemsArray.length > 0 &&
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
                                    <>
                                        <Link to='#'>
                                            Clear cart
                                        </Link>

                                        <Link to='/checkout'>
                                            <Button style={{ width: '100%', marginTop: '4%' }}>Go to checkout</Button>
                                        </Link>
                                    </>               
                                </>
                            ))
                            

                        }
                    </Container>
            </div>
    
            }


        </div>
    )

}



export default Cart