import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import HomePage from "./pages/Homepage";
import CartPage from "./pages/CartPage";
import { CartProvider } from "./context/CartContext";
import { Toaster } from "react-hot-toast";
import ProductDetailPage from "./components/ProductDetailPage";

function App() {
  return (
    <>
      <CartProvider>
        {" "}
        <Router>
          <div className="min-h-screen bg-gray-100">
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
            </Routes>
          </div>
        </Router>
        <Toaster position="top-center" reverseOrder={false} />
      </CartProvider>
    </>
  );
}

export default App;
