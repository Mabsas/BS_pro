import React from 'react'
import { RxCrossCircled } from "react-icons/rx";

//userDivData stores all user data
//setuserDiv hides user info when clicked on cross sign
//userDiv checks if user info div is open or not

const SeeUserData = ({ userDivData, userDiv, setuserDiv}) => {
  return (
    <>
      <div className={`${userDiv} top-0 left-0 h-screen w-full bg-zinc-800 opacity-80`}></div> 
      <div className={`${userDiv} top-0 left-0 h-screen w-full flex items-center justify-center`}>
        <div className="bg-gradient-to-br from-slate-900 via-gray-600 to-zinc-800 rounded p-4 w-[80%] md:w-[50%] lg:w-[40%] text-yellow-100">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold">User Information</h1>
            <button onClick={() => setuserDiv("hidden")}>
              <RxCrossCircled />
            </button>
          </div>
          <div className="mt-2">
            <label htmlFor="">
              Username: <span className="font-semibold">{userDivData.username}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              Email: <span className="font-semibold">{userDivData.email}</span>
            </label>
          </div>
          <div className="mt-4">
            <label htmlFor="">
              Address: <span className="font-semibold">{userDivData.address}</span>
            </label>
          </div>
        </div>
      </div>
    </>
  )
}

export default SeeUserData;
