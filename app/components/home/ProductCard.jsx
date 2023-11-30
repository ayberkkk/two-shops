import Image from "next/image";
import Link from "next/link";
import { IoIosLink } from "react-icons/io";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`} passHref>
      <div className="shadow-lg transition-shadow ease-in hover:shadow-2xl border rounded-xl relative overflow-hidden">
        <div className="w-full h-[300px] relative">
          <Image
            className="object-cover rounded-t-xl h-[300px] max-h-full w-full"
            width={100}
            height={100}
            src={product.thumbnail}
            alt={product.title}
          />
          <div className="overlay absolute top-0 left-0 w-full h-full bg-black opacity-0 transition-opacity ease-in hover:opacity-50 flex items-center justify-center">
            <IoIosLink className="text-white" size={40} />
          </div>
        </div>
        <div className="absolute bottom-0 bg-orange-500 w-full rounded-t-full flex items-center justify-center">
          <p className="mt-2 space-y-2 uppercase text-white text-base mb-2 font-semibold whitespace-nowrap">
            {product.title}
          </p>
        </div>
      </div>
    </Link>
  );
}
