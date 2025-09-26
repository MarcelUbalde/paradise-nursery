import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';


const Header = () => {
    const { totalItems } = useCart();
    const location = useLocation();

    if (location.pathname === '/') return null;

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
            <div className="mx-auto max-w-7xl px-4">
                <div className="flex justify-between items-center h-16">
                    {/* Logo y eslogan */}
                    <div className="flex items-center space-x-4">
                        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-emerald-600 hover:text-emerald-700 transition-colors focus-ring">
                            <span>🌿</span>
                            <span>Paradise Nursery</span>
                        </Link>
                        <div className="hidden md:block">
                            <p className="text-sm text-gray-600 italic">Plantas que transforman tu hogar</p>
                        </div>
                    </div>


                    {/* Navegación y carrito */}
                    <div className="flex items-center space-x-6">
                        <nav className="hidden md:flex space-x-6">
                            <Link
                                to="/products"
                                className={`text-gray-700 hover:text-emerald-600 font-medium transition-colors ${location.pathname === '/products' ? 'text-emerald-600 font-semibold' : ''
                                    } focus-ring`}
                            >
                                Productos
                            </Link>
                        </nav>


                        {/* Carrito */}
                        <Link
                            to="/cart"
                            className="relative inline-flex items-center space-x-2 bg-gray-50 hover:bg-emerald-50 px-4 py-2 rounded-full transition-all duration-200 group focus-ring"
                            aria-label={`Carrito de compras${totalItems > 0 ? ` - ${totalItems} artículos` : ''}`}
                        >
                            <svg className="w-5 h-5 text-gray-700 group-hover:text-emerald-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
                            </svg>
                            <span className="hidden sm:block text-sm font-medium text-gray-700 group-hover:text-emerald-600 transition-colors">Carrito</span>
                            {totalItems > 0 && (
                                <span className="absolute -top-2 -right-2 bg-emerald-600 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center ring-2 ring-white" aria-live="polite">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>


                        {/* Navegación móvil */}
                        <div className="md:hidden">
                            <Link
                                to="/products"
                                className={`text-sm font-medium transition-colors rounded px-2 py-1 focus-ring ${location.pathname === '/products' ? 'text-emerald-600' : 'text-gray-700 hover:text-emerald-600'
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