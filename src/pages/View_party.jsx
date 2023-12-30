import axios from "axios";
import React, { useState, useEffect } from "react";
function View_Party() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [data, setdata] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/party-data", {
        headers: {
          "api-key": apiKey,
        },
      })
      .then((res) => setdata(res.data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Party
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
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Party Name
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Party Phone Number
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {data.map((user, index) => (
                  <tr key={index}>
                    <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                      {user.party_name}
                    </td>
                    <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                      {user.party_phone_number}
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

export default View_Party;
