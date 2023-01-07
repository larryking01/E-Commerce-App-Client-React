import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery, gql, useMutation } from '@apollo/client'
import { Card, Row, Col, Button, Modal } from 'react-bootstrap'
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
import Slider from 'react-slick'
import Footer from './Footer'
// import ExistingUserContextObject from '../App'
import { ColorRing } from 'react-loader-spinner'





// the query to fetch current user.
const GET_CURRENT_LOGGED_IN_USER = gql `
    query GETCURRENTLOGGEDINUSER {
        GetCurrentLoggedInUser {
            email
        }
    }

`



// the graphql query to fetch selected product details.
const GET_SELECTED_PRODUCT_DETAILS = gql `
    query GETSELECTEDPRODUCTDETAILS($collectionName: String!, $productName: String!) {
      GetSelectedProductDetails(collectionName: $collectionName, productName: $productName) {
        name
        manufacturer
        price
        yearReleased
        coverPhotoUrl
        extraPhotoUrl1
        extraPhotoUrl2
        extraPhotoUrl3
        extraPhotoUrl4
        dateAdded
        gender
        collectionName

      }
    }

`



// the graphql mutation to add item to cart.
const ADD_PRODUCT_TO_CART = gql `
    mutation ADDPRODUCTTOCART ( $addToCartInputType: addToCartInputType ) {
      AddProductToCart ( addToCartInputType: $addToCartInputType ) {
          cartItemID
          name 
          price 
          coverPhotoUrl 
          quantity
          size
          color
      }

    }

`








