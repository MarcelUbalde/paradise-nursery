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

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío');
      return;
    }
    
    alert(`¡Gracias por tu compra! 🌱\n\nResumen:\n- ${totalItems} productos\n- Total: ${formatPrice(totalAmount)}\n\nTu pedido será procesado pronto.`);
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="page-container">
        <div className="container-main">
          <div className="empty-state">
            <div className="empty-icon">
              <svg style={{ width: '3rem', height: '3rem', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
              </svg>
            </div>
            <h2 className="empty-title">
              Tu carrito está vacío
            </h2>
            <p className="empty-description">
              Descubre nuestra hermosa colección de plantas y encuentra la perfecta para tu hogar.
            </p>
            <Link 
              to="/products" 
              className="btn btn-primary"
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Explorar Plantas
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="container-main">

        <div className="page-header">
          <h1 className="page-title">Carrito de Compras</h1>
          <p className="page-subtitle">
            {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'} en tu carrito
          </p>
        </div>

        <div className="cart-container">

          <div className="cart-items">
            {items.map(item => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-content">

                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    className="cart-item-image"
                  />
                  

                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <div>
                        <h3 className="cart-item-name">{item.name}</h3>
                        <p className="cart-item-category">{item.categoryName}</p>
                      </div>
                      

                      <div style={{ textAlign: 'right' }}>
                        <div className="cart-item-price">
                          {formatPrice(item.price)}
                        </div>
                      </div>
                    </div>


                    <div className="cart-item-controls">
                      <div className="quantity-controls">
                        <span className="quantity-label">Cantidad:</span>
                        <div className="quantity-input">
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                            className="quantity-button"
                          >
                            <svg style={{ width: '1rem', height: '1rem', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          <span className="quantity-display">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                            className="quantity-button"
                          >
                            <svg style={{ width: '1rem', height: '1rem', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                          </button>
                        </div>
                      </div>


                      <div className="cart-item-actions">
                        <div className="item-subtotal">
                          <div className="subtotal-amount">
                            {formatPrice(item.price * item.quantity)}
                          </div>
                          <div className="subtotal-label">Subtotal</div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="remove-button"
                          title="Eliminar producto"
                        >
                          <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>


          <div className="cart-summary">
            <h2 className="summary-title">Resumen del Pedido</h2>
            
            <div className="summary-details">
              <div className="summary-row">
                <span>Subtotal ({totalItems} artículos)</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="summary-row">
                <span>Envío</span>
                <span style={{ color: '#059669', fontWeight: '600' }}>Gratis</span>
              </div>
              <div className="summary-total">
                <span>Total</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
            </div>

            <div className="summary-actions">
              <button
                onClick={handleCheckout}
                className="checkout-button"
              >
                Proceder al Pago
              </button>
              
              <Link 
                to="/products"
                className="continue-shopping"
              >
                Seguir Comprando
              </Link>

              <button
                onClick={clearCart}
                className="clear-cart"
              >
                Vaciar Carrito
              </button>
            </div>


            <div className="trust-info">
              <div className="trust-badges">
                <div className="trust-badge">
                  <svg style={{ width: '1rem', height: '1rem', color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Garantía 30 días</span>
                </div>
                <div className="trust-badge">
                  <svg style={{ width: '1rem', height: '1rem', color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Pago seguro</span>
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
