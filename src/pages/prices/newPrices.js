import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CITY_URL = "https://qcsghana.com/api/v1/web/cities";
const SUBURB_URL = "https://qcsghana.com/api/v1/web/cities/";
const BASE_URL = "https://qcsghana.com/api/v1/web/prices/bulk";

function NewPrices() {
  const [cities, setCities] = useState([]);
  const [suburbs, setSuburbs] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedSuburb, setSelectedSuburb] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [extraPrice, setExtraPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getCities = async () => {
        const response = await axios.get(CITY_URL);
        console.log(response.data.cities);
        setCities(
          response.data.cities.map((city) => {
            return { value: city.id, label: city.city_name };
          })
        );
      };
      getCities();
    } catch (error) {
      console.log(error.message);
    }
  }, []);
  useEffect(() => {
    try {
      if (selectedCity) {
        const getSuburb = async () => {
          const response = await axios.get(
            `${SUBURB_URL}/${selectedCity.value}/suburbs`
          );
          setSuburbs(
            response.data.suburbs.map((suburb) => ({
              value: suburb.id,
              label: suburb.suburb_name,
            }))
          );
        };
        getSuburb();
      } else {
        setSuburbs([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedCity]);
  const hanleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      prices: [
        {
          destinationId: selectedSuburb.value,
          cityId: selectedCity.value,
          baseWeightPrice: parseFloat(basePrice),
          extraWeightPrice: parseFloat(extraPrice),
        },
      ],
    };
    try {
      const submitData = async () => {
        const response = await axios.post(`${BASE_URL}`, data);
        console.log(response.data);
        setSelectedCity(null);
        setSelectedSuburb(null);
        setLoading(true);
        navigate("/prices");
      };
      submitData();
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-10 rounded-lg shadow md:w-3/4 mx-auto lg:w-1/2 mt-5">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="text-center py-5">
            <h1 className="font-bold text-3xl ">Create delivery Prices</h1>
          </div>
          <form onSubmit={hanleSubmit}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                City:
              </label>
              <Select
                options={cities}
                onChange={(optionSelected) => setSelectedCity(optionSelected)}
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Base Weight Price:
              </label>
              <input
                placeholder="Enter base weight price"
                value={basePrice}
                className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                onChange={(e) => setBasePrice(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Extra Weight Price:
              </label>
              <input
                placeholder="Enter extra weight price"
                value={extraPrice}
                className="border border-gray-300 shadow p-3 w-full rounded mb-2"
                onChange={(e) => setExtraPrice(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="block mb-2 font-bold text-gray-600"
              >
                Suburb
              </label>
              <Select
                options={suburbs}
                onChange={(optionSelected) => setSelectedSuburb(optionSelected)}
              />
            </div>
            <button
              type="submit"
              className="block w-full bg-blue-500 text-white font-bold p-4 rounded-lg uppercase text-lg"
            >
              Add
            </button>
          </form>
        </>
      )}
    </div>
  );
}

export default NewPrices;
