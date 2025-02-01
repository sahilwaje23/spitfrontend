import React, { useEffect, useState, useRef } from "react";
import {
  Search,
  Utensils,
  User,
  ShoppingCart,
  Plus,
  Minus,
  Star,
  X,
  Clock,
  ChevronRight,
} from "lucide-react";
import { useCart } from "../../context/CartContext";
import { Link } from "react-router-dom";



const Header = ({ credits, onCartClick }) => {
  const { state } = useCart();

  return (
    <header className="bg-[#2A3441] sticky top-0 z-50 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center">
              <img
                src={import.meta.env.VITE_BASE_IMG}
                alt="Hostel Mess"
                className="h-8 w-8 mr-2 rounded-full object-cover"
              />
              <h1 className="text-2xl font-bold text-[#FFB800]">
                Mess Master
              </h1>
            </div>
            <Navigation />
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search meals..."
                className="bg-[#1E2633] text-white rounded-full px-4 py-2 pl-10 w-48 focus:w-64 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FFB800]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>
            <CreditsDisplay credits={credits} />
            <CartButton itemCount={state.items.length} onClick={onCartClick} />
            <StudentPortalButton />
          </div>
        </div>
      </div>
    </header>
  );
};

const Navigation = () => (
  <nav className="hidden md:flex space-x-6">
    {["Home", "Today's Menu", "Meal Plan", "Mess Halls", "Feedback"].map(
      (item, index) => (
        <a
          key={item}
          href="#"
          className={`${
            index === 0 ? "text-[#FFB800]" : "text-white hover:text-[#FFB800]"
          } transition-colors duration-200`}
        >
          {item}
        </a>
      )
    )}
  </nav>
);

const CreditsDisplay = ({ credits }) => (
  <div className="flex items-center space-x-2 bg-[#1E2633] text-white rounded-full px-4 py-2 border border-gray-700">
    <span>Meal Credits: {credits}</span>
    <Utensils className="w-5 h-5 text-[#FFB800]" />
  </div>
);

const CartButton = ({ itemCount, onClick }) => (
  <button
    onClick={onClick}
    className="relative bg-[#1E2633] text-white p-2 rounded-full hover:bg-[#363f4d] transition-colors duration-200 border border-gray-700"
  >
    <ShoppingCart className="w-6 h-6" />
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-[#FFB800] text-[#1E2633] rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
        {itemCount}
      </span>
    )}
  </button>
);

const StudentPortalButton = () => (
  <Link to={"/user-profile"} className="bg-[#FFB800] text-[#1E2633] px-6 py-2 rounded-full flex items-center space-x-2 font-semibold hover:bg-[#ffc107] transition-colors duration-200">
    <User className="w-5 h-5" />
    <span>Student Profile</span>
  </Link>
);

