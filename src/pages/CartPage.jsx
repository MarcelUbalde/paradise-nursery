import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartPage = () => {
  const { 
    items, 
    totalItems, 
    totalAmount, 
    updateQuantity, 
    removeFromCart, 
    clearCart 
  } = useCart();

  // Formatear precio en EUR
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  // Función para manejar el cambio de cantidad
  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  // Función para manejar el checkout (simulado)
  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    alert(`¡Gracias por tu compra! 🌱\n\nResumen:\n- ${totalItems} productos\n- Total: ${formatPrice(totalAmount)}\n\nTu pedido será procesado pronto.`);
    clearCart();
  };

  // Estado vacío del carrito
  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-16">
        <div className="text-center">
          <div className="text-gray-400 text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Descubre nuestra hermosa colección de plantas y encuentra la perfecta para tu hogar.
          </p>
          <Link 
            to="/products" 
            className="inline-flex items-center bg-emerald-600 text-white px-6 py-3 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Explorar Plantas
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      {/* Header de la página con total destacado */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Tu Carrito</h1>
        <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 inline-block">
          <p className="text-emerald-800 font-semibold">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'} • Total: {formatPrice(totalAmount)}
          </p>
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-3 lg:gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-2 space-y-4 mb-8 lg:mb-0">
          {items.map(item => (
            <div key={item.id} className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white">
              <div className="flex items-start space-x-4">
                {/* Imagen miniatura */}
                <div className="flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                </div>
                
                {/* Información del producto */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        Precio unitario: {formatPrice(item.price)}
                      </p>
                    </div>
                    
                    {/* Botón eliminar */}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
                      title="Eliminar del carrito"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1-1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Controles de cantidad y subtotal */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">Cantidad:</span>
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-l-lg"
                        >
                          -
                        </button>
                        <span className="px-4 py-2 text-center min-w-[3rem] font-medium border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded-r-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    
                    {/* Subtotal por ítem */}
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      {item.quantity > 1 && (
                        <p className="text-sm text-gray-500">
                          {item.quantity} × {formatPrice(item.price)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen y botones finales */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl border border-gray-200 shadow-sm p-6 bg-white sticky top-20">
            <h2 className="text-xl font-bold text-gray-900 mb-6">
              Resumen del pedido
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} productos)</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-emerald-600 font-medium">Gratis</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>
            </div>

            {/* Botones finales */}
            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                className="w-full bg-emerald-600 text-white px-4 py-3 rounded-2xl font-semibold hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
              >
                Finalizar compra
              </button>
              
              <Link 
                to="/products"
                className="w-full bg-gray-100 text-gray-800 px-4 py-3 rounded-2xl font-semibold hover:bg-gray-200 transition-colors text-center block focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Seguir comprando
              </Link>
              
              <button 
                onClick={clearCart}
                className="w-full text-red-600 hover:text-red-800 font-medium transition-colors text-center py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded"
              >
                Vaciar carrito
              </button>
            </div>

            {/* Información de seguridad */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Compra 100% segura
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-3 text-center">Incluido en tu compra:</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guía de cuidados personalizada
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Soporte experto 30 días
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Garantía de plantas saludables
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;