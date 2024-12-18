import React, { useEffect } from "react";
import SideBar from "../sideBar/SideBar";
import TopBar from "../TopBar/TopBar";
import SecondBar from "../TopBar/SecondBar";
import axios from "axios";
import BASE_URL from "../../constant";

const Products = () => {
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/products`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setProducts(response.data);
      } catch (error) {
        setError(error.message);
        // Handle network errors here
        console.error("Network Error:", error.message);
      }
    };
    fetchProducts();
  });

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-300 bg-gray-800 text-white">
        <SideBar />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-100">
        <TopBar text={"Products"} />

        {/* SecondBar with "Add Product" Button */}
        <SecondBar />

        {/* Main Content for Products */}
        {/* Main Content for Products */}
        <div className="p-8">
          <h2 className="text-3xl font-semibold text-gray-700">Product List</h2>
          <p className="mt-2 text-gray-500">
            Here you can manage and view all the products you have added.
          </p>

          {/* Display Error */}
          {error && <p className="text-red-500 mt-4">{error}</p>}

          {/* Product List */}
          <div className="mt-6">
            {products.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-6 rounded-lg shadow-md"
                  >
                    <h3 className="text-xl font-semibold text-gray-800">
                      {product.name}
                    </h3>
                    <p className="mt-2 text-gray-500">{product.description}</p>
                    <p className="mt-2 text-gray-600 font-medium">
                      Price: ${product.price}
                    </p>

                    <p className="mt-2 text-gray-600 font-medium">
                      stock: {product.stock}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mt-4 text-gray-500">No products found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
