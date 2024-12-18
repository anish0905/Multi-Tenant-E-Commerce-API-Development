import React, { useState } from "react";
import axios from "axios";

import BASE_URL from "../../constant";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const [register, setRegister] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleToggle = () => {
    setRegister(!register);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    try {
      if (register) {
        // Registration API
        const response = await axios.post(`${BASE_URL}/vendor/register`, {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
        console.log("Register Success:", response.data);
        alert("Registration Successful!");
        handleToggle();
        setFormData({ email: "", password: "", name: "" });
      } else {
        // Login API
        const response = await axios.post(`${BASE_URL}/vendor/login`, {
          email: formData.email,
          password: formData.password,
        });
        console.log("Login Success:", response.data);

        const { token, vendor } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("venderId", vendor._id);
          alert("Login Successful!");
          navigate("/dashboard");
        } else {
          alert("Invalid Credentials!");
        }

        setFormData({ email: "", password: "" });
      }
    } catch (error) {
      console.error("Error", error.response?.data || error.message);
      alert("Error logging in or registering");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Login Container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-700">
          {register ? "Register" : "Login"}
        </h2>

        {/* Form */}
        <form className="flex flex-col" onSubmit={handleSubmit}>
          {register && (
            <div className="mb-4">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Enter Your Name"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          {/* Email Input */}
          <div className="mb-4">
            <input
              value={formData.email}
              onChange={handleChange}
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter Your Email"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password Input */}
          <div className="mb-6">
            <input
              value={formData.password}
              onChange={handleChange}
              type="password"
              id="password"
              name="password"
              required
              placeholder="Enter your Password"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-3 bg-blue-500 text-white font-bold rounded-md hover:bg-blue-600 transition duration-300"
          >
            {register ? "Register" : "Login"}
          </button>
        </form>

        {/* Toggle Text */}
        <p className="flex justify-end mt-4">
          {register ? "Already have an account?" : "Don't have an account?"}
          <span
            className="text-red-700 cursor-pointer ml-1"
            onClick={handleToggle}
          >
            {register ? "Login" : "Register"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
