"use client";
import React, { createContext, useState, useContext } from "react";
import toast, { Toaster } from "react-hot-toast";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    const index = cartItems.findIndex((p) => p.id === item.id);
    if (index !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[index].quantity += item.quantity;
      setCartItems(updatedCartItems);
      console.log("cart", item);
      toast("Product add to cart !", {
        duration: 4000,
        position: "top-right",
        type: "success",
      });
    } else {
      setCartItems((prev) => [...prev, item]);
      toast("Product add to cart !", {
        duration: 4000,
        position: "top-right",
        type: "success",
      });
    }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
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
