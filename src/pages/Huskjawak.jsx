import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
const Huskjawak = () => {
  const [HuskjawakData, setHuskjawakData] = useState({
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    remarks: "",
    broker: "",
    brokerage_percentage: 0,
    weight: 0,
    rate: 0,
    number_of_bags: 0,
    truck_number_id: "",
    total: 0,
    brokerage: 0,
    net_receivable: 0,
    received_date: "",
    loading_date: "",
    payment_received: 0,
    number_of_days: 0,
    payment_difference: 0,
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
  const initialHuskjawakData = {
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    remarks: "",
    broker: "",
    brokerage_percentage: 0,
    weight: 0,
    rate: 0,
    number_of_bags: 0,
    truck_number_id: "",
    total: 0,
    brokerage: 0,
    net_receivable: 0,
    received_date: "",
    loading_date: "",
    payment_received: 0,
    number_of_days: 0,
    payment_difference: 0,
  };
  const resetForm = () => {
    setHuskjawakData(initialHuskjawakData);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // console.log(value);
    setHuskjawakData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(HuskjawakData);

    try {
      const response = await axios.post(
        "http://localhost:8000/husk-jawak/",
        HuskjawakData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Husk Jawak added successfully");
        toast.success("Husk Jawak added successfully", {
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
        console.error("Failed to add Husk Jawak");
        toast.error("Failed to add Husk Jawak", {
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
      toast.error("Error adding Husk Jawak", {
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
            Add Husk Jawak
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
                  value={HuskjawakData.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter rst number"
                />
                <Dateinput
                  value={HuskjawakData.date}
                  onChange={handleInputChange}
                  label="Date"
                  name="date"
                />
              </div>
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
                  HuskjawakData.party_id
                    ? {
                        label: Alldata.party_data.find(
                          (option) => option.party_id === HuskjawakData.party_id
                        ).party_name,
                        value: HuskjawakData.party_id,
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
              <div className="flex justify-between flex-wrap">
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
                    HuskjawakData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              HuskjawakData.rice_mill_name_id
                          ).rice_mill_name,
                          value: HuskjawakData.rice_mill_name_id,
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
                <SelectInput
                  label="Broker"
                  name="broker"
                  options={
                    Alldata.brokers_data &&
                    Alldata.brokers_data.map((option) => ({
                      label: option.broker_name,
                      value: option.broker_id,
                    }))
                  }
                  value={
                    HuskjawakData.broker
                      ? {
                          label: Alldata.brokers_data.find(
                            (option) =>
                              option.broker_id === HuskjawakData.broker
                          ).broker_name,
                          value: HuskjawakData.broker,
                        }
                      : null
                  }
                  onChange={(selectedOption) =>
                    handleInputChange({
                      target: {
                        name: "broker",
                        value: selectedOption ? selectedOption.value : "",
                      },
                    })
                  }
                  placeholder="Select Broker"
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Brokerage Percent"
                  name="brokerage_percentage"
                  type="number"
                  value={HuskjawakData.brokerage_percentage}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage Percent"
                />
                <Inputbox
                  label=" Weight"
                  name="weight"
                  type="number"
                  value={HuskjawakData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter Weight "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Rate"
                  name="rate"
                  type="number"
                  value={HuskjawakData.rate}
                  onChange={handleInputChange}
                  placeholder="Enter Rate "
                />
                <Inputbox
                  label="Number of Bags"
                  name="number_of_bags"
                  type="number"
                  value={HuskjawakData.number_of_bags}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Bags "
                />
              </div>
              <div className="flex justify-between flex-wrap">
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
                    HuskjawakData.truck_number_id
                      ? {
                          label: Alldata.truck_data.find(
                            (option) =>
                              option.truck_id === HuskjawakData.truck_number_id
                          ).truck_number,
                          value: HuskjawakData.truck_number_id,
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
                  label="Total"
                  name="total"
                  type="number"
                  value={
                    (HuskjawakData.total =
                      HuskjawakData.rate * HuskjawakData.weight)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter total "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Brokerage"
                  name="brokerage"
                  type="number"
                  value={(HuskjawakData.brokerage = HuskjawakData.weight * 7)}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage "
                />
                <Inputbox
                  label=" Net Receivable"
                  name="net_receivable"
                  type="number"
                  value={
                    (HuskjawakData.net_receivable =
                      HuskjawakData.total - HuskjawakData.brokerage)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Net Receivable "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Dateinput
                  label="Loading Date"
                  name="loading_date"
                  value={HuskjawakData.loading_date}
                  onChange={handleInputChange}
                />
                <Dateinput
                  label="Received Date"
                  name="received_date"
                  value={HuskjawakData.received_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Payment Received"
                  name="payment_received"
                  type="number"
                  value={HuskjawakData.payment_received}
                  onChange={handleInputChange}
                  placeholder="Enter Payment Received"
                />
                <Inputbox
                  label="Number of Days"
                  name="number_of_days"
                  type="number"
                  value={HuskjawakData.number_of_days}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Days "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Payment Difference"
                  name="payment_difference"
                  type="number"
                  value={
                    (HuskjawakData.payment_difference =
                      HuskjawakData.total - HuskjawakData.payment_received)
                  }
                  onChange={handleInputChange}
                  placeholder="Enter Payment Difference "
                />
                <Inputbox
                  label="Remarks "
                  name="remarks"
                  type="text"
                  value={HuskjawakData.remarks}
                  onChange={handleInputChange}
                  placeholder="Enter  Remarks "
                />
              </div>
              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Add Husk Jawak
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

export default Huskjawak;
