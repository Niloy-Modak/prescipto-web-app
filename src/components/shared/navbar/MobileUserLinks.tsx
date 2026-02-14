"use client";

import React, { Dispatch, SetStateAction } from "react";
import { Clipboard, UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Swal from "sweetalert2";
import Image from "next/image";

type MobileUserLinksProps = { setIsOpen: Dispatch<SetStateAction<boolean>> };

const MobileUserLinks = ({ setIsOpen }: MobileUserLinksProps) => {
  const { data: session } = useSession();
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "All Doctors", href: "/all-doctors" },
    { name: "About us", href: "/about-us" },
    { name: "Contact us", href: "/contact-us" },
  ];

  if (session?.user?.role === "admin")
    navLinks.splice(2, 0, { name: "Dashboard", href: "/admin-dashboard" });

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
    <div className="p-5 space-y-3">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onClick={() => setIsOpen(false)}
          className={`block px-4 py-3 rounded-2xl text-base font-medium transition
            ${pathname === link.href ? "bg-primary text-white shadow" : "text-gray-800 hover:bg-primary/10"}`}
        >
          {link.name}
        </Link>
      ))}

      {session && (
        <>
          <Link
            href="/appointments"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-2xl text-base font-medium transition flex items-center gap-3
              ${pathname === "/appointments" ? "bg-primary text-white shadow" : "text-gray-800 hover:bg-primary/10"}`}
          >
            <Clipboard /> Appointments
          </Link>

          <Link
            href="/user"
            onClick={() => setIsOpen(false)}
            className={`px-4 py-3 rounded-2xl text-base font-medium transition flex items-center gap-3
              ${pathname === "/user" ? "bg-primary text-white shadow" : "text-gray-800 hover:bg-primary/10"}`}
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
            <span>{session.user.name}</span>
          </Link>

          <button
            onClick={handleSignOut}
            className="w-full mt-6 px-4 py-3 rounded-full bg-primary text-white font-medium shadow"
          >
            Sign Out
          </button>
        </>
      )}

      {!session && (
        <Link href="/sign-in">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full cursor-pointer px-4 py-3 rounded-full bg-primary text-white font-medium shadow"
          >
            Sign In
          </button>
        </Link>
      )}
    </div>
  );
};

export default MobileUserLinks;
