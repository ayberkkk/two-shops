import { products } from "@/utils/Products";
import ProductCard from "../home/ProductCard";

export default function Heading({ center, text }) {
  return (
    <div
      className={`text-slate-500 px-3 sm:px-10 sm:text-xl my-3 sm:my-10 ${
        center ? "text-center" : "text-start"
      } `}
    >
      <p>{text}</p>

      <div className="flex items-center gap-4 sm:gap-10 flex-wrap">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
