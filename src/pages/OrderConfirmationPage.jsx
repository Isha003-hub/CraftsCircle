import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const OrderConfirmationPage = () => {
  return (
    <div className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold text-green-600 mb-4">Thank You!</h1>
      <p className="text-lg text-gray-700 mb-6">
        Your order has been placed successfully. We’ll send you a confirmation email shortly.
      </p>
      <Link to="/products">
        <Button size="lg">Continue Shopping</Button>
      </Link>
    </div>
  );
};

export default OrderConfirmationPage;
