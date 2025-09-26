import React from 'react';
import { Link } from 'react-router-dom';


const LandingPage = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Imagen de fondo */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage:
                        "linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&h=1080&fit=crop&crop=center')",
                }}
            />


            <div className="relative z-10 min-h-screen flex items-center">
                <div className="mx-auto max-w-7xl px-4 py-20">
                    <div className="max-w-4xl">
                        <div className="mb-6">
                            <span className="chip-emerald">Plantas premium desde 2024</span>
                        </div>


                        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
                            Transforma tu hogar con <span className="text-emerald-400">plantas excepcionales</span>
                        </h1>


                        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-3xl">
                            Descubre nuestra cuidada selección de plantas de interior y exterior. Cada planta viene con garantía de salud,
                            guía personalizada y el soporte de nuestros expertos botánicos.
                        </p>


                        <div className="flex flex-col sm:flex-row gap-4 items-start">
                            <Link to="/products" className="btn-primary text-lg px-8 py-4 transform hover:scale-105 shadow-xl">
                                <span>Explorar Plantas</span>
                                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <div className="flex items-center space-x-2 text-emerald-100 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Envío gratuito en pedidos +50€</span>
                            </div>
                        </div>
                    </div>


                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl">
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                            <div className="text-2xl font-bold text-emerald-300 mb-1">500+</div>
                            <div className="text-white/80 text-sm">Plantas felices entregadas</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                            <div className="text-2xl font-bold text-emerald-300 mb-1">98%</div>
                            <div className="text-white/80 text-sm">Tasa de supervivencia</div>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 text-center">
                            <div className="text-2xl font-bold text-emerald-300 mb-1">30d</div>
                            <div className="text-white/80 text-sm">Garantía de salud</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default LandingPage;