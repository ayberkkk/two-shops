"use client";
import { useState } from "react";
import { TfiAlignRight } from "react-icons/tfi";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const Hamburger = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <div className="relative flex md:hidden">
      <TfiAlignRight size={30} onClick={menuToggle} />
      {menuOpen && (
        <div className="fixed top-0 left-0 w-[400px] h-screen backdrop-blur-sm bg-orange-500/50 text-white z-50">
          <button className="absolute top-4 right-4" onClick={closeMenu}>
            <IoIosCloseCircleOutline size={30} />
          </button>
        </div>
      )}
    </div>
  );
};
