import React from 'react';
import { FaUser, FaLock } from 'react-icons/fa';

function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-lg rounded-lg px-8 py-10">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Sign in</h2>
          <p className="text-center text-gray-500 mb-8">Sign in to continue to Chatvia.</p>
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Username
              </label>
              <div className="flex items-center border rounded-md px-4 py-2">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="admin@themesbrand.com"
                  className="w-full text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-sm text-gray-600 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center border rounded-md px-4 py-2">
                <FaLock className="text-gray-400 mr-3" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="******"
                  className="w-full text-gray-700 focus:outline-none"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-indigo-600"
                />
                <span className="ml-2 text-gray-700">Remember me</span>
              </label>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition duration-150"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center text-gray-600 text-sm">
            Don’t have an account? <a href="#" className="text-indigo-500 hover:underline">Signup now</a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs mt-6">
          © 2024 Chatvia. Crafted with <span className="text-red-500">❤</span> by Themesbrand
        </p>
      </div>
    </div>
  );
}

export default SignIn;
