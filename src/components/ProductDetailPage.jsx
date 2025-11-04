import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchProductById } from "../services/api";
import { useCart } from "../context/CartContext";

const ProductDetailPage = () => {
  const { id } = useParams(); // get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { dispatch } = useCart();

  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="container mx-auto px-6 py-10 grid md:grid-cols-2 gap-10">
      <div className="flex justify-center">
        <img
          src={product.image}
          alt={product.title}
          className="w-full max-w-md object-contain bg-gray-50 p-4 rounded-lg shadow"
        />
      </div>

      {/* Right - Info */}
      <div>
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          {product.title}
        </h1>
        <p className="text-white mb-4 capitalize bg-blue-500 w-fit px-2 py-1 rounded-full">
          {product.category}
        </p>

        <p className="text-gray-700 leading-relaxed mb-6 capitalize">
          {product.description}
        </p>

        <div className="flex items-center gap-2 mb-6">
          <span className="text-2xl font-bold text-blue-600">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500">(USD)</span>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="border border-blue-600 hover:bg-blue-700 hover:text-white px-6 py-2 cursor-pointer rounded-full transition shadow hover:shadow-lg"
          >
            Back
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 hover:bg-blue-700 border border-blue-600 cursor-pointer text-white px-6 py-2 rounded-full transition shadow hover:shadow-lg"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
