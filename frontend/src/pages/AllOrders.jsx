import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../components/Loader/Loader';
import { FaUserLarge } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { FaCheckCircle } from "react-icons/fa";
import { IoOpenOutline } from "react-icons/io5";
import SeeUserData from './SeeUserData';

const AllOrders = () => {
  const [AllOrders, setAllOrders] = useState();
  const [Options, setOptions] = useState(-1);
  const [Values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("https://bs-pro-api.vercel.app/api/v1/get-all-order", { headers });
      setAllOrders(response.data.data);
    };
    fetch();
  }, [headers]);

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    const id = AllOrders[i]._id;
    const response = await axios.put(`https://bs-pro-api.vercel.app/api/v1/update-status/${id}`, Values, { headers });
    alert(response.data.message);
  };

  return (
    <>
      {!AllOrders && (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      )}

      {AllOrders && AllOrders.length > 0 && (
        <div className="h-full p-4 md:p-6 text-zinc-100">
          <h1 className="text-3xl md:text-4xl font-semibold text-zinc-500 mb-6">
            All Orders
          </h1>
          <div className="mt-4 bg-zinc-900 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[40%] md:w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-0 md:w-[45%] hidden md:block">
              <h1>Description</h1>
            </div>
            <div className="w-[17%] md:w-[9%]">
              <h1>Price</h1>
            </div>
            <div className="w-[30%] md:w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1><FaUserLarge /></h1>
            </div>
          </div>

          {AllOrders.map((items, i) => (
            <div key={i} className="border-b border-zinc-900 bg-gradient-to-l from-zinc-800 via-zinc-500 to-zinc-800 w-full rounded py-2 px-4 flex gap-2">
              <div className="w-[3%]">
                <h1 className="text-center">{i + 1}</h1>
              </div>
              <div className="w-[40%] md:w-[22%]">
                {items.book ? (
                  <Link to={`/view-book-details/${items.book._id}`} className="hover:text-blue-300">
                    <h1 className="">{items.book.title.slice(0, 20)} ....</h1>
                  </Link>
                ) : (
                  <span className="text-red-500">Book Unavailable</span>
                )}
              </div>
              <div className="w-0 md:w-[45%] hidden md:block">
                <h1 className="">
                  {items.book ? items.book.desc.slice(0, 50) : 'Description Unavailable'} ....
                </h1>
              </div>
              <div className="w-[17%] md:w-[9%]">
                <h1 className="">{items.book ? `Tk ${items.book.price}` : 'N/A'}</h1>
              </div>
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button className="hover:scale-105 transition-all duration-300" onClick={() => setOptions(i)}>
                    {items.status === "Order Placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-950">{items.status}</div>
                    )  : items.status === "Out of Stock" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>
                  <div className={`${Options === i ? "flex" : "hidden"}`}>
                    <select
                      name="status"
                      className="bg-gray-800"
                      onChange={change}
                      value={Values.status}
                    >
                      {["Order placed", "Out for delivery", "Delivered", "Canceled","Out of Stock"].map((status, index) => (
                        <option value={status} key={index}>
                          {status}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheckCircle />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {userDivData && (
        <SeeUserData 
          userDivData={userDivData} 
          userDiv={userDiv} 
          setuserDiv={setuserDiv} 
        />
      )}
    </>
  );
};

export default AllOrders;
