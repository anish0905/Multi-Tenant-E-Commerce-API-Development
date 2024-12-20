import React, { useEffect, useState } from "react";
import axios from "axios";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5001/api/products");
        console.log(response);
        setProducts(response.data);
      } catch (error) {}
    };
    fetchProducts();
  }, []);

  return (
    <div className=" bg-gray-100 flex  justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mt-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full text-center"
          >
            {/* Product Image */}
            {/* <div className="mb-4">
              <img
                src={product.image}
                alt={product.name}
                className="rounded-md w-full h-48 object-cover"
              />
            </div> */}

            {/* Product Title */}
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {product.name}
            </h1>

            {/* Product Description */}
            <p className="text-gray-600 text-sm mb-4">
              This is a short description of the product. It highlights the key
              features.
            </p>

            {/* Product Price */}
            <p className="text-lg font-semibold text-green-600 mb-4">
              ₹{product.price}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-center gap-6">
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition">
                  Add to Cart
                </button>
                <button className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded transition">
                  Add to Wishlist
                </button>
              </div>
              {/* <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded transition">
                View Details
              </button>
              <button className="bg-gray-800 hover:bg-gray-900 text-white py-2 rounded transition">
                Back to Products
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
