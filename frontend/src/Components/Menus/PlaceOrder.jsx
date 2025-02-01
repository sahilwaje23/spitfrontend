import React, { useState } from "react";
import { Calendar, Clock, CreditCard, MapPin, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";

const PlaceOrder = () => {
  const { state } = useCart();
  const navigate = useNavigate();
  const BASE_IMG = import.meta.env.VITE_BASE_IMG;
  const [selectedPayment, setSelectedPayment] = useState("credits");

  if (state.items.length === 0) {
    navigate("/cart");
    return null;
  }

  const deliveryFee = 10;
  const serviceTax = Math.round(state.total * 0.05);
  const totalAmount = state.total + deliveryFee + serviceTax;

  const handlePlaceOrder = () => {
    // Handle order placement logic here
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="min-h-screen bg-[#1E2633]">
      <header className="bg-[#2A3441]">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-[#FFB800]" />
              <h1 className="text-2xl font-bold text-[#FFB800]">Place Order</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-[#1E2633] text-white rounded-full px-4 py-2">
                <span>Total: ₹{totalAmount}</span>
                <CreditCard className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Selected Items Section */}
            <div className="bg-[#2A3441] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#FFB800] mb-4">
                Selected Items
              </h2>
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <img
                      src={item.image || BASE_IMG}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400">{item.mess}</p>
                      <p className="text-white">Quantity: {item.quantity}</p>
                    </div>
                    <span className="text-[#FFB800] font-semibold">
                      ₹{item.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Delivery Details Section */}
            <div className="bg-[#2A3441] rounded-lg p-6">
              <h2 className="text-xl font-semibold text-[#FFB800] mb-4">
                Delivery Details
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin className="text-[#FFB800] w-5 h-5" />
                  <select className="flex-1 bg-[#1E2633] text-white rounded-lg px-4 py-2 border-none focus:ring-2 focus:ring-[#FFB800]">
                    <option>Block A - Room 203</option>
                    <option>Block B - Room 105</option>
                    <option>Library</option>
                    <option>Academic Block</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="text-[#FFB800] w-5 h-5" />
                  <input
                    type="date"
                    className="flex-1 bg-[#1E2633] text-white rounded-lg px-4 py-2 border-none focus:ring-2 focus:ring-[#FFB800]"
                  />
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="text-[#FFB800] w-5 h-5" />
                  <select className="flex-1 bg-[#1E2633] text-white rounded-lg px-4 py-2 border-none focus:ring-2 focus:ring-[#FFB800]">
                    <option>12:30 PM - 1:00 PM</option>
                    <option>1:00 PM - 1:30 PM</option>
                    <option>1:30 PM - 2:00 PM</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Summary Section */}
          <div className="bg-[#2A3441] rounded-lg p-6 h-fit">
            <h2 className="text-xl font-semibold text-[#FFB800] mb-4">
              Payment Summary
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between text-white">
                <span>Subtotal</span>
                <span>₹{state.total}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-white">
                <span>Service Tax</span>
                <span>₹{serviceTax}</span>
              </div>
              <div className="border-t border-gray-600 pt-4">
                <div className="flex justify-between text-[#FFB800] font-semibold">
                  <span>Total Amount</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="space-y-3 pt-4">
                <h3 className="text-white font-medium mb-2">Payment Method</h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="credits"
                      checked={selectedPayment === "credits"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-[#FFB800] focus:ring-[#FFB800]"
                    />
                    <span>Meal Credits (45 available)</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="upi"
                      checked={selectedPayment === "upi"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-[#FFB800] focus:ring-[#FFB800]"
                    />
                    <span>UPI Payment</span>
                  </label>
                  <label className="flex items-center space-x-2 text-white cursor-pointer">
                    <input
                      type="radio"
                      name="payment"
                      value="card"
                      checked={selectedPayment === "card"}
                      onChange={(e) => setSelectedPayment(e.target.value)}
                      className="text-[#FFB800] focus:ring-[#FFB800]"
                    />
                    <span>Card Payment</span>
                  </label>
                </div>
              </div>

              {/* Place Order Button */}
              <button
                onClick={handlePlaceOrder}
                className="w-full bg-[#FFB800] text-[#1E2633] py-3 rounded-lg font-semibold hover:bg-[#ffc107] mt-6"
              >
                Place Order
              </button>

              {/* Back to Cart */}
              <button
                onClick={() => navigate("/cart")}
                className="w-full bg-[#1E2633] text-white py-3 rounded-lg font-semibold hover:bg-[#2A3441]"
              >
                Back to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
