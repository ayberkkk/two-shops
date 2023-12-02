"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Counter from "../general/Counter";

const BasketClient = () => {
  const { cartItems, removeFromCart, setCartItems } = useCart();
  const [promoCode, setPromoCode] = useState("");

  const shippingCost = 10;
  const shippingCost2 = 20;
  const shippingCost3 = 30;

  const [selectedShippingCost, setSelectedShippingCost] =
    useState(shippingCost);

  const shippingCostOptions = [
    { label: "Standard shipping", cost: shippingCost },
    { label: "Standard shipping 2", cost: shippingCost2 },
    { label: "Standard shipping 3", cost: shippingCost3 },
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, product) => {
      const price = product.discountedPrice || product.price;
      return total + price * product.quantity;
    }, 0);
  };

  const calculateDiscountedTotal = () => {
    return cartItems.reduce((total, product) => {
      const discountedPrice = product.discountedPrice || product.price;
      return total + discountedPrice * product.quantity;
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const discountedTotal = calculateDiscountedTotal();
  const totalDiscount = subtotal - discountedTotal;

  const calculateTotalCost = () => {
    const subtotal = calculateSubtotal();
    return subtotal + selectedShippingCost;
  };

  const handleApplyPromoCode = () => {
    console.log("Promo code applied:", promoCode);
  };

  const handleIncrease = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleDecrease = (product) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === product.id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <div className="container mx-auto mt-10">
      <div className="flex flex-col md:flex-row shadow-md my-10">
        <div className="md:w-3/4 bg-white lg:p-10 p-3 ">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-2xl">{cartItems.length} Items</h2>
          </div>
          <div className="flex mt-10 mb-5">
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
              Product Details
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">
              Quantity
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5">
              Price
            </h3>
            <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 text-center">
              Total
            </h3>
          </div>
          {cartItems.map((product) => (
            <div
              className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5"
              key={product.id}
            >
              <div className="flex w-2/5">
                <div className="w-20">
                  <Image
                    className="lg:h-24 lg:w-24"
                    width={100}
                    height={100}
                    layout="responsive"
                    src={product.image}
                    title={product.title}
                    alt={product.title}
                  />
                </div>
                <div className="flex flex-col justify-between ml-4 flex-grow">
                  <span className="font-bold text-sm">{product.title}</span>
                  <span className="text-red-500 text-xs">{product.brand}</span>
                  <button
                    type="button"
                    className="font-medium text-red-600 hover:text-red-500 text-start "
                    onClick={() => removeFromCart(product.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="lg:w-1/5">
                <Counter
                  cardProduct={product}
                  increaseFunc={() => handleIncrease(product.id)}
                  decreaseFunc={() => handleDecrease(product.id)}
                />
              </div>
              <span className="text-center w-1/5 font-semibold text-sm flex items-center gap-3">
                <p className="font-bold text-base">
                  ${product.discountedPrice.toFixed(0)}
                </p>
              </span>
              <span className="text-center w-1/5 font-semibold text-sm">
                ${(product.quantity * product.discountedPrice).toFixed(0)}
              </span>
            </div>
          ))}
          <Link
            href="/"
            className="flex font-semibold text-orange-600 text-sm mt-10"
          >
            <svg
              className="fill-current mr-2 text-orange-600 w-4"
              viewBox="0 0 448 512"
            >
              <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
            </svg>
            Continue Shopping
          </Link>
        </div>
        <div id="summary" className="lg:w-1/4 lg:p-8 p-3">
          <h1 className="font-semibold text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems.length}
            </span>
            <span className="font-semibold text-sm">
              <span className="block text-green-500 font-bold text-xl">
                ${calculateTotalCost().toFixed(0)}
              </span>
            </span>
          </div>
          <div>
            <label className="font-medium inline-block mb-3 text-sm uppercase">
              Shipping
            </label>
            <select
              className="block p-2 text-gray-600 w-full text-sm"
              onChange={(e) =>
                setSelectedShippingCost(parseFloat(e.target.value))
              }
            >
              {shippingCostOptions.map((option, index) => (
                <option key={index} value={option.cost}>
                  {option.label} - ${option.cost.toFixed(0)}
                </option>
              ))}
            </select>
          </div>
          <div className="py-10">
            <label
              htmlFor="promo"
              className="font-semibold inline-block mb-3 text-sm uppercase"
            >
              Promo Code
            </label>
            <input
              type="text"
              id="promo"
              placeholder="Enter your code"
              className="p-2 text-sm w-full border border-gray-200 rounded-lg mb-2"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
            />
            <button
              className="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase rounded-lg"
              onClick={handleApplyPromoCode}
            >
              Apply
            </button>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span className="block text-green-500 font-bold text-xl">
                ${calculateTotalCost().toFixed(0)}
              </span>
            </div>
            <button className="bg-green-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-lg">
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasketClient;