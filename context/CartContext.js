"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const isLocalStorageAvailable = () => {
    try {
      const key = "__storage_test__";
      window.localStorage.setItem(key, key);
      const value = window.localStorage.getItem(key);
      window.localStorage.removeItem(key);
      return value === key;
    } catch (e) {
      return false;
    }
  };

  const initialCartItems = isLocalStorageAvailable()
    ? (() => {
        try {
          return JSON.parse(localStorage.getItem("cartItems")) || [];
        } catch (error) {
          console.error("Error parsing cart items from localStorage:", error);
          return [];
        }
      })()
    : [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    if (isLocalStorageAvailable()) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = (item) => {
    const index = cartItems.findIndex((p) => p.id === item.id);

    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity += item.quantity;
      setCartItems(updatedCartItems);
      console.log("cart", item);
      toast("Product added to cart!", {
        duration: 2000,
        position: "top-right",
        type: "success",
      });
    } else {
      const discountedPrice =
        item.discountPercentage && item.discountPercentage > 0
          ? item.price - (item.price * item.discountPercentage) / 100
          : item.price;

      const newItem = {
        ...item,
        discountedPrice,
      };

      setCartItems((prev) => [...prev, newItem]);
      toast("Product added to cart!", {
        duration: 2000,
        position: "top-right",
        type: "success",
      });
    }
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);
    toast("Product removed from cart!", {
      duration: 2000,
      position: "top-right",
      type: "error",
    });
  };

  const confirmOrder = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        confirmOrder,
      }}
    >
      {children}
      <Toaster />
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart hook must be used within a CartProvider. Make sure you have CartProvider wrapping your component tree."
    );
  }
  return context;
};

export { CartProvider, useCart };
