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
      const response = await axios.get("http://localhost:1000/api/v1/get-user-cart", { headers });
      setCart(response.data.data);
    };
    fetch();
  }, [Cart]);

  const deleteItem = async (bookid) => {
    const response = await axios.put(`http://localhost:1000/api/v1/remove-from-cart/${bookid}`, {}, { headers });
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
      const response = await axios.post(`http://localhost:1000/api/v1/place-order`,      {order: Cart},
        {headers});
        alert(response.data.message);
        navigate("/profile/orderHistory");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="bg-gray-900 px-8 py-12 min-h-screen">
      {!Cart && (
        <div className="w-full h-[100%] flex items-center justify-center mt-72">
          <Loader />{" "}
        </div>
      )}

      {Cart && Cart.length === 0 && (
        <div className="flex flex-col items-center justify-center h-full">
          <h1 className="text-5xl lg:text-6xl font-bold text-gray-400 mt-48 mb-8">
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
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-300 mb-10 flex items-center justify-center">
            Your Cart
          </h1>
          <div className="overflow-x-auto mb-12">
            <table className="min-w-full bg-gray-800 text-white">
              <thead>
                <tr className="text-left">
                  <th className="py-3 px-4">Book</th>
                  <th className="py-3 px-4">Description</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {Cart.map((items, i) => (
                  <tr key={i} className="border-t border-gray-700">
                    <td className="py-3 px-4">
                      <img
                        src={items.url}
                        alt={items.title}
                        className="h-[10vh] object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <h2 className="text-xl font-semibold">{items.title}</h2>
                      <p className="text-sm text-gray-400">
                        {items.desc.slice(0, 100)}...
                      </p>
                    </td>
                    <td className="py-3 px-4">Tk {items.price}</td>
                    <td className="py-3 px-4">
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors duration-200 p-2 rounded-full"
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
          {/* Place Order Section in the Middle */}
          <div className="flex justify-center items-center">
            <div className="bg-zinc-800 rounded-lg shadow-lg p-6 w-full max-w-md text-center">
              <h1 className="text-4xl text-white font-semibold mb-4">Place Your Order</h1>
              <div className="bg-zinc-900 p-4 rounded-lg mb-6">
                <h2 className="text-xl text-zinc-200">Total Amount</h2>
                <div className="mt-3 flex items-center justify-between text-xl text-zinc-200">
                  <h2>{Cart.length}x...............books</h2>
                  <h2>Tk {Total}</h2>
                </div>
              </div>
              <button className="bg-white hover:bg-green-600 text-black font-bold py-2 px-4 rounded-lg w-full text-lg transition duration-300" onClick={PlaceOrder}>
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
