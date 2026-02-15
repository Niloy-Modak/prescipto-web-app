"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  ClipboardList,
  Home,
  Menu,
  X,
  CopyPlus,
} from "lucide-react";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Admin Dashboard",
    path: "/admin-dashboard",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Add Doctor info",
    path: "/add-doctor",
    icon: <CopyPlus size={20} />,
  },
  {
    name: "My Added Doctors info",
    path: "/my-added-doctors",
    icon: <ClipboardList size={20} />,
  },
  {
    name: "Home Page",
    path: "/",
    icon: <Home size={20} />,
  },
];

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300
    ${isOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:fixed md:h-screen overflow-y-auto`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 h-[72px] border-b border-gray-200">
          <h2 className="text-xl font-bold text-primary">CMS Dashboard</h2>
          <button className="md:hidden" onClick={() => setIsOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className={`flex items-center gap-3 p-2 rounded-md transition-colors
                ${pathname === link.path ? "bg-primary hover:bg-primary-hover text-white font-semibold" : "text-gray-700 hover:bg-secondary hover:text-white"}`}
              onClick={() => setIsOpen(false)}
            >
              <span>{link.icon}</span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Mobile toggle button */}
      {!isOpen && (
        <button
          className="fixed top-4 left-4 z-40 p-2 bg-white rounded-md shadow md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>
      )}
    </>
  );
};

export default Sidebar;
