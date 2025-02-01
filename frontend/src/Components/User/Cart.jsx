import React from "react";
import { ShoppingBag, Plus, Minus, X } from "lucide-react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const BASE_IMG = import.meta.env.VITE_BASE_IMG;

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: newQuantity },
    });
  };

  const removeItem = (id) => {
    dispatch({ type: "REMOVE_ITEM", payload: id });
  };

  return (
    <div className="min-h-screen bg-[#1E2633]">
      <header className="bg-[#2A3441]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-[#FFB800]" />
              <h1 className="text-2xl font-bold text-[#FFB800]">Your Cart</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#1E2633] text-white rounded-full px-4 py-2">
                <span>Total: ₹{state.total}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {state.items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBag className="h-16 w-16 text-[#FFB800] mx-auto mb-4" />
            <h2 className="text-white text-xl font-semibold mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-400 mb-6">
              Add some delicious meals to get started!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-[#FFB800] text-[#1E2633] px-6 py-2 rounded-lg font-semibold hover:bg-[#ffc107]"
            >
              Browse Menu
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {state.items.map((item) => (
              <div
                key={item.id}
                className="bg-[#2A3441] rounded-lg p-6 flex items-center space-x-4"
              >
                <img
                  src={item.image || BASE_IMG}
                  alt={item.name}
                  className="w-24 h-24 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-white font-medium text-lg">
                        {item.name}
                      </h3>
                      <p className="text-gray-400">{item.mess}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-[#FFB800]"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="bg-[#1E2633] text-white p-1 rounded-full hover:bg-[#FFB800] hover:text-[#1E2633]"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="text-white px-4">{item.quantity}</span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="bg-[#1E2633] text-white p-1 rounded-full hover:bg-[#FFB800] hover:text-[#1E2633]"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <span className="text-[#FFB800] font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            <div className="bg-[#2A3441] rounded-lg p-6">
              <div className="space-y-4">
                <div className="flex justify-between text-white">
                  <span>Subtotal</span>
                  <span>₹{state.total}</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Delivery Fee</span>
                  <span>₹10</span>
                </div>
                <div className="flex justify-between text-white">
                  <span>Service Tax</span>
                  <span>₹{Math.round(state.total * 0.05)}</span>
                </div>
                <div className="border-t border-gray-600 pt-4">
                  <div className="flex justify-between text-[#FFB800] font-semibold">
                    <span>Total Amount</span>
                    <span>
                      ₹{state.total + 10 + Math.round(state.total * 0.05)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => navigate("/place-order")}
                  className="w-full bg-[#FFB800] text-[#1E2633] py-3 rounded-lg font-semibold hover:bg-[#ffc107] mt-4"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
