"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import Counter from "../general/Counter";
import Button from "../general/Button";
import Comments from "./Comment";
import StarRating from "../general/StarRating";
import Image from "next/image";
import { MdOutlineDiscount } from "react-icons/md";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoIosCloseCircleOutline } from "react-icons/io";
import FavoriteButton from "../general/Favorite";

export default function DetailClient({ product }) {
  const [cardProduct, setCardProduct] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    discountPercentage: product.discountPercentage,
    quantity: 1,
    image: product.thumbnail,
    stock: product.stock,
  });

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { addToCart } = useCart();

  const increaseFunc = () => {
    if (cardProduct.quantity === 10) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseFunc = () => {
    if (cardProduct.quantity === 1) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const discountedPrice =
    (product.price * (100 - product.discountPercentage)) / 100;

  return (
    <div className="container mx-auto lg:mt-28">
      <div className="grid lg:grid-cols-2">
        <div className="lg:flex block items-center w-full gap-10 relative">
          <div className="border rounded-md relative">
            <Image
              className="lg:w-[600px] lg:h-[500px] w-[500px] h-[400px]"
              width={100}
              height={500}
              src={product.images[selectedImageIndex]}
              title={product.title}
              alt={product.title}
            ></Image>
            {product.discountPercentage > 0 && (
              <div className="absolute top-4 right-4">
                <div className="flex items-center gap-1 text-base font-semibold bg-red-500 p-2 text-white rounded-lg w-full">
                  <MdOutlineDiscount size={25} />
                  -%{product.discountPercentage}
                </div>
              </div>
            )}
            <div className="thumbnails lg:block flex items-center lg:p-0 p-3  lg:absolute relative overflow-x-auto z-50 top-0 lg:-right-28">
              {product.images.map((image, index) => (
                <img
                  className={`w-[90px] h-[90px] mb-2 cursor-pointer overflow-y-auto p-2 rounded-lg ${
                    selectedImageIndex === index
                      ? "border border-orange-500"
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
        </div>
        <div className="p-3">
          <div className="border border-gray-400 lg:w-1/5 w-1/3  rounded-lg mb-4 text-orange-500 font-bold lg:pl-2 px-1 p-1">
            <span className="underline">twoShops.</span>
            <span className="font-extralight">com</span>
          </div>
          <div className="lg:flex items-center justify-between mb-4">
            <h1 className="lg:text-5xl text-3xl font-semibold mb-2 lg:mb-0">
              {product.title}
            </h1>
            <div className="flex items-center gap-3">
              <StarRating rating={product.rating} />
              <p className="text-xs text-gray-500">({product.rating})</p>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-lg">{product.description}</p>
          </div>
          <div className="text-lg mb-4 font-bold">
            {product.stock ? (
              <p className="text-green-500 flex items-center gap-2">
                <IoMdCheckmarkCircleOutline size={24} /> Stock Available
              </p>
            ) : (
              <p className="text-red-500 p-2  flex items-center gap-2">
                <IoIosCloseCircleOutline size={24} /> Stock Not Available
              </p>
            )}
          </div>
          <div className="mb-4">
            {product.discountPercentage > 0 ? (
              <>
                <p className="text-xl text-red-500 line-through">
                  ${product.price}
                </p>
                <p className="text-5xl font-semibold text-green-500">
                  ${discountedPrice.toFixed(0)}
                </p>
              </>
            ) : (
              <p className="text-5xl font-semibold text-green-500">
                ${product.price.toFixed(0)}
              </p>
            )}
          </div>
          <div className="lg:relative fixed bottom-0 left-0 right-0 lg:backdrop-blur-none lg:bg-transparent backdrop-blur-sm bg-orange-200/40 p-2 flex items-center lg:gap-10 gap-5">
            <Counter
              cardProduct={cardProduct}
              increaseFunc={increaseFunc}
              decreaseFunc={decreaseFunc}
            />
            <FavoriteButton productId={product.id} />
            <Button text="Add" size onClick={() => addToCart(cardProduct)} />
          </div>
        </div>
      </div>
      {product?.comments?.map((comment) => (
        <Comments key={comment.id} comment={comment} rating={comment.rating} />
      ))}
    </div>
  );
}
