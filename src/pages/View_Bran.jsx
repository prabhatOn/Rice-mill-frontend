import axios from "axios";
import React, { useState, useEffect } from "react";
function View_Bran() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/other-bran-jawak-data", {
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
            Bran Jawak
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
                    Party Name
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rice Mill Name
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Broker
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Brokerage Percent
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Weight
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Rate
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    number of Bags
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Truck Number
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Brokerage
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Total
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Net Recievable
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Payment Recieved
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Number of Days
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Payment Difference
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Remarks
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Oil
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
                      {Agreement.party_name}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.rice_mill_name}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.broker_name}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.brokerage_percentage}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.weight}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.rate}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.number_of_bags}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.truck_number}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.brokerage}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.total}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.net_receivable}
                    </td>

                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.payment_received}
                    </td>

                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.payment_difference}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.remarks}
                    </td>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {Agreement.oil}
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

export default View_Bran;
