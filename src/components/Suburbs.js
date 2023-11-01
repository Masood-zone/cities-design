import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../root";

function Suburbs() {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasNoCity, setHasNoCity] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    try {
      const getCities = async () => {
        const response = await axios.get(`${BASE_URL}/cities`);
        if (response.data.cities) {
          setCities(response.data.cities);
          setLoading(false);
          return response.data;
        } else {
          setHasNoCity(true);
        }
      };
      getCities();
    } catch (error) {
      console.log(error.message);
    }
    if (hasNoCity) {
      navigate("/newCity");
    }
  }, [hasNoCity, navigate]);
  return (
    <div className="grid grid-cols-1 w-full md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 py-8">
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="loader"></div>
        </div>
      ) : (
        cities.map((city) => (
          <div
            key={city.id} // replace 'id' with actual id field from your data
            className="flex flex-col justify-center items-center gap-2 border border-gray-500 p-4 rounded-md h-32"
          >
            <span className="text-xl font-bold sm:text-4xl">
              {city.city_name}
            </span>
            <Link to={`/suburbs/${city.id}`}>View Suburbs</Link>
          </div>
        ))
      )}
    </div>
  );
}

export default Suburbs;
