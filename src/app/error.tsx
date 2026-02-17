"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  Stethoscope,
  RefreshCcw,
  Home,
  Search,
  AlertCircle,
} from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Optional: Log the error to an error reporting service
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        {/* Animated Icon Header */}
        <div className="relative inline-block mb-8">
          {/* Primary Glow Effect */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>

          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
            <Stethoscope size={64} className="text-primary" strokeWidth={1.5} />
            {/* Error Badge */}
            <div className="absolute -top-2 -right-2 bg-red-500 rounded-full p-2 border-4 border-slate-50">
              <AlertCircle size={20} className="text-white" />
            </div>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          System Check Required
        </h1>
        <p className="text-lg text-slate-600 mb-8 leading-relaxed">
          We encountered an unexpected pulse in our system. Don't worry, your
          medical records and appointments are safe.
        </p>

        {/* Error Detail (Subtle) */}
        <div className="bg-slate-200/50 rounded-lg p-3 mb-10 inline-flex items-center gap-2">
          <code className="text-xs text-slate-500 font-mono">
            ID: {error.digest || "INTERNAL_STETHOSCOPE_FAILURE"}
          </code>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-primary/20 active:scale-95"
          >
            <RefreshCcw size={18} />
            Try Again
          </button>

          <Link
            href="/"
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 active:scale-95"
          >
            <Home size={18} />
            Back to Dashboard
          </Link>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm mb-4 italic">Quick Links</p>
          <div className="flex justify-center gap-6">
            <Link
              href="/find-doctors"
              className="flex items-center gap-1 text-primary font-medium hover:underline decoration-2 underline-offset-4"
            >
              <Search size={16} />
              Find Doctors
            </Link>
            <Link
              href="/support"
              className="text-slate-600 font-medium hover:text-primary transition-colors"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
