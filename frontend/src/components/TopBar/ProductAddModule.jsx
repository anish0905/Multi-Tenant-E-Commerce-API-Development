import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../../constant";
const venderId = localStorage.getItem("venderId");

const ProductAddModule = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const [formData, setFormData] = useState({
    vendor: venderId,
    name: "",
    price: "",
    stock: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/products`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setSuccess("Product added successfully");
      setFormData({
        name: "",
        price: "",
        stock: "",
      });
    } catch (error) {
      setError("Failed to add product");
    } finally {
      setLoading(false);
      setError(null);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
        Add Product
      </h2>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        {/* Product Name */}
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder="Product Name"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Price */}
        <input
          name="price"
          value={formData.price}
          onChange={handleChange}
          type="number"
          placeholder="Price"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Quantity */}
        <input
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          type="text"
          placeholder="Quantity"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Loading..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default ProductAddModule;
