import Image from "next/image";
import Link from "next/link";
import StarRating from "../general/StarRating";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} passHref className="">
      <div className="shadow-lg transition-shadow ease-in hover:shadow-2xl border rounded-xl">
        <div className="w-full h-[300px]">
          <Image
            className="object-cover rounded-t-xl h-[300px] max-h- w-full"
            width={100}
            height={100}
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="p-3">
          <p className="mt-2 space-y-2 uppercase text-black text-lg">
            {product.title}
          </p>
          <div className="flex items-center gap-2">
            <StarRating rating={product.rating} />
            <p className="text-xs text-gray-500">({product.rating})</p>
          </div>
          <div className="text-green-500">${product.price}</div>
        </div>
      </div>
    </Link>
  );
}
