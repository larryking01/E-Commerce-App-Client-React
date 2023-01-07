import React, { createContext, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import './App.css'
import NavbarComponent from './Routes/NavbarComponent'
import Products from './Routes/Products'
import SelectedProductDetails from './Routes/SelectedProductDetails'
import Login from './Routes/Login'
import SignUp from './Routes/SignUp'
import AboutUs from './Routes/AboutUs'
import ContactUs from './Routes/ContactUs'
import FAQs from './Routes/FAQs'
import ScrollToTopBtn from './Routes/ScrollToTopBtn'
import Footer from './Routes/Footer'
import Cart from './Routes/Cart'
import Checkout from './Routes/Checkout'
import BuyNow from './Routes/BuyNow'


// the context object.
export const ExistingUserContextObject = createContext( null ) 






// the component.
const App = () => {

  // setting the state of the existing user
  const [ user, setUser ] = useState( null )

  return (
    <>
        <ExistingUserContextObject.Provider value={ { user, setUser } } >
          <NavbarComponent />
          <ScrollToTopBtn />
          {/* Routes */ }
          <BrowserRouter>
              <Routes>
                <Route index path='/' element={ <Products /> } />
                <Route path='product-details/:collectionName/:productName/:productID' element={ <SelectedProductDetails /> } />
                <Route path='sign-up' element={ <SignUp /> } />
                <Route path='account' element={ <Login /> } />
                <Route path='my-cart' element={ <Cart /> } />
                <Route path='about-us' element={ <AboutUs /> } />
                <Route path='contact-us' element={ <ContactUs /> } />
                <Route path='faqs' element={ <FAQs /> } />
                <Route path='footer' element={ <Footer /> } />
                <Route path='buy-now/:cartItemName' element={ <BuyNow /> } />
                <Route path='checkout' element={ <Checkout /> } />
              </Routes>
          </BrowserRouter>
        </ExistingUserContextObject.Provider>
    </>


  )

}


export default App;
