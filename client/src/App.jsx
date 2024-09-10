import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { Container, Row, Col } from 'react-bootstrap'
import  UserProvider from './providers/UserProvider'

import RecipePage from './pages/Result';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Comment from './components/Comment'
// import Recipe from './components/Recipe'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const sitename = "Everyone Eats";

function ProtectedRoute({ loggedInUser, children }) {
  if (!loggedInUser) {
    return <Navigate to="/profile" />;
  }
  return children;
}

function App() {
  const [loggedInUser, setLoggedInUser] = useState(false);
  return (
    <UserProvider>
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Header sitename={sitename} />

          <Container>
            <Row>
              {/* <Col md="10"> */}

              <Routes>
                <Route path='/' element={<Home />} />
                {/* <Route
                    path="/profile/:userId"
                    element={
                      <ProtectedRoute loggedInUser={loggedInUser}>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  /> */}
                <Route path='/profile/:userId?' element={<Profile loggedInUser={loggedInUser} />} />
                {/* Need to add the element for the page below */}
                <Route path='/recipe/:recipeId' element={<></>} />
              </Routes>
              {/* <Recipe /> */}
              <Comment />
              {/* </Col> */}
            </Row>
          </Container>

          <Footer />

        </BrowserRouter>
      </ApolloProvider>
    </UserProvider>
  );
}
{/* <RecipePage  />
<Footer /> */}

export default App;
//Nothing else needed here aside from css updates/file imports.