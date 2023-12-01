import React from "react";
import { products } from "@/utils/Products";
import Link from "next/link";

export const Category = () => {
  const uniqueCategories = [
    ...new Set(products.map((product) => product.category)),
  ];
  const sortedCategories = uniqueCategories.sort();

  return (
    <div className="flex items-center justify-center gap-4 md:gap-10 px-3 py-7 sm:py-5 overflow-x-auto">
      {sortedCategories.map((category, index) => (
        <Link
          className="border text-slate-600 rounded-full min-w-[120px] px-2 py-1 text-center flex items-center justify-center bg-transparent transition-all ease-in duration-300 hover:bg-orange-500 hover:text-white"
          key={index}
          href={"/"}
        >
          {category}
        </Link>
      ))}
    </div>
  );
};
