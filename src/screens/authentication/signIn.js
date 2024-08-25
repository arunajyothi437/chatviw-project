import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to hold error message
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      // Store the token in local storage
      localStorage.setItem("token", response.data.token);
      console.log("----------------------------",response.data.token)

      sessionStorage.setItem("user", JSON.stringify(response.data.user));
      console.log(response.data.user)

      // Navigate to the home page
      navigate("/users");
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7ff] font-sans">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center">
          <h2 className="text-center text-xl font-semibold text-[#343a40] mb-2">
            Sign in
          </h2>
          <p className="text-center text-gray-500 mb-8">
            Sign in to continue to Chatvia.
          </p>
          <form className="bg-white px-8 py-10 w-full" onSubmit={handleLogin}>
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-800 border border-red-300 rounded">
                {error}
              </div>
            )}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <div className="flex items-center border rounded-md px-4 py-2">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="admin@themesbrand.com"
                  className="w-full text-gray-700 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="block text-gray-700 text-sm font-bold"
                  htmlFor="password"
                >
                  Password
                </label>
                <a href="#" className="text-sm text-gray-500 hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="flex items-center border rounded-md px-4 py-2">
                <FaLock className="text-gray-400 mr-3 " />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="******"
                  className="w-full text-gray-700 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="mb-6">
              <button
                type="submit"
                className="w-full bg-[#7269ef] text-white py-2 rounded-md hover:bg-[#6159cb] transition duration-150"
              >
                Sign in
              </button>
            </div>
          </form>
          <div className="text-center text-gray-600 text-base mt-10">
            Don’t have an account?{" "}
            <a href="/register" className="text-indigo-500 ">
              Signup now
            </a>
          </div>
          <p className="text-center text-gray-500 text-base mt-3">
            © 2024 Chatvia. Crafted with <span className="text-red-500">❤</span>{" "}
            by Themesbrand
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
