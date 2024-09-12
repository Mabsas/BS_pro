import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserOrderHistory = () => {
  const [OrderHistory, setOrderHistory] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'http://localhost:1000/api/v1/get-order-history',
        { headers }
      );
      setOrderHistory(response.data.data);
    };
    fetch();
  }, []);

  return (
    <>
      {!OrderHistory && (
        <div className="flex items-center justify-center h-[100vh]">
          <Loader />
        </div>
      )}

      {OrderHistory && OrderHistory.length === 0 && (
        <div className="h-[80vh] flex flex-col items-center justify-center text-zinc-100">
          <h1 className="text-4xl font-semibold text-zinc-500 mb-6">
            No Order History
          </h1>
          <img
            src="/empty.png"
            alt="No Orders"
            className="h-[30vh] mb-8"
          />
        </div>
      )}

      {OrderHistory && OrderHistory.length > 0 && (
        <div className="h-full p-4 md:p-6 text-zinc-100">
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-500 mb-6">
            Your Order History
          </h1>

          {/* Table Header */}
          <div className="bg-zinc-800 rounded py-0 lg:py-3 px-4 flex items-center justify-between text-sm md:text-base font-semibold text-zinc-400">
            <div className="w-[5%] text-center">#</div>
            <div className="w-[22%] text-left">Books</div>
            <div className="w-[35%] text-left">Description</div>
            <div className="w-[8%] text-center">Price</div>
            <div className="w-[15%] text-center">Status</div>
            <div className="w-[5%] text-center hidden md:block">Payment Mode</div>
          </div>

          {/* Order List */}
          {OrderHistory.map((item, i) => (
            <div
              key={i}
              className="bg-zinc-700 rounded py-0 lg:py-3 px-4 mt-3 flex items-center justify-between hover:bg-zinc-600 transition-all duration-200"
            >
              <div className="w-[5%] text-center">{i + 1}</div>
              <div className="w-[22%] text-left">
                <Link
                  to={`/view-book-details/${item.book._id}`}
                  className="text-blue-300 hover:underline"
                >
                  {item.book.title}
                </Link>
              </div>
              <div className="w-[35%] text-left text-zinc-400">
                {item.book.desc.slice(0, 50)}...
              </div>
              <div className="w-[8%] text-center text-zinc-400">
                Tk {item.book.price}
              </div>
              <div className="w-[15%] text-center">
                <span
                  className={
                    item.status === 'Order Placed'
                      ? 'text-green-500 font-semibold'
                      : item.status === 'Canceled'
                      ? 'text-red-500 font-semibold'
                      : 'text-yellow-500 font-semibold'
                  }
                >
                  {item.status}
                </span>
              </div>
              <div className="w-[5%] text-center hidden md:block">
                <h1 className="text-sm text-zinc-400">COD</h1>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserOrderHistory;
