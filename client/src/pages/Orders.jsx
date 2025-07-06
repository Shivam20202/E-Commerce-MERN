// ✅ pages/Orders.jsx
import { useState, useEffect } from "react";

import axios from "../api/axios";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";

const Orders = () => {
  const { user, token } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleDownloadInvoice = async (orderId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`/api/orders/invoice/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
        responseType: "blob", // Important
      });

      const blob = new Blob([response.data], { type: "text/html" });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `invoice-${orderId}.html`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Invoice download failed:", error);
      alert("Failed to download invoice. Please try again.");
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(res.data);
    } catch (err) {
      console.error("Failed to fetch orders", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (orderId) => {
    try {
      await axios.delete(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const handleClearAll = async () => {
    try {
      await axios.delete("/api/orders/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error("Clear all failed", err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (loading) return <p className="text-center p-10">Loading orders...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 py-10 px-4 sm:px-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-purple-800">🧾 My Orders</h2>
        {orders.length > 0 && (
          <button
            onClick={handleClearAll}
            className="border border-red-400 text-red-600 px-4 py-1 rounded hover:bg-red-100 transition"
          >
            Clear All Orders
          </button>
        )}
      </div>
      {orders.length === 0 ? (
        <p className="text-gray-500 text-center">No orders yet.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <motion.div
              key={order._id}
              className="bg-white rounded-lg shadow-md p-6 border border-purple-200"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold text-purple-700 mb-2">
                Order Placed: {new Date(order.createdAt).toLocaleString()}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                Status:{" "}
                <span className="text-purple-600 font-medium">
                  {order.status}
                </span>
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                {order.items.map((item, idx) => (
                  <div
                    key={idx}
                    className="border rounded-md p-3 flex items-center"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-800">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        Qty: {item.quantity}
                      </p>
                      <p className="text-sm text-gray-600">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-md text-purple-700 font-bold mb-2">
                Total: ₹{order.totalAmount}
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => handleDownloadInvoice(order._id)}
                  className="px-3 py-1 rounded bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                  Download Invoice
                </button>

                <button
                  onClick={() => handleDelete(order._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                >
                  Delete Order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
