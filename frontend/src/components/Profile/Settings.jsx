import React, { useState, useEffect } from 'react';
import Loader from '../Loader/Loader';
import axios from 'axios';

const Settings = () => {
  const [Value, setValue] = useState({ address: "" });
  const [ProfileData, setProfileData] = useState();
  const headers = {
    id: localStorage.getItem('id'),
    authorization: `Bearer ${localStorage.getItem('token')}`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        'https://bs-pro-api.vercel.app/api/v1/get-user-information',
        { headers }
      );
      setProfileData(response.data);
      setValue({ address: response.data.address });
    };
    fetch();
  }, []);

  const change = (e) => {
    const { name, value } = e.target;
    setValue({ ...Value, [name]: value });
  };

  const submitAddress = async () => {
    const response = await axios.put(
      "https://bs-pro-api.vercel.app/api/v1/update-address",
      Value,
      { headers }
    );
    alert(response.data.message);
  };

  return (
    <>
      {!ProfileData && (
        <div className="w-full h-screen flex items-center justify-center">
          <Loader />
        </div>
      )}
      {ProfileData && (
        <div className="min-h-screen bg-gradient-to-b from-zinc-700 to-zinc-800 p-6 md:p-12 text-zinc-100">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 text-center">
            Account Settings
          </h1>
          <div className="flex flex-col gap-12 md:flex-row justify-center items-center md:items-start mb-12">
            <div className="w-full md:w-1/2">
              <label className="text-lg font-semibold tracking-wide" htmlFor="">
                Username
              </label>
              <p className="p-4 rounded-lg bg-zinc-800 mt-2 font-semibold text-xl shadow-md border border-zinc-700">
                {ProfileData.username}
              </p>
            </div>
            <div className="w-full md:w-1/2">
              <label className="text-lg font-semibold tracking-wide" htmlFor="">
                Email
              </label>
              <p className="p-4 rounded-lg bg-zinc-800 mt-2 font-semibold text-xl shadow-md border border-zinc-700">
                {ProfileData.email}
              </p>
            </div>
          </div>
          <div className="flex flex-col md:w-1/2 mx-auto">
            <label className="text-lg font-semibold tracking-wide" htmlFor="">
              Address
            </label>
            <textarea
              className="p-4 rounded-lg bg-zinc-800 mt-2 font-semibold text-lg shadow-md border border-zinc-700 focus:ring-2 focus:ring-green-700"
              rows="5"
              placeholder="Enter your address"
              name="address"
              value={Value.address}
              onChange={change}
            />
          </div>
          <div className="mt-8 flex justify-center">
            <button
              className="bg-yellow-500 text-zinc-900 font-bold px-6 py-3 rounded-full hover:bg-green-400 transition-transform transform hover:scale-105 shadow-lg focus:ring-4 focus:ring-yellow-500"
              onClick={submitAddress}
            >
              Update Address
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Settings;
