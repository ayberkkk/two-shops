import Image from "next/image";
import { Rating } from "@mui/material";
import Link from "next/link";
import { Logo } from "../header/Logo";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} passHref className="">
      <div className="shadow-lg transition-shadow ease-in hover:shadow-2xl border rounded-xl">
        <div className="relative h-[400px]">
          <Image
            className="object-cover rounded-t-xl"
            fill
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className="p-3">
          <p className="mt-2 space-y-2 uppercase text-black text-lg">
            {product.title}
          </p>
          <div className="flex items-center">
            <Rating name="read-only" value={product.rating} readOnly />
            <p className="text-sm text-gray-500">({product.rating})</p>
          </div>
          <div className="text-green-500">${product.price}</div>
        </div>
      </div>
    </Link>
  );
}
