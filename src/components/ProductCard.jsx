import React from 'react';
import { useCart } from '../contexts/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart, getItemQuantity } = useCart();
  
  const inCart = isInCart(product.id);
  const quantity = getItemQuantity(product.id);

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="card group">
      {/* Imagen del producto */}
      <div className="relative overflow-hidden mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="product-image group-hover:scale-105 transition-transform duration-300"
        />
        {/* Badge de categoría */}
        <div className="absolute top-3 left-3">
          <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            {product.categoryName}
          </span>
        </div>
        {/* Badge si está en el carrito */}
        {inCart && (
          <div className="absolute top-3 right-3">
            <span className="bg-green-600 text-white text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
              En carrito ({quantity})
            </span>
          </div>
        )}
      </div>

      {/* Información del producto */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mb-4">
          <p className="text-xs text-gray-500 font-medium mb-1">Cuidados:</p>
          <p className="text-xs text-gray-600">{product.care}</p>
        </div>

        {/* Precio y botón */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-2xl font-bold text-green-600">
            ${product.price.toFixed(2)}
          </div>
          
          <button
            onClick={handleAddToCart}
            className={`transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
              inCart 
                ? 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500 px-4 py-2 rounded-2xl font-semibold' 
                : 'btn-primary'
            }`}
          >
            {inCart ? (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Añadido
              </span>
            ) : (
              <span className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Add to Cart
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;