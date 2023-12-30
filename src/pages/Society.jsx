import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Inputbox from "../inputelement/Inputbox";
// import SelectInput from "../inputelement/Selectinput";
const AddNewSociety = () => {
  const [societyData, setSocietyData] = useState({
    society_name: "",
    distance_from_mill: 0,
    google_distance: 0,
    actual_distance: 0,
    transporting_rate: 0,
  });
  const initialData = {
    society_name: "",
    distance_from_mill: 0,
    google_distance: 0,
    actual_distance: 0,
    transporting_rate: 0,
  };
  const resetForm = () => {
    setSocietyData(initialData);
  };
  const apiKey = import.meta.env.VITE_API_KEY;
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSocietyData({
      ...societyData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/society/",
        societyData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        console.log("Society added successfully");
        toast.success("Society added successfully", {
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
        console.error("Failed to add society");
        toast.error("Failed to add society", {
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
      toast.error("Error adding society", {
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
            Add New Society
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Society Name Input */}
              <Inputbox
                label="Society Name"
                name="society_name"
                placeholder="Enter society name"
                value={societyData.society_name}
                onChange={handleInputChange}
                type="text"
              />

              {/* Distance Input */}
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Google Distance"
                  name="google_distance"
                  placeholder="Enter distance from mill"
                  type="number"
                  value={societyData.google_distance}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label=" Actual Distance"
                  name="actual_distance"
                  type="number"
                  placeholder="Enter distance from mill"
                  value={societyData.actual_distance}
                  onChange={handleInputChange}
                />
              </div>
              {/* Transporting Input */}
              <Inputbox
                label="Transporting Rate"
                name="transporting_rate"
                placeholder="Enter transporting rate"
                type="text"
                value={societyData.transporting_rate}
                onChange={handleInputChange}
              />
              <Inputbox
                label="Distance From Mill"
                name="distance_from_mill"
                placeholder="Enter Distance Form Mill"
                type="text"
                value={societyData.distance_from_mill}
                onChange={handleInputChange}
              />

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Society
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

export default AddNewSociety;
