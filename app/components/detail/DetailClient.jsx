"use client";
import Image from "next/image";
import { Rating } from "@mui/material";
import Counter from "../general/Counter";
import { useState } from "react";
import Button from "../general/Button";
import Comments from "./Comment";

export default function DetailClient({ product }) {
  const [cardProduct, setCardProduct] = useState({
    id: product.id,
    title: product.title,
    description: product.description,
    price: product.price,
    quantity: 1,
    image: product.thumbnail,
    stock: product.stock,
  });

  const increaseFunc = () => {
    if (cardProduct.quantity == 10) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  };

  const decreaseFunc = () => {
    if (cardProduct.quantity == 1) return;
    setCardProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  };

  return (
    <div className="container mx-auto mt-16">
      <div className="grid lg:grid-cols-2 gap-8">
        <div>
          <div className="border rounded-md">
            <Image
              className="w-full h-auto"
              src={product?.thumbnail}
              alt={product?.title}
              width={300}
              height={300}
            />
          </div>
          {/* 
          <div className="grid grid-cols-4 gap-4 mt-10">
            {product.images.map((image, index) => (
              <Image
                key={index}
                className="object-cover w-full h-full"
                src={image}
                alt={`Image ${index + 1}`}
                width={100}
                height={100}
              />
            ))}
          </div>
          */}
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
          {/* <p className="text-lg mb-2">
            Discount Percentage: {product.discountPercentage}%
          </p> */}
          <p className="text-lg mb-2"></p>
          <div className="text-lg mb-2 font-bold border lg:w-1/4 text-center text-white rounded-lg">
            {product.stock ? (
              <p className="bg-green-500 p-2">Stock Available</p>
            ) : (
              <p className="bg-red-500 p-2">Stock Not Available</p>
            )}
          </div>
          <div className="lg:flex items-center justify-between mt-10">
            <p className="text-3xl font-semibold text-green-500 lg:mb-0 mb-3">
              ${product.price}
            </p>
            <div className="flex items-center gap-10">
              <Button text="Add" small />
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
