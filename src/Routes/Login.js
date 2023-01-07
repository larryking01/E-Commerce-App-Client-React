import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {  gql, useMutation } from '@apollo/client'
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import { BsFillEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { ColorRing, RotatingLines } from 'react-loader-spinner'
import { ExistingUserContextObject } from '../App'
import Footer from './Footer'



// mutation to log in a user.
const SIGN_IN_USER = gql `
  mutation SIGNINUSER( $email: String!, $password: String! ) {
    SignInUser ( email: $email, password: $password ) {
      email
    }
  }

`






const Login = () => {

  let navigate = useNavigate()

  const { user, setUser } = useContext ( ExistingUserContextObject )
  const [ show, setShow ] = useState( false )

  const [ passwordVisible, setPasswordVisible ] = useState( false )
  const [ showUserPassword, setShowUserPassword ] = useState( false )
  const [ enteredEmail, setEnteredEmail ] = useState('')
  const [ enteredPassword, setEnteredPassword ] = useState('')
  const [ validatedStatus, setValidatedStatus ] = useState( false )
  const [ emailValidationError, setEmailValidationError ] = useState(null)
  const [ passwordValidationError, setPasswordValidationError ] = useState(null)



  // function to show modal on error.
  const handleShowModal = () => {
    setShow( true )
  }

  // function to close the modal.
  const handleCloseModal = () => {
    setShow( false )
  }

  // function to make password visible.
  const setPasswordVisibleTrue = () => {
    setPasswordVisible( true )
    setShowUserPassword( true )
  }

  // function to hide password.
  const setPasswordVisibleFalse = () => {
    setPasswordVisible( false )
    setShowUserPassword( false )
  }

  
  // function to capture entered user email.
  const updateEnteredUserEmail = ( event ) => {
    setEmailValidationError(null)
    setValidatedStatus( false )
    setEnteredEmail( event.target.value )

  }

  // function to capture entered user password.
  const updateEnteredUserPassword = ( event ) => {
    setPasswordValidationError(null)
    setValidatedStatus( false )
    setEnteredPassword( event.target.value )

  }


  // executing the mutation.
  const [ signInUserMutFunc, { loading, error, data } ] = useMutation( SIGN_IN_USER, {
    variables: {
      email: enteredEmail,
      password: enteredPassword
    },
    onCompleted: () => {
      setUser( enteredEmail )
      navigate( -1 )
    }
  })


  const HandleLoginFormSubmit = () => {
    // the regex to validate the email
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if( enteredEmail.length < 1 ) {
      setValidatedStatus( true )
      setEmailValidationError('E-mail is required')
    }

    if ( enteredPassword.length < 1) {
      setValidatedStatus( true )
      setPasswordValidationError('Password is required')
    }
    
    if ( enteredEmail.length > 1 && enteredPassword.length > 1 ) {
      if( regex.test( enteredEmail )) {
        signInUserMutFunc()

      }
      else {
        setValidatedStatus( true )
        setEmailValidationError('E-mail is invalid')
      }
    }
  }




  useEffect(() => {
    if ( error ) {
      handleShowModal()
    }
  }, [ error ])


  // useEffect(() => {
  //   if( data ) {
  //     console.log( `from login, current user = ${ data.SignInUser.email }` )
  //     navigate('/')
  //   }

  // }, [ data, navigate ])




    
  return (
    <>
    <h3 className='login-text mt-3 mb-5'> { loading? 
                                              <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
                                              : 
                                              data? 
                                              ''
                                              :
                                              'login'
                                          } 
    </h3>
    <div className='sign-up-form-container-div'>
        <Form className='sign-up-form' validated={ validatedStatus } >
            <Form.Group controlid='email-form-group' className='mb-4'>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                  <Form.Control type='email' placeholder='' required size='lg' onChange={ updateEnteredUserEmail } value={ enteredEmail } />
                  <InputGroup.Text> <MdEmail /*style={{ cursor: 'pointer' }}*/ size={ 25 } /> </InputGroup.Text>
              </InputGroup>
              <Form.Text style={{ color: 'red' }}> { emailValidationError? emailValidationError : null } </Form.Text>
            </Form.Group>

            <Form.Group controlid='password-form-group' className='mb-4'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                  <Form.Control type={ showUserPassword === true? 'text' : 'password' } size='lg' required onChange={ updateEnteredUserPassword } value={ enteredPassword } />
                  <InputGroup.Text>
                      { passwordVisible === true? <BsFillEyeFill style={{ cursor: 'pointer' }} size={ 25 } onClick={ setPasswordVisibleFalse } /> : <BsEyeSlashFill style={{ cursor: 'pointer' }} size={ 25 } onClick={ setPasswordVisibleTrue } /> }
                  </InputGroup.Text>
              </InputGroup>
              <Form.Text style={{ color: 'red' }}> { passwordValidationError? passwordValidationError : null } </Form.Text>
            </Form.Group>

            <Button variant='custom' className='mb-2 mt-4 login-btn' onClick={ HandleLoginFormSubmit }>Login</Button>
            <div className='bottom-text-div'>
                <Link to='/sign-up' className='bottom-link' >Don't have an account? register here</Link>
                <Link to='/#' className='bottom-link' >Forgot password?</Link>
            </div>
        </Form>
    </div>

    { error &&         
        <Modal show={ show } onHide={ handleCloseModal } centered>
            <Modal.Header closeButton>
                <Modal.Title> Sign In Error </Modal.Title>
            </Modal.Header>

            <Modal.Body>
                { error.message } 
            </Modal.Body>

            <Modal.Footer>
                <Button variant='primary' onClick={ handleCloseModal }> OK </Button>
            </Modal.Footer>

        </Modal>
    }

    <Footer />
    </>

  )

}




export default Login