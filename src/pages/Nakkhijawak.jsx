import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Dateinput from "../inputelement/Dateinput";
import "react-toastify/dist/ReactToastify.css";
import Inputbox from "../inputelement/Inputbox";
import axios from "axios";
import SelectInput from "../inputelement/Selectinput";
const Nakkhijawak = () => {
  const [NakkhijawakData, setNakkhijawakData] = useState({
    rst_number: 0,
    date: "",
    party_id: "",
    rice_mill_name_id: "",
    broker: "",
    brokerage_percent: 0,
    weight: 0,
    rate: 0,
    number_of_bags: 0,
    truck_number_id: "",
    total: 0,
    brokerage: 0,
    net_recievable: 0,
    loading_date: "",
    recieved_date: "",
    payment_recieved: 0,
    number_of_days: 0,
    payment_difference: 0,
    remarks: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNakkhijawakData({
      ...NakkhijawakData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(NakkhijawakData);

    try {
      const response = await axios.post(
        "http://localhost:8000/nakkhi-jawak",
        NakkhijawakData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status >= 201 || response.status < 300) {
        // console.log("Nakkhi Jawak added successfully");
        toast.success("Nakkhi Jawak added successfully", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Failed to add Nakkhi Jawak");
        toast.error("Failed to add Nakkhi Jawak", {
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
      toast.error("Error adding Nakkhi Jawak", {
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
            Add Nakkhi Jawak
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
                  value={Nakkhijawak.rst_number}
                  onChange={handleInputChange}
                  placeholder="Enter rst number"
                />
                <Dateinput
                  value={NakkhijawakData.date}
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
                  NakkhijawakData.party_id
                    ? {
                        label: Alldata.party_data.find(
                          (option) =>
                            option.party_id === NakkhijawakData.party_id
                        ).party_name,
                        value: NakkhijawakData.party_id,
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
                    NakkhijawakData.rice_mill_name_id
                      ? {
                          label: Alldata.rice_mill_data.find(
                            (option) =>
                              option.rice_mill_id ===
                              NakkhijawakData.rice_mill_name_id
                          ).rice_mill_name,
                          value: NakkhijawakData.rice_mill_name_id,
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
                    NakkhijawakData.broker
                      ? {
                          label: Alldata.brokers_data.find(
                            (option) =>
                              option.broker_id === NakkhijawakData.broker
                          ).broker_name,
                          value: NakkhijawakData.broker,
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
                  name="brokerage_percent"
                  type="number"
                  value={NakkhijawakData.brokerage_percent}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage Percent"
                />
                <Inputbox
                  label=" Weight"
                  name="weight"
                  type="number"
                  value={NakkhijawakData.weight}
                  onChange={handleInputChange}
                  placeholder="Enter Weight "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Rate"
                  name="rate"
                  type="number"
                  value={NakkhijawakData.rate}
                  onChange={handleInputChange}
                  placeholder="Enter Rate "
                />
                <Inputbox
                  label="Number of Bags"
                  name="number_of_bags"
                  type="number"
                  value={NakkhijawakData.number_of_bags}
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
                    NakkhijawakData.truck_number_id
                      ? {
                          label: Alldata.truck_data.find(
                            (option) =>
                              option.truck_id ===
                              NakkhijawakData.truck_number_id
                          ).truck_number,
                          value: NakkhijawakData.truck_number_id,
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
                  value={NakkhijawakData.total}
                  onChange={handleInputChange}
                  placeholder="Enter total "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Brokerage"
                  name="brokerage"
                  type="number"
                  value={NakkhijawakData.brokerage}
                  onChange={handleInputChange}
                  placeholder="Enter Brokerage "
                />
                <Inputbox
                  label=" Net Recievable"
                  name="net_recievable"
                  type="number"
                  value={NakkhijawakData.net_recievable}
                  onChange={handleInputChange}
                  placeholder="Enter Net Recievable "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Dateinput
                  label="Loading Date"
                  name="loading_date"
                  value={NakkhijawakData.loading_date}
                  onChange={handleInputChange}
                />
                <Dateinput
                  label="Recieved Date"
                  name="recieved_date"
                  value={NakkhijawakData.recieved_date}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Payment Recieved"
                  name="payment_recieved"
                  type="number"
                  value={NakkhijawakData.payment_recieved}
                  onChange={handleInputChange}
                  placeholder="Enter Payment Recieved"
                />
                <Inputbox
                  label="Number of Days"
                  name="number_of_days"
                  type="number"
                  value={NakkhijawakData.number_of_days}
                  onChange={handleInputChange}
                  placeholder="Enter Number of Days "
                />
              </div>
              <div className="flex justify-between flex-wrap">
                <Inputbox
                  label="Payment Difference"
                  name="payment_difference"
                  type="number"
                  value={NakkhijawakData.payment_difference}
                  onChange={handleInputChange}
                  placeholder="Enter Payment Difference "
                />
                <Inputbox
                  label=" Remarks "
                  name="remarks"
                  type="text"
                  value={NakkhijawakData.remarks}
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
                  Add Nakkhi Jawak
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

export default Nakkhijawak;
