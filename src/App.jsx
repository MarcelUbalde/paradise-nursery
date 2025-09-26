import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { CartProvider } from './contexts/CartContext';
import Layout from './components/Layout';


// Páginas
import LandingPage from './pages/LandingPage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';


function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            {/* Landing sin layout */}
            <Route path="/" element={<LandingPage />} />


            {/* Con layout */}
            <Route
              path="/products"
              element={
                <Layout>
                  <ProductsPage />
                </Layout>
              }
            />
            <Route
              path="/cart"
              element={
                <Layout>
                  <CartPage />
                </Layout>
              }
            />


            {/* 404 */}
            <Route
              path="*"
              element={
                <Layout>
                  <div className="max-w-7xl mx-auto px-4 py-16 text-center">
                    <div className="text-gray-400 text-8xl mb-6">🌱</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">Página no encontrada</h1>
                    <p className="text-lg text-gray-600 mb-8">La página que buscas no existe o ha sido movida.</p>
                    <div className="flex items-center justify-center gap-4">
                      <Link to="/" className="btn-primary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Ir al Inicio
                      </Link>
                      <Link to="/products" className="btn-secondary">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                        Ver Productos
                      </Link>
                    </div>
                  </div>
                </Layout>
              }
            />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}


export default App;