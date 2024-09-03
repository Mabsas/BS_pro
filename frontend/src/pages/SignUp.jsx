import React from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 shadow-lg">
        <p className="text-zinc-200 text-2xl font-bold mb-4 text-center">Sign Up</p>
        <div className="space-y-4">
          <div>
            <label htmlFor="username" className="text-zinc-400 block">Username</label>
            <input 
              type="text"
              id="username"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition duration-300" 
              placeholder="Username"
              name="username"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="text-zinc-400 block">Email</label>
            <input 
              type="email"
              id="email"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition duration-300" 
              placeholder="xyz@gmail.com"
              name="email"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="text-zinc-400 block">Password</label>
            <input 
              type="password"
              id="password"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition duration-300" 
              placeholder="Password"
              name="password"
              required
            />
          </div>
          <div>
            <label htmlFor="address" className="text-zinc-400 block">Address</label>
            <textarea 
              id="address"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-3 rounded focus:ring-2 focus:ring-blue-500 outline-none transition duration-300"
              rows="5" 
              placeholder="Address"
              name="address"
              required
            />
          </div>
          <div>
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded hover:opacity-90 transition duration-300">
              Sign Up
            </button>
            <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
              Or
            </p>
            <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
              Already have an account? &nbsp;
              <Link to="/login" className="hover:text-blue-500 transition duration-300">
                <u>Log In</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
