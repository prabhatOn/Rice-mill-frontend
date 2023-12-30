import axios from "axios";
import React, { useState, useEffect } from "react";
// ... (previous imports)

function View_PaddyByType() {
  const apiKey = import.meta.env.VITE_API_KEY;
  const [Riceid, setRiceid] = useState({
    select_mill_id: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setRiceid((prevRiceid) => ({
      ...prevRiceid,
      [name]: value,
    }));
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
    total_weight: 0,
    dm_weight: 0,
    weight: 0,
    miller_purana: 0,
    bags_put_in_hopper: 0,
    // Add other properties as needed based on your API response structure
  });

  useEffect(() => {
    async function fetchMillData() {
      try {
        const All_Mix_Data_response = await axios.get(
          `http://localhost:8000/paddy-data/${Riceid.select_mill_id}`,
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
            Paddy By Type
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
                    Paddy Purchase
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Paddy In
                  </th>

                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Paddy Sale
                  </th>

                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Paddy Processed
                  </th>

                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Paddy Stacked
                  </th>
                  <th className="whitespace-nowrap px-2 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Paddy to Hopper
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
                    {data.total_weight
                      ? (
                          data.total_weight.reduce(
                            (sum, value) => sum + value,
                            0
                          ) / 3
                        ).toFixed(2)
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_data && data.Dhan_data.length > 0
                      ? data.Dhan_data.reduce(
                          (sum, entry) => sum + entry.dm_weight,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Paddy_sale_data && data.Paddy_sale_data.length > 0
                      ? data.Paddy_sale_data.reduce(
                          (sum, entry) => sum + entry.bags,
                          0
                        ) * 0.4
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_data && data.Dhan_data.length > 0
                      ? data.Dhan_data.reduce(
                          (sum, entry) => sum + entry.miller_purana,
                          0
                        )
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.total_weight
                      ? (
                          data.total_weight.reduce(
                            (sum, value) => sum + value,
                            0
                          ) +
                          (data.Dhan_data && data.Dhan_data.length > 0
                            ? data.Dhan_data.reduce(
                                (sum, entry) => sum + +entry.dm_weight,
                                0
                              )
                            : 0) -
                          (data.Paddy_sale_data &&
                          data.Paddy_sale_data.length > 0
                            ? data.Paddy_sale_data.reduce(
                                (sum, entry) => sum + entry.bags,
                                0
                              ) * 0.4
                            : 0) -
                          (data.Dhan_data && data.Dhan_data.length > 0
                            ? data.Dhan_data.reduce(
                                (sum, entry) => sum + entry.miller_purana,
                                0
                              )
                            : 0)
                        ).toFixed(2)
                      : 0}
                  </td>
                  <td className="whitespace-nowrap px-2 py-2 text-sm font-medium text-gray-900">
                    {data.Dhan_data && data.Dhan_data.length > 0
                      ? data.Dhan_data[0].bags_put_in_hopper // Assuming you want the value from the first entry
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

export default View_PaddyByType;
