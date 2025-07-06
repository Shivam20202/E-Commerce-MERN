// ✅ Checkout.jsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce((sum, item) => sum + item.price, 0);

  const handlePlaceOrder = async () => {
    if (!address.trim()) {
      alert('Please enter a delivery address');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        items: cartItems.map(item => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          image: item.image,
          quantity: 1
        })),
        totalAmount,
        address
      };
      await axios.post('/api/orders', payload);
      clearCart();
      alert('✅ Order placed successfully!');
      navigate('/order-success');
    } catch (err) {
      alert('Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-yellow-100 via-pink-100 to-purple-100 p-6">
      <motion.div
        className="max-w-3xl mx-auto bg-white rounded-2xl shadow-2xl p-6"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center text-purple-700 mb-6">
          Checkout Summary 🛒
        </h2>

        <ul className="divide-y">
          {cartItems.map((item, i) => (
            <motion.li
              key={i}
              className="py-4 flex items-center justify-between gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-16 h-16 object-cover rounded shadow"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-500">Qty: 1</p>
              </div>
              <span className="text-lg font-semibold text-purple-600">₹{item.price}</span>
            </motion.li>
          ))}
        </ul>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Delivery Address
          </label>
          <textarea
            className="w-full border border-purple-300 rounded-lg p-4 focus:outline-none focus:ring-2 focus:ring-purple-500"
            rows="3"
            placeholder="Enter your full delivery address here..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          ></textarea>
        </div>

        <div className="mt-6 text-xl font-bold text-right text-purple-800">
          Total Amount: ₹{totalAmount.toFixed(2)}
        </div>

        <motion.button
          disabled={loading || cartItems.length === 0}
          onClick={handlePlaceOrder}
          whileTap={{ scale: 0.95 }}
          className={`mt-8 w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white py-3 rounded-lg shadow-md hover:from-purple-700 hover:to-pink-600 transition-all font-semibold tracking-wide text-lg ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
        >
          {loading ? 'Processing Order...' : 'Confirm & Place Order'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Checkout;
