import React, { useState } from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { Container, Row, Col } from 'react-bootstrap'
import UserProvider from './providers/UserProvider'

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Profile from './pages/Profile';
import SearchResults from './pages/SearchResults';
import RecipeList from './components/RecipeList'

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
          <Header sitename={sitename} style={{ backgroundColor: 'red' }} />

          <Container>
            <Row>

              <Routes>
                <Route path='/' element={<Home />} />

                <Route path='/profile/:userId?' element={<Profile loggedInUser={loggedInUser} />} />

                <Route path='/search' element={<SearchResults/>} />

              </Routes>
            </Row>
          </Container>

          <Footer />

        </BrowserRouter>
      </ApolloProvider>
    </UserProvider>
  );
}

export default App;
//Nothing else needed here aside from css updates/file imports.