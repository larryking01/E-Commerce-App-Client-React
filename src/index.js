import React from 'react'
import ReactDOM from 'react-dom/client'

// apollo client setup
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'


import './index.css'
import App from './App'



// const local_server = 'http://localhost:8000/'
const remote_server = 'https://e-commerce-app-server-graphql.onrender.com'


const apolloClient = new ApolloClient({
  uri: remote_server,
  cache: new InMemoryCache()

})






const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <ApolloProvider client={ apolloClient } >
        <App />
    </ApolloProvider>
  </React.StrictMode>
)

