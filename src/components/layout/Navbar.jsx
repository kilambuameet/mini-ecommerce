import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useEffect, useState } from "react";

const Navbar = () => {
  const [animate, setAnimate] = useState(false);
  const { state } = useCart();

  const totalItems = state.cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    if (totalItems > 0) {
      setAnimate(true);
      const timer = setTimeout(() => setAnimate(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [totalItems]);

  const hasItems = totalItems > 0;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600">ShopHub</span>
          </Link>

          <div className="hidden md:flex space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Products
            </Link>
            <Link
              to="/cart"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Cart
            </Link>
          </div>

          <Link to="/cart" className="relative">
            <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-blue-600 transition-all duration-500 hover:scale-110 cursor-pointer" />
            {/* Badge will be added later */}
            {/* <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              0
            </span> */}
            {totalItems > 0 && (
              <span
                className={`
        absolute -top-2 -right-2 flex items-center justify-center 
        text-xs font-semibold text-white px-2.5 py-1 rounded-full
        transition-all duration-300 ease-in-out h-5 w-5 
        ${
          hasItems
            ? "bg-linear-to-r from-pink-500 to-red-500 shadow-md shadow-pink-300 animate-pulse"
            : "bg-gray-300 text-gray-700"
        }
        ${animate ? "animate-spin" : ""}
      `}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
