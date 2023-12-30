import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";

import axios from "axios";

const Addricemill = () => {
  const [Addricedata, setAddricedata] = useState({
    gst_number: "",
    rice_mill_name: "",
    mill_address: "",
    phone_number: "",
    rice_mill_capacity: "",
  });
  const initialData = {
    gst_number: "",
    rice_mill_name: "",
    mill_address: "",
    phone_number: "",
    rice_mill_capacity: "",
  };
  const resetForm = () => {
    setAddricedata(initialData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAddricedata({
      ...Addricedata,
      [name]: value,
    });
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  const validateGST = (gstNumber) => {
    const gstPattern =
      /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}[Z]{1}[0-9A-Z]{1}$/;
    return gstPattern.test(gstNumber);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateGST(Addricedata.gst_number)) {
      toast.error("Invalid GST Number. Please enter a valid GST Number", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }
    try {
      const response = await axios.post(
        "https://mill.dappfolk.com/add-rice-mill/",

        Addricedata,
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Rice mill added successfully");
        toast.success("Rise mill added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        resetForm();
      } else if (response.status === 400) {
        const errorResponse = await response.json();
        // console.log(errorResponse.detail);
        toast.error(errorResponse.detail, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        // console.error("Failed to add rice mill");
        toast.error("Failed to add rice mill", {
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
      toast.error("Error adding rice mill", {
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
            Add New Rice Mill
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <div className="flex justify-between">
                  <label
                    htmlFor="rice_mill_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Select Rice Mill
                  </label>
                </div>
                <div className="mt-1">
                  <select
                    value={Addricedata.rice_mill_name}
                    onChange={handleInputChange}
                    type="text"
                    name="rice_mill_name"
                    className="bg-white block w-full px-1.5 rounded-md border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">-Select a Rice Mill-</option>
                    <option value="Purushotam Rice Mill">
                      Purushotam Rice Mill
                    </option>
                    <option value="Dushyant Rice mill">
                      Dushyant Rice Mill
                    </option>
                    <option value="Tulsi Rice Mill">Tulsi Rice Mill</option>
                  </select>
                </div>
              </div>

              <Inputbox
                label="GST Number"
                name="gst_number"
                value={Addricedata.gst_number}
                type="text"
                placeholder="Enter GST Number"
                onChange={handleInputChange}
              />
              <Inputbox
                label="Mill Address"
                name="mill_address"
                placeholder="Enter Mill Address"
                type="text"
                value={Addricedata.mill_address}
                onChange={handleInputChange}
              />
              <Inputbox
                label="Phone number"
                name="phone_number"
                value={Addricedata.phone_number}
                onChange={handleInputChange}
                type="text"
                placeholder="Enter Phone Number"
                pattern="[0-9]{10}"
              />
              <Inputbox
                label="Rice Mill Capacity"
                name="rice_mill_capacity"
                value={Addricedata.rice_mill_capacity}
                type="text"
                onChange={handleInputChange}
                placeholder="Enter Rice Mill Capacity"
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

export default Addricemill;
