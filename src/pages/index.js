import React from "react";
import { Link, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="flex flex-col">
      <div className="navbar bg-base-100 shadow-md">
        <div className="flex-1">
          <Link className="btn btn-ghost normal-case text-xl">Redesigns</Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/">Cities</Link>
            </li>
            <li>
              <Link to="/prices">Prices</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export default Layout;
