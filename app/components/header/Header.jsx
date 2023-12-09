import React from "react";
import { Logo } from "./Logo";
import { Search } from "./Search";
import { CardCount } from "./CardCount";
import { User } from "./User";
import { Hamburger } from "./Hamburger";

export const Header = () => {
  return (
    <header className="flex items-center justify-between gap-3 lg:gap-10 px-3 lg:px-10 h-16 backdrop-blur-md bg-black/80 text-slate-100">
      <Logo />
      <Search />
      <CardCount />
      <User />
      <Hamburger />
    </header>
  );
};
