import React, { useState } from "react";
import Parse from "parse/dist/parse.min.js";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const [isActive, setIsActive] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isAuthenticated = Parse.User.current();
  const location = useLocation();
  const currentRoute = location.pathname.split("/").pop();
  const Navigate = useNavigate();
  const unregisteredUser = localStorage.getItem("unregisteredUser");

  const handleActiveSelect = (activeData) => {
    setIsActive(activeData);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center px-4 md:px-10 py-4 bg-yellow-500">
        {unregisteredUser ? (
          <Link to='/home'>
            <img
              onClick={() => Navigate("/")}
              src="/sanfranciscologo.svg"
              alt="San Francisco Logo"
              className="z-30 cursor-pointer h-16 md:h-32 mb-4 md:mb-0"
            />
          </Link>
        ) : (
          <img
            onClick={() => Navigate("/")}
            src="/sanfranciscologo.svg"
            alt="San Francisco Logo"
            className="z-30 cursor-pointer h-16 md:h-20 mb-4 md:mb-0"
          />
        )}
        <div className="flex flex-col justify-center items-center gap-y-2">
          <span className="text-white text-base md:text-[32px] text-center font-semibold px-2"> 
          BARANGAY SAN FRANCISCO HEALTH CENTER
          </span>
          <span className="text-white text-base md:text-[32px] text-center font-semibold px-2">
          MANAGEMENT SYSTEM
          </span>
        </div>
        
        <img 
          src="/pagadianlogo.svg" 
          alt="Pagadian Logo" 
          className="h-16 md:h-32 mt-4 md:mt-0"
        />
      </div>
    {(location.pathname !== "/login" && location.pathname !== "/" && location.pathname !== "/forgot" && location.pathname !== "/reset-password" || isAuthenticated) && (
      <div className="relative bg-white border-b-[1px] border-yellow-600">
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="md:hidden w-full px-4 py-2 flex items-center justify-between bg-yellow-500 text-white"
      >
        <span>Menu</span>
        <svg
          className={`w-6 h-6 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <ul
        className={`${
          isMobileMenuOpen ? 'flex' : 'hidden'
        } md:flex flex-col md:flex-row md:items-center md:justify-between px-4 md:px-20 py-2 gap-2 md:gap-0`}
      >
        {(isAuthenticated?.get("role") === "ADMIN" ||
          isAuthenticated?.get("role") === "NURSE" ||
          isAuthenticated?.get("role") === "SECRETARY") && (
          <li
            onClick={() => handleActiveSelect("patient")}
            className={`${
              isActive === "patient" || currentRoute === "patient"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-100"
            } rounded-md transition-colors`}
          >
            <a href="/patient" className="block px-4 py-2">PATIENT</a>
          </li>
        )}

        {isAuthenticated?.get("role") === "PATIENT" && (
          <li
            onClick={() => handleActiveSelect("myprofile")}
            className={`${
              isActive === "myprofile" || currentRoute === "myprofile"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-100"
            } rounded-md transition-colors`}
          >
            <a href="/myprofile" className="block px-4 py-2">MY PROFILE</a>
          </li>
        )}

        {(isAuthenticated?.get("role") === "ADMIN" ||
          isAuthenticated?.get("role") === "SECRETARY") && (
          <li
            onClick={() => handleActiveSelect("employee")}
            className={`${
              isActive === "employee" || currentRoute === "employee"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-100"
            } rounded-md transition-colors`}
          >
            <a href="/employee" className="block px-4 py-2">EMPLOYEE</a>
          </li>
        )}

        <li
          onClick={() => handleActiveSelect("services")}
          className={`${
            isActive === "services" || currentRoute === "services"
              ? "bg-yellow-500 text-white"
              : "hover:bg-yellow-100"
          } rounded-md transition-colors`}
        >
          <a href="/services" className="block px-4 py-2">SERVICES</a>
        </li>

        <li
          onClick={() => handleActiveSelect("gallery")}
          className={`${
            isActive === "gallery" || currentRoute === "gallery"
              ? "bg-yellow-500 text-white"
              : "hover:bg-yellow-100"
          } rounded-md transition-colors`}
        >
          <a href="/gallery" className="block px-4 py-2">GALLERY</a>
        </li>

        <li
          onClick={() => handleActiveSelect("contact-us")}
          className={`${
            isActive === "contact-us" || currentRoute === "contact-us"
              ? "bg-yellow-500 text-white"
              : "hover:bg-yellow-100"
          } rounded-md transition-colors`}
        >
          <a href="/contact-us" className="block px-4 py-2">CONTACT US</a>
        </li>

        <li
          onClick={() => handleActiveSelect("about-us")}
          className={`${
            isActive === "about-us" || currentRoute === "about-us"
              ? "bg-yellow-500 text-white"
              : "hover:bg-yellow-100"
          } rounded-md transition-colors`}
        >
          <a href="/about-us" className="block px-4 py-2">ABOUT US</a>
        </li>

        {(isAuthenticated?.get("role") !== "SECRETARY" &&
          isAuthenticated?.get("role") !== "PATIENT" &&
          isAuthenticated?.get("role") === "ADMIN") && (
          <li
            onClick={() => handleActiveSelect("users")}
            className={`${
              isActive === "users" || currentRoute === "users"
                ? "bg-yellow-500 text-white"
                : "hover:bg-yellow-100"
            } rounded-md transition-colors`}
          >
            <a href="/users" className="block px-4 py-2">USERS ACCOUNT</a>
          </li>
        )}

        {!isAuthenticated ? (
           <li
           onClick={() => {
            handleActiveSelect("login")
            localStorage.clear()
           }}
           className={`${
             isActive === "login" || currentRoute === "login"
               ? "bg-yellow-500 text-white"
               : "hover:bg-yellow-100"
           } rounded-md transition-colors`}
         >
           <a href="/login" className="block px-4 py-2">LOGIN</a>
         </li>
        ) : (
          <li
          onClick={() => handleActiveSelect("myaccount")}
          className={`${
            isActive === "myaccount" || currentRoute === "myaccount"
              ? "bg-yellow-500 text-white"
              : "hover:bg-yellow-100"
          } rounded-md transition-colors`}
        >
          <a href="/myaccount" className="block px-4 py-2">MY ACCOUNT</a>
        </li>
        )}
      </ul>
    </div>
    )}
    </div>
  );
};

export default Header;
