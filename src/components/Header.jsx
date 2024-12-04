import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState("");
  const isAuthenticated = Parse.User.current();
  const location = useLocation();
  const currentRoute = location.pathname.split("/").pop();
  const Navigate = useNavigate();

  const handleActiveSelect = (activeData) => {
    setIsActive(activeData);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-row justify-between items-center px-10 py-4 h-[150px] bg-yellow-500">
        <img
          onClick={() => Navigate("/")}
          src="/sanfranciscologo.svg"
          alt="San Francisco Logo"
          className="z-30 cursor-pointer"
        />
        <h2 className="text-white text-[32px] text-center">
          BARANGAY SAN FRANCISCO HEALTH CENTER
          <br /> MANAGEMENT SYSTEM
        </h2>
        <img src="/pagadianlogo.svg" alt="Pagadian Logo" />
      </div>
      {isAuthenticated && (
        <ul className="flex justify-between items-center px-20 py-1 border-b-[1px] border-yellow-600">
          {(isAuthenticated?.get("role") === "ADMIN" ||
            isAuthenticated?.get("role") === "NURSE" ||
            isAuthenticated?.get("role") === "SECRETARY") && (
              <li
                onClick={() => handleActiveSelect("patient")}
                className={`${
                  isActive === "patient" || currentRoute === "patient"
                    ? "bg-yellow-500"
                    : ""
                } cursor-pointer px-4`}
              >
                <a href="/patient">PATIENT</a>
              </li>
            )}
          {(isAuthenticated?.get("role") === "ADMIN" ||
            isAuthenticated?.get("role") === "SECRETARY") && (
              <li
                onClick={() => handleActiveSelect("employee")}
                className={`${
                  isActive === "employee" || currentRoute === "employee"
                    ? "bg-yellow-500"
                    : ""
                } cursor-pointer px-4`}
              >
                <a href="/employee">EMPLOYEE</a>
              </li>
            )}
          <li
            onClick={() => handleActiveSelect("services")}
            className={`${
              isActive === "services" || currentRoute === "services"
                ? "bg-yellow-500"
                : ""
            } cursor-pointer px-4`}
          >
            <a href="/services">SERVICES</a>
          </li>
          <li
            onClick={() => handleActiveSelect("gallery")}
            className={`${
              isActive === "gallery" || currentRoute === "gallery"
                ? "bg-yellow-500"
                : ""
            } cursor-pointer`}
          >
            <a href="/gallery" className="px-4">
              GALLERY
            </a>
          </li>
          <li
            onClick={() => handleActiveSelect("contact-us")}
            className={`${
              isActive === "contact-us" || currentRoute === "contact-us"
                ? "bg-yellow-500"
                : ""
            } cursor-pointer px-4`}
          >
            <a href="/contact-us">CONTACT US</a>
          </li>
          <li
            onClick={() => handleActiveSelect("about-us")}
            className={`${
              isActive === "about-us" || currentRoute === "about-us"
                ? "bg-yellow-500"
                : ""
            } cursor-pointer px-4`}
          >
            <a href="/about-us">ABOUT US</a>
          </li>
          {(isAuthenticated?.get("role") !== "SECRETARY" &&
              isAuthenticated?.get("role") !== "PATIENT" &&
              isAuthenticated?.get("role") === "ADMIN") && (
                <li
                  onClick={() => handleActiveSelect("users")}
                  className={`${
                    isActive === "users" || currentRoute === "users"
                      ? "bg-yellow-500"
                      : ""
                  } cursor-pointer px-4`}
                >
                  <a href="/users">USERS ACCOUNT</a>
                </li>
            )}


          <li
            onClick={() => handleActiveSelect("myaccount")}
            className={`${
              isActive === "myaccount" || currentRoute === "myaccount"
                ? "bg-yellow-500"
                : ""
            } cursor-pointer px-4`}
          >
            <a href="/myaccount">MY ACCOUNT</a>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Header;
