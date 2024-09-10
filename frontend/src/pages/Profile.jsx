import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Profile/Sidebar';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Loader from '../components/Loader/Loader';

const Profile = () => {
  // const isLoggedIn = useSelector();
  const [Profile, setProfile] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get("http://localhost:1000/api/v1/get-user-information", { headers });
        setProfile(response.data); // Update the state with the fetched profile data
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      }
    };
    fetch();
  }, []);

  return (
    <div className="bg-zinc-900 px:2 md:px-12 flex flex-col md:flex-row py-8 gap-4 text-white">
      {!Profile && (
        <div className="w-full h-[100%] flex items-center justify-center">
          <Loader /> {" "}
        </div>
      )}
      {Profile && (
        <>
          <div className="w-full md:w-1/6 h-auto lg:h-screen">
            <Sidebar data={Profile}/>
          </div>
          <div className="w-full md:w-5/6">
            <Outlet />
          </div>
        </>
      )}
    </div>
  );
};

export default Profile