import React, { useState } from 'react';
import ProductGrid from '../components/products/ProductGrid';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const { products } = useProducts();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="px-4 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Products</h1>

      {/* Search Filter */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border px-4 py-2 rounded w-full md:w-1/3"
        />
      </div>

      {/* Product Grid */}
      <ProductGrid products={filteredProducts} />
    </div>
  );
};

export default ProductsPage;
