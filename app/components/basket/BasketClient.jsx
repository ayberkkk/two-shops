"use client";
import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Counter from "../general/Counter";
import { CiTrash } from "react-icons/ci";

const BasketClient = () => {
  const { cartItems, removeFromCart, setCartItems, confirmOrder } = useCart();
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

  const increaseFunc = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decreaseFunc = (productId) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCartItems(updatedCartItems);
  };

  return (
    <>
      {cartItems.length > 0 ? (
        <div className="container mx-auto lg:mt-10 relative">
          <div className="flex flex-col md:flex-row shadow-md my-10">
            <div className="md:w-3/4 bg-white lg:p-10 p-4 h-screen">
              <div className="flex justify-between border-b pb-8">
                <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                <h2 className="font-semibold text-2xl">
                  {cartItems.length} Items
                </h2>
              </div>
              <div className="flex mt-10 mb-5">
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                  Product Details
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase lg:w-1/5 w-1/4">
                  Quantity
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase w-1/5 lg:block hidden text-center">
                  Price
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase lg:w-1/5 w-1/4 text-center">
                  Total
                </h3>
                <h3 className="font-semibold text-gray-600 text-xs uppercase lg:w-1/5 w-1/4"></h3>
              </div>
              {cartItems.map((product) => (
                <div
                  className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5 border-t-2"
                  key={product.id}
                >
                  <div className="flex w-2/5">
                    <div className="w-20">
                      <Image
                        className="lg:h-24 lg:w-24"
                        width={100}
                        height={100}
                        src={product.image}
                        title={product.title}
                        alt={product.title}
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">{product.title}</span>
                      <span className="font-bold text-sm">{product.brand}</span>
                    </div>
                  </div>
                  <div className="lg:w-1/5 w-1/6 lg:text-center text-end">
                    <div className="lg:block hidden">
                      <Counter
                        cardProduct={product}
                        increaseFunc={() => increaseFunc(product.id)}
                        decreaseFunc={() => decreaseFunc(product.id)}
                      />
                    </div>
                    <div className="lg:hidden block">{product.quantity}</div>
                  </div>
                  <span className="text-center lg:w-1/5 w-1/4 font-semibold text-sm items-center gap-3 lg:block hidden">
                    <p className="font-bold text-base">
                      ${product.discountedPrice.toFixed(0)}
                    </p>
                  </span>
                  <span className="text-center lg:w-1/5 w-1/4">
                    {product.discountPercentage ? (
                      <p className="lg:text-center text-end">
                        <span className="text-red-600 line-through text-sm font-semibold block">
                          ${(product.quantity * product.price).toFixed(0)}
                        </span>
                        <span className="text-green-600 text-lg font-semibold block">
                          $
                          {(product.quantity * product.discountedPrice).toFixed(
                            0
                          )}
                        </span>
                      </p>
                    ) : (
                      <p className="text-green-600 text-lg font-semibold lg:text-center text-end">
                        $
                        {(product.quantity * product.discountedPrice).toFixed(
                          0
                        )}
                      </p>
                    )}
                  </span>
                  <span className="lg:w-1/5 w-1/4 flex items-center justify-center">
                    <button
                      type="button"
                      className="w-10 h-10 bg-red-500/50 transition ease-in duration-200 hover:bg-red-600 text-white flex items-center justify-center rounded-full"
                      onClick={() => removeFromCart(product.id)}
                    >
                      <CiTrash />
                    </button>
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
            <div
              id="summary"
              className="lg:w-1/4 lg:p-8 p-1 fixed lg:right-12 lg:top-28 bottom-5 w-full bg-white"
            >
              <div className="lg:block hidden">
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
              </div>
              <div className="border-t mt-8 lg:block items-center grid grid-cols-12">
                <div className="col-span-3 flex items-center lg:justify-start justify-center gap-2 font-semibold py-6 text-sm">
                  <span className="lg:block hidden">Total cost :</span>
                  <p className="text-end">
                    <span className="block text-green-500 font-bold text-xl">
                      ${calculateTotalCost().toFixed(0)}
                    </span>
                  </p>
                </div>
                <div className="col-span-9">
                  <Link href={"/order"} className="w-full">
                    <button
                      className="bg-green-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-lg"
                      onClick={confirmOrder}
                    >
                      Confirm
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen tex text-center">
          <div className="table mx-auto flex-col">
            <Image
              className="object-fill table mx-auto w-[300px] h-auto"
              src="/images/empty-cart.png"
              width={100}
              height={100}
            />
            <p className="text-2xl font-bold mb-5">
              Your Cart is
              <span className="text-red-500"> Empty !</span>
            </p>
            <p className="text-base font-medium mb-3">
              Must add items on the cart before you proceed to check out.
            </p>
            <Link
              href="/"
              className="table mx-auto text-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-all ease-in duration-500 hover:bg-orange-700"
            >
              Shop Now
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default BasketClient;
