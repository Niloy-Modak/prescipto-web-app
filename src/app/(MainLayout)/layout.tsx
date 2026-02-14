import Footer from "@/components/shared/footer/Footer";
import NavBar from "@/components/shared/navbar/NavBar";
import NextAuthProvider from "@/provider/NextAuthProvider";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
      <NextAuthProvider>
        <header>
          <NavBar />
        </header>
        <main className="min-h-[calc(100vh-420px)] pt-16">{children}</main>
        <Footer />
      </NextAuthProvider>
    </>
  );
};

export default MainLayout;
