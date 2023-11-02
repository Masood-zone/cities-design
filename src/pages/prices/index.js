import React from "react";
import { Link } from "react-router-dom";

function Prices() {
  return (
    <div>
      <header className="">
        <h1>Delivery Prices</h1>
        <p>
          You can now set prices for single or multiple destinations with ease.
          Customize your pricing strategies effortlessly.
        </p>
        <Link to="/newPrices">Create Bulk Price</Link>
      </header>
      <main className="my-8 mx-2 md:mx-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-white p-6 border-2 border-gray-400">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg text-gray-800 mb-4">Kumasi</h2>
            <span className="font-bold text-green-600">Gh₵40.5</span>
          </div>
          <ul>
            <li>Tanoso</li>
            <li>Bantama</li>
            <li>Kejetia</li>
            <li>Tech.</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default Prices;
