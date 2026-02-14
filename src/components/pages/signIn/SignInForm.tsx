"use client";

import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const SignInForm = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validate fields
    if (!formData.email || !formData.password) {
      setError("Please enter both email and password.");
      return;
    }

    // 2. Validate lowercase email
    if (formData.email !== formData.email.toLowerCase()) {
      setError("Email must be all lowercase letters.");
      return;
    }

    setLoading(true);
    try {
      // 3. Sign in with credentials (no redirect)
      const res = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (res?.error) {
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: res.error,
        });
      } else {
        await Swal.fire({
          icon: "success",
          title: "Logged In!",
          text: "Welcome back!",
          timer: 1200,
          showConfirmButton: false,
        });

        // 4. Redirect to home page
        router.push("/");
      }
    } catch (err) {
      console.error(err);
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
        <h1 className="text-2xl font-medium pb-6 text-gray-700">
          Sign In to Your Account!
        </h1>

        {/* Error Message */}
        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-100/50 border border-red-200 rounded-xl animate-pulse mb-3">
            {error}
          </div>
        )}
      </div>

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
            className="w-full px-5 py-3 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500"
            value={formData.email}
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
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full px-5 py-3 pr-14 rounded-2xl bg-white/40 border border-white/60 focus:bg-white/80 focus:ring-2 focus:ring-primary/20 outline-none transition-all duration-300 placeholder:text-gray-500"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />

            {/* Eye toggle */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-xl hover:bg-black/5 transition-colors text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary hover:bg-[#005e63] text-white font-bold rounded-2xl shadow-lg shadow-green-900/20 transition-all active:scale-[0.98] disabled:opacity-60 cursor-pointer"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
