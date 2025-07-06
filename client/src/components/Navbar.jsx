import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Menu, X, Box } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import LogoutModal from "./LogoutModal";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cartItems = [] } = useCart();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const confirmLogout = () => {
    logout();
    setShowModal(false);
    setMobileMenu(false);
    navigate("/login", { replace: true });
  };

  const NavLinks = ({ isMobile = false }) => (
    <div
      className={`flex ${
        isMobile ? "flex-col gap-3 mt-3" : "items-center space-x-5"
      }`}
    >
      <Link
        to="/cart"
        onClick={() => setMobileMenu(false)}
        className="relative inline-flex items-center px-3 py-1.5 border-2 border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-gradient-to-r from-purple-600 to-pink-500 hover:text-white rounded-full font-medium transition-all"
      >
        <ShoppingCart className="w-5 h-5 mr-1" />
        Cart
        <span className="ml-1 text-xs bg-purple-600 text-white rounded-full w-5 h-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      </Link>

      <Link
        to="/orders"
        onClick={() => setMobileMenu(false)}
        className="inline-flex items-center px-4 py-1.5 border-2 border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-gradient-to-r from-purple-600 to-pink-500 hover:text-white rounded-full font-semibold transition-all"
      >
        <Box className="w-4 h-4 mr-2" />
        <span>My Orders</span>
      </Link>

      <button
        onClick={() => setShowModal(true)}
        className=" inline-flex items-center  px-3 py-1.5 border-2 border-purple-600 text-purple-700 dark:text-purple-300 hover:bg-gradient-to-r from-purple-600 to-pink-500 hover:text-white rounded-full font-medium transition-all"
      >
        Logout
      </button>
    </div>
  );

  

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <Link to="/" className="flex items-center">
        <img src="/logo192.png" alt="logo" className="h-10 w-10 mr-2" />
        <span className="font-bold text-xl text-purple-700 dark:text-purple-400">
          ShopZone
        </span>
      </Link>

      {/* Middle Nav (Desktop only) */}
      <div className="hidden md:flex flex-1 justify-end">
        <NavLinks />
      </div>

      {/* Right Side Elements (Always visible) */}
      <div className="flex items-center space-x-4">
        {/* Greet User (Desktop only) */}
        {user?.name && (
          <span className="hidden md:inline text-gray-700 dark:text-gray-200 font-medium">
            Hi, {user.name}
            <span className="text-sm text-purple-500 ml-1">
              ({user.isAdmin ? "Admin" : "User"})
            </span>
          </span>
        )}

        {/* Admin button (visible only for admins) */}
        {user?.isAdmin && (
          <Link
            to="/admin"
            className="inline-flex items-center  px-3 py-1.5 text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-800 rounded font-medium transition-all"
          >
            Admin
          </Link>
        )}

        {/* Avatar */}
        {user?.user?.avatar ? (
          <img
            src={user.avatar}
            alt="avatar"
            className="w-9 h-9 rounded-full border-2 border-purple-500 object-cover"
          />
        ) : (
          <div className="w-9 h-9 rounded-full ml-4 bg-purple-500 text-white flex items-center justify-center font-bold">
            {user?.user?.name?.[0] || "U"}
          </div>
        )}

        {/* Mobile toggle button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenu(!mobileMenu)}>
            {mobileMenu ? (
              <X className="w-6 h-6 text-purple-700 dark:text-purple-300" />
            ) : (
              <Menu className="w-6 h-6 text-purple-700 dark:text-purple-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenu && (
        <div className="absolute top-16 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-40 px-6 py-4 md:hidden animate-slide-down">
          {user?.user?.name && (
            <div className="text-gray-700 dark:text-gray-200 font-medium mb-2">
              Hi, {user.user.name}
              <span className="text-xs text-purple-500 ml-1">
                ({user.isAdmin ? "Admin" : "User"})
              </span>
            </div>
          )}
          <NavLinks isMobile />
        </div>
      )}

      <LogoutModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={confirmLogout}
      />
    </nav>
  );
};

export default Navbar;
