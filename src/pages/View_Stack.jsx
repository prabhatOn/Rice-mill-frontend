import axios from "axios";
import React, { useState, useEffect } from "react";
// ... (previous imports)

function View_BardanaType() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [Riceid, setRiceid] = useState({
    select_mill_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setRiceid({
      ...Riceid,
      [name]: value,
    });
  };

  const [ricemill, setRicemill] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const Ricemil_response = await axios.get(
          "http://localhost:8000/rice-mill",
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const data = Ricemil_response.data;
        setRicemill(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchData();
  }, []);

  const [data, setData] = useState({
    jama_jute_22_23: 0,
    ek_bharti_21_22: 0,
    pds: 0,
    miller_purana: 0,
    kisan: 0,
    bardana_society: 0,
    hdpe_22_23: 0,
    hdpe_21_22: 0,
    hdpe_21_22_one_use: 0,
    // Add other properties as needed based on your API response structure
  });

  useEffect(() => {
    async function fetchMillData() {
      try {
        const All_Mix_Data_response = await axios.get(
          `http://localhost:8000/bardaha-data/${Riceid.select_mill_id}`,
          {
            headers: {
              "api-key": apiKey,
            },
          }
        );

        const responseData = All_Mix_Data_response.data;
        setData(responseData);
        console.log(responseData);
      } catch (error) {
        console.error("Error:", error);
        // Set default values or handle the error appropriately
        setData({
          total_weight: 0,
          // Add other default values as needed
        });
      }
    }

    if (Riceid.select_mill_id) {
      fetchMillData();
    }
  }, [Riceid.select_mill_id]);

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">
            Stock To Hopper
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
                    Rice Mill Name
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Jama Jute 22-23
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Ek Bharti 21-22
                  </th>

                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    PDS
                  </th>

                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Miller Purana
                  </th>

                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Kisan
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Bardana Society
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    HDPE 22-23
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    HDPE 21-22 New
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    HDPE 21-22 One Use
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                <tr>
                  <td className="whitespace-nowrap py-2 pl-4 pr-3 text-sm text-gray-500 sm:pl-0">
                    <select
                      name="select_mill_id"
                      value={Riceid.select_mill_id}
                      onChange={handleInputChange}
                    >
                      <option value="">Select Rice Mill</option>
                      {ricemill.map((rice) => (
                        <option
                          key={rice.rice_mill_id}
                          value={rice.rice_mill_id}
                        >
                          {rice.rice_mill_name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.jama_jute_22_23,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.ek_bharti_21_22,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.pds,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.miller_purana,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.kisan,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.bardana_society,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.hdpe_22_23,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.hdpe_21_22,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_Awak_Data && data.Dhan_Awak_Data.length > 0
                      ? data.Dhan_Awak_Data.reduce(
                          (sum, entry) => sum + entry.hdpe_21_22_one_use,
                          0
                        )
                      : 0}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default View_BardanaType;
