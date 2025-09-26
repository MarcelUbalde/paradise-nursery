import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container-main">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-3">🌿 Paradise Nursery</h3>
            <p className="text-gray-300 text-sm mb-6">
              Tu destino para las mejores plantas y accesorios de jardinería
            </p>
            <div className="flex justify-center items-center space-x-4 text-sm text-gray-400">
              <span>© 2025 Paradise Nursery</span>
              <span className="w-1 h-1 bg-gray-500 rounded-full"></span>
              <span>Hecho con ❤️ para amantes de las plantas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;