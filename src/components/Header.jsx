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
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo y navegación */}
          <div className="flex items-center space-x-8">
            <Link 
              to="/" 
              className="text-2xl font-bold text-primary-600 hover:text-primary-700 transition-colors"
            >
              🌿 Paradise Nursery
            </Link>
            
            <nav className="hidden md:flex space-x-6">
              <Link 
                to="/products" 
                className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${
                  location.pathname === '/products' ? 'text-primary-600' : ''
                }`}
              >
                Productos
              </Link>
              <Link 
                to="/cart" 
                className={`text-gray-700 hover:text-primary-600 font-medium transition-colors ${
                  location.pathname === '/cart' ? 'text-primary-600' : ''
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
              className="relative p-2 text-gray-700 hover:text-primary-600 transition-colors"
              title="Ver carrito"
            >
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
              
              {/* Badge con número de items */}
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
                      ? 'text-primary-600' 
                      : 'text-gray-700 hover:text-primary-600'
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