import axios from "axios";
import React, { useState, useEffect } from "react";
function View_RiceDeposit() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/rice-deposite-data", {
        headers: {
          "api-key": apiKey,
        },
      })
      .then((res) => {
        setdata(res.data);
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, []);

  // Log the data, not the setdata function
  //   console.log(data);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Rice Deposit
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            A table of placeholder stock market data that does not make any
            sense.
          </p>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Export
          </button>
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th className="whitespace-nowrap py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0">
                    Rst Number
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Lot Number
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ware House
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rice Mill
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Weight
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Truck Number Id
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Bags
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Transporting Total
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Transporter Name
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Transporting Type
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Transporting Status
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rate
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Hamali
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Variety
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Halting
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Variety Weight
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date 2023-23
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Date 2023-22
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    PDS
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    OLD
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Amount
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((Agreement, index) => (
                  <tr key={index} className="bg-gray-50">
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.rst_number}
                    </td>
                    <td className="py-2 px-4 border-b subpixel-antialiased leading-6 text-gray-900">
                      {Agreement.date}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.lot_number}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.ware_houes_name}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.rice_mill_name}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.weight}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.truck_number}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.bags}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.transporting_total}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.transporter_name}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.transporting_type}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.transporting_status}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.rate}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.hamali}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.variety}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.halting}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.rrga_wt}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.data_2022_23}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.data_2021_22}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.pds}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.old}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.amount}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_RiceDeposit;
