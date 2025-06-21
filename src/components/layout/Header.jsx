import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, User, Menu, X, Package } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const { items: wishlistItems } = useWishlist();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="bg-white shadow-md border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <Package className="h-8 w-8 text-primary-600 group-hover:text-primary-700 transition-colors" />
            <span className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
              CraftsCircle
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {user?.role === 'admin' ? (
              <Link to="/admin" className="text-gray-700 hover:text-primary-600 font-medium">Admin Dashboard</Link>
            ) : (
              <>
                <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">Home</Link>
                <Link to="/products" className="text-gray-700 hover:text-primary-600 font-medium">Products</Link>
                <Link to="/contact" className="text-gray-700 hover:text-primary-600 font-medium">Contact Us</Link>
              </>
            )}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <Link to="/wishlist" className="relative p-2 text-gray-700 hover:text-primary-600">
                      <Heart className="h-6 w-6" />
                      {Array.isArray(wishlistItems) && wishlistItems.length > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Link>

                    <Link to="/cart" className="relative p-2 text-gray-700 hover:text-primary-600">
                      <ShoppingCart className="h-6 w-6" />
                      {getTotalItems() > 0 && (
                        <span className="absolute -top-1 -right-1 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Link>
                  </>
                )}

                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                    <User className="h-6 w-6" />
                    <span className="text-sm font-medium">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">{user?.email}</div>
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Sign Out</button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/login" className="px-4 py-2 text-primary-600 hover:text-primary-700 font-medium">Sign In</Link>
                <Link to="/register" className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 font-medium">Sign Up</Link>
              </div>
            )}
          </div>

          <button onClick={toggleMenu} className="md:hidden p-2 text-gray-700 hover:text-primary-600">
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-up">
          <div className="px-4 py-2 space-y-2">
            {user?.role === 'admin' ? (
              <Link to="/admin" onClick={toggleMenu} className="block px-3 py-2 hover:bg-gray-50 rounded-md">Admin Dashboard</Link>
            ) : (
              <>
                <Link to="/" onClick={toggleMenu} className="block px-3 py-2 hover:bg-gray-50 rounded-md">Home</Link>
                <Link to="/products" onClick={toggleMenu} className="block px-3 py-2 hover:bg-gray-50 rounded-md">Products</Link>
                <Link to="/contact" onClick={toggleMenu} className="block px-3 py-2 hover:bg-gray-50 rounded-md">Contact Us</Link>
              </>
            )}

            {user ? (
              <>
                {user.role !== 'admin' && (
                  <>
                    <Link to="/wishlist" onClick={toggleMenu} className="flex justify-between px-3 py-2 hover:bg-gray-50 rounded-md">
                      <span>Wishlist</span>
                      {Array.isArray(wishlistItems) && wishlistItems.length > 0 && (
                        <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {wishlistItems.length}
                        </span>
                      )}
                    </Link>
                    <Link to="/cart" onClick={toggleMenu} className="flex justify-between px-3 py-2 hover:bg-gray-50 rounded-md">
                      <span>Cart</span>
                      {getTotalItems() > 0 && (
                        <span className="bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                          {getTotalItems()}
                        </span>
                      )}
                    </Link>
                  </>
                )}
                <div className="border-t border-gray-100 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm text-gray-500">
                    Signed in as {typeof user?.name === 'string' ? user.name : 'User'}
                  </div>
                  <button onClick={handleLogout} className="block w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md">Sign Out</button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-100 pt-2 mt-2 space-y-2">
                <Link to="/login" onClick={toggleMenu} className="block px-3 py-2 hover:bg-primary-50 rounded-md font-medium text-primary-600">Sign In</Link>
                <Link to="/register" onClick={toggleMenu} className="block px-3 py-2 bg-primary-600 text-white hover:bg-primary-700 rounded-md font-medium text-center">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
