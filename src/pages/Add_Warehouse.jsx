import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";
const Add_Warehouse = () => {
  const [Addwarehouse, Addwarehousedata] = useState({
    ware_houes_name: "",
    ware_house_transporting_rate: 0,
    hamalirate: 0,
  });
  const initialData = {
    ware_houes_name: "",
    ware_house_transporting_rate: 0,
    hamalirate: 0,
  };
  const resetForm = () => {
    Addwarehousedata(initialData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    Addwarehousedata({
      ...Addwarehouse,
      [name]: value,
    });
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/ware-house-transporting/",
        Addwarehousedata,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Rice mill added successfully");
        toast.success("Ware House added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetForm();
      } else {
        // console.error("Failed to add rice mill");
        toast.error("Failed to add Ware House", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      // console.error("Error:", error);
      toast.error("Error adding Ware House", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />

          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Ware House
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Inputbox
                label="Ware House Name"
                name="ware_houes_name"
                placeholder="Enter Ware House Name"
                value={Addwarehouse.ware_houes_name}
                onChange={handleInputChange}
                type="text"
              />
              <Inputbox
                label="Ware House Name"
                name="ware_house_transporting_rate"
                placeholder="Enter Transporting Rate"
                type="number"
                value={Addwarehouse.ware_house_transporting_rate}
                onChange={handleInputChange}
              />
              <Inputbox
                label=" Hamali Rate"
                name="hamalirate"
                placeholder="Enter Hamali Rate"
                value={Addwarehouse.hamalirate}
                onChange={handleInputChange}
                type="number"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Rice Mill
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Add_Warehouse;
