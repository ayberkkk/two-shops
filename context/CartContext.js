"use client";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
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

      setCartItems([newItem]);
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

  const [orders, setOrders] = useState([]);
  const [orderHistory, setOrderHistory] = useState([]);
  const orderIdCounter = useRef(1);

  const confirmOrder = () => {
    const newOrder = {
      id: orderIdCounter.current++,
      items: cartItems,
      date: new Date(),
    };

    setOrders([newOrder]); // Sadece anlık siparişi güncelle
    setOrderHistory((prevOrders) => [...prevOrders, newOrder]); // Tüm sipariş geçmişini güncelle

    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        orders,
        orderHistory,
        confirmOrder,
        addToCart,
        removeFromCart,
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
  const currentOrder =
    context.orders.length > 0
      ? [context.orders[context.orders.length - 1]]
      : [];
  return {
    ...context,
    orders: currentOrder,
  };
};

export { CartProvider, useCart };
