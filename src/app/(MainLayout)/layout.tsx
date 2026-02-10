

import NavBar from "@/components/shared/navbar/NavBar";
import React from "react";

const MainLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <>
    <header>
       <NavBar/>
    </header>
      <main>{children}</main>
    </>
  );
};

export default MainLayout;
