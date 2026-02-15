import SideBar from "@/components/shared/sidebar/Sidebar";
import React from "react";

const DashboardLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      {/* Sidebar is 64 wide (w-64) */}
      <SideBar />

      {/* Main Content needs a margin-left to make room for the sidebar */}
      <main className="flex-1 md:ml-64 p-6 min-h-screen">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
