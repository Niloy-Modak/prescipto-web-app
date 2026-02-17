"use client"
import React from "react";
import Link from "next/link";
import { Home, Search, ArrowLeft, MapPinOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-xl w-full text-center">
        {/* Animated Icon Header */}
        <div className="relative inline-block mb-8">
          {/* Using primary/20 for a soft glow effect based on your brand color */}
          <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl opacity-70 animate-pulse"></div>
          <div className="relative bg-white p-6 rounded-3xl shadow-xl border border-slate-100">
            <MapPinOff size={64} className="text-primary" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="space-y-4 mb-10">
          <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
            Room 404: Not Found
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-md mx-auto">
            It looks like you've wandered into an empty clinic room. The doctor,
            specialty, or page you are looking for isn't here.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            href="/search"
            className="flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-200 shadow-lg shadow-primary/30 active:scale-95"
          >
            <Search size={18} />
            Find a Doctor
          </Link>

          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold py-4 px-6 rounded-2xl transition-all duration-200 active:scale-95"
          >
            <ArrowLeft size={18} />
            Go Back
          </button>
        </div>

        {/* Secondary Navigation */}
        <div className="mt-12 pt-8 border-t border-slate-200">
          <p className="text-slate-500 text-sm mb-4 italic">
            Or return to the lobby
          </p>
          <div className="flex justify-center">
            <Link
              href="/"
              className="flex items-center gap-2 px-4 py-2 text-slate-600 font-medium hover:text-primary transition-colors rounded-full hover:bg-primary/10"
            >
              <Home size={18} />
              Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
