import { products } from "@/utils/Products";
import ProductCard from "../home/ProductCard";
import Link from "next/link";

export default function Heading({ center, text }) {
  return (
    <div
      className={`text-slate-500 px-3 sm:px-10 sm:text-xl my-3 sm:my-10 ${
        center ? "text-center" : "text-start"
      } `}
    >
      <div className="flex items-center">
        <Link
          href={"/"}
          className="border text-slate-600 rounded-full min-w-[120px] px-3 py-2 mb-4 text-center flex items-center justify-center bg-transparent transition-all ease-in duration-300 hover:bg-orange-500 hover:text-white"
        >
          {text}
        </Link>
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
