import AuthSection1 from "@/components/shared/authentication/AuthSection1";
import Image from "next/image";

import React from "react";


const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  
  return (
    <section className="min-h-screen bg-primary flex items-center justify-center p-4 ">
      {/* Main container */}
      <div
        className="
                  relative w-full max-w-6xl 
                  rounded-3xl
                  bg-white/40 backdrop-blur-2xl
                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                  border border-white/30
                  flex overflow-hidden  
                "
      >
        {/* Left: Doctor image */}
        <div className="relative hidden md:flex md:w-1/2 items-center justify-center ">
          <Image
            src="/auth_banner.png"
            alt="Doctor illustration"
            fill
            className="object-contain p-10"
            priority
          />

          {/* subtle glow */}
          <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent " />
        </div>

        {/* Right: Glass card */}
        <div className="w-full md:w-1/2 ">
          <section className="md:my-12 w-full flex flex-col items-center justify-center">
            <div
              className="
                      w-full max-w-sm
                      rounded-2xl
                      md:bg-white/40 md:backdrop-blur-2xl
                      md:shadow-[0_1px_3px_rgba(0,0,0,0.05),0_10px_15px_-5px_rgba(0,0,0,0.05)]
                      md:border md:border-white/40
                      p-8 
                    "
            >
              {children}
            </div>

          {/* SignIn or Sign Up link option based on path */}
            <AuthSection1/>
          </section>
        </div>
      </div>
    </section>
  );
};

export default AuthLayout;
