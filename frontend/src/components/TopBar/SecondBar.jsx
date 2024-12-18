import React, { useState } from "react";
import ProductAddModule from "./ProductAddModule";
import { RxCross1 } from "react-icons/rx";

const SecondBar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* Overlay Background when the modal is open */}
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black opacity-50 z-40"></div>
      )}

      {/* Modal */}
      {open && (
        <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 transition-all duration-300 ease-in-out">
          <div className="bg-white p-10 rounded-lg shadow-lg w-1/3">
            <div className="relative w-full  bg-gray-200">
              <h1 className="absolute top-1 right-2 text-xl">
                <RxCross1
                  className=" text-2xl  cursor-pointer"
                  onClick={() => setOpen(false)}
                />
              </h1>
            </div>
            <ProductAddModule />
          </div>
        </div>
      )}

      {/* SecondBar - Add Product Button */}
      <div className="bg-blue-500 mt-4 h-16 flex items-center justify-end">
        <button
          className="border-2 p-3 rounded-md px-12 hover:bg-blue-700 text-white font-bold mr-10 transition duration-300"
          onClick={() => setOpen(true)}
        >
          Add Product
        </button>
      </div>
    </div>
  );
};

export default SecondBar;
