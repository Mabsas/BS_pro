import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-lg px-8 py-5 w-full md:w-3/6 lg:w-2/6 shadow-lg">
        <p className="text-zinc-200 text-2xl font-bold mb-4 text-center">Log In</p>
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
            <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold py-2 rounded hover:opacity-90 transition duration-300">
              Login
            </button>
            <p className="flex mt-4 items-center justify-center text-zinc-200 font-semibold">
              Or
            </p>
            <p className="flex mt-4 items-center justify-center text-zinc-500 font-semibold">
              Don't have an account? &nbsp;
              <Link to="/SignUp" className="hover:text-blue-500 transition duration-300">
                <u>Sign Up</u>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login