import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Imagen de fondo con overlay oscuro */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&crop=center')`
        }}
      />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 text-center">
          {/* Nombre de la empresa */}
          <div className="mb-8">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">
              🌿 Paradise Nursery
            </h1>
            <div className="w-24 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Párrafo descriptivo */}
          <div className="mb-10">
            <p className="text-xl md:text-2xl text-white/90 font-light leading-relaxed max-w-3xl mx-auto">
              Descubre nuestra cuidadosa selección de plantas de interior y exterior. 
              Desde suculentas resistentes hasta exuberantes plantas tropicales, 
              todas escogidas para transformar tu hogar en un oasis natural.
            </p>
          </div>
          
          {/* Botón Get Started */}
          <div>
            <Link 
              to="/products"
              className="inline-flex items-center bg-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-emerald-700 transform hover:scale-105 transition-all duration-300 shadow-xl focus:outline-none focus:ring-4 focus:ring-emerald-500/50"
            >
              <span>Get Started</span>
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 7l5 5m0 0l-5 5m5-5H6" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </div>
  );
};

export default LandingPage;