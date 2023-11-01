import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../root";
import { HiX } from "react-icons/hi";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";

function ViewCityInfo() {
  const { id } = useParams();
  const [suburb, setSuburb] = useState([]);
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(true);
  const [hasNoSuburb, setHasNoSuburb] = useState(false);

  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getSuburbs = async () => {
        if (id) {
          const response = await axios.get(`${BASE_URL}/cities/${id}/suburbs`);
          if (response.data.suburbs.length > 0) {
            setSuburb(response.data.suburbs);
            console.log(response.data.suburbs);
            // Access the city name
            setCityName(response.data.suburbs[0].cities.city_name);
            setLoading(false);
            return response.data;
          } else {
            setHasNoSuburb(true);
          }
        }
      };
      getSuburbs();
    } catch (error) {
      console.log(error.message);
      setHasNoSuburb(false);
    }
    if (hasNoSuburb) {
      navigate("/newCity");
    }
  }, [hasNoSuburb, navigate, id]);
  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }
  return (
    <div className="px-5">
      <h1 className="text-4xl font-bold">{cityName}</h1>
      <ul className="max-w-5xl mt-8 overflow-hidden sm:rounded-md shadow bg-white">
        {suburb.map((suburb, index) => (
          <li
            key={suburb.id}
            className={`${
              index !== 0 && index !== suburb.length - 1
                ? "border-t-2 border-gray-300"
                : ""
            }`}
          >
            <div className="px-4 py-5 sm:px-6 flex justify-between ">
              <h3 className="text-xl leading-6 text-gray-900">
                {suburb.suburb_name}
              </h3>
              <div className=" flex items-center gap-3">
                <button className="text-green-600">
                  <AiOutlineEdit fontSize={24} />
                </button>
                <button className="text-red-600">
                  <HiX fontSize={24} />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ViewCityInfo;
