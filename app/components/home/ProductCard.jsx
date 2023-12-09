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

  const [otherImage, setOtherImage] = useState(false);

  return (
    <div className="shadow-lg transition-shadow ease-in hover:shadow-2xl border rounded-lg relative">
      <div className="w-full lg:h-[470px]">
        <div className="relative">
          <Image
            className="w-full lg:h-[300px] h-[200px] rounded-t-lg relative"
            width={100}
            height={100}
            src={product.images[selectedImageIndex]}
            alt={product.title}
          />
          <div className="absolute right-2 bottom-3 p-1 rounded shadow-xl bg-white overflow-x-auto">
            <div
              className={`flex items-center cursor-pointer ${
                otherImage ? "opacity-0" : ""
              }`}
              onMouseOver={() => setOtherImage(true)}
              onMouseLeave={() => setOtherImage(false)}
            >
              <span
                className="w-4 h-4 border border-[#fff] bg-pink-200 rounded-full z-[2] ml-1"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #3023ae 0%, #53a0fd 48%, #b4ec51 101%)",
                }}
              ></span>
              <span
                className="w-4 h-4 border border-[#fff] bg-pink-200 rounded-full z-[1] -ml-2"
                style={{
                  backgroundImage:
                    "linear-gradient(to right, #6bceb4 0%, #f98cc2 48%, #fff781 101%)",
                }}
              ></span>
              <span className="text-sm ml-1"> {product.images.length} </span>
            </div>
          </div>
          {otherImage && (
            <div className="absolute left-0 w-full bottom-0 bg-white p-3 shadow-md lg:block hidden">
              <div className="overflow-x-auto w-full flex items-center justify-end gap-4">
                <div
                  className="flex items-center gap-4"
                  onMouseOver={() => setOtherImage(true)}
                  onMouseLeave={() => setOtherImage(false)}
                >
                  {product.images.map((image, index) => (
                    <img
                      className={`w-[50px] h-[50px] mb-2 cursor-pointer overflow-y-auto rounded-lg border transition-all duration-300 ease-in ${
                        selectedImageIndex === index
                          ? "border border-orange-500"
                          : ""
                      }`}
                      key={index}
                      src={image}
                      title={`thumbnail-${index}`}
                      alt={`thumbnail-${index}`}
                      onMouseOver={() => handleThumbnailClick(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <FavoriteButton productId={product.id} />
        </div>
        <article className="px-3 py-2 text-black text-base font-normal bg-transparent">
          <div className="overflow-x-auto w-full flex items-center justify-end gap-4 lg:hidden">
            <div className="flex items-center gap-4">
              {product.images.map((image, index) => (
                <img
                  className={`w-[50px] h-[50px] mb-2 cursor-pointer border transition-all duration-300 ease-in ${
                    selectedImageIndex === index
                      ? "border border-orange-500"
                      : ""
                  }`}
                  key={index}
                  src={image}
                  title={`thumbnail-${index}`}
                  alt={`thumbnail-${index}`}
                  onMouseOver={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          </div>
          <Link href={`/pages/product/${product.id}`}>
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
          </Link>
        </article>
      </div>
    </div>
  );
}
