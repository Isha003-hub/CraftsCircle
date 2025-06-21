import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';

const CheckoutPage = () => {
  const { items, clearCart, getSubtotal, getTax, getTotal } = useCart();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    city: '',
    zipCode: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate order placement
    clearCart();
    navigate('/order-confirmation');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 bg-white p-6 rounded-lg shadow-md border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
          <input
            name="email"
            type="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
          <input
            name="zipCode"
            type="text"
            placeholder="ZIP Code"
            required
            value={formData.zipCode}
            onChange={handleChange}
            className="border px-4 py-2 rounded"
          />
        </div>
        <input
          name="address"
          type="text"
          placeholder="Street Address"
          required
          value={formData.address}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />
        <input
          name="city"
          type="text"
          placeholder="City"
          required
          value={formData.city}
          onChange={handleChange}
          className="border px-4 py-2 rounded"
        />

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-2">
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
        </div>

        <Button type="submit" size="lg" className="w-full mt-4">
          Place Order
        </Button>
      </form>
    </div>
  );
};

export default CheckoutPage;
