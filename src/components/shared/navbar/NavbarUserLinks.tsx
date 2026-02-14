"use client";

import React from "react";
import { Clipboard, UserRound } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

const NavbarUserLink = () => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Doctors", href: "/all-doctors" },
    { name: "About us", href: "/about-us" },
    { name: "Contact us", href: "/contact-us" },
  ];

  if (session?.user?.role === "admin") {
    navLinks.splice(2, 0, { name: "Dashboard", href: "/admin-dashboard" });
  }

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be signed out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, sign out",
      cancelButtonText: "No, stay",
    });
    if (result.isConfirmed) signOut();
  };

  return (
    <div className="hidden lg:flex justify-center items-center">
      <ul className="hidden lg:flex flex-1 justify-center gap-8">
        {navLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className={`relative font-medium cursor-pointer transition-colors duration-300
                ${pathname === link.href ? "text-primary" : "text-gray-600 hover:text-secondary"}
                after:content-[''] after:absolute after:left-0 after:-bottom-1 after:h-0.5
                after:transition-all after:duration-300 after:ease-out
                ${pathname === link.href ? "after:w-full after:bg-primary" : "after:w-0 after:bg-secondary hover:after:w-full"}
              `}
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>

      {session ? (
        <div className="flex items-center gap-4 pl-4">
          <Link
            href="/appointments"
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
              ${pathname === "/appointments" ? "bg-primary text-white" : "text-gray-600 hover:bg-secondary hover:text-white"}`}
          >
            <Clipboard />
          </Link>

          <Link
            href="/user"
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-all duration-200
              ${pathname === "/user" ? "bg-primary text-white" : "text-gray-600 hover:bg-secondary hover:text-white"}`}
          >
            {session.user.profileImage ? (
              <Image
                src={session.user.profileImage}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full object-cover"
              />
            ) : (
              <UserRound />
            )}
          </Link>

          <button
            onClick={handleSignOut}
            className="px-4 py-2 rounded-full bg-primary/90 text-white backdrop-blur-md hover:bg-primary text-sm font-medium cursor-pointer transition"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <div className="ml-4">
          <Link href="/sign-in">
            <button className="px-4 py-2 rounded-full bg-primary/90 text-white backdrop-blur-md hover:bg-primary text-sm font-medium cursor-pointer transition">
              Sign In
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default NavbarUserLink;
