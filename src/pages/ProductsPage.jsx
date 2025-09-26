import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { plantsData, getCategories } from '../data/plants';

const ProductCard = ({ product }) => {
  const { items, addToCart } = useCart();
  
  // Verificar si el producto está en el carrito
  const isInCart = items.some(item => item.id === product.id);
  
  // Formatear precio en EUR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  return (
    <div className="rounded-2xl border border-gray-200 shadow-sm p-4 bg-white hover:shadow-md transition-shadow duration-200">
      <img 
        src={product.image} 
        alt={product.name}
        loading="lazy"
        className="w-full h-48 object-cover rounded-xl mb-4"
      />
      
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{product.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-emerald-600">
            {formatPrice(product.price)}
          </span>
          
          {isInCart ? (
            <button 
              disabled
              className="bg-gray-100 text-gray-500 px-4 py-2 rounded-2xl font-semibold cursor-not-allowed"
            >
              Agregado al carrito
            </button>
          ) : (
            <button 
              onClick={() => addToCart(product)}
              className="bg-emerald-600 text-white hover:bg-emerald-700 rounded-2xl px-4 py-2 font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
            >
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
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header de la página */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Nuestras Plantas
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Descubre nuestra colección cuidadosamente seleccionada de plantas para tu hogar.
        </p>
      </div>

      {/* Botón Ver carrito - Solo visible si hay items */}
      {totalItems > 0 && (
        <div className="text-center mb-8">
          <Link 
            to="/cart"
            className="inline-flex items-center space-x-2 bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
            </svg>
            <span>Ver carrito ({totalItems})</span>
          </Link>
        </div>
      )}

      {/* Productos agrupados por categoría */}
      <div className="space-y-12">
        {Object.values(groupedProducts).map(categoryGroup => (
          <div key={categoryGroup.slug} className="category-section">
            {/* Título de sección para cada categoría */}
            <div className="mb-6">
              <div className="flex items-center space-x-3 mb-4">
                <span className="text-3xl">{categoryGroup.icon}</span>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{categoryGroup.name}</h2>
                  <p className="text-gray-600">
                    {categoryGroup.products.length} planta{categoryGroup.products.length !== 1 ? 's' : ''} disponible{categoryGroup.products.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Tarjetas de productos de la categoría */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {categoryGroup.products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sección adicional de información */}
      <div className="mt-16 bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8">
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