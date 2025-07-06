import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import Toast from "../components/Toast";

const categories = ["All", "Electronics", "Fashion", "Books", "Home", "Toys"];

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [addedItems, setAddedItems] = useState({});
  const [toast, setToast] = useState({ show: false, message: "" });

  const { addToCart } = useCart();

  const handleAdd = (product) => {
    addToCart(product);
    setAddedItems((prev) => ({ ...prev, [product._id]: true }));
    setToast({ show: true, message: `${product.name} added to cart!` });

    setTimeout(() => {
      setAddedItems((prev) => ({ ...prev, [product._id]: false }));
      setToast({ show: false, message: "" });
    }, 2000);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/api/products");
        setProducts(res.data);
      } catch (err) {
        console.error("Failed to fetch products", err);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchCategory =
      selectedCategory === "All" || product.category === selectedCategory;
    const matchSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-100 p-6">
      {/* Logo */}
      <motion.div
        className="flex justify-center items-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <img src="/logo192.png" alt="ShopZone Logo" className="h-12 w-12 mr-3" />
        <h1 className="text-4xl font-extrabold text-purple-800">ShopZone</h1>
      </motion.div>

      {/* Search */}
      <div className="flex justify-center mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for products..."
          className="w-full max-w-xl px-4 py-2 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Categories */}
      <motion.div
        className="flex justify-center flex-wrap gap-4 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full border text-sm font-medium transition-all ${
              selectedCategory === cat
                ? "bg-purple-600 text-white shadow"
                : "bg-white text-purple-700 border-purple-300 hover:bg-purple-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* Product Grid */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
          },
        }}
      >
        {filteredProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-600 text-lg">
            No products found.
          </p>
        ) : (
          filteredProducts.map((product, i) => (
            <motion.div
              key={product._id || i}
              className="bg-white rounded-xl shadow-lg flex flex-col overflow-hidden transition-transform hover:scale-[1.03]"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <div className="h-48 w-full bg-gray-100 flex items-center justify-center p-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="max-h-full max-w-full object-contain"
                  loading="lazy"
                />
              </div>

              <div className="p-4 flex flex-col flex-1">
                <h3 className="text-lg font-semibold text-gray-800 mb-1 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 mb-2 line-clamp-2">
                  {product.description?.slice(0, 60) + "..."}
                </p>
                <p className="text-lg font-bold text-purple-600 mb-3">
                  ₹{product.price}
                </p>

                <button
                  onClick={() => handleAdd(product)}
                  className={`mt-auto w-full py-2 rounded-md text-white text-sm font-medium transition-all ${
                    addedItems[product._id]
                      ? "bg-green-600"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {addedItems[product._id] ? "✔ Added to Cart" : "Add to Cart"}
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* Toast Notification */}
      <Toast message={toast.message} show={toast.show} />
    </div>
  );
};

export default Home;
