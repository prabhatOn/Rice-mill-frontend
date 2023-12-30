import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "../inputelement/Selectinput";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
const Kochia = () => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [kochiaData, setkochiaData] = useState({
    rice_mill_name_id: "",
    kochia_name: "",
    kochia_phone_number: 0,
  });
  const initialData = {
    rice_mill_name_id: "",
    kochia_name: "",
    kochia_phone_number: 0,
  };
  const resetForm = () => {
    setkochiaData(initialData);
  };
  const [DoOptions, setDoOptions] = useState([]);

  // Fetch data for the "Select Rice Mill" dropdown
  useEffect(() => {
    async function fetchMillData() {
      try {
        const Mill_response = await axios.get(
          "http://139.84.133.223:3000/rice-mill",
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = Mill_response.data;
        setDoOptions(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setkochiaData({
      ...kochiaData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://139.84.133.223:3000/kochia",
        kochiaData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Kochia added successfully");
        toast.success("Kochia added successfully", {
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
        console.error("Failed to add Kochia");
        toast.error("Failed to add Kochia", {
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
      toast.error(`Error adding Kochia: ${error.message}`, {
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
            Add New Kochia
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <SelectInput
                label="Select Rice Mill"
                name="rice_mill_name_id"
                options={
                  DoOptions.rice_mill_data &&
                  DoOptions.rice_mill_data.map((option) => ({
                    label: option.rice_mill_name,
                    value: option.rice_mill_id,
                  }))
                }
                value={
                  kochiaData.rice_mill_name_id
                    ? {
                        label: DoOptions.rice_mill_data.find(
                          (option) =>
                            option.rice_mill_id === kochiaData.rice_mill_name_id
                        ).rice_mill_name,
                        value: kochiaData.rice_mill_name_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "rice_mill_name_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />
              <Inputbox
                name="kochia_name"
                label="Kochia Name"
                placeholder="Enter transporter name"
                value={kochiaData.kochia_name}
                onChange={handleInputChange}
                type="text"
              />
              <Inputbox
                name="kochia_phone_number"
                label="Kochia Phone Number"
                placeholder="6234873298"
                value={kochiaData.kochia_phone_number}
                onChange={handleInputChange}
                pattern="[0-9]{10}"
                type="number"
              />
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add New Kochia
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

export default Kochia;
