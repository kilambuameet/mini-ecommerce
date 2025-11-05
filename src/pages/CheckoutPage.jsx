import { useState } from "react";
import { useCart } from "../context/CartContext";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const CheckoutPage = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const cartItems = state.cart;

  const [selectedPayment, setSelectedPayment] = useState("esewa");
  //   const [cardDetails, setCardDetails] = useState({
  //     number: "",
  //     expiry: "",
  //     cvc: "",
  //   });

  // Calculate total
  const total = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const handlePlaceOrder = () => {
    if (selectedPayment === "card") {
      if (!cardDetails.number || !cardDetails.expiry || !cardDetails.cvc) {
        toast.error("Please fill card details");
        return;
      }
      toast.success("Payment successful! Order placed 🎉");
    } else {
      toast.success(`Order placed via ${selectedPayment.toUpperCase()} ✅`);
    }

    dispatch({ type: "CLEAR_CART" });
    navigate("/");
  };

  const paymentOptions = [
    { id: "esewa", label: "eSewa" },
    { id: "khalti", label: "Khalti" },
    { id: "cod", label: "Cash on Delivery" },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Checkout</h1>

      {/* Order Summary */}
      <div className="mb-6 border-b pb-4">
        <h2 className="text-lg font-medium mb-2">Order Summary</h2>
        {cartItems.map((item) => (
          <div key={item.id} className="flex justify-between mb-2">
            <p>
              {item.title} x {item.quantity}
            </p>
            <p>${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <div className="flex justify-between mt-2 border-t pt-2 font-semibold">
          <p>Total:</p>
          <p>${total}</p>
        </div>
      </div>

      {/* Payment Options as Cards */}
      <div className="mb-6">
        <h2 className="text-lg font-medium mb-2">Select Payment Method</h2>
        <div className="flex gap-4 flex-wrap">
          {paymentOptions.map((option) => (
            <div
              key={option.id}
              onClick={() => setSelectedPayment(option.id)}
              className={`cursor-pointer p-4 flex-1 border rounded-lg shadow-md text-center transition-all duration-300 
                ${
                  selectedPayment === "esewa" && option.id === "esewa"
                    ? "border-green-600 bg-green-100 shadow-lg"
                    : selectedPayment === "khalti" && option.id === "khalti"
                    ? "border-red-600 bg-red-100 shadow-lg"
                    : selectedPayment === "cod" && option.id === "cod"
                    ? "border-blue-600 bg-blue-100 shadow-lg"
                    : "border-gray-400 bg-gray-100 shadow-lg"
                }`}
            >
              {option.label}
            </div>
          ))}
        </div>

        {/* Card Details for Online Payments */}
        {/* {(selectedPayment === "esewa" || selectedPayment === "khalti") && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              name="number"
              value={cardDetails.number}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, number: e.target.value })
              }
              placeholder="Card Number"
              className="col-span-3 sm:col-span-3 border p-2 rounded w-full"
            />
            <input
              type="text"
              name="expiry"
              value={cardDetails.expiry}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, expiry: e.target.value })
              }
              placeholder="MM/YY"
              className="border p-2 rounded w-full"
            />
            <input
              type="text"
              name="cvc"
              value={cardDetails.cvc}
              onChange={(e) =>
                setCardDetails({ ...cardDetails, cvc: e.target.value })
              }
              placeholder="CVC"
              className="border p-2 rounded w-full"
            />
          </div>
        )} */}
      </div>

      <button
        onClick={handlePlaceOrder}
        className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition shadow-md w-full"
      >
        Place Order
      </button>
    </div>
  );
};

export default CheckoutPage;
