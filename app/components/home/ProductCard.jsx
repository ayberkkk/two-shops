"use client";
import Image from "next/image";
import Link from "next/link";
import FavoriteButton from "../general/Favorite";
import StarRating from "../general/StarRating";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };
  return (
    <div className="shadow-lg transition-shadow ease-in hover:shadow-2xl border rounded-lg relative">
      <div className="w-full lg:h-[470px]">
        <div className="relative">
          <Image
            className="w-full lg:h-[300px] h-[200px] rounded-t-lg -z-10 relative p-3"
            width={100}
            height={100}
            src={product.images[selectedImageIndex]}
            alt={product.title}
          />
          <div className="lg:absolute bottom-1 lg:left-[10%] transform lg:-translate-x-[-15%] flex items-center justify-center z-50 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                className={`lg:w-[45px] lg:h-[45px] mb-2 cursor-pointer overflow-y-auto p-2 rounded-lg relative transition-all duration-300 ease-in ${
                  selectedImageIndex === index
                    ? "border border-orange-500 lg:w-[60px] lg:h-[60px] lg:-top-3"
                    : ""
                }`}
                key={index}
                src={image}
                title={`thumbnail-${index}`}
                alt={`thumbnail-${index}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <Link href={`/pages/product/${product.id}`}>
          <div className="absolute top-2 right-2 -z-10">
            <FavoriteButton productId={product.id} />
          </div>
          <article className="px-3 py-2 text-black text-base font-normal bg-transparent">
            <div className="lg:flex items-center justify-between">
              <p className="font-semibold lg:mb-0 mb-2">{product.title}</p>
              <div className="flex items-center gap-2 lg:mb-0 mb-2">
                <StarRating rating={product.rating} />
                <span className="text-xs text-gray-500">
                  ({product.rating})
                </span>
              </div>
            </div>
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
                  <p className="mt-4 line-through text-orange-500">
                    ${product.price}
                  </p>
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
