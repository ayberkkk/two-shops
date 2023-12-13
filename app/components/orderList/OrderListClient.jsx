"use client";
import React from "react";
import { useCart } from "@/context/CartContext";

const OrderHistory = () => {
  const { orderHistory } = useCart();

  return (
    <div className="container mx-auto my-8">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-semibold mb-6">Order History</h2>
        {orderHistory.length === 0 ? (
          <p className="text-gray-500">No orders yet.</p>
        ) : (
          <div>
            {orderHistory.map((order) => (
              <div key={order.id} className="mb-8">
                <p className="text-gray-700 text-lg font-semibold">
                  Order ID: {order.id}
                </p>
                <p className="text-gray-500 text-sm">
                  Order Date: {order.date.toLocaleString()}
                </p>
                <div className="mt-4">
                  <strong className="block mb-2">Items:</strong>
                  <ul>
                    {order.items.map((item) => (
                      <li
                        key={item.id}
                        className="flex justify-between items-center border-b py-2"
                      >
                        <div>
                          <p className="text-gray-700">{item.title}</p>
                          <p className="text-gray-500">
                            Quantity: {item.quantity}
                          </p>
                        </div>
                        <p className="text-gray-700">
                          Price: ${item.price.toFixed(2)}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
