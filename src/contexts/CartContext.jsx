import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CART_ACTIONS = {
    ADD_ITEM: 'ADD_ITEM',
    REMOVE_ITEM: 'REMOVE_ITEM',
    UPDATE_QUANTITY: 'UPDATE_QUANTITY',
    CLEAR_CART: 'CLEAR_CART',
    LOAD_CART: 'LOAD_CART',
};

const initialCartState = {
    items: [],
    totalItems: 0,
    totalAmount: 0,
};

const calculateTotals = (items) => {
    const totalItems = items.reduce((t, i) => t + i.quantity, 0);
    const totalAmount = items.reduce((t, i) => t + i.price * i.quantity, 0);
    return { totalItems, totalAmount };
};

const saveToLocalStorage = (items) => {
    try {
        localStorage.setItem('paradise-nursery-cart', JSON.stringify(items));
    } catch { }
};

const loadFromLocalStorage = () => {
    try {
        const saved = localStorage.getItem('paradise-nursery-cart');
        return saved ? JSON.parse(saved) : [];
    } catch {
        return [];
    }
};

const cartReducer = (state, action) => {
    let newItems, totals;

    switch (action.type) {
        case CART_ACTIONS.LOAD_CART: {
            const loaded = action.payload;
            const t = calculateTotals(loaded);
            return { items: loaded, totalItems: t.totalItems, totalAmount: t.totalAmount };
        }

        case CART_ACTIONS.ADD_ITEM: {
            const idx = state.items.findIndex((i) => i.id === action.payload.id);
            newItems =
                idx >= 0
                    ? state.items.map((i, k) => (k === idx ? { ...i, quantity: i.quantity + 1 } : i))
                    : [...state.items, { ...action.payload, quantity: 1 }];
            totals = calculateTotals(newItems);
            saveToLocalStorage(newItems);
            return { items: newItems, totalItems: totals.totalItems, totalAmount: totals.totalAmount };
        }

        case CART_ACTIONS.REMOVE_ITEM: {
            newItems = state.items.filter((i) => i.id !== action.payload);
            totals = calculateTotals(newItems);
            saveToLocalStorage(newItems);
            return { items: newItems, totalItems: totals.totalItems, totalAmount: totals.totalAmount };
        }

        case CART_ACTIONS.UPDATE_QUANTITY: {
            const { itemId, quantity } = action.payload;
            newItems =
                quantity <= 0
                    ? state.items.filter((i) => i.id !== itemId)
                    : state.items.map((i) => (i.id === itemId ? { ...i, quantity } : i));
            totals = calculateTotals(newItems);
            saveToLocalStorage(newItems);
            return { items: newItems, totalItems: totals.totalItems, totalAmount: totals.totalAmount };
        }

        case CART_ACTIONS.CLEAR_CART: {
            saveToLocalStorage([]);
            return initialCartState;
        }

        default:
            return state;
    }
};

const CartContext = createContext(null);

export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart debe ser usado dentro de un CartProvider');
    return ctx;
};

export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

    useEffect(() => {
        const saved = loadFromLocalStorage();
        if (saved.length > 0) {
            dispatch({ type: CART_ACTIONS.LOAD_CART, payload: saved });
        }
    }, []);

    const addToCart = (product) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product });
    const removeFromCart = (productId) =>
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId });
    const updateQuantity = (productId, quantity) =>
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { itemId: productId, quantity } });
    const clearCart = () => dispatch({ type: CART_ACTIONS.CLEAR_CART });
    const getItemQuantity = (productId) =>
        cartState.items.find((i) => i.id === productId)?.quantity || 0;
    const isInCart = (productId) => cartState.items.some((i) => i.id === productId);

    const value = {
        items: cartState.items,
        totalItems: cartState.totalItems,
        totalAmount: cartState.totalAmount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getItemQuantity,
        isInCart,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;