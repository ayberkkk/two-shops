import React from "react";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { CardCount } from "./CardCount";
import { User } from "./User";
import { Hamburger } from "./Hamburger";

export const Header = () => {
  return (
    <div className="fixed w-full top-0 left-0 z-[99] flex items-center justify-between gap-3 md:gap-10 px-3 md:px-10 h-16 backdrop-blur-md bg-black/80 text-slate-100">
      <Logo />
      <Search />
      <CardCount />
      <User />
      <Hamburger />
    </div>
  );
};
