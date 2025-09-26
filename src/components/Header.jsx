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
    <header className="header-blur">
      <div className="container-main">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              🌿 Paradise Nursery
            </Link>
            <div className="hidden md:block">
              <p className="text-sm text-gray-600 italic">Plantas que transforman tu hogar</p>
            </div>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/products" 
                className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${
                  location.pathname === '/products' ? 'text-green-600' : ''
                }`}
              >
                Productos
              </Link>
              <Link 
                to="/cart" 
                className={`text-gray-700 hover:text-green-600 font-medium transition-colors ${
                  location.pathname === '/cart' ? 'text-green-600' : ''
                }`}
              >
                Carrito
              </Link>
            </nav>
          </div>

          {/* Carrito */}
          <div className="flex items-center space-x-4">
            <Link 
              to="/cart" 
              className="relative flex items-center space-x-2 p-2 text-gray-700 hover:text-green-600 transition-colors rounded-lg hover:bg-green-50"
              title="Ver carrito"
            >
              <span className="sr-only">Ver carrito</span>
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" 
                />
              </svg>
              <span className="hidden sm:block text-sm font-medium">Carrito</span>
              
              {/* Badge con número de items */}
              {totalItems > 0 && (
                <span className="badge absolute -top-1 -right-1">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </Link>

            {/* Navegación móvil */}
            <div className="md:hidden">
              <div className="flex space-x-4">
                <Link 
                  to="/products" 
                  className={`text-sm font-medium transition-colors ${
                    location.pathname === '/products' 
                      ? 'text-green-600' 
                      : 'text-gray-700 hover:text-green-600'
                  }`}
                >
                  Productos
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;