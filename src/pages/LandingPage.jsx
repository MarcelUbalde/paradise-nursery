import React from 'react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
    return (
        <div className="hero-container">
            <div className="hero-bg" />

            <div className="hero-content">
                <div className="hero-wrapper">
                    <div className="hero-text">
                        <div style={{ marginBottom: '1.5rem' }}>
                            <span className="chip-emerald">Plantas premium desde 2024</span>
                        </div>

                        <h1 className="hero-title">
                            Transforma tu hogar con <span className="hero-title-accent">plantas excepcionales</span>
                        </h1>

                        <p className="hero-description">
                            Descubre nuestra cuidada selección de plantas de interior y exterior. Cada planta viene con garantía de salud,
                            guía personalizada y el soporte de nuestros expertos botánicos.
                        </p>

                        <div className="hero-actions">
                            <Link to="/products" className="btn btn-primary">
                                <span>Explorar Plantas</span>
                                <svg style={{ marginLeft: '0.5rem', width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <div className="hero-guarantee">
                                <svg style={{ width: '1rem', height: '1rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                <span>Envío gratuito en pedidos +50€</span>
                            </div>
                        </div>
                    </div>

                    <div className="stats-grid">
                        <div className="stat-card">
                            <div className="stat-number">500+</div>
                            <div className="stat-label">Plantas felices entregadas</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">98%</div>
                            <div className="stat-label">Tasa de supervivencia</div>
                        </div>
                        <div className="stat-card">
                            <div className="stat-number">30d</div>
                            <div className="stat-label">Garantía de salud</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;