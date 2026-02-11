

import Footer from "@/components/shared/footer/Footer";
import NavBar from "@/components/shared/navbar/NavBar";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <header>
       <NavBar/>
    </header>
      <main className="min-h-[calc(100vh-484px)] pt-16">{children}</main>
      <Footer/>
    </>
  );
};

export default MainLayout;
