"use client";

import { useState, useEffect, useRef, ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Heart, Menu, ShoppingCart, UserRound, X } from "lucide-react";
import Image from "next/image";

type NavLink = {
  name: string;
  href: string;
};

type UserCartShopLink = {
  id: number;
  icon: ReactNode;
  name: string;
  href: string;
};

const userCartShopLinks: UserCartShopLink[] = [
  { id: 1, icon: <Heart />, href: "/favorites", name: "Favorites" },
  { id: 3, icon: <UserRound />, href: "/user", name: "User" },
];

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "All Doctors", href: "/all-doctors" },
  { name: "Dashboard", href: "/admin-dashboard" },
  { name: "About", href: "/about" },
  { name: "contact us", href: "/contact-us" },
];

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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

          <div className=" hidden lg:flex items-center gap-8">
            <div>
              {/* Desktop Nav */}
              <ul className="hidden lg:flex flex-1 justify-center gap-8">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className={`
                         relative font-medium cursor-pointer
                         transition-colors duration-300

                         ${isActive ? "text-primary" : "text-gray-600 hover:text-secondary"}

                         after:content-['']
                         after:absolute after:left-0 after:-bottom-1
                         after:h-0.5
                         after:transition-all after:duration-300 after:ease-out

                         ${
                           isActive
                             ? "after:w-full after:bg-primary"
                             : "after:w-0 after:bg-secondary hover:after:w-full"
                         }
                        `}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            <div>
              <ul className="flex items-center gap-4">
                {userCartShopLinks.map((link) => {
                  const isActive = pathname === link.href;

                  return (
                    <li key={link.id}>
                      <Link
                        href={link.href}
                        className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
                          ${
                            isActive
                              ? "bg-primary text-white"
                              : "text-gray-600 hover:bg-primary hover:text-white"
                          }`}
                      >
                        {link.icon}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Desktop Login */}
            <Link href={"sign-in"}>
              <button className=" px-4 py-2 rounded-full bg-primary/90 text-white backdrop-blur-md hover:bg-primary text-sm font-medium cursor-pointer transition ">
                Sign In
              </button>
            </Link>
          </div>

          {/* Medium Devices Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-gray-800"
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
            bg-black/10
            backdrop-blur-md
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
        <div className="p-5 ">
          <div className="space-y-3">
            {/* Medium Devices Nav Links */}
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                  block px-4 py-3 rounded-2xl text-base font-medium transition
                  ${
                    isActive
                      ? "bg-primary text-white shadow"
                      : "text-gray-800 hover:bg-primary/10"
                  }
                `}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* Medium Devices user cart and favorite nav links */}
            {userCartShopLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                   px-4 py-3 rounded-2xl text-base font-medium transition flex  items-center gap-4
                  ${
                    isActive
                      ? "bg-primary text-white shadow"
                      : "text-gray-800 hover:bg-primary/10"
                  }
                `}
                >
                  {link.icon} {link.name}
                </Link>
              );
            })}
          </div>
          <Link href={"sign-in"}>
            <button
              onClick={() => setIsOpen(false)}
              className="
              w-full mt-6 px-4 py-3 rounded-full
              bg-primary text-white font-medium
              shadow
            "
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
