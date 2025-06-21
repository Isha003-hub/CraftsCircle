import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [items, setItems] = useState([]);
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    const fetchWishlist = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(`${API_BASE}/api/wishlists/${user._id}`);
          const fetched = res.data.items?.map(i => i.productId) || [];
          setItems(fetched);
        } catch (err) {
          console.error('Failed to fetch wishlist:', err);
          setItems([]);
        }
      } else {
        setItems([]);
      }
    };

    fetchWishlist();
  }, [user]);

  const syncWishlist = async (updatedItems) => {
  if (!user || !user._id) return;
  try {
    await axios.post(`${API_BASE}/api/wishlists/${user._id}`, {
      items: updatedItems.map(p => ({ productId: p._id }))  
    });
  } catch (err) {
    console.error('Failed to sync wishlist:', err);
  }
};


  const addToWishlist = (product) => {
    setItems(prev => {
      if (prev.some(p => p._id === product._id)) return prev;
      const updated = [...prev, product];
      syncWishlist(updated);
      return updated;
    });
  };

  const removeFromWishlist = (productId) => {
    setItems(prev => {
      const updated = prev.filter(p => p._id !== productId);
      syncWishlist(updated);
      return updated;
    });
  };

  const isInWishlist = (productId) => items.some(p => p._id === productId);

  return (
    <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within a WishlistProvider');
  return context;
};
