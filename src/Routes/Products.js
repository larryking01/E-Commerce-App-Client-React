import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, gql } from '@apollo/client'
import { BsArrowRightCircle } from 'react-icons/bs'
import { BsArrowLeftCircle } from 'react-icons/bs'
// css for react-slick
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Slider from 'react-slick'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Footer from './Footer'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import prophereAlt1 from '../Static Files/prophereAlt1.jpg'
import airmaxAlt1 from '../Static Files/airmaxAlt1.jpg'
import fentyAlt1 from '../Static Files/fentyAlt1.jpg'
import reebokAlt1 from '../Static Files/reebokAlt1.jpg'
import { ColorRing } from 'react-loader-spinner'

import cover100 from '../Static Files/cover100.jpg'
import DiscountDiv from './DiscountDiv'
import NewsletterDiv from './NewsletterDiv'
import happy_man1 from '../Static Files/happy_man1.jpg'
import happy_man2 from '../Static Files/happy_man2.jpg'
import happy_man3 from '../Static Files/happy_man3.jpg'
import happy_man4 from '../Static Files/happy_man4.jpg'









// query to fetch all adidas products.
const FETCH_All_PRODUCTS = gql `
    query FETCHALLPRODUCTS( $collectionName: String! ) {
        FetchAllProducts( collectionName: $collectionName) {
            productID
            name
            manufacturer
            price
            gender
            dateAdded
            coverPhotoUrl
            extraPhotoUrl1
            extraPhotoUrl2
            extraPhotoUrl3
            extraPhotoUrl4
            yearReleased
            collectionName

        }
    }




`







