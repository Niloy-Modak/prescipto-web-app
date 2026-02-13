"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    // Submit logic
    console.log("Login Data:", formData);
    alert("Logged in successfully!");
  };

  return (
    <div>
      <div>
      <h1 className="text-2xl  font-medium pb-6 text-gray-700">
          Sign In Your Account !
        </h1>
        <p></p>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100/50 border border-red-200 rounded-xl mb-4">
          {error}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500  md:placeholder:text-gray-400"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1 ">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "current-password" : "password"}
              placeholder="Enter your password"
              className="w-full px-5 py-3 pr-14 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500  md:placeholder:text-gray-400"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Eye Toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-black/5 transition-colors text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff size={20} strokeWidth={2} />
              ) : (
                <Eye size={20} strokeWidth={2} />
              )}
            </button>
          </div>
        </div>

        {/* Login Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-[#005e63] text-white font-bold rounded-2xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
