import React from "react";
import { Navbar } from "@/components/navigation/navigationSidebar";
const Mainlayout = async ({ children }) => {
  return (
    <div className="h-full">
      <div className=" md: flex h-full w-[72px] z-30 flex-col fixed inset-y-0">
        <Navbar />
      </div>
        <main className="md:pl-[72px] h-full">{children}</main>
    </div>
  );
};

export default Mainlayout;
