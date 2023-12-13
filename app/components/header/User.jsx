"use client";
import { useState } from "react";
import { CiUser } from "react-icons/ci";

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
        <div className="absolute top-16 right-3 bg-white shadow-lg text-black w-[150px] h-[100px]">
          <div className="p-1">
            <ul>
              <li className="text-xl border-b-2 w-full font-bold">
                <a href="/orderList" >Order</a>
              </li>
              <li className="text-xl border-b-2 w-full font-bold">Test</li>
              <li className="text-xl border-b-2 w-full font-bold">Test</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
