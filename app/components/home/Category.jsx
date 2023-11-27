import React from "react";

export const Category = () => {
  const categoryList = [
    {
      name: "Shoes",
    },
    {
      name: "Shoes",
    },
    {
      name: "Shoes",
    },
    {
      name: "Shoes",
    },
    {
      name: "Shoes",
    },
    {
      name: "Shoes",
    },
    {
      name: "Shoes",
    },
  ];
  return (
    <ul className="flex items-center justify-center gap-4 md:gap-10 px-3 py-7 sm:py-5 overflow-x-auto mt-[60px]">
      {categoryList.map((category, item) => (
        <li
          className="border text-slate-600 rounded-full min-w-[120px] px-2 py-1 text-center flex items-center justify-center flex-1 cursor-pointer"
          key={item}
        >
          {category.name}
        </li>
      ))}
    </ul>
  );
};
