import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Button from '../components/ui/Button';
import ProductGrid from '../components/products/ProductGrid';

const HomePage = () => {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/products`);
        if (Array.isArray(res.data)) {
          setFeatured(res.data.slice(0, 4)); // Show first 4 products
        } else {
          console.error('Invalid product data:', res.data);
          setFeatured([]);
        }
      } catch (err) {
        console.error('Failed to fetch products:', err);
        setFeatured([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
          Discover Handmade Treasures
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Unique, handcrafted items made with love by artisans from around the world.
        </p>
        <Link to="/products">
          <Button size="lg">Shop Now</Button>
        </Link>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Products</h2>
        <ProductGrid products={featured} loading={loading} />
      </div>
    </div>
  );
};

export default HomePage;
