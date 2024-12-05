import React from 'react';
import Store from './pages/Store';
import { ProductProvider } from './contexts/ProductsContext';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Correct import
import './style/app.css'
import '@fortawesome/fontawesome-free/css/all.min.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProductProvider>
              <Store />
            </ProductProvider>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
