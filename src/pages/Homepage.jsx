import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Products</h1>
      <div className="flex item-center">
        <ProductList />
      </div>
      {/* <p className="text-gray-600">Product list will go here...</p> */}
    </div>
  );
};

export default HomePage;
