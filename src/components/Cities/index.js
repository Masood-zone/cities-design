import React from "react";
import Suburbs from "../Suburbs";
import { HiOutlinePlus } from "react-icons/hi";
import { Link } from "react-router-dom";

function Cities() {
  return (
    <div className="px-5">
      <header>
        <div className="flex max-w-md items-center gap-2 justify-between">
          <h1 className="font-bold text-4xl py-2">Cities</h1>
          <Link
            to="/newCity"
            className="flex items-center gap-2 flex-row-reverse"
          >
            Add a new city <HiOutlinePlus fontSize={24} />
          </Link>
        </div>
        <p className="text-lg py-2">
          You now have the ability to manage cities and their suburbs. <br />
          You can add, update, or remove cities as needed, and all these options
          are easily accessible.
        </p>
      </header>
      <main>
        <Suburbs />
      </main>
    </div>
  );
}

export default Cities;
