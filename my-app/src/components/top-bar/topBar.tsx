"use client"

import { TbBrandSnowflake, TbMenu2 } from "react-icons/tb";

const TopBar = () => {

  return (
    <div className="flex justify-between mb-4 items-center">

      <TbBrandSnowflake className="text-4xl" />

      <p className="text-xl font-bold">HUNTER X MATHEMATICAL</p>

      <button className="hover:bg-gray-100 border p-1 border-none rounded-full">
        <TbMenu2 className="text-4xl" />
      </button>

    </div>
  );
};

export default TopBar;