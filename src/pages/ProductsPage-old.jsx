import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { plantsData, getCategories } from '../data/plants';

const ProductCard = ({ product }) => {
    const { items, addToCart } = useCart();
    const isInCart = items.some((i) => i.id === product.id);
    const formatPrice = (price) =>
        new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);

    return (
        <div className="card hover:shadow-lg transition-all duration-300 overflow-hidden">
            <div className="relative overflow-hidden">
                <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-sm text-emerald-700 text-xs font-semibold px-2 py-1 rounded-full">
                        {product.categoryName}
                    </span>
                </div>
            </div>

            <div className="p-6">
                <div className="mb-4">
                    <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1">{product.name}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                        {product.description}
                    </p>
                    <p className="text-emerald-600 text-xs font-medium">{product.care}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</div>
                    {isInCart ? (
                        <button
                            disabled
                            className="bg-gray-100 text-gray-500 px-4 py-2 rounded-xl font-semibold cursor-not-allowed text-sm"
                        >
                            ✓ Agregado
                        </button>
                    ) : (
                        <button onClick={() => addToCart(product)} className="btn-primary text-sm">
                            Agregar al carrito
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

const ProductsPage = () => {
    const { totalItems } = useCart();
    const categories = getCategories();

    // Agrupar productos por categoría
    const groupedProducts = categories.reduce((acc, category) => {
        const categoryProducts = plantsData.filter((p) => p.category === category.slug);
        if (categoryProducts.length > 0) {
            acc[category.slug] = { ...category, products: categoryProducts };
        }
        return acc;
    }, {});

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="mx-auto max-w-7xl px-4 py-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Nuestras Plantas</h1>
                        <p className="text-gray-600 max-w-2xl">
                            Descubre nuestra cuidada selección de plantas premium, cada una con garantía de salud
                            y guías de cuidado personalizadas.
                        </p>
                    </div>

                    {totalItems > 0 && (
                        <Link to="/cart" className="btn-primary hidden md:inline-flex">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2"
                                />
                            </svg>
                            <span>Ver carrito ({totalItems})</span>
                        </Link>
                    )}
                </div>

                {/* Listados por categoría */}
                <div className="space-y-12">
                    {Object.values(groupedProducts).map((group) => (
                        <div key={group.slug}>
                            <div className="mb-6">
                                <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center">
                                    <span className="text-3xl mr-3">{group.icon}</span>
                                    {group.name}
                                </h2>
                                <p className="text-gray-600">
                                    {group.products.length} planta{group.products.length !== 1 ? 's' : ''} disponible
                                    {group.products.length !== 1 ? 's' : ''}
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 xl:gap-8">
                                {group.products.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Bloque de confianza */}
                <div className="mt-16 card p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            ¿Por qué elegir Paradise Nursery?
                        </h2>
                        <p className="text-gray-600">Compromiso total con la calidad y tu satisfacción</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Garantía de Salud</h3>
                            <p className="text-gray-600 text-sm">30 días de garantía en todas nuestras plantas</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Guías Personalizadas</h3>
                            <p className="text-gray-600 text-sm">Instrucciones detalladas para cada planta</p>
                        </div>
                        <div className="text-center">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="font-bold text-gray-900 mb-2">Soporte Experto</h3>
                            <p className="text-gray-600 text-sm">Consulta gratuita con nuestros botánicos</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductsPage;