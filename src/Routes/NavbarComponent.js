import React, { useContext, useEffect } from 'react'
import { gql, useMutation, useQuery } from '@apollo/client'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Container from 'react-bootstrap/Container'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { BiUser } from 'react-icons/bi'
import { BsCart3 } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai'
import { FaUserShield } from 'react-icons/fa'

import brand4 from '../Static Files/brand4.png'
import { ExistingUserContextObject } from '../App'





// query to get current logged in user.
const GET_CURRENT_LOGGED_IN_USER = gql `
    query GETCURRENTLOGGEDINUSER {
        GetCurrentLoggedInUser {
            email
        }
    }

`



// the mutation to log a user out.
const LOG_OUT = gql `
    mutation LOGOUT {
        Logout
    }

`



const NavbarComponent = () => {

    // destructuring the context object.
    const { user, setUser } = useContext( ExistingUserContextObject )


    // executing the query to get current logged in user.
    const { loading, error, data } = useQuery( GET_CURRENT_LOGGED_IN_USER, {
        onCompleted: ( data ) => {
            if ( data !== null ) {
                if( data.GetCurrentLoggedInUser !== null ) {
                    console.log(`data exists === ${ data.GetCurrentLoggedInUser.email }`)
                    setUser( data.GetCurrentLoggedInUser.email )
                }
            }
            else {
                setUser( null )
            }

        }
    } )


    // executing the mutation to log a user out.
    const [ logoutMutFunc ] = useMutation( LOG_OUT, {
        onCompleted: () => {
            setUser( null )
        }
    } )   


    useEffect(() => {
        console.log(`user state === ${ user }`)

    }, [ user ])



    return (
        <div>
            <Navbar expand='lg' variant='light' style={{ height: 70 }} >
                <Container fluid>
                    <Navbar.Brand href='/' style={{ cursor: 'pointer' }}> <img src={ brand4 } alt='nav-brand' width={ 60 } /> <span style={{ fontStyle: 'italic'}}> Sneakerzone </span> </Navbar.Brand>
                    <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg' />
                    <Navbar.Offcanvas 
                        id='offcanvasNavbar-expand-lg'
                        aria-labelledby='offcanvasNavbarLabel-expand-lg'
                        placement='start' >
                        
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id='offcanvasNavbarLabel-expand-lg'>
                                <img src={ brand4 } alt='nav-brand' width={ 40 } /> <span style={{ fontStyle: 'italic'}}> Sneakerzone </span>                            </Offcanvas.Title>
                        </Offcanvas.Header>

                        <Offcanvas.Body>
                            <Nav className='container-fluid' >
                                <Nav.Link className='nav-link'> Men </Nav.Link> { window.innerWidth < 401 ? <hr/> : '' }
                                <Nav.Link className='nav-link'> Women </Nav.Link> { window.innerWidth < 401 ? <hr/> : '' }
                                <Nav.Link className='nav-link'> New Arrivals </Nav.Link> { window.innerWidth < 401 ? <hr/> : '' }

                                <Nav.Item className={ window.innerWidth > 400 ? 'ms-auto' : 'major' }>
                                    <Nav.Link className='nav-link' href='about-us'> About Us </Nav.Link> { window.innerWidth < 401 ? <hr/> : '' }
                                </Nav.Item>

                                <NavDropdown title='Help' id='basic-nav-dropdown' className='ms-1'>
                                    <NavDropdown.Item className='nav-link' href='/contact-us'> Contact Us </NavDropdown.Item> <hr />
                                    <NavDropdown.Item className='nav-link' href='/faqs'> FAQs </NavDropdown.Item> 
                                </NavDropdown> { window.innerWidth < 401 ? <hr/> : '' }

                                <Nav.Item className='ms-1'>
                                    <Nav.Link className='nav-link' href='my-cart'> <BsCart3 size={ 22 } title='Cart' /> </Nav.Link> 
                                </Nav.Item> { window.innerWidth < 401 ? <hr/> : '' }

                                <NavDropdown title={ <BiUser size={ 23 } />  } id='basic-nav-dropdown' className='ms-1' >
                                    
                                    <NavDropdown.Item href='/account'> <FaUserShield size={ 22 } /> Login / Register </NavDropdown.Item> 
                                    
                                    <NavDropdown.Item href='/account'> <FaUserShield size={ 22 } /> My Account </NavDropdown.Item> 
                                    <hr />
                                    <NavDropdown.Item onClick={ logoutMutFunc }> <AiOutlineLogout size={ 22 } /> Logout </NavDropdown.Item> 
                                  
                                </NavDropdown> { window.innerWidth < 401 ? <hr/> : '' } 

                                <Nav.Item className='ms-1 mt-2'> {user} </Nav.Item>

                            </Nav>

                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>

        </div>
    )

}




export default NavbarComponent


/*
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='container-fluid' >
                            <Nav.Link> Men </Nav.Link>
                            <Nav.Link> Women </Nav.Link>
                            <Nav.Link> New Arrivals </Nav.Link>

                            <Nav.Item className='ms-auto'>
                                <Nav.Link href='about-us'> About Us </Nav.Link>
                            </Nav.Item>

                            <NavDropdown title='Help' id='basic-nav-dropdown' className='ms-1'>
                                <NavDropdown.Item href='/contact-us'> Contact Us </NavDropdown.Item>
                                <hr/>
                                <NavDropdown.Item href='/faqs'> FAQs </NavDropdown.Item>
                            </NavDropdown>

                            <Nav.Item className='ms-1'>
                                <Nav.Link href='/my-cart'> <BsCart3 size={ 22 } title='Cart' /> </Nav.Link>
                            </Nav.Item>

                            <NavDropdown title={ <BiUser size={ 23 } />  } id='basic-nav-dropdown' className='ms-1' >
                                { user == null?
                                <>
                                <NavDropdown.Item href='/account'> <FaUserShield size={ 22 } /> Login / Register </NavDropdown.Item> 
                                </>
                                    :
                                <>
                                <NavDropdown.Item href='/account'> <FaUserShield size={ 22 } /> My Account </NavDropdown.Item> 
                                <hr />
                                <NavDropdown.Item onClick={ logoutMutFunc }> <AiOutlineLogout size={ 22 } /> Logout </NavDropdown.Item> 
                                </>
                                }
                            </NavDropdown>

                            <Nav.Item className='ms-1 mt-2'> { user === null? '' : user } </Nav.Item>

                        </Nav>

                    </Navbar.Collapse>
*/