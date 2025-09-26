import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Acciones del carrito
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  LOAD_CART: 'LOAD_CART'
};

// Estado inicial del carrito
const initialCartState = {
  items: [],
  totalItems: 0,
  totalAmount: 0
};

// Funciones auxiliares
const calculateTotals = (items) => {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0);
  return { totalItems, totalAmount };
};

const saveToLocalStorage = (cartItems) => {
  try {
    localStorage.setItem('paradise-nursery-cart', JSON.stringify(cartItems));
  } catch (error) {
    console.error('Error al guardar en localStorage:', error);
  }
};

const loadFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('paradise-nursery-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  } catch (error) {
    console.error('Error al cargar desde localStorage:', error);
    return [];
  }
};

// Reducer del carrito
const cartReducer = (state, action) => {
  let newItems;
  let totals;

  switch (action.type) {
    case CART_ACTIONS.LOAD_CART:
      const loadedItems = action.payload;
      const loadedTotals = calculateTotals(loadedItems);
      return {
        items: loadedItems,
        totalItems: loadedTotals.totalItems,
        totalAmount: loadedTotals.totalAmount
      };

    case CART_ACTIONS.ADD_ITEM:
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      
      if (existingItemIndex >= 0) {
        // Si el item ya existe, incrementar cantidad
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // Si es un nuevo item, agregarlo con cantidad 1
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      totals = calculateTotals(newItems);
      saveToLocalStorage(newItems);
      
      return {
        items: newItems,
        totalItems: totals.totalItems,
        totalAmount: totals.totalAmount
      };

    case CART_ACTIONS.REMOVE_ITEM:
      newItems = state.items.filter(item => item.id !== action.payload);
      totals = calculateTotals(newItems);
      saveToLocalStorage(newItems);
      
      return {
        items: newItems,
        totalItems: totals.totalItems,
        totalAmount: totals.totalAmount
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      const { itemId, quantity } = action.payload;
      
      if (quantity <= 0) {
        // Si la cantidad es 0 o menor, remover el item
        newItems = state.items.filter(item => item.id !== itemId);
      } else {
        // Actualizar la cantidad
        newItems = state.items.map(item =>
          item.id === itemId
            ? { ...item, quantity: quantity }
            : item
        );
      }
      
      totals = calculateTotals(newItems);
      saveToLocalStorage(newItems);
      
      return {
        items: newItems,
        totalItems: totals.totalItems,
        totalAmount: totals.totalAmount
      };

    case CART_ACTIONS.CLEAR_CART:
      saveToLocalStorage([]);
      return initialCartState;

    default:
      return state;
  }
};

// Contexto del carrito
const CartContext = createContext();

// Hook personalizado para usar el contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart debe ser usado dentro de un CartProvider');
  }
  return context;
};

// Provider del contexto
export const CartProvider = ({ children }) => {
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Cargar carrito desde localStorage al iniciar
  useEffect(() => {
    const savedItems = loadFromLocalStorage();
    if (savedItems.length > 0) {
      dispatch({ type: CART_ACTIONS.LOAD_CART, payload: savedItems });
    }
  }, []);

  // Funciones para manejar el carrito
  const addToCart = (product) => {
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
  };

  const removeFromCart = (productId) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
  };

  const updateQuantity = (productId, quantity) => {
    dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { itemId: productId, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: CART_ACTIONS.CLEAR_CART });
  };

  const getItemQuantity = (productId) => {
    const item = cartState.items.find(item => item.id === productId);
    return item ? item.quantity : 0;
  };

  const isInCart = (productId) => {
    return cartState.items.some(item => item.id === productId);
  };

  // Valor del contexto
  const contextValue = {
    // Estado
    items: cartState.items,
    totalItems: cartState.totalItems,
    totalAmount: cartState.totalAmount,
    
    // Funciones
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;