const Products = () => {

    const [ deviceWidth, setDeviceWidth ] = useState( )

    let happyManArray = [
        { name: 'quanboy', source: happy_man1 },
        { name: 'ekow richie', source: happy_man2 },
        { name: 'mr_royalty', source: happy_man3 },
        { name: 'man_like_kyle', source: happy_man4 }

    ]

    // executing the query to fetch all adidas products
    const adidasResult = useQuery( FETCH_All_PRODUCTS, {
        variables: {
            collectionName: 'Adidas Products Collection'
        }
    })


    // executing the query to fetch all nike products
    const nikeResult = useQuery( FETCH_All_PRODUCTS, {
        variables: {
            collectionName: 'Nike Products Collection'
        }
    })


    // executing the query to fetch all adidas products
    const reebokResult = useQuery( FETCH_All_PRODUCTS, {
        variables: {
            collectionName: 'Reebok Products Collection'
        }
    })


    // executing the query to fetch all puma products
    const pumaResult = useQuery( FETCH_All_PRODUCTS, {
        variables: {
            collectionName: 'Puma Products Collection'
        }
    })


    // useRef
    const sneakerCollectionDiv = useRef( null )

    const scrollToSneakerCollectionDiv = ( reference ) => {
        window.scrollTo({
            top: reference.current.offsetTop,
            behavior: 'smooth'
        })
    }


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





    // react-slick settings.
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,                
        slidesToScroll: 1,
        rows: 1,
        useCSS: true,
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


    return (
      <div>

            <DiscountDiv />

            <div className='mt-0'>
                <img src={ cover100 } className='cover-img' alt='cover' />
                <h3 className='cover-img-text-header'>Sneaker season is upon us</h3>
                <h4 className='cover-img-text-sub' >Get confident</h4>
                {/* <Button variant='primary' className='cover-img-btn' onClick={ () => scrollToSneakerCollectionDiv( sneakerCollectionDiv ) }>Shop Now</Button> */}
            </div>

            <div className='value-quality-div'>
                <h3 className='innovative-comfort-text'><b>innovative comfort that takes you everywhere</b></h3>
                {/* <p>that's why we bring you only the best</p> */}
            </div>


            {/* { adidasResult.loading && <div className='fetching-products-div '> <h3> fetching products... </h3> </div> }
            { adidasResult.error && <div className='error-div'> <h3> sorry, failed to fetch products due to error </h3> </div> } */}
            
            <div> 
                <div>
                { adidasResult.error && <div className='error-div'> <h3> sorry, failed to fetch products due to error </h3> </div> }

                { adidasResult.loading && ( <div className='load-animation-div'>
                            <ColorRing 
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="blocks-loading"
                                wrapperStyle={{}}
                                wrapperClass="blocks-wrapper"
                                colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} 
                                /> 
                                <h6> loading products... </h6>
                           </div>
                 )}



                { adidasResult.data &&
                <div className='products-fetched-div' ref={ sneakerCollectionDiv }> 
                    <h3 className='mb-5 shop-collections-text'><b>Shop the collections</b></h3>
                    <h3 className='mb-3 intro-collection'>Our Adidas Collections</h3>
                    <Slider {...settings}>
                        {
                            adidasResult.data.FetchAllProducts.map( ( product, index ) => (
                                <Col key={ product.productID }>
                                <Link to={`product-details/${product.collectionName}/${product.name}/${product.productID}`} className='product-details-link'>
                                <Card className='card-style mb-5' onClick={ () => console.log(product.name)} >
                                    <Card.Img src={ product.coverPhotoUrl } variant='top' className='product-image'  />
                                        <Card.Body>
                                            <Card.Title className='product-name'> { product.name } </Card.Title>
                                            <Card.Text className='product-price'> { product.price } </Card.Text>
                                        </Card.Body>
                                </Card>
                                </Link>
                                </Col>
                            ))
                        }

                    </Slider>
                </div>

                }


                { nikeResult.data && 
                <div className='products-fetched-div' ref={ sneakerCollectionDiv }> 
                    <h3 className='mb-3 intro-collection' onClick={ () => { console.log(`width = ${window.innerWidth} screen width = ${ window.screen.width}`)}}>Our Nike Collections</h3>
                    <Slider {...settings}>
                        {
                            nikeResult.data.FetchAllProducts.map( ( product, index ) => (
                                <Col key={ product.productID }>
                                <Link to={`product-details/${product.collectionName}/${product.name}/${product.productID}`} className='product-details-link'>
                                <Card className='card-style mb-5' onClick={ () => console.log(product.name)} >
                                    <Card.Img src={ product.coverPhotoUrl } variant='top' className='product-image'  />
                                        <Card.Body>
                                            <Card.Title className='product-name'> { product.name } </Card.Title>
                                            <Card.Text className='product-price'>{ product.price } </Card.Text>
                                        </Card.Body>
                                </Card>
                                </Link>
                                </Col>
                            ))
                        }

                    </Slider>
                </div>

                }



                { pumaResult.data &&
                <div className='products-fetched-div' ref={ sneakerCollectionDiv }> 
                    <h3 className='mb-3 intro-collection'>Our Puma Collections</h3>
                    <Slider {...settings}>
                        {
                            pumaResult.data.FetchAllProducts.map( ( product, index ) => (
                                <Col key={ product.productID }>
                                <Link to={`product-details/${product.collectionName}/${product.name}/${product.productID}`} className='product-details-link'>
                                <Card className='card-style mb-5' >
                                    <Card.Img src={ product.coverPhotoUrl } variant='top' className='product-image'  />
                                        <Card.Body>
                                            <Card.Title className='product-name'> { product.name } </Card.Title>
                                            <Card.Text className='product-price'> { product.price } </Card.Text>
                                        </Card.Body>
                                </Card>
                                </Link>
                                </Col>
                            ))
                        }

                    </Slider>
                </div>

                }



                { reebokResult.data && 
                <div className='products-fetched-div' ref={ sneakerCollectionDiv }> 
                    <h3 className='mb-3 intro-collection'>Our Reebok Collections</h3>
                    <Slider {...settings}>
                        {
                            reebokResult.data.FetchAllProducts.map( ( product, index ) => (
                                <Col key={ product.productID }>
                                <Link to={`product-details/${product.collectionName}/${product.name}/${product.productID}`} className='product-details-link'>
                                <Card className='card-style mb-5' onClick={ () => console.log(product.name)} >
                                    <Card.Img src={ product.coverPhotoUrl } variant='top' className='product-image'  />
                                        <Card.Body>
                                            <Card.Title className='product-name'> { product.name } </Card.Title>
                                            <Card.Text className='product-price'> { product.price } </Card.Text>
                                        </Card.Body>
                                </Card>
                                </Link>
                                </Col>
                            ))
                        }

                    </Slider>
                </div>
                }

                </div>


                <div className='good-design-div'>
                    <h3><b>We value good design</b></h3>
                    <h3 className='inside-matters'>But it's what's on the inside that matters</h3>
                </div>

                <div className='mt-5'>
                    <Row className='happy_man_row'>
                        {
                            happyManArray.map(( item, index ) => (
                                <Col key={ index } className='happy_man_col'>
                                    <img src={ item.source } alt='happy_man' className='happy_man_image' />
                                    <p>@{ item.name }</p>
                                </Col>
                            ))
                        }

                    </Row>
                    
                    
                </div>


                <div className={ adidasResult.data ? 'famous-products-div-products-loaded' : 'famous-products-div-products-not-loaded'}>
                    <h3 style={{ textAlign: 'center', paddingBottom: '1%' }}><b>Top Trending</b></h3>
                    <Container>
                        <Row className='alternate-row'>
                            <Col xs={ 12 } md={ 6 }>
                                <img src={ prophereAlt1 } alt='' style={{ maxWidth: '100%' }} />
                            </Col>
                            <Col className='alternative-info-col'>
                                <div>
                                    <h3> <b>Adidas Prophere</b></h3>
                                    <h6>
                                        The adidas Prophere is a new lifestyle shoe from adidas. It initially released on December 15th, 2017 for an MSRP of $120. </h6>
                                </div>
                            </Col>
                        </Row>

                        <Row className='alternate-row'>
                            <Col xs={ 12 } md={ 6 } className='alternative-info-col'>
                                <div>
                                    <h3> <b>Nike Air Max 270</b></h3>
                                    <h6>
                                    The Nike Air Max 270 was launched in 2018 as the then youngest member of the Air Max family. As usual, the large Air unit was particularly striking. </h6>
                                </div>
                            </Col>
                            <Col>
                                <img src={ airmaxAlt1 } alt='' style={{ maxWidth: '100%' }} />
                            </Col>
                        </Row>

                        <Row className='alternate-row'>
                            <Col>
                                <img src={ fentyAlt1 } alt='' style={{ maxWidth: '100%' }} />
                            </Col>
                            <Col xs={ 12 } md={ 6 } className='alternative-info-col'>
                                <div>
                                    <h3> <b>Puma Fenty</b></h3>
                                    <h6>
                                        On an earnings call in late April, Puma’s CEO Björn Gulden revealed that the brand is surging, reporting a net income increase of 92% for the quarter. </h6>
                                </div>
                            </Col>
                        </Row>

                        <Row className='alternate-row'>
                            <Col xs={ 12 } md={ 6 } className='alternative-info-col'>
                                <div>
                                    <h3> <b>Reebok Vintage</b></h3>
                                    <h6>
                                        Since 1983, the Reebok Classic has been a way of life. A champion of design and a darling in the retro footwear community, the Classic Leather has been a mainstay in street fashion in its most recognizable forms. </h6>
                                </div>
                            </Col>
                            <Col>
                                <img src={ reebokAlt1 } alt='' style={{ maxWidth: '100%' }} />
                            </Col>
                        </Row>

                    </Container>
                </div>

                </div>
             

            <NewsletterDiv />
            <Footer />
      </div>

    )

}




export default Products
