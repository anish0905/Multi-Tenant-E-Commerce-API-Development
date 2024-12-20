import React, { useEffect, useState } from "react";
import SideBar from "../sideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import SecondBar from "../TopBar/SecondBar";
import axios from "axios";
import BASE_URL from "../../constant";
import ProductAddModule from "../TopBar/ProductAddModule";
import { RxCross1 } from "react-icons/rx";

const Products = () => {
  const [edit, setEdit] = useState(false);
  const vendorId = localStorage.getItem("venderId"); // Retrieve vendor ID from localStorage

  const [products, setProducts] = useState([]); // State for product list
  const [error, setError] = useState(null); // State for errors
  const [loading, setLoading] = useState(true); // Loading state for fetching products

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/products`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Attach token for authentication
            },
          },
          []
        );

        const allProducts = response.data; // Assuming API returns an array
        console.log("All Products:", allProducts);

        // Filter products based on vendorId
        const productsByVendor = allProducts.filter(
          (product) => product.vendor === vendorId
        );

        setProducts(productsByVendor); // Update state with filtered products
      } catch (error) {
        console.error("Error fetching products:", error.message);
        setError("Failed to fetch products. Please try again."); // User-friendly error message
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchProducts();
  }, [vendorId]); // Re-run effect if vendorId changes

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white border-r border-gray-300">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1">
        <TopBar text={"Products"} />

        {/* SecondBar with "Add Product" Button */}
        <SecondBar />

        {/* Product List */}
        <div className="p-8">
          <h2 className="text-3xl font-semibold text-gray-800">Product List</h2>
          <p className="mt-2 text-gray-600">
            Manage and view all the products you have added.
          </p>

          {/* Display Error */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center mt-8">
              <div className="spinner-border animate-spin w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full"></div>
            </div>
          )}

          {/* Product List Grid */}
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-6 rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <h3 className="text-xl font-semibold text-gray-800">
                    {product.name || "Unnamed Product"}
                  </h3>
                  <p className="mt-2 text-gray-600 font-medium">
                    Price: ${product.price || 0}
                  </p>
                  <p className="mt-2 text-gray-600 font-medium">
                    Stock: {product.stock || 0}
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <button
                      onClick={() => setEdit(true)}
                      className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-md"
                    >
                      Edit
                    </button>
                    <button className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-md">
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="mt-4 text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modal for Adding/Editing Product */}
      {edit && <div className="fixed inset-0 bg-black opacity-50 z-40"></div>}
      {edit && (
        <div className="fixed inset-0 flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
          <div className="bg-white p-10 rounded-lg shadow-lg w-1/3">
            <div className="relative w-full bg-gray-200">
              <h1 className="absolute top-1 right-2 text-xl">
                <RxCross1
                  className="text-2xl cursor-pointer"
                  onClick={() => setEdit(false)}
                />
              </h1>
            </div>
            <ProductAddModule />
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