const SelectedProductDetails = () => {

  // fetching current logged in user
  const user = useQuery( GET_CURRENT_LOGGED_IN_USER, {
    onCompleted: () => {
      console.log('current user query executed')
    }
  } )

  const navigate = useNavigate()
  let colorsArray = ['green', 'black', 'violet', 'blue', 'brown', 'grey', 'indigo', 'pink']
  let sizesArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  
  const params = useParams() 
  const [ selectedProductColor, setSelectedProductColor ] = useState( null )
  const [ selectedProductSize, setSelectedProductSize ] = useState(null)
  const [ selectedProductQuantity, setSelectedProductQuantity ] = useState(1)
  // const [ getSelectedProductDetailsDone, setGetSelectedProductDetailsDone ] = useState( false )
  const [ showModal, setShowModal ] = useState( false )
  const [ showNoUserModal, setShowNoUserModal ] = useState( false )
  const [ selectColorError, setSelectColorError ] = useState( false )
  const [ selectSizeError, setSelectSizeError ] = useState( false )
  let [ currentUser, setCurrentUser ] = useState( null )



  useEffect(() => {
    if( user.data ) {
      if( user.data.GetCurrentLoggedInUser ) {
        setCurrentUser( user.data.GetCurrentLoggedInUser.email )
        console.log(`yessss current user is ${ currentUser }`)
      }
      else {
        setCurrentUser( null )
        console.log(`noooooo current user is ${ user.data.GetCurrentLoggedInUser }`)
      }
    }

  }, [ user, currentUser ])


    // custom previous arrow for slider.
    const PreviousArrowSlider = ( props ) => {
      const { className, style, onClick } = props
      return (
          <BsArrowLeftCircle size={ 30 } onClick={ onClick } className={ className } style={{ ...style, color: 'black' /* cursor: 'pointer', zIndex: 2, position: 'relative', top: 287, right: 40 */ }} />
      )
  }


  // custom next arrow for slider.
  const NextArrowSlider = ( props ) => {
      const { className, style, onClick } = props
      return (
          <BsArrowRightCircle size={ 30 } onClick={ onClick } className={ className } style={{ ...style, color: 'black' /*, cursor: 'pointer', position: 'relative', bottom: 270, left: 1210 */ }} />
      )
  }


  // slider settings.
  const settings = {
    dots: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 500,
    infinite: true,
    arrows: window.innerWidth > 480? true : false,
    prevArrow: <PreviousArrowSlider />,
    nextArrow: <NextArrowSlider />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
          initialSlide: 0,
          arrows: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]

  }


  // function to show modal
  const handleShowModal = () => {
    setShowModal( true )
  }

  // function to close modal
  const handleCloseModal = () => {
    setShowModal( false )
    navigate('/my-cart')
  }

  // function to show modal
  const handleShowNoUserModal = () => {
    setShowNoUserModal( true )
  }

  // function to close modal
  const handleCloseNoUserModal = () => {
    setShowNoUserModal( false )
  }
  

  // function to update selected product color.
  const updateSelectedProductColor = ( color ) => {
    setSelectColorError( false )
    setSelectedProductColor( color )
  }

  // function to update selected product size.
  const updateSelectedProductSize = ( size ) => {
    setSelectSizeError( false )
    setSelectedProductSize( size )
  }

  // function to increment selected product quantity.
  const incrementSelectedProductQuantity = () => {
    setSelectedProductQuantity( selectedProductQuantity + 1 )
  }

  // function to decrement selected product quantity.
  const decrementSelectedProductQuantity = () => {
      if ( selectedProductQuantity > 1 ) {
        setSelectedProductQuantity( selectedProductQuantity - 1 )
      }
      else {
        setSelectedProductQuantity( 1 )
      }
  }

  // function to reset selected product quantity.
  const resetSelectedProductQuantity = () => {
    setSelectedProductQuantity( 1 )

  }

  
  // executing the query to fetch all products
  const { loading, error, data } = useQuery(GET_SELECTED_PRODUCT_DETAILS, {
    variables: {
      collectionName: params.collectionName,
      productName: params.productName
    },
    notifyOnNetworkStatusChange: true

  })


  // executing the mutation to add item to cart.
  const [ addProductToCartMutFunc, cartItem ] = useMutation( ADD_PRODUCT_TO_CART, {
    variables: {
      addToCartInputType: {
        cartItemID: params.productID,
        name: data? data.GetSelectedProductDetails.name : '',
        price: data? data.GetSelectedProductDetails.price : '',
        coverPhotoUrl: data? data.GetSelectedProductDetails.coverPhotoUrl : '',
        quantity: selectedProductQuantity,
        size: selectedProductSize,
        color: selectedProductColor,
        userEmail: currentUser
      }
    },
    notifyOnNetworkStatusChange: true

  } )


  useEffect(() => {
    if( cartItem.data ) {
      handleShowModal() 

    }
  }, [ cartItem.data ])



  // function to check selected color.
  const setSelectedColorError = () => {
    if( selectedProductColor === null ) {
      setSelectColorError( true )
    }

  }

  // function to make check selected size.
  const setSelectedSizeError = () => {
    if( selectedProductSize === null ) {
      setSelectSizeError( true )
    }

  }


  // function to validate inputs and execute mutation.
  const ValidateAndExecuteMutation = () => {
    setSelectedColorError()
    setSelectedSizeError()

    if ( selectColorError === true || selectSizeError === true ) {
      console.log('do nothing')
    }
    else {
      if ( currentUser === null ) {
        handleShowNoUserModal( true )
      }
      else {
        addProductToCartMutFunc()
      }

    }

  }




  
  return (
    <div>
      <div className='product-details-container'>

      { error && <h3>failed to fetch product details due to error..... { error.message } </h3> }

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
                                <h6> loading product details... </h6>
                           </div>
        )}


      { data && 
              <div>
              <h3 className='mb-3'>Product Details:</h3> 
              <Row>
              <Col sm={ 8 } key='col1'>
              <Slider {...settings}>
                  <Card className='card-style mb-5' key={ data.GetSelectedProductDetails.extraPhotoUrl1 }>
                      <Card.Img variant='top' src={ data.GetSelectedProductDetails.extraPhotoUrl1 } className='product-image'  />
                      <Card.Body>
                          <Card.Title>{ data.GetSelectedProductDetails.name }</Card.Title>
                          <Card.Text>{ data.GetSelectedProductDetails.price }</Card.Text>
                      </Card.Body>
                  </Card>          

                  <Card className='card-style mb-5' key={ data.GetSelectedProductDetails.extraPhotoUrl2 }>
                  <Card.Img variant='top' src={ data.GetSelectedProductDetails.extraPhotoUrl2 } className='product-image'  />
                      <Card.Body>
                          <Card.Title>{ data.GetSelectedProductDetails.name }</Card.Title>
                          <Card.Text>{ data.GetSelectedProductDetails.price }</Card.Text>
                      </Card.Body>
                  </Card>   

                  <Card className='card-style mb-5' key={ data.GetSelectedProductDetails.extraPhotoUrl3 }>
                  <Card.Img variant='top' src={ data.GetSelectedProductDetails.extraPhotoUrl3 } className='product-image'  />
                      <Card.Body>
                          <Card.Title>{ data.GetSelectedProductDetails.name }</Card.Title>
                          <Card.Text>{ data.GetSelectedProductDetails.price }</Card.Text>
                      </Card.Body>
                  </Card>  

                  <Card className='card-style mb-5' key={ data.GetSelectedProductDetails.extraPhotoUrl4 }>
                  <Card.Img variant='top' src={ data.GetSelectedProductDetails.extraPhotoUrl4 } className='product-image'  />
                      <Card.Body>
                          <Card.Title>{ data.GetSelectedProductDetails.name }</Card.Title>
                          <Card.Text>{ data.GetSelectedProductDetails.price }</Card.Text>
                      </Card.Body>
                  </Card>    
                    
              </Slider>
              </Col>

              <Col sm={ 4 } className='selected-product-details-col' key='col2'>
                <div>
                <h2> { data.GetSelectedProductDetails.name } </h2>
                <h5> { data.GetSelectedProductDetails.price } </h5>
                <hr />
                <h6 className='mb-3'>Choose Your {/* data.GetSelectedProductDetails.name */} Colour:  { selectColorError === true? <p style={{ color: 'red' }}>Please select product color</p> : <span className='selected-color-text'> { selectedProductColor } </span> } </h6>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap' }}>
                    { colorsArray.map((color, index) => 
                        ( <span className='ms-1 me-1 selected-product-color-span' title={ color } style={{ backgroundColor: color }} onClick={() => updateSelectedProductColor( color )} > </span> ))
                    }

                </div>
                <hr />
                <h6 className='mb-3'>Select Your Size: { selectSizeError === true? <p style={{ color: 'red' }}>Please select product size</p> : <span className='selected-color-text'> { selectedProductSize } </span> } </h6>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
                    {
                      sizesArray.map((size, index) => 
                      ( <span className='ms-1 me-1 mb-2 ps-2 selected-product-size-span' onClick={ () => { updateSelectedProductSize( size ) }}> { size } </span> ))
                    }

                </div>
                <hr />
                <h6 className='mb-3'>Select Quantity: <span className='selected-quantity-text'> { selectedProductQuantity } </span> </h6>
                <div style={{ display: 'flex', flexDirection: 'row', flexWrap:'nowrap', justifyContent: 'space-between'}}>
                  <Button variant='outline-primary' onClick={ incrementSelectedProductQuantity }> + </Button>
                  <Button variant='outline-primary' onClick={ decrementSelectedProductQuantity }> - </Button>
                  <Button variant='outline-primary' onClick={ resetSelectedProductQuantity }> Reset </Button>

                </div>
                <hr />
                {/* <h6 className='mb-2'>Reviews:</h6> */}

                <Button variant='custom' className='add-to-cart-btn' onClick={ ValidateAndExecuteMutation }> { cartItem.loading? 'Adding To Cart....' : 'Add To Cart' } </Button>

                </div>
              </Col>
              </Row>
              </div>
      }
    </div>

    {
      cartItem.data && 
        <Modal show={ showModal } onHide={ handleCloseModal } centered>
            <Modal.Header closeButton>
                <Modal.Title>Cart info...</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                Product added successfully. You can check your cart for more details
            </Modal.Body>

            <Modal.Footer>
                <Button variant='primary' onClick={ handleCloseModal } style={{ width: '100%'}} >OK</Button>
            </Modal.Footer>

        </Modal>
    }


      <Modal show={ showNoUserModal } onHide={ handleCloseNoUserModal } centered>
            <Modal.Header closeButton>
                <Modal.Title>No current user...</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                There is no logged in user. Please log in and try again
            </Modal.Body>

            <Modal.Footer>
                <Button variant='primary' onClick={ handleCloseNoUserModal } style={{ width: '100%'}} >OK</Button>
            </Modal.Footer>

        </Modal>





    <Footer />


    </div>
  )

}



export default SelectedProductDetails