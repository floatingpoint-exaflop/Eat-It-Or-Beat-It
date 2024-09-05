import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import RecipePage from './pages/RecipePage.jsx';

createRoot(document.getElementById('root')).render(
  <Router>
    <App>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/recipe" element={<RecipePage />} />
      </Routes>
    </App>
  </Router>
);