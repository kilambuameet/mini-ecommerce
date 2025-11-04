import { useEffect, useState } from "react";
import { fetchProducts, fetchProductCategories } from "../services/api";
import ProductCard from "./ProductCard";

const ProductList = () => {
  const [product, setProduct] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getData = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchProducts();
      setProduct(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getCategories = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchProductCategories();
      console.log(data, "Product categories");
      setCategories(["all", "kids", ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts =
    selectedCategory === "all"
      ? product
      : product.filter((p) => p.category === selectedCategory);

  useEffect(() => {
    getData();
    getCategories();
  }, []);

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center mx-auto">
        <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen space-y-4">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
        <button
          onClick={getData}
          className="bg-green-500 hover:bg-green-600 transition-colors text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  //   if (filteredProducts.length === 0) {
  //     return (
  //       <div className="flex justify-center items-center">
  //         <p className="text-gray-600 text-lg font-semibold">
  //           No products found in this category.
  //         </p>
  //       </div>
  //     );
  //   }

  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center gap-4 mb-6 overflow-x-auto ">
        {categories.map((cat) => {
          return (
            <p
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`border rounded-full px-4 py-2 cursor-pointer transition capitalize ${
                selectedCategory === cat
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {cat}
            </p>
          );
        })}
      </div>

      <div className="mb-4 text-gray-600">
        <p>
          Showing{" "}
          <span className="font-semibold">{filteredProducts.length}</span>{" "}
          {filteredProducts.length === 1 ? "Product" : "Products"}
        </p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="flex justify-center items-center">
          <p className="text-gray-600 text-lg font-semibold">
            No products found in this category.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
