"use client";

import { useState, useEffect, useRef } from "react";
import { Menu,  X } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NavbarUserLink from "./NavbarUserLinks";
import MobileUserLinks from "./MobileUserLinks";

const NavBar = () => {
  const { data: session } = useSession();
  console.log(session);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className="
        fixed top-0 z-50 w-full
        backdrop-blur-2xl
        bg-white/60
        border-b border-white/20
        shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.05)]
      "
    >
      {/* subtle Apple shine */}
      <div className="absolute inset-x-0 top-0 h-px bg-white/40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Image src="/logo/logo.png" alt="logo" width={36} height={36} />
            <span className="text-xl font-semibold tracking-tight text-primary">
              Perscripto
            </span>
          </div>

          <div className=" ">
            {/* All Nav Links For Desktop */}
            <NavbarUserLink />
          </div>

          {/* Medium Devices Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800 cursor-pointer"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Medium Devices Background (LEFT SIDE FIX) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="
            fixed inset-0 top-16
            backdrop-blur-2xl
           bg-white/60
            border-b border-white/20
            z-40
          "
        />
      )}

      {/* Medium Devices Menu */}
      <div
        ref={menuRef}
        className={`lg:hidden fixed top-16 right-0 w-72
          h-[calc(100vh-4rem)]
          backdrop-blur-2xl
          bg-white/85
          border-l border-white/20
          shadow-[0_20px_60px_rgba(0,0,0,0.25)]
          transition-transform duration-300 ease-out
          ${isOpen ? "translate-x-0" : "translate-x-full"}
          z-50
        `}
      >
        {/* All Mobile Links */}
        <MobileUserLinks setIsOpen={setIsOpen} />
      </div>
    </nav>
  );
};

export default NavBar;
