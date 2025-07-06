import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return alert("Cart is empty");
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-yellow-100 p-6">
      <motion.h2
        className="text-4xl font-bold text-center text-purple-800 mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Your Cart 🛒
      </motion.h2>

      {cartItems.length === 0 ? (
        <motion.div
          className="text-center text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p>Your cart is empty 😢</p>
          <Link
            to="/"
            className="text-purple-600 underline mt-4 inline-block"
          >
            Go back to shopping
          </Link>
        </motion.div>
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {cartItems.map((item, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between hover:scale-[1.02] transition-transform"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              {/* Image with fixed container and object-contain */}
              <div className="h-40 w-full bg-gray-100 flex items-center justify-center p-3 rounded mb-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <h3 className="text-lg font-semibold text-gray-800 min-h-[48px]">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                ₹{item.price} x {item.quantity || 1}
              </p>
              <p className="text-lg font-bold text-purple-600 mb-4">
                ₹{item.price * (item.quantity || 1)}
              </p>
              <button
                onClick={() => removeFromCart(item._id)}
                className="bg-red-500 text-white py-2 rounded hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Total and Checkout */}
      {cartItems.length > 0 && (
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <p className="text-xl font-semibold text-gray-800 mb-2">
            Total: <span className="text-purple-700">₹{total.toFixed(2)}</span>
          </p>
          <button
            onClick={handleCheckout}
            className="mt-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded transition"
          >
            Proceed to Checkout
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default Cart;
