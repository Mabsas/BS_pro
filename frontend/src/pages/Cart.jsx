import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const navigate = useNavigate();
  const [Cart, setCart] = useState();
  const [Total, setTotal] = useState(0);
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://bs-pro-api.vercel.app/api/v1/get-user-cart", { headers });
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(`https://bs-pro-api.vercel.app/api/v1/remove-from-cart/${bookid}`, {}, { headers });
    alert(response.data.message);
  };

  useEffect(() => {
    if (Cart && Cart.length > 0) {
      let total = 0;
      Cart.map((items) => {
        total += items.price;
      });
      setTotal(total);
    }
  }, [Cart]);

  const PlaceOrder = async () => {
    try {
      const response = await axios.post(`https://bs-pro-api.vercel.app/api/v1/place-order`, { order: Cart }, { headers });
      alert(response.data.message);
      navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-800 to-zinc-900 p-6 md:p-12 text-zinc-100">
      {!Cart && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl lg:text-6xl font-bold text-zinc-300 mt-48 mb-8">
            Your Cart is Empty
          </h1>
          <img
            src="/empty-cart.png"
            alt="empty cart"
            className="lg:h-[30vh] md:h-[30vh] opacity-70"
          />
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8 text-center">
            Your Cart
          </h1>
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full bg-zinc-800 rounded-lg shadow-lg text-white">
              <thead>
                <tr className="text-left text-zinc-300 bg-zinc-900">
                  <th className="py-4 px-6 font-semibold tracking-wide border-b border-zinc-700">Book</th>
                  <th className="py-4 px-6 font-semibold tracking-wide border-b border-zinc-700">Description</th>
                  <th className="py-4 px-6 font-semibold tracking-wide border-b border-zinc-700">Price</th>
                  <th className="py-4 px-6 font-semibold tracking-wide border-b border-zinc-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {Cart.map((items, i) => (
                  <tr
                    key={i}
                    className="border-b border-zinc-700 hover:bg-zinc-700 transition-colors duration-300"
                  >
                    <td className="py-4 px-6">
                      <img
                        src={items.url}
                        alt={items.title}
                        className="h-[10vh] object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <h2 className="text-xl font-semibold">{items.title}</h2>
                      <p className="text-sm text-zinc-400">{items.desc.slice(0, 100)}...</p>
                    </td>
                    <td className="py-4 px-6 text-lg font-semibold">Tk {items.price}</td>
                    <td className="py-4 px-6">
                      <button
                        className="text-red-500 hover:text-red-700 transition-transform transform hover:scale-110 p-2 rounded-full"
                        onClick={() => deleteItem(items._id)}
                      >
                        <AiFillDelete size={24} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          <div className="flex justify-center items-center">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-full max-w-md text-center border border-zinc-700">
              <h1 className="text-4xl text-white font-semibold mb-4">Place Your Order</h1>
              <div className="bg-zinc-900 p-4 rounded-lg mb-6 shadow-md">
                <h2 className="text-xl text-zinc-200">Total Amount</h2>
                <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                  <h2>{Cart.length}x books</h2>
                  <h2>Tk {Total}</h2>
                </div>
              </div>
              <button
                className="bg-yellow-500 text-zinc-900 font-bold px-6 py-3 rounded-full hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-yellow-500"
                onClick={PlaceOrder}
              >
                Place Order
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