const SpecialMealCard = ({ meal, onAddToCart }) => (
  <div className="relative rounded-xl overflow-hidden bg-[#2A3441] shadow-xl transform hover:scale-105 transition-all duration-200 group border border-gray-700">
    <img
      src="https://th.bing.com/th/id/OIP.YpBQ3jIffNpseSrxu6UN2AHaGP?rs=1&pid=ImgDetMain"
      alt={meal.name}
      className="w-full h-48 object-cover group-hover:brightness-110 transition-all duration-200"
    />
    <div className="absolute top-4 right-4 bg-[#FFB800] text-[#1E2633] px-3 py-1 rounded-full text-sm font-semibold shadow-lg">
      {meal.highlight}
    </div>
    <div className="p-6">
      <h4 className="font-semibold text-white text-lg mb-2">{meal.name}</h4>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center bg-white/10 rounded-full px-3 py-1">
          <Star className="w-4 h-4 text-[#FFB800] fill-current" />
          <span className="text-white ml-1">{meal.rating}</span>
        </div>
        <div className="flex items-center text-gray-400 text-sm">
          <Clock className="w-4 h-4 mr-1" />
          {meal.timing}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-[#FFB800] font-bold text-lg">
          {meal.price} credits
        </span>
        <button
          onClick={() => onAddToCart(meal)}
          className="bg-[#FFB800] text-[#1E2633] px-4 py-2 rounded-full hover:bg-[#ffc107] transition-colors duration-200 flex items-center space-x-2"
        >
          <span>Add to Cart</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);

const CartItem = ({ item, onUpdateQuantity, onRemoveItem }) => {
  const handleQuantityChange = (newQuantity) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
      <div className="flex-1">
        <h4 className="font-medium mb-1">{item.name}</h4>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">{item.price} credits per item</p>
          <p className="text-sm font-medium text-gray-700">
            Total: {(item.price * item.quantity).toFixed(1)} credits
          </p>
        </div>
      </div>
      <div className="flex items-center space-x-3 ml-4">
        <div className="flex items-center space-x-2 bg-white rounded-full border px-2">
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <button
          className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-full transition-colors duration-200"
          onClick={() => onRemoveItem(item.id)}
          aria-label="Remove item"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

const CartPanel = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  total,
  onClose,
  isOpen,
}) => {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const panelRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && !isCheckingOut) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isCheckingOut]);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget && !isCheckingOut) {
      onClose();
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) return;
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      alert("Order placed successfully! Using " + total + " credits");
      onClose();
    }, 2000);
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setPromoApplied(true);
      setPromoCode("");
    }
  };

  const calculateDeliveryTime = () => {
    const now = new Date();
    const deliveryTime = new Date(now.getTime() + 30 * 60000);
    return deliveryTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`fixed inset-0 bg-black/50 transition-opacity duration-300 z-50 backdrop-blur-sm ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleBackdropClick}
    >
      <div
        ref={panelRef}
        className={`fixed right-0 top-0 h-full w-96 bg-[#1E2633] shadow-xl transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">Your Cart</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white p-2 hover:bg-gray-700/50 rounded-full transition-colors duration-200"
                aria-label="Close cart"
                disabled={isCheckingOut}
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-48 text-gray-400">
                <ShoppingCart className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-sm text-gray-500 text-center">
                  Add some delicious meals to get started!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="flex justify-between mb-2">
                      <h4 className="font-medium text-white">{item.name}</h4>
                      <p className="text-[#FFB800]">{item.price} credits</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-gray-400">
                        Total: {(item.price * item.quantity).toFixed(1)} credits
                      </p>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center space-x-2 bg-gray-700 rounded-full px-2">
                          <button
                            className="p-1 text-gray-300 hover:text-white disabled:opacity-50"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity - 1)
                            }
                            disabled={item.quantity <= 1 || isCheckingOut}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center text-white">
                            {item.quantity}
                          </span>
                          <button
                            className="p-1 text-gray-300 hover:text-white"
                            onClick={() =>
                              onUpdateQuantity(item.id, item.quantity + 1)
                            }
                            disabled={isCheckingOut}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <button
                          className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-full transition-colors duration-200"
                          onClick={() => onRemoveItem(item.id)}
                          disabled={isCheckingOut}
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-[#2A3441] rounded-lg border border-gray-700">
                  <div className="flex items-center text-sm text-gray-300">
                    <Clock className="w-4 h-4 mr-2 text-[#FFB800]" />
                    Estimated delivery by {calculateDeliveryTime()}
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Enter promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FFB800] placeholder-gray-500"
                      disabled={promoApplied || isCheckingOut}
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50"
                      disabled={!promoCode || promoApplied || isCheckingOut}
                    >
                      Apply
                    </button>
                  </div>
                  {promoApplied && (
                    <p className="text-sm text-green-400 mt-2 flex items-center">
                      <Check className="w-4 h-4 mr-1" /> Promo code applied
                      successfully!
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-700 bg-[#2A3441]">
            <div className="space-y-4">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Subtotal:</span>
                <span>{total} credits</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm text-green-400">
                  <span>Promo Discount:</span>
                  <span>-1 credit</span>
                </div>
              )}
              <div className="flex justify-between text-lg font-medium text-white">
                <span>Total Credits:</span>
                <span>{promoApplied ? total - 1 : total}</span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-[#FFB800] text-[#1E2633] py-3 rounded-full hover:bg-[#ffc107] transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={items.length === 0 || isCheckingOut}
              >
                {isCheckingOut ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-5 h-5 border-2 border-[#1E2633] border-t-transparent rounded-full animate-spin" />
                    <span>Processing...</span>
                  </div>
                ) : (
                  <>
                    <span>Checkout</span>
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
              {items.length > 0 && !isCheckingOut && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  By checking out, you agree to our terms of service
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const AllMenus = () => {
  const { state, dispatch } = useCart();
  const [isCartOpen, setIsCartOpen] = React.useState(false);

  const addToCart = (meal) => {
    dispatch({ type: "ADD_ITEM", payload: meal });
    setIsCartOpen(true);
  };

  const removeFromCart = (mealId) => {
    dispatch({ type: "REMOVE_ITEM", payload: mealId });
  };

  const updateQuantity = (mealId, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id: mealId, quantity },
    });
  };

  const maxCredits = 45;
  const remainingCredits = maxCredits - state.total;

  const specialMeals = [
    {
      id: 0,
      name: "Sunday Special Thali",
      highlight: "Premium",
      rating: 4.8,
      timing: "12:30-2:30 PM",
      price: 5,
    },
    {
      id: 1,
      name: "Sunday Special Thali",
      highlight: "Premium",
      rating: 4.8,
      timing: "12:30-2:30 PM",
      price: 5,
    },
    {
      id: 101,
      name: "Sunday Special Thali",
      highlight: "Premium",
      rating: 4.8,
      timing: "12:30-2:30 PM",
      price: 5,
    },
    {
      id: 111,
      name: "Sunday Special Thali",
      highlight: "Premium",
      rating: 4.8,
      timing: "12:30-2:30 PM",
      price: 5,
    },
    {
      id: 2,
      name: "Festival Special Menu",
      highlight: "Cultural",
      rating: 4.7,
      timing: "All Day",
      price: 6,
    },
    {
      id: 3,
      name: "Health Food Corner",
      highlight: "Fitness",
      rating: 4.5,
      timing: "7:00-9:00 PM",
      price: 4,
    },
  ];

  return (
    <div className="min-h-screen bg-[#1E2633]">
      <Header
        credits={remainingCredits}
        onCartClick={() => setIsCartOpen(true)}
      />

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section>
          <h3 className="text-2xl font-bold mb-8 text-[#FFB800] flex items-center">
            Special Meals <span className="ml-2">🎉</span>
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {specialMeals.map((meal) => (
              <SpecialMealCard
                key={meal.id}
                meal={meal}
                onAddToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </main>

      <CartPanel
        items={state.items}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        total={state.total}
        onClose={() => setIsCartOpen(false)}
        isOpen={isCartOpen}
      />
    </div>
  );
};

export default AllMenus;
