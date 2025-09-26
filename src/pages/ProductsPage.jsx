import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { plantsData, getCategories } from '../data/plants';

const ProductCard = ({ product }) => {
  const { addToCart, isInCart } = useCart();
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', { 
      style: 'currency', 
      currency: 'EUR' 
    }).format(price);
  };

  const productInCart = isInCart(product.id);

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img 
          src={product.image} 
          alt={product.name}
          loading="lazy"
          className="product-image"
        />
        <div className="product-badge">
          {product.categoryName}
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <p className="product-care">{product.care}</p>
        </div>
        
        <div className="product-footer">
          <div className="product-price">
            {formatPrice(product.price)}
          </div>
          
          {productInCart ? (
            <button 
              disabled
              className="product-button"
              style={{ backgroundColor: '#f3f4f6', color: '#6b7280', cursor: 'not-allowed' }}
            >
              ✓ Agregado
            </button>
          ) : (
            <button 
              onClick={() => addToCart(product)}
              className="product-button"
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
    <div className="page-container">
      <div className="container-main">
        {/* Header de la página */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div className="page-header">
            <h1 className="page-title">Nuestras Plantas</h1>
            <p className="page-subtitle">
              Descubre nuestra cuidada selección de plantas premium, cada una con garantía de salud y guías de cuidado personalizadas.
            </p>
          </div>

          {totalItems > 0 && (
            <Link 
              to="/cart"
              className="btn btn-primary"
              style={{ display: 'none' }}
            >
              <svg style={{ width: '1.25rem', height: '1.25rem' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l-2.5 5m2.5-5h10m0 0v6a1 1 0 01-1 1H8a1 1 0 01-1-1v-6m10 0V9a1 1 0 00-1-1H8a1 1 0 00-1-1v2" />
              </svg>
              <span>Ver carrito ({totalItems})</span>
            </Link>
          )}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          {Object.values(groupedProducts).map(categoryGroup => (
            <div key={categoryGroup.slug} className="category-section">
              <div className="category-header">
                <h2 className="category-title">
                  <span className="category-icon">{categoryGroup.icon}</span>
                  {categoryGroup.name}
                </h2>
                <p className="category-count">
                  {categoryGroup.products.length} planta{categoryGroup.products.length !== 1 ? 's' : ''} disponible{categoryGroup.products.length !== 1 ? 's' : ''}
                </p>
              </div>

              <div className="products-grid">
                {categoryGroup.products.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '4rem', backgroundColor: 'white', borderRadius: '1rem', padding: '2rem', boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)', border: '1px solid #f3f4f6' }}>
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>
              ¿Por qué elegir Paradise Nursery?
            </h2>
            <p style={{ color: '#6b7280' }}>
              Compromiso total con la calidad y tu satisfacción
            </p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '3rem', height: '3rem', backgroundColor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 style={{ fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Garantía de Salud</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                30 días de garantía en todas nuestras plantas
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '3rem', height: '3rem', backgroundColor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 style={{ fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Guías Personalizadas</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Instrucciones detalladas para cada planta
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '3rem', height: '3rem', backgroundColor: '#ecfdf5', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                <svg style={{ width: '1.5rem', height: '1.5rem', color: '#059669' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={{ fontWeight: '700', color: '#111827', marginBottom: '0.5rem' }}>Soporte Experto</h3>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                Consulta gratuita con nuestros botánicos
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;