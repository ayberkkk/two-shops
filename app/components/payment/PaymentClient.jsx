"use client";
import Link from "next/link";
import React, { useState } from "react";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import { useCart } from "@/context/CartContext";

const PaymentClient = () => {
  const [state, setState] = useState({
    name: "",
    number: "",
    expiry: "",
    cvc: "",
    focus: "",
  });

  const { confirmOrder } = useCart();

  const [showErrorMessages, setShowErrorMessages] = useState(false);

  const handleInputChange = (evt) => {
    const { name, value } = evt.target;
    setState((prev) => ({ ...prev, [name]: value }));
    setShowErrorMessages(false);
  };

  const handleInputFocus = (evt) => {
    setState((prev) => ({ ...prev, focus: evt.target.name }));
    setShowErrorMessages(false);
  };

  const isNumberValid = state.number.length === 16;
  const isExpiryValid = state.expiry.length === 4;
  const isCvcValid = state.cvc.length === 3;

  const handleSubmit = () => {
    if (!state.number || !state.expiry || !state.cvc) {
      setShowErrorMessages(true);
      return;
    }

    if (!isNumberValid || !isExpiryValid || !isCvcValid) {
      confirmOrder();
      setShowErrorMessages(true);
      return;
    }
  };

  return (
    <div className="mx-auto p-6 bg-white rounded-md lg:w-[500px]">
      <Cards
        name={state.name}
        number={state.number}
        expiry={state.expiry}
        cvc={state.cvc}
        focused={state.focus}
        className="mb-4"
      />
      <form className="mt-3">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Card Number
          </label>
          <input
            type="text"
            name="number"
            placeholder="Card Number"
            maxLength="16"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`mt-1 p-2 w-full border rounded-md ${
              isNumberValid ? "border-red-500" : "border-gray-200"
            }`}
          />
          {showErrorMessages && !isNumberValid && (
            <p className="text-sm text-red-500">
              Card number must be 16 digits.
            </p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Cardholder Name
          </label>
          <input
            type="text"
            name="name"
            placeholder="Cardholder Name"
            maxLength="16"
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">
            Expiry
          </label>
          <input
            type="number"
            name="expiry"
            placeholder="Expiry"
            value={state.expiry}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`mt-1 p-2 w-full border rounded-md ${
              isExpiryValid ? "border-red-500" : "border-gray-200"
            }`}
          />
          {showErrorMessages && !isExpiryValid && (
            <p className="text-sm text-red-500">CVC must be 3 digits.</p>
          )}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">CVC</label>
          <input
            type="number"
            name="cvc"
            placeholder="CVC"
            value={state.cvc}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            className={`mt-1 p-2 w-full border rounded-md ${
              isCvcValid ? "border-red-500" : "border-gray-200"
            }`}
          />
          {showErrorMessages && !isCvcValid && (
            <p className="text-sm text-red-500">CVC must be 3 digits.</p>
          )}
        </div>
        <Link className="w-full" href="/order">
          <button
            className="bg-green-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-lg"
            onClick={handleSubmit}
          >
            Confirm
          </button>
        </Link>
      </form>
    </div>
  );
};

export default PaymentClient;
