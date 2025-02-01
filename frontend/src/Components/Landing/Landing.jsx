import React from "react";
import { ChevronRight, Users, UserCog } from "lucide-react";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Navigation */}
      <nav className="w-full p-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-15 h-15 rounded-lg flex items-center justify-center">
              <img
               src={import.meta.env.VITE_BASE_IMG}
                alt="Logo"
                className="w-14 h-14 rounded-lg"
              />
            </div>
            <span className="text-white text-xl font-bold">MessMaster</span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 mb-6">
            Welcome to MessMaster
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto">
            Streamlined mess management system for efficient dining operations
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Student Card */}
          <a 
            href="/user-signin"
            className="group relative overflow-hidden rounded-2xl p-8 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full -mr-16 -mt-16" />
            <div className="relative">
              <Users className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Student Portal</h2>
              <p className="text-gray-300 mb-6">
                Access your meal plans, view menu, and manage your mess account
              </p>
              <div className="flex items-center text-yellow-500 group-hover:text-yellow-400">
                <span className="font-semibold">Sign In</span>
                <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>

          {/* Manager Card */}
          <a 
            href="/manager-signin"
            className="group relative overflow-hidden rounded-2xl p-8 bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/10 rounded-full -mr-16 -mt-16" />
            <div className="relative">
              <UserCog className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold text-white mb-4">Manager Portal</h2>
              <p className="text-gray-300 mb-6">
                Manage operations, track attendance, and oversee mess activities
              </p>
              <div className="flex items-center text-yellow-500 group-hover:text-yellow-400">
                <span className="font-semibold">Sign In</span>
                <ChevronRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </a>
        </div>

        {/* Features Section */}
        <div className="mt-24 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Why Choose MessMaster?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <img
                  src={import.meta.env.VITE_BASE_IMG}
                  alt="Easy Management"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Easy Management</h3>
              <p className="text-gray-400">Streamlined process for both students and managers</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <img
                  src={import.meta.env.VITE_BASE_IMG}
                  alt="Real-time Updates"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Real-time Updates</h3>
              <p className="text-gray-400">Instant notifications and live attendance tracking</p>
            </div>
            <div className="p-6 rounded-xl bg-white/5 backdrop-blur-sm">
              <div className="w-12 h-12 bg-yellow-500/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <img
                  src={import.meta.env.VITE_BASE_IMG}
                  alt="Analytics"
                  className="w-8 h-8"
                />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Smart Analytics</h3>
              <p className="text-gray-400">Detailed insights and reporting capabilities</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;