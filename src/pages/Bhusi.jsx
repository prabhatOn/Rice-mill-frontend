import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
const Bhusi = () => {
  const [BhusiData, setBhusiData] = useState({
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    number_of_bags: 0,
    weight: 0,
    truck_number_id: "",
    rate: 0,
    amount: 0,
  });
  const [Alldata, setAlldata] = useState([]);

  useEffect(() => {
    async function fetchMillData() {
      try {
        const All_data = await axios.get(
          "http://localhost:8000/rice-truck-party-brokers"
        );

        const data = All_data.data;
        setAlldata(data);
        // console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchMillData();
  }, []);
  const initialBhusiData = {
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    number_of_bags: 0,
    weight: 0,
    truck_number_id: "",
    rate: 0,
    amount: 0,
  };
  const resetForm = () => {
    setBhusiData(initialBhusiData);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setBhusiData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/bhushi",
        BhusiData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Bhusi  added successfully");
        toast.success(" Bhusi added successfully", {
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
        console.error("Failed to add Bhusi ");
        toast.error("Failed to add Bhusi ", {
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
      toast.error("Error adding  Bhusi", {
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
            Add Bhusi
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[740px]">
          <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="RST"
                  name="rst_number"
                  type="number"
                  value={BhusiData.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter rst number"
                />
                <Dateinput
                  value={BhusiData.date}
                  onChange={handleInputChange}
                  label="Date"
                  name="date"
                />
              </div>
              <div className="flex justify-between flex-wrap ">
                <SelectInput
                  label="Party"
                  name="party_id"
                  placeholder="Select Party"
                  options={
                    Alldata.party_data &&
                    Alldata.party_data.map((option) => ({
                      label: option.party_name,
                      value: option.party_id,
                    }))
                  }
                  value={
                    BhusiData.party_id
                      ? {
                          label: Alldata.party_data.find(
                            (option) => option.party_id === BhusiData.party_id
                          ).party_name,
                          value: BhusiData.party_id,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "party_id",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                />
                <SelectInput
                  label="Select Rice Mill"
                  name="rice_mill_name_id"
                  options={
                    Alldata.rice_mill_data &&
                    Alldata.rice_mill_data.map((option) => ({
                      label: option.rice_mill_name,
                      value: option.rice_mill_id,
                    }))
                  }
                  value={
                    BhusiData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              BhusiData.rice_mill_name_id
                          ).rice_mill_name,
                          value: BhusiData.rice_mill_name_id,
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
              </div>
              <div className="flex justify-between flex-wrap ">
                <Inputbox
                  label="Bags "
                  name="number_of_bags"
                  type="number"
                  value={BhusiData.number_of_bags}
                  onChange={handleInputChange}
                  placeholder="Enter Number of bags"
                />
                <Inputbox
                  label=" Weight"
                  name="weight"
                  type="number"
                  value={BhusiData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter Weight "
                />
              </div>

              <div className="flex justify-between flex-wrap ">
                <SelectInput
                  label="Truck Number"
                  name="truck_number_id"
                  options={
                    Alldata.truck_data &&
                    Alldata.truck_data.map((option) => ({
                      label: option.truck_number,
                      value: option.truck_id,
                    }))
                  }
                  value={
                    BhusiData.truck_number_id
                      ? {
                          label: Alldata.truck_data.find(
                            (option) =>
                              option.truck_id === BhusiData.truck_number_id
                          ).truck_number,
                          value: BhusiData.truck_number_id,
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
                <Inputbox
                  label="Rate"
                  name="rate"
                  type="number"
                  value={BhusiData.rate}
                  onChange={handleInputChange}
                  placeholder="Enter Rate "
                />
              </div>

              <Inputbox
                label="Amount "
                name="amount"
                type="number"
                value={BhusiData.amount}
                onChange={handleInputChange}
                placeholder="Enter  Remarks "
              />

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Bhusi
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

export default Bhusi;
