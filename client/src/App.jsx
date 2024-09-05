import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import RecipePage from './pages/RecipePage';
import Header from './components/Header'
import Footer from './components/Footer'

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

const sitename = "Everyone Eats";

function App() {
  return (
    <ApolloProvider client={client}>
      {/* <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div> */}

    <Header sitename={sitename} />
      
    <RecipePage  />


      <Footer />
    </ApolloProvider>
  );
}

export default App;
//Nothing else needed here aside from css updates/file imports.