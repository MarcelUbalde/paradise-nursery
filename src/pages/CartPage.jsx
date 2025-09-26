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
    clearCart,
  } = useCart();

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' }).format(price);

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) removeFromCart(productId);
    else updateQuantity(productId, newQuantity);
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    alert(
      `¡Gracias por tu compra! 🌱\n\nResumen:\n- ${totalItems} productos\n- Total: ${formatPrice(
        totalAmount
      )}\n\nTu pedido será procesado pronto.`
    );
    clearCart();
  };

  // Estado vacío
  if (items.length === 0) {
    return (
      <div className="bg-gray-50 min-h-screen">
        <div className="mx-auto max-w-4xl px-4 py-16">
          <div className="text-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Descubre nuestra hermosa colección de plantas y encuentra la perfecta para tu hogar.
            </p>
            <Link to="/products" className="btn-primary">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Explorar Plantas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Carrito con items
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Carrito de Compras</h1>
          <p className="text-gray-600">
            {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          {/* Lista */}
          <div className="lg:col-span-2 space-y-4 mb-8 lg:mb-0">
            {items.map((item) => (
              <div key={item.id} className="card overflow-hidden">
                <div className="flex p-6">
                  <div className="flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      loading="lazy"
                      className="w-24 h-24 object-cover rounded-xl"
                    />
                  </div>

                  <div className="flex-1 ml-6">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.categoryName}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">{formatPrice(item.price)}</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Cantidad:</span>
                        <div className="flex items-center border border-gray-200 rounded-lg">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="px-4 py-2 font-semibold text-gray-900">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-100 transition-colors"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="text-xs text-gray-500">Subtotal</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar producto"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Resumen del Pedido</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} artículos)</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Envío</span>
                  <span className="text-emerald-600 font-semibold">Gratis</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-xl font-bold text-gray-900">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button onClick={handleCheckout} className="btn-primary w-full py-4">
                  Proceder al Pago
                </button>
                <Link to="/products" className="btn-secondary w-full text-center">
                  Seguir Comprando
                </Link>
                <button
                  onClick={clearCart}
                  className="btn-ghost w-full text-center text-red-600 hover:bg-red-50"
                >
                  Vaciar Carrito
                </button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="flex justify-center space-x-6 text-sm text-gray-600">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-emerald-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Garantía 30 días
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 text-emerald-600 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                      </svg>
                      Pago seguro
                    </div>
                  </div>
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