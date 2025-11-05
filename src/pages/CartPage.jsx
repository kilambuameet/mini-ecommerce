import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import ConfirmModal from "../components/ConfirmationModal";
import { useState } from "react";

const CartPage = () => {
  const { state, dispatch } = useCart();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();
  const cartItems = state.cart;

  // Calculate total
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  if (cartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <p className="text-lg font-medium mb-4">Your cart is empty 😢</p>
        <a
          href="/"
          className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
        >
          Continue Shopping
        </a>
      </div>
    );
  }

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const handleRemoveClick = (item) => {
    setSelectedItem(item);
    setModalOpen(true);
  };

  const handleConfirmRemove = () => {
    dispatch({ type: "REMOVE_FROM_CART", payload: selectedItem.id });
    setModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <>
      {" "}
      <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Shopping Cart
        </h1>

        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between border-b pb-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-contain bg-gray-100 rounded-lg"
                />
                <div>
                  <h2 className="font-medium text-gray-800">{item.title}</h2>
                  <p className="text-gray-600">${item.price.toFixed(2)}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity - 1 },
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() =>
                        dispatch({
                          type: "UPDATE_QUANTITY",
                          payload: { id: item.id, quantity: item.quantity + 1 },
                        })
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-gray-800">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoveClick(item)}
                  className="text-red-500 hover:text-white hover:bg-red-500 transition-all duration-300 border border-red-500 px-2 py-1 rounded-full cursor-pointer mt-2"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-between items-center">
          <p className="text-lg font-semibold text-gray-800">Total: ${total}</p>
          <div className="flex justify-between items-center gap-4 flex-wrap">
            <Link
              to="/"
              className="bg-green-500 text-white px-6 py-2 rounded-full hover:bg-green-600 transition duration-300 cursor-pointer"
            >
              Continue Shopping
            </Link>
            <button
              onClick={handleCheckout}
              className="bg-transparent border border-blue-500 text-black px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 hover:text-white cursor-pointer"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmRemove}
        message={`Are you sure you want to remove "${selectedItem?.title}" from the cart?`}
      />
    </>
  );
};

export default CartPage;
