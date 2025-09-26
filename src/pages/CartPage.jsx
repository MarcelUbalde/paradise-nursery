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
    
    alert(`¡Gracias por tu compra! 🌱\n\nResumen:\n- ${totalItems} productos\n- Total: $${totalAmount.toFixed(2)}\n\nTu pedido será procesado pronto.`);
    clearCart();
  };

  // Si el carrito está vacío
  if (items.length === 0) {
    return (
      <div className="container-main py-16">
        <div className="text-center">
          <div className="text-gray-400 text-8xl mb-6">🛒</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Tu carrito está vacío
          </h2>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">
            Descubre nuestra hermosa colección de plantas y encuentra la perfecta para tu hogar.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products" 
              className="btn-primary inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Explorar Plantas</span>
            </Link>
            <Link 
              to="/" 
              className="btn-secondary inline-flex items-center justify-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span>Volver al Inicio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-main py-8">
      {/* Header de la página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="title-page mb-2">Tu Carrito</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'producto' : 'productos'} en tu carrito
          </p>
        </div>
        
        {/* Navegación rápida */}
        <div className="flex gap-3 mt-4 sm:mt-0">
          <Link 
            to="/products" 
            className="btn-secondary text-sm"
          >
            ← Seguir comprando
          </Link>
          {items.length > 1 && (
            <button 
              onClick={clearCart}
              className="text-sm text-red-600 hover:text-red-800 font-medium transition-colors"
            >
              Vaciar carrito
            </button>
          )}
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-12 lg:gap-8">
        {/* Lista de productos */}
        <div className="lg:col-span-8">
          <div className="space-y-4">
            {items.map(item => (
              <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  {/* Imagen del producto */}
                  <div className="flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                  </div>
                  
                  {/* Información del producto */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.description}
                        </p>
                        <p className="text-lg font-bold text-green-600">
                          ${item.price.toFixed(2)} c/u
                        </p>
                      </div>
                      
                      {/* Botón eliminar */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                        title="Eliminar del carrito"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1-1H8a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    
                    {/* Controles de cantidad */}
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Cantidad:</span>
                        <div className="flex items-center border border-gray-300 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                            disabled={item.quantity <= 1}
                          >
                            -
                          </button>
                          <span className="px-4 py-2 text-center min-w-[3rem] font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      
                      {/* Subtotal del producto */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                        {item.quantity > 1 && (
                          <p className="text-sm text-gray-500">
                            {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Resumen del pedido */}
        <div className="lg:col-span-4 mt-8 lg:mt-0">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-4">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Resumen del pedido
            </h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal ({totalItems} productos)</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Envío</span>
                <span className="text-green-600 font-medium">Gratis</span>
              </div>
              <div className="border-t pt-3">
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>${totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <button 
                onClick={handleCheckout}
                className="w-full btn-primary text-lg py-3"
              >
                Proceder al Pago
              </button>
              
              <div className="flex items-center justify-center text-sm text-gray-500">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Compra 100% segura
              </div>
            </div>

            {/* Beneficios adicionales */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Incluido en tu compra:</h3>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Guía de cuidados personalizada
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Soporte experto 30 días
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Garantía de plantas saludables
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de plantas recomendadas */}
      <div className="mt-16">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            También te podría interesar
          </h2>
          <p className="text-gray-600">
            Plantas perfectas para complementar tu selección
          </p>
        </div>
        
        <div className="text-center">
          <Link 
            to="/products"
            className="btn-secondary inline-flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span>Ver más plantas</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;