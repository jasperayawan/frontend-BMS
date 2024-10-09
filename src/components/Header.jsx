import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useLocation } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState("");
  const isAuthenticated = Parse.User.current();
  const location = useLocation();
  const currentRoute = location.pathname.split("/").pop();

  const handleActiveSelect = (activeData) => {
    setIsActive(activeData);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center px-10 py-4 h-[150px] bg-yellow-500">
        <a href="/">
          <img src="/sanfranciscologo.svg" alt="San Francisco Logo" />
        </a>
        <h2 className="text-white text-[32px] text-center">
          BARANGAY SAN FRANCISCO HEALTH CENTER
          <br /> MANAGEMENT SYSTEM
        </h2>
        <img src="/pagadianlogo.svg" alt="Pagadian Logo" />
      </div>
      {isAuthenticated && (
        <ul className="flex justify-between items-center px-20 py-1 border-b-[1px] border-yellow-600">
          <li
            onClick={() => handleActiveSelect("patient")}
            className={`${
              isActive === "patient" || currentRoute === "patient" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/patient">PATIENT</a>
          </li>
          <li
            onClick={() => handleActiveSelect("employee")}
            className={`${
              isActive === "employee" || currentRoute === "employee" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/employee">EMPLOYEE</a>
          </li>
          <li
            onClick={() => handleActiveSelect("services")}
            className={`${
              isActive === "services" || currentRoute === "services" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/services">SERVICES</a>
          </li>
          <li
            onClick={() => handleActiveSelect("gallery")}
            className={`${
              isActive === "gallery" || currentRoute === "gallery" ? "bg-yellow-500" : ""
            } cursor-pointer`}
          >
            <a href="/gallery px-4">GALLERY</a>
          </li>
          <li
            onClick={() => handleActiveSelect("contactus")}
            className={`${
              isActive === "contactus" || currentRoute === "contactus" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/contactus">CONTACT US</a>
          </li>
          <li
            onClick={() => handleActiveSelect("aboutus")}
            className={`${
              isActive === "aboutus" || currentRoute === "aboutus" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/aboutus">ABOUT US</a>
          </li>
          <li
            onClick={() => handleActiveSelect("usersAccount")}
            className={`${
              isActive === "usersAccount" || currentRoute === "usersAccount" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/usersAccount">USERS ACCOUNT</a>
          </li>
          <li
            onClick={() => handleActiveSelect("myAccount")}
            className={`${
              isActive === "myAccount" || currentRoute === "myAccount" ? "bg-yellow-500" : ""
            } cursor-pointer px-4`}
          >
            <a href="/myAccount">MY ACCOUNT</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
