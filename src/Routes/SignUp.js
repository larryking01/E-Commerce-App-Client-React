import React, { useState, useEffect, useContext } from 'react'
import { gql, useMutation } from '@apollo/client'
import { Link, useNavigate } from 'react-router-dom'
import { Form, InputGroup, Button, Modal } from 'react-bootstrap'
import { BsFillEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { MdEmail } from 'react-icons/md'
import { FaUserShield } from 'react-icons/fa'
import { ExistingUserContextObject } from '../App'
import { ColorRing } from 'react-loader-spinner'

import Footer from './Footer'




// the mutation to register a new user.
const REGISTER_NEW_USER = gql `
    mutation REGISTERNEWUSER ( $registerNewUserInput: registerNewUserInputType ) {
      RegisterNewUser( registerNewUserInput : $registerNewUserInput ) {
        email
      }
    }

`








const SignUp = () => {

  const { user, setUser } = useContext( ExistingUserContextObject )

  let navigate = useNavigate()


  const [ passwordVisible, setPasswordVisible ] = useState( false )
  const [ confirmPasswordVisible, setConfirmPasswordVisible ] = useState( false )
  const [ showUserPassword, setShowUserPassword ] = useState( false )
  const [ showUserConfirmPassword, setShowUserConfirmPassword ] = useState( false )

  const [ enteredUserName, setEnteredUserName ] = useState('')
  const [ enteredEmail, setEnteredEmail ] = useState('')
  const [ enteredPassword, setEnteredPassword ] = useState('')
  const [ enteredConfirmPassword, setEnteredConfirmPassword ] = useState('')
  const [ show, setShow ] = useState( false )
  const [ userNameError, setUserNameError ] = useState(null)
  const [ emailError, setEmailError ] = useState(null)
  const [ passwordError, setPasswordError ] = useState( null )
  const [ confirmPasswordError, setConfirmPasswordError ] = useState( null ) 
  const [ validatedStatus, setValidatedStatus ] = useState( false )
  


  // function to show modal on error.
  const handleShowModal = () => {
    setShow( true )
  }

  // function to close the modal.
  const handleCloseModal = () => {
    setShow( false )
  }


  // executing the query.
  const [ registerNewUserMutFunc, { loading, data, error } ] = useMutation( REGISTER_NEW_USER, {
    variables: {
      registerNewUserInput: {
        username: enteredUserName,
        email: enteredEmail,
        password: enteredPassword,
        confirmPassword: enteredConfirmPassword
      }
    },
    onCompleted: ( ) => {
      setUser( enteredEmail )
      navigate('/')

    }
  })



  const HandleSignUpFormSubmit = () => {

    // the regex to validate the email
    const regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/

    if( enteredUserName.length < 1 ) {
      setValidatedStatus( true )
      setUserNameError('Username is required')
    }

    if( enteredEmail.length < 1 ) {
      setValidatedStatus( true )
      setEmailError('E-mail is required')
    }

    if( enteredPassword.length < 1 ) {
      setValidatedStatus( true )
      setPasswordError('Password is required')
    }

    if( enteredConfirmPassword.length < 1 ) {
      setValidatedStatus( true )
      setConfirmPasswordError('Password confirmation is required')
    }

    if( enteredUserName.length > 1 && enteredEmail.length > 1 && enteredPassword.length > 1 && enteredConfirmPassword.length > 1 ) {
      if( regex.test( enteredEmail )) {
          if( enteredPassword === enteredConfirmPassword ) {
            // alert('validation successful')
            registerNewUserMutFunc()
          }
          else {
            setPasswordError('Password and confirm password do not match')
          }
      }
      else {
        setEmailError('Invalid e-mail')
      }

    }




  }


  useEffect(() => {
    if ( error ) {
      handleShowModal()
    }
  }, [ error ])


  useEffect(() => {
    if( data ) {
      navigate('/')
    }

  }, [ data, navigate ])


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

  // function to make confirm password visible.
  const setConfirmPasswordVisibleTrue = () => {
    setConfirmPasswordVisible( true )
    setShowUserConfirmPassword( true )
  }

  // function to hide confirm password.
  const setConfirmPasswordVisibleFalse = () => {
    setConfirmPasswordVisible( false )
    setShowUserConfirmPassword( false )
  }

  // function to capture entered user username
  const updateEnteredUserUsername = ( event ) => {
    setEnteredUserName( event.target.value )
    setUserNameError( null )
    setValidatedStatus( false )
  }

  // function to capture entered user email
  const updateEnteredUserEmail = ( event ) => {
    setEnteredEmail( event.target.value )
    setEmailError( null )
    setValidatedStatus( false )
  }

  // function to capture entered user password
  const updateEnteredUserPassword = ( event ) => {
    setEnteredPassword( event.target.value )
    setPasswordError( null )
    setValidatedStatus( false )
  }

  // function to capture entered user confirm password
  const updateEnteredConfirmPassword = ( event ) => {
    setEnteredConfirmPassword( event.target.value )
    setConfirmPasswordError( null )
    setValidatedStatus( false )
    
    if( passwordError.includes('Password and confirm password do not match')) {
      setPasswordError( null )
    }

  }


 


  return (
    <>
    <h3 className='login-text mt-3 mb-5'> { loading? 
                                              <ColorRing visible={true} height="80" width="80" ariaLabel="blocks-loading" wrapperStyle={{}} wrapperClass="blocks-wrapper" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}/>
                                              : 
                                              data? 
                                              ''
                                              :
                                              'create account'
                                          } 
    </h3>
    <div className='sign-up-form-container-div'>
        <Form className='sign-up-form' validated={ validatedStatus }>
            <Form.Group controlId='username-form-group' className='mb-4' >
              <Form.Label>Username</Form.Label>
              <InputGroup>
                  <Form.Control type='text' placeholder='' required={ true } size='lg' onChange={ updateEnteredUserUsername } value={ enteredUserName } />
                  <InputGroup.Text> <FaUserShield /*style={{ cursor: 'pointer' }}*/ size={ 25 } /> </InputGroup.Text>
              </InputGroup>
              <Form.Text style={{ color: 'red' }}> { userNameError ? userNameError : null } </Form.Text>
            </Form.Group>

            <Form.Group controlId='email-form-group' className='mb-4'>
              <Form.Label>Email</Form.Label>
              <InputGroup>
                  <Form.Control type='email' placeholder='' required={ true } size='lg' onChange={ updateEnteredUserEmail } value={ enteredEmail } />
                  <InputGroup.Text> <MdEmail /*style={{ cursor: 'pointer' }}*/ size={ 25 } /> </InputGroup.Text>
              </InputGroup>
              <Form.Text style={{ color: 'red' }}> { emailError ? emailError : null } </Form.Text>
            </Form.Group>

            <Form.Group controlId='password-form-group' className='mb-4'>
              <Form.Label>Password</Form.Label>
              <InputGroup>
                  <Form.Control type={ showUserPassword === true? 'text' : 'password' } required={ true } size='lg' onChange={ updateEnteredUserPassword } value={ enteredPassword } />
                  <InputGroup.Text>
                      { passwordVisible === true? <BsFillEyeFill style={{ cursor: 'pointer' }} size={ 25 } onClick={ setPasswordVisibleFalse } /> : <BsEyeSlashFill style={{ cursor: 'pointer' }} size={ 25 } onClick={ setPasswordVisibleTrue } /> }
                  </InputGroup.Text>
              </InputGroup>
              <Form.Text style={{ color: 'red' }}> { passwordError ? passwordError : null } </Form.Text>
            </Form.Group>

            <Form.Group controlId='confirm-password-form-group' className='mb-4'>
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup>
                  <Form.Control type={ showUserConfirmPassword === true? 'text' : 'password' } required={ true } size='lg' onChange={ updateEnteredConfirmPassword } value={ enteredConfirmPassword } />
                  <InputGroup.Text>
                      { confirmPasswordVisible === true? <BsFillEyeFill style={{ cursor: 'pointer' }} size={ 25 } onClick={ setConfirmPasswordVisibleFalse } /> : <BsEyeSlashFill style={{ cursor: 'pointer' }} size={ 25 } onClick={ setConfirmPasswordVisibleTrue } /> }
                  </InputGroup.Text>
              </InputGroup>
              <Form.Text style={{ color: 'red' }}> { confirmPasswordError ? confirmPasswordError : null } </Form.Text>
            </Form.Group>

            <Button variant='custom' className='mb-2 mt-4 login-btn' onClick={ HandleSignUpFormSubmit } >Create Account</Button>
            <Link to='/account' className='bottom-link'>Already have an account? login here</Link>
        </Form>
    </div>
    { error &&         
        <Modal show={ show } onHide={ handleCloseModal } centered>
            <Modal.Header closeButton>
                <Modal.Title> Sign Up Error </Modal.Title>
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




export default SignUp