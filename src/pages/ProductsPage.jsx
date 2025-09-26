import React, { useState } from 'react';
import { plantsData, getCategories } from '../data/plants';
import ProductCard from '../components/ProductCard';

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = getCategories();
  
  // Filtrar productos según la categoría seleccionada
  const filteredProducts = selectedCategory === 'all' 
    ? plantsData 
    : plantsData.filter(product => product.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header de la página */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestras Plantas
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra colección cuidadosamente seleccionada de plantas para tu hogar. 
          Cada planta viene con instrucciones de cuidado para garantizar su salud y belleza.
        </p>
      </div>

      {/* Filtros por categoría */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            Todas las plantas ({plantsData.length})
          </button>
          
          {categories.map(category => {
            const categoryCount = plantsData.filter(p => p.category === category.slug).length;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.slug)}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  selectedCategory === category.slug
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.name} ({categoryCount})
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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