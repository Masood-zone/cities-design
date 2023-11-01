import React, { useState } from "react";
import { BASE_URL } from "../../root";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function NewCity() {
  // Main data
  const [city, setCity] = useState("");
  const [suburbs, setSuburbs] = useState([{ suburb_name: "" }]);
  const navigate = useNavigate();
  // Form Changes
  const handleSuburbChange = (index, e) => {
    let data = [...suburbs];
    data[index][e.target.name] = e.target.value;
    setSuburbs(data);
  };
  const addSuburbs = (e) => {
    e.preventDefault();
    let newSuburb = { suburb_name: "" };
    setSuburbs([...suburbs, newSuburb]);
  };
  // Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      city_name: city,
      suburbs: {
        createMany: {
          data: suburbs,
        },
      },
    };
    try {
      const response = await axios.post(`${BASE_URL}/cities`, data);
      console.log(response.data);
      navigate("/"); // navigate to the home page
      setCity("");
      setSuburbs([{ suburb_name: "" }]);
    } catch (error) {
      toast.error("Unable to create the city!");
      console.error("Error posting data: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl leading-9 font-extrabold text-gray-900">
          Create a new City!
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="city_name"
                className="block text-sm font-medium leading-5  text-gray-700"
              >
                City Name
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <input
                  name="city_name"
                  placeholder="City name"
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 my-3"
                />
              </div>
            </div>
            {/* Suburbs section */}
            {suburbs.map((input, index) => {
              return (
                <div key={index}>
                  <label
                    htmlFor="city_name"
                    className="block text-sm font-medium leading-5  text-gray-700"
                  >
                    Suburb
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      name="suburb_name"
                      placeholder="Suburb Name"
                      value={input.suburb_name}
                      onChange={(e) => handleSuburbChange(index, e)}
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 my-3"
                    />
                  </div>
                </div>
              );
            })}
            <button
              onClick={(e) => addSuburbs(e)}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out my-3"
            >
              Add suburb
            </button>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewCity;
