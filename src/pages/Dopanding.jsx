import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectInput from "../inputelement/Selectinput";
import DateInput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";
const Dopanding = () => {
  const [DopandingData, setDopandingData] = useState({
    do_number_id: "",
    rice_mill_id: "",
    date: "",
    mota: "",
    patla: "",
    sarna: "",
    Total: 0,
  });

  const initialDoData = {
    do_number_id: "",
    rice_mill_id: "",
    date: "",
    mota: "",
    patla: "",
    sarna: "",
    Total: 0,
  };
  const resetForm = () => {
    setDopandingData(initialDoData);
  };
  const [DoOptions, setDoOptions] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  // Fetch data for the "Select Rice Mill" dropdown
  useEffect(() => {
    async function fetchMillData() {
      try {
        const Mill_response = await axios.get(
          "http://localhost:8000/rice-do-society-truck-transporter",
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

  const [DoOptionsricedonumber, setDoOptionsRiceDoNumber] = useState([]);
  useEffect(() => {
    async function fetchricedonumberData() {
      try {
        const truck_transporter = await axios.get(
          `http://localhost:8000/rice-do-number/${DopandingData.rice_mill_id}`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = truck_transporter.data;
        setDoOptionsRiceDoNumber(data);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (DopandingData.rice_mill_id) {
      fetchricedonumberData();
    }
  }, [DopandingData.rice_mill_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setDopandingData({
      ...DopandingData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(DopandingData);

    try {
      const response = await axios.post(
        "http://localhost:8000/do-panding",
        DopandingData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );

      if (response.status === 201 || response.status === 300) {
        console.log("DO Panding added successfully");
        toast.success("DO Panding added successfully", {
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
        console.error("Failed to add Do Panding");
        toast.error("Failed to add Do Panding", {
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
      toast.error("Error adding Do  Panding", {
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
          <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Add Do Panding
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <SelectInput
                label="Select Rice Mill"
                name="rice_mill_id"
                options={
                  DoOptions.rice_mill_data &&
                  DoOptions.rice_mill_data.map((option) => ({
                    label: option.rice_mill_name,
                    value: option.rice_mill_id,
                  }))
                }
                value={
                  DopandingData.rice_mill_id
                    ? {
                        label: DoOptions.rice_mill_data.find(
                          (option) =>
                            option.rice_mill_id === DopandingData.rice_mill_id
                        ).rice_mill_name,
                        value: DopandingData.rice_mill_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "rice_mill_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />
              <div className="flex justify-between flex-wrap ">
                <DateInput
                  label="DO Date"
                  name="date"
                  value={DopandingData.date}
                  onChange={handleInputChange}
                />

                <SelectInput
                  label="DO Number"
                  name="do_number_id"
                  options={
                    DoOptionsricedonumber.do_number_data &&
                    DoOptionsricedonumber.do_number_data.map((option) => ({
                      label: option.do_number,
                      value: option.do_id,
                    }))
                  }
                  value={
                    DopandingData.do_number_id
                      ? {
                          label: DoOptionsricedonumber.do_number_data.find(
                            (option) =>
                              option.do_id === DopandingData.do_number_id
                          ).do_number,
                          value: DopandingData.do_number_id,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "do_number_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select DO Number"
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Mota"
                  type="text"
                  name="mota"
                  value={DopandingData.mota}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Patla"
                  type="text"
                  name="patla"
                  value={DopandingData.patla}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="sarna"
                  type="text"
                  name="sarna"
                  value={DopandingData.sarna}
                  onChange={handleInputChange}
                />
                <Inputbox
                  label="Total"
                  disabled={true}
                  type="number"
                  name="Total"
                  value={
                    (DopandingData.Total =
                      +DopandingData.mota +
                      +DopandingData.patla +
                      +DopandingData.sarna)
                  }
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add DO Panding
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </>
  );
};

export default Dopanding;
