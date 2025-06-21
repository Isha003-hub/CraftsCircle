import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Set base URL for axios
  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        if (Array.isArray(res.data)) {
          setProducts(res.data);
        } else {
          console.error('Invalid product data structure:', res.data);
          setProducts([]);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setProducts([]);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product) => {
    try {
      const res = await axios.post(`${API_BASE}/api/products`, product);
      setProducts(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Add product failed:', err);
    }
  };

  const updateProduct = async (updated) => {
    try {
      await axios.put(`${API_BASE}/api/products/${updated._id}`, updated);
      setProducts(prev => prev.map(p => (p._id === updated._id ? updated : p)));
    } catch (err) {
      console.error('Update product failed:', err);
    }
  };

  const deleteProduct = async (id) => {
    if (!id) {
      console.error('deleteProduct: Product ID is missing or undefined.');
      return;
    }

    try {
      await axios.delete(`${API_BASE}/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch (err) {
      console.error(`Delete product with id=${id} failed:`, err.response?.data || err.message);
    }
  };


  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct, deleteProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
