import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
import Dateinput from "../inputelement/Dateinput";
import Inputbox from "../inputelement/Inputbox";
const Add_Do = () => {
  const [DoData, setDoData] = useState({
    select_mill_id: "",
    date: "",
    do_number: "",
    select_argeement_id: "",
    mota_weight: 0,
    mota_Bardana: 0,
    patla_weight: 0,
    patla_bardana: 0,
    sarna_weight: 0,
    sarna_bardana: 0,
    total_weight: 0,
    total_bardana: 0,
    society_name_id: "",
    truck_number_id: "",
  });

  const [DoOptions, setDoOptions] = useState([]);
  const apiKey = import.meta.env.VITE_API_KEY;
  useEffect(() => {
    async function fetchMillData() {
      try {
        const Mill_response = await axios.get(
          "http://localhost:8000/rice-agreement-transporter-truck-society-data",
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

  const initialDoData = {
    select_mill_id: "",
    date: "",
    do_number: "",
    select_argeement_id: "",
    mota_weight: 0,
    mota_Bardana: 0,
    patla_weight: 0,
    patla_bardana: 0,
    sarna_weight: 0,
    sarna_bardana: 0,
    total_weight: 0,
    total_bardana: 0,
    society_name_id: "",
    truck_number_id: "",
  };
  const resetForm = () => {
    setDoData(initialDoData);
  };

  const [DoOptionsagreement, setDoOptionsAgreement] = useState([]);
  useEffect(() => {
    async function fetchagrementData() {
      try {
        const agremennt_data = await axios.get(
          `http://localhost:8000/rice-agreement-data/${DoData.select_mill_id}`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = agremennt_data.data;
        setDoOptionsAgreement(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    if (DoData.select_mill_id) {
      fetchagrementData();
    }
  }, [DoData.select_mill_id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDoData({
      ...DoData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(DoData);
    try {
      const response = await axios.post(
        "http://localhost:8000/add-do/",
        DoData,
        {
          headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
          },
        }
      );
      // console.log("Response:", response);
      if (response.status >= 201 || response.status < 300) {
        // console.log("Form data sent successfully");
        toast.success("Do added successfully", {
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
        console.error("Failed to send form data");
        toast.error("Failed to add Do", {
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
      toast.error("Error Adding Do", {
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
            Add Do
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[680px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <SelectInput
                label="Select Rice Mill"
                name="select_mill_id"
                options={
                  DoOptions.rice_mill_data &&
                  DoOptions.rice_mill_data.map((option) => ({
                    label: option.rice_mill_name,
                    value: option.rice_mill_id,
                  }))
                }
                value={
                  DoData.select_mill_id
                    ? {
                        label: DoOptions.rice_mill_data.find(
                          (option) =>
                            option.rice_mill_id === DoData.select_mill_id
                        ).rice_mill_name,
                        value: DoData.select_mill_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "select_mill_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Mill"
              />
              <div>
                <Dateinput
                  value={DoData.date}
                  onChange={handleInputChange}
                  label="Date"
                  name="date"
                />
              </div>

              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Do Number"
                  name="do_number"
                  value={DoData.do_number}
                  onChange={handleInputChange}
                  placeholder="Enter DO Number"
                  pattern="DO\d{13}"
                  required={true}
                />
                <SelectInput
                  label="Agreement Number"
                  name="select_argeement_id"
                  placeholder="Select Agreement"
                  options={
                    DoOptionsagreement.agreement_data &&
                    DoOptionsagreement.agreement_data.map((option) => ({
                      label: option.agreement_number,
                      value: option.agremennt_id,
                    }))
                  }
                  value={
                    DoData.select_argeement_id
                      ? {
                          label: DoOptionsagreement.agreement_data.find(
                            (option) =>
                              option.agremennt_id === DoData.select_argeement_id
                          ).agreement_number,
                          value: DoData.select_argeement_id,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "select_argeement_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Mota Weight"
                  name="mota_weight"
                  value={DoData.mota_weight}
                  onChange={handleInputChange}
                  placeholder="Enter Mota Weight"
                  type="number"
                />
                <Inputbox
                  label="Mota Bardana"
                  name="mota_Bardana"
                  value={(DoData.mota_Bardana = 2.5 * +DoData.mota_weight)}
                  onChange={handleInputChange}
                  placeholder="Enter Mota Bardana"
                  type="number"
                  disabled={true}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Patla Weight"
                  name="patla_weight"
                  value={DoData.patla_weight}
                  onChange={handleInputChange}
                  placeholder="Enter Patla Weight"
                  type="number"
                  disabled={false}
                />
                <Inputbox
                  label="Patla Bardana"
                  name="patla_bardana"
                  value={(DoData.patla_bardana = 2.5 * +DoData.patla_weight)}
                  onChange={handleInputChange}
                  placeholder="Enter Patla Bardana"
                  type="number"
                  disabled={true}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Sarna Weight"
                  name="sarna_weight"
                  value={DoData.sarna_weight}
                  onChange={handleInputChange}
                  placeholder="Enter Sarna Weight"
                  type="number"
                  disabled={false}
                />
                <Inputbox
                  label="Sarna Bardana"
                  name="sarna_bardana"
                  value={(DoData.sarna_bardana = 2.5 * +DoData.sarna_weight)}
                  onChange={handleInputChange}
                  placeholder="Enter Sarna Bardana"
                  type="number"
                  disabled={true}
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Total Weight"
                  name="total_weight"
                  value={
                    (DoData.total_weight =
                      +DoData.mota_weight +
                      +DoData.patla_weight +
                      +DoData.sarna_weight)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Total Weight"
                  type="number"
                  disabled={true}
                />
                <Inputbox
                  label="Total Bardana"
                  name="total_bardana"
                  value={
                    (DoData.total_bardana =
                      +DoData.mota_Bardana +
                      +DoData.patla_bardana +
                      +DoData.sarna_bardana)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Total Bardana"
                  type="number"
                  disabled={true}
                />
              </div>

              <SelectInput
                label="Society"
                name="society_name_id"
                options={
                  DoOptions.society_data &&
                  DoOptions.society_data.map((option) => ({
                    label: option.society_name,
                    value: option.society_id,
                  }))
                }
                value={
                  DoData.society_name_id
                    ? {
                        label: DoOptions.society_data.find(
                          (option) =>
                            option.society_id === DoData.society_name_id
                        ).society_name,
                        value: DoData.society_name_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "society_name_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Society"
              />
              <SelectInput
                label="Truck Number"
                name="truck_number_id"
                options={
                  DoOptions.truck_data &&
                  DoOptions.truck_data.map((option) => ({
                    label: option.truck_number,
                    value: option.truck_id,
                  }))
                }
                value={
                  DoData.truck_number_id
                    ? {
                        label: DoOptions.truck_data.find(
                          (option) => option.truck_id === DoData.truck_number_id
                        ).truck_number,
                        value: DoData.truck_number_id,
                      }
                    : null
                }
                onChange={(selectedOption) =>
                  handleInputChange({
                    target: {
                      name: "truck_number_id",
                      value: selectedOption ? selectedOption.value : "",
                    },
                  })
                }
                placeholder="Select Truck Number"
              />

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
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
export default Add_Do;
