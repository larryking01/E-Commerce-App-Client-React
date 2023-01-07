import React from 'react'
import { Row, Col, Card } from 'react-bootstrap'
import girlCover from '../Static Files/girlCover1.webp'
import seaCover1 from '../Static Files/sea-cover1.jpg'
import wendy from '../Static Files/wendy.jpg'
import akuShika1 from '../Static Files/aku-shika1.jpg'
import akuShika2 from '../Static Files/aku-shika2.jpg'
import major1 from '../Static Files/major1.jpg'
import Footer from './Footer'




const AboutUs = () => {

  // the array to hold team member details.
  let teamDetailsArray = [
    {
      name: 'Sandra Boampong',
      position: 'President',
      info: 'vxvxncjvcxzvxcv',
      picture: major1
    },

    {
      name: 'Wendy Asamoah Yeboah',
      position: 'President',
      info: 'vxvxncjvcxzvxcv',
      picture: wendy
    },

    {
      name: 'Oswell Aku-Shika Allotey',
      position: 'President',
      info: 'vxvxncjvcxzvxcv',
      picture: akuShika2
    }

  ]


  return (

    <>
    <div className='about-container'>
        <div className='about-header-container'>
          <h3 className='about-us-title'>About Us</h3>
          <div className='image-text-container'>
            <h3 className='about-header-text'>
              "Quality is not an act, it's a habit" ~ Aristotle.
            </h3>
            <h3 className='we-believe-text'>We believe you deserve the very best and so we only aim to bring you the best quality products out there</h3>
            </div>
            <img src={ seaCover1 } alt='' style={{ width: '100%', height: 200 }} className='about-cover-img' />
        </div>

        <div className='who-we-are-container'>
            <h3 className='who-we-are-text'>Who We Are</h3>
            <h3 className='who-we-are-intro-text'>
              We’re an independently owned, strategic creative agency – forever curious and ready to transform the way business is done.
            </h3>
        </div>

        <div className='alternating-container'>
            <Row className='alternate-row'>
                <Col xs={ 12 } md={ 6 }>
                    <img src={ girlCover } alt='' style={{ maxWidth: '100%' }} />
                
                </Col>

                <Col className='alternative-info-col'>
                  <div>
                  <h3 className='col-text-header'>
                    Our customers come first
                  </h3>

                  <h3 className='col-text'>
                    We’re an independently owned, strategic creative agency – forever curious and ready to transform the way business is done.
                  </h3>
                  </div>
                </Col>
            </Row>

            <Row className='alternate-row'>
                <Col className='alternative-info-col'>
                  <div>
                  <h3 className='col-text-header'>
                    What's in the box?
                  </h3>
                  <h3 className='col-text'>
                    Although we are a well-oiled machine, our people are far from cogs. The talent we cultivate gets the importance of honing their respective crafts. It helps to better serve both each other and our partners, and it shows in everything – from what we design and produce, to what we value and believe.
                  </h3>
                  </div>
                </Col>

                <Col xs={ 12 } md={ 6 }>
                    <img src={ girlCover } alt='' style={{ maxWidth: '100%' }} />
                </Col>

            </Row>

        </div>


        <div className='meet-the-team-container'>
            <h3 className='meet-the-team-text mb-4'>Meet the team</h3>
            <Row xs={ 1 } md={ 3 } className='meet-the-team-row'>
                {
                   teamDetailsArray.map(( teamMember, index ) => (
                      <Card className='card-item'>
                          <Card.Img src={ teamMember.picture } alt='' variant='top' style={{ maxWidth: '100%', height: '80%' }} />
                          <Card.Body>
                              <Card.Title className='card-title'>{ teamMember.name }</Card.Title>
                              <Card.Text>{ teamMember.info }</Card.Text>
                          </Card.Body>
                      </Card>
                   ))

                }

            </Row>
            

        </div>

    
    </div>

    <Footer />

    </>



  )

  
}




export default AboutUs