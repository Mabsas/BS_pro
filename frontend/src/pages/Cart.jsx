import React, { useState, useEffect } from 'react';
import Loader from '../components/Loader/Loader';
import axios from 'axios';
import { AiFillDelete } from "react-icons/ai";

const Cart = () => {
  const [Cart, setCart] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`, {}, { headers });
    alert(response.data.message);
  };

  return (
    <div className="bg-gray-900 px-8 py-12 min-h-screen">
      {!Cart && <Loader />}
      
      {Cart && Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-400 mb-8">
            Your Cart is Empty
          </h1>
          <img 
            src="/empty-cart.png" 
            alt="empty cart"
            className="lg:h-[30vh] opacity-70"
          />
        </div>
      )}

      {Cart && Cart.length > 0 && (
        <>
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-300 mb-10">
            Your Cart
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Cart.map((items, i) => (
              <div 
                key={i} 
                className="bg-gray-800 rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 transition-transform duration-300"
              >
                <img 
                  src={items.url} 
                  alt="/" 
                  className="h-[20vh] w-full object-cover rounded-lg mb-4"
                />
                <h2 className="text-2xl font-semibold text-white mb-2">
                  {items.title}
                </h2>
                <p className="text-sm text-gray-400 mb-4">
                  {items.desc.slice(0, 100)}...
                </p>
                <div className="flex justify-between items-center">
                  <h3 className="text-3xl text-white font-bold">
                    Tk {items.price}
                  </h3>
                  <button 
                    className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full"
                    onClick={() => deleteItem(items._id)}
                  >
                    <AiFillDelete size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
