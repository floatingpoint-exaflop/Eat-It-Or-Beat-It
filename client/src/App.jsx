import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import RecipePage from './pages/RecipePage';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="flex-column justify-center align-center min-100-vh bg-primary">
        <Outlet />
      </div>
      
    <RecipePage recipe={recipe}>

    </RecipePage>

      <Footer />
    </ApolloProvider>
  );
}

export default App;
//Nothing else needed here aside from css updates/file imports.