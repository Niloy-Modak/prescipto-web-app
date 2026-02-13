"use client"
import React from 'react';
import { usePathname } from "next/navigation";
import Link from "next/link";

const AuthSection1 = () => {
    const pathname = usePathname();

  const isSignIn = pathname === "/sign-in";
  const isSignUp = pathname === "/sign-up";

    return (
        <div className=" md:text-lg text-gray-100 font-medium pb-4 md:pb-0 md:pt-3">
              {isSignIn && (
                <span>
                  Don’t have an account?{" "}
                  <Link
                    href="/sign-up"
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </span>
              )}

              {isSignUp && (
                <span>
                  All ready have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary hover:underline"
                  >
                    Sign in
                  </Link>
                </span>
              )}
            </div>
    );
};

export default AuthSection1;