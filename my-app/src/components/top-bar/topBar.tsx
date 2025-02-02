"use client"

import { TbBrandSnowflake, TbMenu2 } from "react-icons/tb";
import Sidebar from "../side-bar/sideBar";
import { useState } from "react";

const TopBar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (

    <div className="flex justify-between mb-4 items-center">

      <TbBrandSnowflake className="text-4xl" />

      <p className="text-xl font-bold">HUNTER X MATHEMATICAL</p>

      <button 
      className="hover:bg-gray-100 border p-1 border-none rounded-full"
      onClick={() => setSidebarOpen(true)}
      >
        <TbMenu2 className="text-4xl" />
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />


    </div>
  );
};

export default TopBar;