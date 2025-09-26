import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Header = () => {
    const { totalItems } = useCart();
    const location = useLocation();

    if (location.pathname === '/') return null;

    return (
        <header>
            <div className="header-container">
                <div className="header-content">
                    {/* Logo y eslogan */}
                    <div className="logo-section">
                        <Link to="/" className="logo-link">
                            <span>🌿</span>
                            <span>Paradise Nursery</span>
                        </Link>
                        <div className="tagline">
                            <p>Plantas que transforman tu hogar</p>
                        </div>
                    </div>

                    {/* Navegación y carrito */}
                    <div className="nav-section">
                        <nav style={{ display: 'flex', gap: '1.5rem' }}>
                            <Link
                                to="/products"
                                className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                            >
                                Productos
                            </Link>
                        </nav>

                        {/* Carrito */}
                        <Link to="/cart" className="cart-button">
                            <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
                            </svg>
                            <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>Carrito</span>
                            {totalItems > 0 && (
                                <span className="cart-badge">
                                    {totalItems > 99 ? '99+' : totalItems}
                                </span>
                            )}
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;