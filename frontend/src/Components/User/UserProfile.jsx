import React from "react";
import { Calendar, Clock, Package, User, Mail } from "lucide-react";


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

const UserProfile = () => {
  const userDetails = {
    name: "John Doe",
    email: "john@example.com",
    joinedDate: "2024-01-15",
    totalOrders: 45,
    totalSpent: 857.5,
  };

  const orderHistory = [
    { id: 1, date: "2024-01-28", items: ["Burger", "Fries"], total: 15.99, status: "Completed" },
    { id: 2, date: "2024-01-25", items: ["Pizza", "Coke"], total: 18.5, status: "Completed" },
    { id: 3, date: "2024-01-20", items: ["Sandwich", "Coffee"], total: 12.75, status: "Completed" },
  ];

  const orderHeatmapData = [
    { hour: "8-9", frequency: 5 },
    { hour: "9-10", frequency: 8 },
    { hour: "12-13", frequency: 15 },
    { hour: "13-14", frequency: 12 },
    { hour: "15-16", frequency: 6 },
    { hour: "18-19", frequency: 10 },
  ];

  const getHeatmapColor = (frequency) => {
    const maxFrequency = Math.max(...orderHeatmapData.map((d) => d.frequency));
    const intensity = (frequency / maxFrequency) * 255;
    return `rgb(${Math.floor(intensity)}, ${Math.floor(intensity)}, 0)`;
  };

  return (
    <>
    <div className="min-h-screen bg-black text-yellow-400 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Profile</h1>
          <p className="text-yellow-200">Manage your orders and preferences</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[{ icon: User, value: userDetails.name, label: userDetails.email },
            { icon: Package, value: userDetails.totalOrders, label: "Total Orders" },
            { icon: Mail, value: `$${userDetails.totalSpent}`, label: "Total Spent" }].map((stat, index) => (
              <div key={index} className="bg-gray-900 border-2 border-yellow-400 p-6 flex items-center space-x-4 rounded-lg">
              <stat.icon className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-lg font-bold">{stat.value}</p>
                <p className="text-yellow-200 text-sm">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-4">
              <Package className="w-6 h-6" /> Recent Orders
            </h2>
            <div className="space-y-4">
              {orderHistory.map((order) => (
                <div key={order.id} className="bg-gray-800 p-4 rounded-lg border border-yellow-400/30">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-yellow-400">Order #{order.id}</p>
                      <p className="text-sm text-yellow-200 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                    <span className="px-2 py-1 text-sm bg-yellow-400 text-black rounded font-medium">
                      {order.status}
                    </span>
                  </div>
                  <p className="text-sm text-yellow-200">Items: {order.items.join(", ")}</p>
                  <p className="font-medium mt-1 text-yellow-400">Total: ${order.total}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 border-2 border-yellow-400 rounded-lg p-6">
            <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
              <Calendar className="w-6 h-6" /> Peak Order Times
            </h2>
            <p className="text-yellow-200 mb-4">Your usual ordering schedule</p>
            <div className="grid grid-cols-6 gap-3">
              {orderHeatmapData.map((data) => (
                <div key={data.hour} className="text-center">
                  <div
                    className="h-24 rounded border border-yellow-400/30"
                    style={{ backgroundColor: getHeatmapColor(data.frequency), transition: "background-color 0.3s" }}
                    ></div>
                  <p className="text-sm mt-2 text-yellow-400">{data.hour}</p>
                  <p className="text-xs text-yellow-200">{data.frequency} orders</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
              </>
  );
};

export default UserProfile;