"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

const CartProvider = ({ children }) => {

  const isLocalStorageAvailable = () => {
    try {
      const key = "__storage_test__";
      window.localStorage.setItem(key, key);
      window.localStorage.removeItem(key);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const initialCartItems = isLocalStorageAvailable()
    ? JSON.parse(localStorage.getItem("cartItems")) || []
    : [];

  const [cartItems, setCartItems] = useState(initialCartItems);

  useEffect(() => {
    if (isLocalStorageAvailable) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems, isLocalStorageAvailable]);

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
      setCartItems((prev) => [...prev, item]);
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

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
      <Toaster />
    </CartContext.Provider>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart hook must be used within a CartProvider");
  }
  return context;
};

export { CartProvider, useCart };
