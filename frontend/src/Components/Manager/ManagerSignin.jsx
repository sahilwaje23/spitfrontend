import React, { useRef } from "react";
import { Mail, Key } from "lucide-react";

const ManagerSignin = () => {
  const emailRef = useRef();
  const passwordRef = useRef();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 w-full max-w-md shadow-xl">
        {/* Logo and Header */}
        <div className="flex flex-col items-center mb-8">
        <div className="w-[75px] h-[75px] bg- yellow-500 rounded-full flex items-center justify-center mb-4">
            <img
              src="https://img.freepik.com/premium-vector/home-food-logo-with-fork-spoon_636083-113.jpg"
              alt="Mess Management Logo"
              className="w-[70px] h-[70px] rounded-full"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Manager</h1>
          <p className="text-gray-300 text-center">Sign in to your management portal</p>
        </div>

        {/* Form */}
        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="email"
              ref={emailRef}
              className="w-full bg-white/5 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder:text-gray-400"
              placeholder="Enter Email"
            />
          </div>

          <div className="relative">
            <Key className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
            <input
              type="password"
              ref={passwordRef}
              className="w-full bg-white/5 border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all placeholder:text-gray-400"
              placeholder="Enter Password"
            />
          </div>

          <button className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] mt-6">
            Sign In
          </button>

          <div className="text-center mt-6">
            <a href="#" className="text-yellow-500 hover:text-yellow-400 font-medium">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManagerSignin;