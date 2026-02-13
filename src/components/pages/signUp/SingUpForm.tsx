"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const SingUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  const [error, setError] = useState<string | null>(null);

  const validatePassword = (pass: string) => {
    // Regex: 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char, Min 8 chars
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Check if agreed
    if (!formData.agreed) {
      setError("You must agree to the terms and policy.");
      return;
    }

    // 2. Check password complexity
    if (!validatePassword(formData.password)) {
      setError(
        "Password must include: Uppercase, lowercase, number, and special character (@#$).",
      );
      return;
    }

    // If all pass
    console.log("Form Submitted Successfully:", formData);
    alert("Account Created!");
  };
  return (
    <div className="">
      <div>
        <h1 className="text-2xl md:text-3xl font-medium pb-6 text-gray-700">
          Sign Up Now !
        </h1>
        <p></p>
      </div>
      {/* Error Message Display */}
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-100/50 border border-red-200 rounded-xl animate-pulse mb-3">
          {error}
        </div>
      )}
      {/* Liquid Glass Container */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500  md:placeholder:text-gray-400"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Email address
          </label>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500  md:placeholder:text-gray-400"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Password
          </label>
          <div className="relative group">
            <input
              required
              type={showPassword ? "current-password" : "password"}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500  md:placeholder:text-gray-400 pr-14"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Eye Icon Button */}
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

          {/* <p className="text-[11px] text-gray-500 ml-2">
            Must include 1 uppercase, 1 lowercase, 1 number & 1 symbol.
          </p> */}
        </div>

        {/* Terms Checkbox */}
        <div className="flex items-center space-x-3 ml-1">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
            onChange={(e) =>
              setFormData({ ...formData, agreed: e.target.checked })
            }
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="underline cursor-pointer font-medium">
              terms & policy
            </span>
          </label>
        </div>

        {/* Signup Button */}
        <button
          type="submit"
          className="w-full py-3 bg-primary hover:bg-[#005e63] text-white font-bold rounded-2xl shadow-lg shadow-green-900/20 transform transition-all active:scale-[0.98] cursor-pointer"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SingUpForm;
