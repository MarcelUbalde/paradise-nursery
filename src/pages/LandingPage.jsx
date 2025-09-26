import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Imagen de fondo más dramática */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(16, 185, 129, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%), url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop&crop=center')`
        }}
      />
      
      {/* Efectos decorativos */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-green-400/10 rounded-full blur-2xl"></div>
      
      {/* Contenido principal */}
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <div className="mx-auto max-w-7xl px-4 text-center">
          {/* Badge superior */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-emerald-500/20 backdrop-blur-sm border border-emerald-400/30 rounded-full px-6 py-2 text-emerald-100 text-sm font-medium">
              <span className="w-2 h-2 bg-emerald-400 rounded-full mr-2 animate-pulse"></span>
              Plantas premium desde 2024
            </div>
          </div>
          
          {/* Título principal más grande */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white mb-6 tracking-tight leading-none">
              Paradise
              <br />
              <span className="bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-500 bg-clip-text text-transparent">
                Nursery
              </span>
            </h1>
            <div className="flex items-center justify-center space-x-4 mb-6">
              <div className="w-16 h-1 bg-emerald-400 rounded-full"></div>
              <span className="text-4xl">🌿</span>
              <div className="w-16 h-1 bg-emerald-400 rounded-full"></div>
            </div>
          </div>
          
          {/* Eslogan llamativo */}
          <div className="mb-8">
            <p className="text-2xl md:text-3xl lg:text-4xl text-emerald-100 font-bold leading-tight max-w-4xl mx-auto">
              "Transforma tu espacio en un 
              <span className="text-emerald-300"> paraíso verde</span>"
            </p>
          </div>
          
          {/* Párrafo descriptivo mejorado */}
          <div className="mb-12">
            <p className="text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto mb-6">
              🌱 Plantas premium cuidadosamente seleccionadas
              <br />
              💚 Garantía de calidad y salud 
              <br />
              📱 Guías de cuidado personalizadas
            </p>
          </div>
          
          {/* Botones de acción más llamativos */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/products"
              className="group relative px-10 py-5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-xl font-bold rounded-full hover:from-emerald-600 hover:to-green-700 transform hover:scale-105 transition-all duration-300 shadow-2xl hover:shadow-emerald-500/50"
            >
              <span className="relative z-10 flex items-center">
                🛒 Explorar Plantas
                <svg className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </Link>
            
            <div className="text-white/60 text-sm">
              ⭐ Más de 1,000 clientes satisfechos
            </div>
          </div>
          
          {/* Stats llamativos */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-2">50+</div>
              <div className="text-white/80">Variedades de plantas</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-2">100%</div>
              <div className="text-white/80">Garantía de salud</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-emerald-300 mb-2">24/7</div>
              <div className="text-white/80">Soporte experto</div>
            </div>
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