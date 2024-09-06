import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Container, Row, Col } from 'react-bootstrap'

import RecipePage from './pages/Result';
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Profile from './pages/Profile'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const sitename = "Everyone Eats";

function App() {
  return (
    <ApolloProvider client={client}>
      <BrowserRouter>
        <Header sitename={sitename} />

        <Container>
          <Row>
            <Col md="10">

              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/profile/:userId?' element={<Profile />} />
                {/* Need to add the element for the page below */}
                <Route path='/recipe/:recipeId' element={<></>} /> 
              </Routes>

            </Col>
          </Row>
        </Container>

        <Footer/>


      </BrowserRouter>
    </ApolloProvider>
  );
}
{/* <RecipePage  />
<Footer /> */}

export default App;
//Nothing else needed here aside from css updates/file imports.