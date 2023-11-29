"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { Rating } from "@mui/material";
import Counter from "../general/Counter";
import Button from "../general/Button";
import Comments from "./Comment";
import ReactImageMagnify from "react-image-magnify";

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
    <div className="container mx-auto mt-28">
      <div className="grid lg:grid-cols-2">
        <div className="lg:flex block items-center w-full gap-10">
          <div className="thumbnails lg:block hidden">
            {product.images.map((image, index) => (
              <img
                className={`w-[90px] h-[90px] mb-2 cursor-pointer ${
                  selectedImageIndex === index ? "border border-orange-500" : ""
                }`}
                key={index}
                src={image}
                alt={`thumbnail-${index}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
          <div className="border rounded-md">
            <ReactImageMagnify
              className="w-full h-auto"
              {...{
                smallImage: {
                  alt: product.title,
                  isFluidWidth: false,
                  src: product.images[selectedImageIndex],
                },
                largeImage: {
                  src: product.images[selectedImageIndex],
                  width: 1000,
                  height: 1000,
                },
                enlargedImageContainerStyle: {
                  background: "#fff",
                  zIndex: 9,
                },
              }}
            />
          </div>
          <div className="thumbnails lg:hidden flex items-center p-3 overflow-x-auto">
            {product.images.map((image, index) => (
              <img
                className={`w-[90px] h-[90px] mb-2 cursor-pointer${
                  selectedImageIndex === index ? "border border-orange-500" : ""
                }`}
                key={index}
                src={image}
                alt={`thumbnail-${index}`}
                onClick={() => handleThumbnailClick(index)}
              />
            ))}
          </div>
        </div>
        <div className="p-3">
          <div className="flex items-center justify-between">
            <h1 className="lg:text-5xl text-3xl font-semibold mb-4">
              {product.title}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-sm text-gray-500">({product.rating} )</p>
              <Rating name="read-only" value={product.rating} readOnly />
            </div>
          </div>
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-lg mb-4">{product.description}</p>
          <p className="text-lg mb-2"></p>
          <div className="text-lg mb-2 font-bold border lg:w-1/4 text-center text-white rounded-lg">
            {product.stock ? (
              <p className="bg-green-500 p-2">Stock Available</p>
            ) : (
              <p className="bg-red-500 p-2">Stock Not Available</p>
            )}
          </div>
          <div className="lg:flex items-center justify-between mt-10">
            <div className="lg:flex items-center">
              {product.discountPercentage > 0 && (
                <p className="text-xl text-red-500 line-through mr-3">
                  ${product.price}
                </p>
              )}
              {product.discountPercentage > 0 && (
                <div className="text-sm bg-red-500 p-1 text-white rounded-lg w-1/4">
                  {product.discountPercentage}% OFF
                </div>
              )}
              <p
                className={`text-3xl font-semibold ${
                  product.discountPercentage > 0 ? "text-green-500" : ""
                }`}
              >
                ${discountedPrice.toFixed(2)}
              </p>
            </div>
            <div className="flex items-center gap-10">
              <Button text="Add" small onClick={() => addToCart(cardProduct)} />
              <Counter
                cardProduct={cardProduct}
                increaseFunc={increaseFunc}
                decreaseFunc={decreaseFunc}
              />
            </div>
          </div>
        </div>
      </div>
      {product?.comments?.map((comment) => (
        <Comments key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
