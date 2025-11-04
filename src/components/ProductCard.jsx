import { Star } from "lucide-react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
    toast.success(`${product.title}  added to cart`);
  };

  const handleViewDetails = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    // <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div
      key={product.id}
      className="border rounded-lg shadow-md p-4 flex flex-col hover:scale-105 transform transition-all duration-300 bg-white"
    >
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-contain mb-4"
      />
      <div className="flex items-center mb-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${
              i < Math.round(product.rating.rate)
                ? "text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
        <span className="ml-2 text-gray-700 font-medium">
          {product.rating.rate}
        </span>
        <span className="ml-1 text-gray-500 text-sm">
          ({product.rating.count} reviews)
        </span>
      </div>

      <h2 className="font-semibold text-lg  truncate">{product.title}</h2>
      {/* <p className="line-clamp-3 overflow-hidden text-ellipsis mb-2 mt-1">
        {product.description}
      </p> */}
      <div className="flex justify-between products-center mb-2">
        <p className="text-blue-600 font-bold text-lg">
          ${product.price.toFixed(2)}
        </p>
        <span className="text-white bg-blue-500 rounded-full px-3 py-1 text-xs capitalize">
          {product.category}
        </span>
      </div>
      <div className="flex items-center gap-5">
        <button
          onClick={handleAddToCart}
          className="mt-auto w-1/2 p-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition-colors shadow-sm hover:shadow-md"
        >
          Add to Cart
        </button>
        <button
          onClick={handleViewDetails}
          className="mt-auto w-1/2 p-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white py-2 rounded-md transition-colors shadow-sm hover:shadow-md"
        >
          Details
        </button>
      </div>
    </div>
    // </div>
  );
};

export default ProductCard;
