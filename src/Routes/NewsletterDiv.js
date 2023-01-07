import React from 'react'
import { Form, InputGroup, Button } from 'react-bootstrap'


const NewsletterDiv = ( ) => {


    return (
        <div className='newsletter-div'>
            <h3 className='mb-4'>Connect with us</h3>
            <p className='mb-4'>Stay up to date with the latest news on new arrivals, exclusive sales and more.</p>
            <Form className='newsletter-form'>
                <InputGroup>
                    <Form.Control className='newsletter-email' type='text' placeholder='email@example.com' />
                    <InputGroup.Text className='subscribe-btn'>  Subscribe  </InputGroup.Text>
                </InputGroup>
            </Form>
                
        </div>
    )

}



export default NewsletterDiv