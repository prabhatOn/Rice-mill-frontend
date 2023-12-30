import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";

const Add_Broker = () => {
  const [brokerdata, setbrokerdata] = useState({
    broker_name: "",
    broker_phone_number: 0,
  });
  const initialData = {
    broker_name: "",
    broker_phone_number: 0,
  };
  const resetForm = () => {
    setbrokerdata(initialData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setbrokerdata({
      ...brokerdata,
      [name]: value,
    });
  };

  const apiKey = import.meta.env.VITE_API_KEY;
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(brokerdata);
    try {
      const response = await axios.post(
        "http://localhost:8000/broker/",
        brokerdata,
        {
          headers: {
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        console.log("Transporter added successfully");
        toast.success("Transporter added successfully", {
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
        console.error("Failed to add transporter");
        toast.error("Failed to add transporter", {
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
      console.error("Error:", error);
      toast.error(`Error adding transporter: ${error.message}`, {
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
            Add New Broker
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <Inputbox
                label="Broker Name"
                name="broker_name"
                value={brokerdata.broker_name}
                onChange={handleInputChange}
                placeholder="Enter Broker name"
                required={true}
              />
              <Inputbox
                label="Phone Number"
                name="broker_phone_number"
                value={brokerdata.broker_phone_number}
                onChange={handleInputChange}
                placeholder="Enter Broker Phone Number"
                required={true}
                pattern="[0-9]{10}"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Party
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

export default Add_Broker;
