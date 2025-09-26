import React from 'react';
import Header from './Header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">🌿 Paradise Nursery</h3>
            <p className="text-gray-300 text-sm">
              Tu destino para las mejores plantas y accesorios de jardinería
            </p>
            <div className="mt-4 flex justify-center space-x-6 text-sm text-gray-400">
              <span>© 2025 Paradise Nursery</span>
              <span>•</span>
              <span>Hecho con ❤️ para amantes de las plantas</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;