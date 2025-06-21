import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  // Fetch cart on login
  useEffect(() => {
    const fetchCart = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(`${API_BASE}/api/carts/${user._id}`);
          const fetchedItems = res.data.items || [];
          const formattedItems = fetchedItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            product: item.productId, 
          }));
          setItems(formattedItems);
        } catch (err) {
          console.error('Failed to load cart:', err);
          setItems([]);
        }
      } else {
        setItems([]);
      }
    };
    fetchCart();
  }, [user]);

  // Sync to backend
  const syncCart = async (updatedItems) => {
    if (!user || !user._id) return;
    try {
      await axios.post(`${API_BASE}/api/carts/${user._id}`, {
        items: updatedItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
        }))
      });
    } catch (err) {
      console.error('Failed to sync cart:', err);
    }
  };

  const addToCart = (product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === product._id);
      let updated;
      if (existing) {
        updated = prev.map(item =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        updated = [...prev, { productId: product._id, quantity, product }];
      }
      syncCart(updated);
      return updated;
    });
  };

  const removeFromCart = (productId) => {
    setItems(prev => {
      const updated = prev.filter(item => item.productId !== productId);
      syncCart(updated);
      return updated;
    });
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) return removeFromCart(productId);
    setItems(prev => {
      const updated = prev.map(item =>
        item.productId === productId ? { ...item, quantity } : item
      );
      syncCart(updated);
      return updated;
    });
  };

  const clearCart = async () => {
    setItems([]);
    if (user && user._id) {
      try {
        await axios.post(`${API_BASE}/api/carts/${user._id}`, { items: [] });
      } catch (err) {
        console.error('Failed to clear cart:', err);
      }
    }
  };

  const getTotalItems = () => items.reduce((sum, item) => sum + item.quantity, 0);
  const getSubtotal = () => items.reduce((sum, item) => sum + item.quantity * (item.product?.price || 0), 0);
  const getTax = () => getSubtotal() * 0.08;
  const getTotal = () => getSubtotal() + getTax();

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalItems,
      getSubtotal,
      getTax,
      getTotal,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
