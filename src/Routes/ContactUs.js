import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap'
import { gql, useMutation } from '@apollo/client'
import Footer from './Footer'




// the mutation to submit the complaint.
const SUBMIT_COMPLAINT = gql `
    mutation SUBMITCOMPLAINT ( $complaintDetails: complaintInputType!) {
      SubmitComplaint( complaintDetails: $complaintDetails ) {
        userEmail
        query
        subject
        description
      }
    }

`





const ContactUs = () => {

  // handling state.
  const [ email, setEmail ] = useState('')
  const [ query, setQuery ] = useState('')
  const [ subject, setSubject ] = useState('')
  const [ description, setDescription ] = useState('')
  const [ validatedStatus, setValidatedStatus ] = useState( false )
  const [ show, setShow ] = useState( false )


  // functions to update state.
  const updateEmailValue = ( event ) => {
    setEmail( event.target.value )
  }

  const updateQueryValue = ( event ) => {
    setQuery( event.target.value )
  }

  const updateSubjectValue = ( event ) => {
    setSubject( event.target.value )
  }

  const updateDescriptionValue = ( event ) => {
    setDescription( event.target.value )
  }

  const handleModalShow = () => {
    setShow( true )
  }

  const handleModalClose = () => {
    setShow( false )
  }


  // executing the complaint mutation
  const [ submitComplaintMutFunc, { loading, error, data } ] = useMutation( SUBMIT_COMPLAINT, {
    variables: {
      complaintDetails: {
        userEmail: email,
        query,
        subject,
        description
      }
    }
  })



  const handleFormSubmit = () => {
    setValidatedStatus( true )
    console.log(`email: ${ email } query: ${ query } subject: ${ subject } description: ${ description }`)

    if( email.length > 1 && query.length > 1 && subject.length > 1 && description.length > 1 ) {
      submitComplaintMutFunc()
      if ( data ) {
        handleModalShow()
      }
    }


  }




  return (
    <>
    <h3 className='title-text'> { loading? 'Submitting complaint...' : 'Submit a complaint' } </h3>

    <div className='query-div'>
      <Form validated={ validatedStatus } >
        <Form.Group controlID='email-form-group' className='mb-4'>
            <Form.Label> Your e-mail </Form.Label>
            <Form.Control type='text' required onChange={ updateEmailValue } value={ email }  />
        </Form.Group>

        <Form.Group controlID='query-dropdown-form-group' className='mb-4'>
            <Form.Label> What is your query about? </Form.Label>
            <Form.Select onChange={ updateQueryValue } value={ query } required >
              <option>--Select--</option>
              <option>Delivery</option>
              <option>Refunds & Exchanges</option>
              <option>A Problem With My Order</option>
              <option>Amend/Cancel My Order</option>
              <option>Payment, Discounts & Website </option>
              <option>Product & Stock</option>
              <option>Recycling</option>
            </Form.Select>
        </Form.Group>

        <Form.Group controlID='subject-form-group' className='mb-4'>
            <Form.Label> Subject </Form.Label>
            <Form.Control type='text' required onChange={ updateSubjectValue } value={ subject }  />
        </Form.Group>

        <Form.Group controlID='description-form-group' className='mb-4'>
            <Form.Label> Description </Form.Label>
            <Form.Control as='textarea' required rows={ 3 } onChange={ updateDescriptionValue } value={ description }  />
        </Form.Group>


        <Button variant='primary' onClick={ handleFormSubmit } >Submit</Button>
        
      </Form>
      
    </div>

    <Footer />

    {
      data && 
      
          <div>
              <Modal show={ show } onHide={ handleModalClose } centered>
                  <Modal.Header closeButton>
                      <Modal.Title>Complaint Successful</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>Your complaint has been submitted successfully...</Modal.Body>
                  <Modal.Footer>
                      <Button variant='primary' onClick={ handleModalClose }>Ok</Button>
                  </Modal.Footer>
              </Modal>

          </div>

    }


    </>

  )

  
}



export default ContactUs