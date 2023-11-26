import Image from "next/image";
import { Rating } from "@mui/material";
import Link from "next/link";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="shadow-lg p-2 rounded-md text-center">
        <div className="relative h-[400px]">
          <Image
            className="w-[400px] h-[400px] object-contain"
            fill
            src={product.thumbnail}
            alt={product.title}
          />
        </div>
        <div className=" mt-2 space-y-2">{product.title}</div>
        <Rating name="read-only" value={product.rating} readOnly />
        <div className="text-orange-500">${product.price}</div>
      </div>
    </Link>
  );
}
