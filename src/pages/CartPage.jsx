import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/ui/Button';

const CartPage = () => {
  const {
    items,
    updateQuantity,
    removeFromCart,
    getSubtotal,
    getTax,
    getTotal,
  } = useCart();

  const validItems = items.filter(item => item?.product);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Cart</h1>

      {validItems.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-600 text-lg mb-4">Your cart is empty.</p>
          <Link to="/products">
            <Button>Start Shopping</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {validItems.map((item, index) => (
              <div
                key={item.product._id || index}
                className="flex items-center justify-between border border-gray-200 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={item.product.image || '/placeholder.png'}
                    alt={item.product.title || 'Product'}
                    className="w-20 h-20 object-cover rounded-md"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.product.title || 'Untitled'}
                    </h3>
                    <p className="text-gray-600">
                      ${item.product.price ? item.product.price.toFixed(2) : 'N/A'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={item.quantity}
                    min={1}
                    onChange={(e) =>
                      updateQuantity(item.product._id, parseInt(e.target.value))
                    }
                    className="w-16 border rounded px-2 py-1 text-center"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => removeFromCart(item.product._id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">Order Summary</h2>
            <div className="flex justify-between text-gray-700">
              <span>Subtotal:</span>
              <span>${getSubtotal().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-700">
              <span>Tax (8%):</span>
              <span>${getTax().toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total:</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>
            <Link to="/checkout">
              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
