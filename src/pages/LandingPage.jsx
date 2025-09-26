import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative">
      {/* Imagen de fondo con overlay mejorado */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&h=1080&fit=crop&crop=center')`
        }}
      />
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo/Título */}
          <div className="mb-10">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 tracking-tight leading-none">
              🌿 Paradise Nursery
            </h1>
            <div className="w-32 h-1 bg-green-500 mx-auto rounded-full"></div>
          </div>
          
          {/* Párrafo sobre la empresa */}
          <div className="mb-12">
            <h2 className="text-2xl md:text-3xl text-green-100 font-semibold mb-6">
              Plantas que transforman tu hogar
            </h2>
            <p className="text-lg md:text-xl text-white/90 font-light leading-relaxed max-w-4xl mx-auto">
              Bienvenido a Paradise Nursery, tu destino especializado en plantas de interior y exterior. 
              Ofrecemos una cuidadosa selección de plantas saludables, desde suculentas resistentes hasta 
              exuberantes plantas tropicales, todas escogidas para prosperar en tu hogar y crear ese 
              ambiente natural que tanto deseas.
            </p>
          </div>
          
          {/* Botón de acción */}
          <div className="mb-16">
            <Link 
              to="/products"
              className="inline-flex items-center bg-green-600 text-white px-10 py-4 rounded-2xl font-bold text-xl hover:bg-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-green-500/25"
            >
              <span>Comenzar</span>
              <svg 
                className="ml-2 w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
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
          
          {/* Características destacadas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-4xl mb-3">🌱</div>
              <h3 className="text-white font-semibold text-lg mb-2">Plantas Premium</h3>
              <p className="text-white/80 text-sm">
                Selección cuidadosa de las mejores especies para tu hogar
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-white font-semibold text-lg mb-2">Envío Rápido</h3>
              <p className="text-white/80 text-sm">
                Entrega segura y rápida directamente a tu puerta
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <div className="text-4xl mb-3">💚</div>
              <h3 className="text-white font-semibold text-lg mb-2">Cuidado Expert</h3>
              <p className="text-white/80 text-sm">
                Consejos y guías para mantener tus plantas saludables
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Indicador de scroll */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;