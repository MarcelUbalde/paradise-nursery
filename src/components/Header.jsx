import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
  const { totalItems } = useCart();
  const location = useLocation();

  // No mostrar header en la landing page
  if (location.pathname === '/') {
    return null;
  }

  return (
    <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo y eslogan */}
          <div className="flex items-center space-x-6">
            <Link 
              to="/" 
              className="text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-lg px-2 py-1"
            >
              🌿 Paradise Nursery
            </Link>
            <div className="hidden sm:block">
              <p className="text-sm text-gray-600 italic">Plantas que transforman tu hogar</p>
            </div>
          </div>

          {/* Navegación y carrito */}
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/products" 
                className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded px-2 py-1 ${
                  location.pathname === '/products' ? 'text-emerald-600' : ''
                }`}
              >
                Productos
              </Link>
            </nav>

            {/* Carrito totalmente clicable y accesible */}
            <Link 
              to="/cart" 
              className="relative p-3 text-gray-700 hover:text-emerald-600 transition-all duration-200 rounded-2xl hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              aria-label="Carrito"
            >
              <div className="flex items-center space-x-2">
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" 
                  />
                </svg>
                <span className="hidden sm:block text-sm font-medium">Carrito</span>
              </div>
              
              {/* Badge dinámico dentro del área clicable */}
              {totalItems > 0 && (
                <span 
                  className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
                  aria-live="polite"
                  aria-label={`${totalItems} productos en el carrito`}
                >
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Navegación móvil */}
            <div className="md:hidden">
              <Link 
                to="/products" 
                className={`text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded px-2 py-1 ${
                  location.pathname === '/products' 
                    ? 'text-emerald-600' 
                    : 'text-gray-700 hover:text-emerald-600'
                }`}
              >
                Productos
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;