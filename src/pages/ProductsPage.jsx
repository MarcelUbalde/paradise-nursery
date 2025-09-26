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
    <div className="bg-white rounded-3xl border-2 border-emerald-100 shadow-xl p-6 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative overflow-hidden rounded-2xl mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="w-full h-56 object-cover transition-transform duration-500 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <div className="bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ⭐ PREMIUM
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-bold text-gray-900 text-xl mb-2">{product.name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{product.description}</p>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-right">
            <div className="text-2xl font-black text-emerald-600 mb-1">
              {formatPrice(product.price)}
            </div>
            <div className="text-xs text-gray-500">Envío gratis incluido</div>
          </div>
          
          {isInCart ? (
            <div className="text-center">
              <div className="bg-green-100 text-green-800 px-4 py-2 rounded-2xl font-bold text-sm mb-1">
                ✅ En tu carrito
              </div>
              <div className="text-xs text-green-600">¡Listo para comprar!</div>
            </div>
          ) : (
            <button 
              onClick={() => addToCart(product)}
              className="bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 rounded-2xl px-6 py-3 font-bold text-sm transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/50"
            >
              🛒 Agregar
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-12">
        {/* Header de la página más llamativo */}
        <div className="text-center mb-12">
          <div className="mb-4">
            <span className="bg-emerald-100 text-emerald-800 text-sm font-bold px-4 py-2 rounded-full">
              🌿 CATÁLOGO PREMIUM
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-6 leading-tight">
            Descubre Nuestras
            <br />
            <span className="bg-gradient-to-r from-emerald-600 to-green-500 bg-clip-text text-transparent">
              Plantas Exclusivas
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto font-medium">
            Cada planta viene con garantía de salud, guía de cuidados y soporte experto. 
            <strong className="text-emerald-600">¡Envío gratis en todos los pedidos!</strong>
          </p>
        </div>

        {/* Botón Ver carrito más prominente */}
        {totalItems > 0 && (
          <div className="text-center mb-10">
            <Link 
              to="/cart"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-orange-500/50 transform hover:scale-105 animate-pulse"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
              </svg>
              <span>🔥 Ver Tu Carrito ({totalItems} plantas)</span>
              <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
            </Link>
          </div>
        )}

        {/* Productos agrupados por categoría */}
        <div className="space-y-16">
          {Object.values(groupedProducts).map(categoryGroup => (
            <div key={categoryGroup.slug} className="category-section">
              {/* Título de sección más dramático */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-emerald-100 to-green-100 px-8 py-4 rounded-full border-2 border-emerald-200">
                  <span className="text-4xl">{categoryGroup.icon}</span>
                  <div>
                    <h2 className="text-3xl font-black text-gray-900">{categoryGroup.name}</h2>
                    <p className="text-emerald-600 font-bold">
                      {categoryGroup.products.length} planta{categoryGroup.products.length !== 1 ? 's' : ''} premium disponible{categoryGroup.products.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tarjetas de productos más llamativas */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categoryGroup.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Sección final más atractiva */}
        <div className="mt-20 bg-gradient-to-r from-emerald-600 to-green-600 rounded-3xl p-12 text-center text-white">
          <div className="mb-6">
            <h2 className="text-4xl font-black mb-4">
              🌟 ¿Tu Planta Perfecta Te Está Esperando?
            </h2>
            <p className="text-xl font-medium max-w-2xl mx-auto opacity-90">
              Nuestros expertos en plantas están aquí para ayudarte a encontrar 
              la compañera verde ideal para tu espacio y estilo de vida.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-3">💡</div>
              <h3 className="font-bold text-lg mb-2">Asesoría Experta</h3>
              <p className="text-sm opacity-90">
                Guías personalizadas para cada planta
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-3">🚚</div>
              <h3 className="font-bold text-lg mb-2">Entrega Express</h3>
              <p className="text-sm opacity-90">
                Llegada segura en 24-48 horas
              </p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="text-4xl mb-3">🛡️</div>
              <h3 className="font-bold text-lg mb-2">Garantía Total</h3>
              <p className="text-sm opacity-90">
                30 días de garantía de salud
              </p>
            </div>
          </div>
          
          <div className="text-2xl font-bold mb-4">
            ⭐ Más de 1,000 clientes felices ⭐
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;