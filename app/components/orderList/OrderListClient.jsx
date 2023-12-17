"use client";
import React, { useState } from "react";
import { useCart } from "@/context/CartContext";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";

const OrderHistory = () => {
  const { orderHistory } = useCart();
  const [expandedOrders, setExpandedOrders] = useState([]);

  const toggleOrder = (orderId) => {
    setExpandedOrders((prevExpandedOrders) => {
      if (prevExpandedOrders.includes(orderId)) {
        return prevExpandedOrders.filter((id) => id !== orderId);
      } else {
        return [...prevExpandedOrders, orderId];
      }
    });
  };

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-8 rounded">
        <h2 className="text-3xl font-semibold mb-6">Order History</h2>
        {orderHistory.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div>
            <div className="grid lg:grid-cols-2 gap-3">
              {orderHistory.map((order) => (
                <div key={order.id} className="mb-8">
                  <div
                    className="border p-3 rounded-lg shadow-md flex items-center justify-between bg-transparent transition-all duration-100 ease-in hover:bg-gray-200 cursor-pointer"
                    onClick={() => toggleOrder(order.id)}
                  >
                    <div>
                      <p className="text-gray-700 text-lg font-semibold">
                        Order ID: {order.id}
                      </p>
                      <p className="text-gray-500 text-sm">
                        Order Date: {order.date.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      {expandedOrders.includes(order.id) ? (
                        <FaAngleUp />
                      ) : (
                        <FaAngleDown />
                      )}
                    </div>
                  </div>
                  {expandedOrders.includes(order.id) && (
                    <div className="p-3">
                      <strong className="block mb-2">Items:</strong>
                      <ul>
                        {order.items.map((item) => (
                          <li
                            key={item.id}
                            className="flex justify-between items-center border-b py-2"
                          >
                            <div className="flex items-center gap-3">
                              <div>
                                <img
                                  className="object-fill w-10 h-10"
                                  src={item.image}
                                  alt={item.title}
                                />
                              </div>
                              <div>
                                <p className="text-gray-700">{item.title}</p>
                                <p className="text-gray-500">
                                  Quantity: {item.quantity}
                                </p>
                              </div>
                            </div>
                            <p className="text-gray-700">
                              Price: ${item.price.toFixed(2)}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
