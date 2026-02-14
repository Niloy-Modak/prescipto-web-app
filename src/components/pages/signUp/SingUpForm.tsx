"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { signIn } from "next-auth/react";

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    agreed: false,
  });

  const validatePassword = (pass: string) => {
    // 1 Uppercase, 1 Lowercase, 1 Number, 1 Special Char, Min 8 chars
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;
    return regex.test(pass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check name
    if (!formData.name.trim()) {
      setError("Please provide your name.");
      return;
    }

    // Check if agreed
    if (!formData.agreed) {
      setError("You must agree to the terms and policy.");
      return;
    }

    // Check email lowercase
    if (formData.email !== formData.email.toLowerCase()) {
      setError("Email must be all lowercase letters.");
      return;
    }

    // Check password complexity
    if (!validatePassword(formData.password)) {
      setError(
        "Password must include: uppercase, lowercase, number, and special character (@$!%*?&#).",
      );
      return;
    }

    try {
      setLoading(true);

      // Call signup API
      const res = await fetch("/api/auth/sign-up", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon: "error",
          title: "Signup Failed",
          text: data.message || "Something went wrong",
          timer: 1500,
          showConfirmButton: false,
        });
        return;
      }

      // Success popup
      await Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully.",
        timer: 1500,
        showConfirmButton: false,
      });

      // Auto login
      await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        callbackUrl: "/",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-2xl md:text-3xl font-medium pb-6 text-gray-700">
          Sign Up Now!
        </h1>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100/50 border border-red-200 rounded-xl animate-pulse mb-3">
            {error}
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:ring-2 focus:ring-primary/20 outline-none"
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Email address
          </label>
          <input
            required
            type="email"
            placeholder="Enter your email"
            className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:ring-2 focus:ring-primary/20 outline-none"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label className="block text-sm font-semibold text-gray-800 ml-1">
            Password
          </label>
          <div className="relative">
            <input
              required
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 pr-14 focus:ring-2 focus:ring-primary/20 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center space-x-3 ml-1">
          <input
            type="checkbox"
            className="w-4 h-4"
            onChange={(e) =>
              setFormData({ ...formData, agreed: e.target.checked })
            }
          />
          <span className="text-sm text-gray-700">
            I agree to the terms & policy
          </span>
        </div>

        {/* Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-[#005e63] text-white font-bold rounded-2xl shadow-lg disabled:opacity-60"
        >
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default SignUpForm;
