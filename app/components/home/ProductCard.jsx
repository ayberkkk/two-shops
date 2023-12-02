import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../general/Favorite";

export default function ProductCard({ product }) {
  return (
    <div className="shadow-lg transition-shadow ease-in hover:shadow-2xl border rounded-lg relative">
      <div className="w-full lg:h-[420px]">
        <Image
          className="w-full lg:h-[300px] h-[200px] rounded-t-lg"
          width={100}
          height={100}
          src={product.thumbnail}
          alt={product.title}
        />
        <div className="absolute top-2 right-2 z-20">
          <FavoriteButton productId={product.id} />
        </div>
        <Link href={`/pages/product/${product.id}`}>
          <article className="px-3 py-2 text-black text-base font-normal bg-transparent">
            <p className="font-semibold">{product.title}</p>
            <p>{product.brand}</p>
            <div className="flex items-center gap-3">
              {product.discountPercentage ? (
                <>
                  <p className="mt-4">
                    $
                    {(
                      product.price -
                      (product.price * product.discountPercentage) / 100
                    ).toFixed(0)}
                  </p>
                  <p className="mt-4 line-through">${product.price}</p>
                </>
              ) : (
                <p className="mt-4">${product.price}</p>
              )}
            </div>
          </article>
        </Link>
      </div>
    </div>
  );
}
