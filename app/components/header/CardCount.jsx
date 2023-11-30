"use client";
import { useCart } from "@/context/CartContext";
import React, { Fragment, useState } from "react";
import { CiShoppingBasket } from "react-icons/ci";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { IoIosCloseCircleOutline } from "react-icons/io";

export const CardCount = () => {
  const { cartItems, removeFromCart } = useCart();
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((total, product) => {
      return total + product.price * product.quantity;
    }, 0);
  };

  const discountPercentage =
    cartItems.length > 0 ? cartItems[0].discountPercentage : 0;

  const discount = (calculateSubtotal() * discountPercentage) / 100;

  const subtotal = calculateSubtotal() - discount;

  return (
    <div className="md:flex">
      <div className="relative" onClick={toggleModal}>
        <CiShoppingBasket size={50} />
        <div className="absolute top-2 -right-1 bg-orange-500 rounded-full w-6 h-w-6 text-white flex items-center justify-center font-bold">
          {cartItems.length}
        </div>
      </div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={setIsOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-lg font-medium text-gray-900">
                            Shopping cart
                          </Dialog.Title>
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                              onClick={() => setIsOpen(false)}
                            >
                              <span className="absolute -inset-0.5" />
                              <span className="sr-only">Close panel</span>
                              <IoIosCloseCircleOutline
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                        <div className="mt-8">
                          <div className="flow-root">
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cartItems.map((product) => (
                                <li
                                  key={product.id}
                                  className="flex py-6 border-b-2"
                                >
                                  <div className="w-20 h-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <Image
                                      className="object-cover w-full h-full"
                                      width={100}
                                      height={100}
                                      src={product.image}
                                      title={product.title}
                                      alt={product.title}
                                    />
                                  </div>
                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>{product.title}</h3>
                                        <p className="ml-4">${product.price}</p>
                                      </div>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">
                                        Qty {product.quantity}
                                      </p>
                                      <div className="flex">
                                        <button
                                          type="button"
                                          className="font-medium text-red-600 hover:text-red-500"
                                          onClick={() =>
                                            removeFromCart(product.id)
                                          }
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                        <div className="flex items-center justify-between text-base font-medium text-gray-900">
                          <p>Subtotal</p>
                          <div>
                            <span className="block line-through text-gray-500 text-sm text-end">
                              ${calculateSubtotal().toFixed(2)}
                            </span>
                            <span className="block text-green-500 font-bold text-xl">
                              ${subtotal.toFixed(2)}
                            </span>
                          </div>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <p className="flex items-center justify-center rounded-md border border-transparent bg-orange-500 px-6 py-3 text-base font-medium text-white shadow-sm transition-all ease-in duration-500 hover:bg-orange-700">
                            Checkout
                          </p>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-orange-500">
                          <button
                            type="button"
                            className="font-medium text-orange-600 hover:text-orange-500"
                            onClick={() => setIsOpen(false)}
                          >
                            Continue Shopping
                            <span aria-hidden="true"> &rarr;</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};
