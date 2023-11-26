import React from "react";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { CardCount } from "./CardCount";
import { User } from "./User";
import { Hamburger } from "./Hamburger";

export const Header = () => {
  return (
    <div className="flex items-center justify-between gap-3 md:gap-10 px-3 md:px-10 h-16 bg-orange-600 text-slate-100">
      <Logo />
      <Search />
      <CardCount />
      <User />
      <Hamburger />
    </div>
  );
};
