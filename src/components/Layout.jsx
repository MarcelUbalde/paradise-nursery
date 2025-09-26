import React from 'react';
import Header from './Header';


const Layout = ({ children }) => {
    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
            <Header />
            <main style={{ flex: 1, paddingTop: '1.5rem' }}>{children}</main>
            <footer style={{ backgroundColor: '#111827', color: 'white', padding: '3rem 0', marginTop: '4rem' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 1rem' }}>
                    <div style={{ textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>🌿 Paradise Nursery</h3>
                        <p style={{ color: '#d1d5db', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Tu destino para las mejores plantas y accesorios de jardinería</p>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                            <span>© 2025 Paradise Nursery</span>
                            <span style={{ width: '0.25rem', height: '0.25rem', backgroundColor: '#6b7280', borderRadius: '50%' }}></span>
                            <span>Hecho con ❤️ para amantes de las plantas</span>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};


export default Layout;