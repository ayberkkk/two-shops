"use client";
import Link from "next/link";
import { useState } from "react";
import { CiUser } from "react-icons/ci";
import { PiPackageThin } from "react-icons/pi";
import { IoIosLogOut } from "react-icons/io";

export const User = () => {
  const [subMenu, setSubMenu] = useState(false);
  const subToggle = () => {
    if (subMenu === false) {
      setSubMenu(true);
    } else {
      setSubMenu(false);
    }
  };
  return (
    <div className="flex relative">
      <CiUser className="cursor-pointer" size={40} onClick={subToggle} />
      {subMenu && (
        <ul className="absolute top-16 right-3 bg-white text-orange-400 shadow-lg w-[200px] rounded-b-lg">
          <li className="text-xl font-bold border-b-2 mb-1 bg-transparent transition-all duration-100 ease-in hover:bg-orange-500 hover:text-white">
            <Link
              className="mx-2 w-full flex items-center gap-2"
              href="/orderList"
            >
              <CiUser size={30} />
              Account
            </Link>
          </li>
          <li className="text-xl font-bold border-b-2 mb-1 bg-transparent transition-all duration-100 ease-in hover:bg-orange-500 hover:text-white">
            <Link
              className=" mx-2 w-full flex items-center gap-2"
              href="/orderList"
            >
              <PiPackageThin size={30} />
              Orders
            </Link>
          </li>
          <li className="text-xl font-bold mb-1 bg-transparent transition-all duration-100 ease-in hover:bg-orange-500 hover:text-white">
            <Link
              className=" mx-2 w-full flex items-center gap-2"
              href="/orderList"
            >
              <IoIosLogOut size={30} />
              Logout
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};
