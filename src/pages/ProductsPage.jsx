import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { plantsData, getCategories } from '../data/plants';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [viewMode, setViewMode] = useState('grouped'); // 'grouped' o 'filtered'
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { totalItems } = useCart();
  const categories = getCategories();
  
  // Filtrar productos según la categoría seleccionada (modo filtrado)
  const filteredProducts = selectedCategory === 'all' 
    ? plantsData 
    : plantsData.filter(product => product.category === selectedCategory);

  // Agrupar productos por categoría (modo agrupado)
  const groupedProducts = categories.reduce((acc, category) => {
    const categoryProducts = plantsData.filter(product => product.category === category.slug);
    if (categoryProducts.length > 0) {
      acc[category.slug] = {
        ...category,
        products: categoryProducts
      };
    }
    return acc;
  }, {});

  return (
    <div className="container-main py-8">
      {/* Header de la página */}
      <div className="text-center mb-12">
        <h1 className="title-page">
          Nuestras Plantas
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra colección cuidadosamente seleccionada de plantas para tu hogar. 
          Cada planta viene con instrucciones de cuidado para garantizar su salud y belleza.
        </p>
      </div>

      {/* Botón Ver Carrito - Solo visible si hay items */}
      {totalItems > 0 && (
        <div className="text-center mb-8">
          <Link 
            to="/cart"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition-colors shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
            </svg>
            <span>Ver Carrito ({totalItems})</span>
          </Link>
        </div>
      )}

      {/* Selector de vista */}
      <div className="text-center mb-6">
        <div className="inline-flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('grouped')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              viewMode === 'grouped'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Vista por Categorías
          </button>
          <button
            onClick={() => setViewMode('filtered')}
            className={`px-4 py-2 rounded-md font-medium transition-all ${
              viewMode === 'filtered'
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Vista con Filtros
          </button>
        </div>
      </div>

      {/* Vista Agrupada por Categorías */}
      {viewMode === 'grouped' ? (
        <div className="space-y-12">
          {Object.values(groupedProducts).map(categoryGroup => (
            <div key={categoryGroup.slug} className="category-section">
              {/* Header de Categoría */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 rounded-2xl border border-green-200">
                  <span className="text-3xl">{categoryGroup.icon}</span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800">{categoryGroup.name}</h2>
                    <p className="text-sm text-gray-600">
                      {categoryGroup.products.length} planta{categoryGroup.products.length !== 1 ? 's' : ''} disponible{categoryGroup.products.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Productos de la Categoría */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {categoryGroup.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {/* Filtros por categoría */}
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-3">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300'
                }`}
              >
                Todas las plantas ({plantsData.length})
              </button>
              
              {categories.map(category => {
                const categoryCount = plantsData.filter(p => p.category === category.slug).length;
                return (
                  <button
                    key={category.slug}
                    onClick={() => setSelectedCategory(category.slug)}
                    className={`px-6 py-3 rounded-2xl font-semibold transition-all duration-200 ${
                      selectedCategory === category.slug
                        ? 'bg-green-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:border-green-300'
                    }`}
                  >
                    {category.icon} {category.name} ({categoryCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Información de resultados */}
          <div className="mb-6">
            <p className="text-gray-600 text-center">
              Mostrando {filteredProducts.length} {filteredProducts.length === 1 ? 'producto' : 'productos'}
              {selectedCategory !== 'all' && (
                <span> en la categoría "{categories.find(c => c.slug === selectedCategory)?.name}"</span>
              )}
            </p>
          </div>

          {/* Grid de productos */}
          <div className="grid-products">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mensaje cuando no hay productos */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🌱</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No hay productos en esta categoría
              </h3>
              <p className="text-gray-600">
                Intenta seleccionar una categoría diferente
              </p>
            </div>
          )}
        </>
      )}

      {/* Sección adicional de información */}
      <div className="mt-16 bg-gradient-to-r from-primary-50 to-green-50 rounded-2xl p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda para elegir?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Nuestras plantas están cuidadosamente seleccionadas para prosperar en diferentes 
            condiciones de luz y cuidado. Cada producto incluye instrucciones detalladas 
            para que tengas éxito desde el primer día.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl mb-2">💡</div>
              <h3 className="font-semibold text-gray-900 mb-1">Consejos de Luz</h3>
              <p className="text-sm text-gray-600">
                Guías específicas para cada planta
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">💧</div>
              <h3 className="font-semibold text-gray-900 mb-1">Riego Perfecto</h3>
              <p className="text-sm text-gray-600">
                Frecuencia y cantidad ideal
              </p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📞</div>
              <h3 className="font-semibold text-gray-900 mb-1">Soporte Expert</h3>
              <p className="text-sm text-gray-600">
                Ayuda personalizada disponible
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;