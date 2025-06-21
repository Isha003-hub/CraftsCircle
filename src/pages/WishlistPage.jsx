import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import ProductCard from '../components/products/ProductCard';

const WishlistPage = () => {
  const { items } = useWishlist();

  if (!items) {
    return <div className="text-center py-10">Loading your wishlist...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>

      {items.length === 0 ? (
        <p className="text-gray-600">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
