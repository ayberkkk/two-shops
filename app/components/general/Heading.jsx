import { products } from "@/utils/Products";
import ProductCard from "../home/ProductCard";

export default function Heading({ center, text }) {
  return (
    <div
      className={`text-slate-500 px-3 sm:px-10 sm:text-xl my-3 sm:my-10 ${
        center ? "text-center" : "text-start"
      } `}
    >
      <p className="border text-slate-600 rounded-full px-2 py-1 text-center flex items-center justify-center mb-2 w-52">
        {text}
      </p>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-10">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
