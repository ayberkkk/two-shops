"use client";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const ConfirmOrderClient = () => {
  const { orders } = useCart();
  return (
    <div className="container mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-center">
        <img
          className="object-cover"
          src="/images/confirm-gif.gif"
          alt="Order Confirmation"
        />
        <div className="lg:p-0 p-2">
          <div className="border shadow-lg rounded-lg">
            <div className="p-10">
              <h3 className="text-2xl font-bold mb-4">Order Confirmed!</h3>
              <div>
                <>
                  {orders.map((index) => (
                    <p key={index}>
                      Order ID :{" "}
                      <span className="font-bold"> {index + 1} </span>
                    </p>
                  ))}
                </>
              </div>
              <p className="text-lg">
                Excepteur eiusmod minim exercitation ea aliquip dolore
                reprehenderit dolor consequat veniam consectetur sunt.
              </p>

              <div>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-collapse">
                    <thead>
                      <tr>
                        <th className="p-2 font-semibold text-gray-600 text-xs uppercase text-left">
                          Product Details
                        </th>
                        <th className="p-2 font-semibold text-gray-600 text-xs uppercase text-left">
                          Quantity
                        </th>
                        <th className="p-2 font-semibold text-gray-600 text-xs uppercase text-left">
                          Price
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.flatMap((order, index) =>
                        order.items.map((item) => (
                          <tr key={`${index}-${item.id}`} className="border">
                            <td className="p-2">{item.title}</td>
                            <td className="p-2">{item.quantity}</td>
                            <td className="p-2">${item.price}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-3">
                <Link
                  href={"/"}
                  className="bg-green-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full rounded-lg text-center transition-all ease-in duration-200"
                >
                  Order Details
                </Link>
                <Link
                  href={"/"}
                  className="border border-500 font-semibold hover:bg-indigo-600 hover:text-white py-3 text-sm text-green-500 uppercase w-full rounded-lg text-center transition-all ease-in duration-200"
                >
                  Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrderClient;
