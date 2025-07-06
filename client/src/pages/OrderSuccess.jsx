// ✅ OrderSuccess.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
      >
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 10, ease: 'linear' }}
          className="text-green-500 text-5xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-3xl font-bold text-green-600 mb-2">Order Placed!</h2>
        <p className="text-gray-600 mb-6">
          Thank you for shopping with us. Your order is being processed and will arrive soon.
        </p>

        <Link
          to="/"
          className="inline-block mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;
