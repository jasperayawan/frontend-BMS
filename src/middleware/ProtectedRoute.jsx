import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Parse from 'parse/dist/parse.min.js';

const ProtectedRoute = ({ element }) => {
  const { pathname } = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const sessionToken = localStorage.getItem('sessionToken');

  const normalizedPathname = pathname.replace(/\/+$/, '');

  const restrictedForAuthenticated = [
    "/",
    "/signup",
    "/forgot",
  ];

  const protectedPathsForUnauthenticated = [
    "/patient",
    "/myaccount",
    "/users",
    "/employee",
    "/myprofile"
  ];

  useEffect(() => {
    const validateSession = async () => {
      if (sessionToken) {
        try {
          await Parse.User.become(sessionToken); 
          setIsAuthenticated(true); 
        } catch (error) {
          console.error("Invalid session token:", error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false); 
      }
    };

    validateSession();
  }, [sessionToken]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; 
  }


  if (isAuthenticated && restrictedForAuthenticated.includes(normalizedPathname)) {
    return <Navigate to="/" />;
  }

  if (!isAuthenticated && protectedPathsForUnauthenticated.includes(normalizedPathname)) {
    return <Navigate to="/" />;
  }

  return element;
};

export default ProtectedRoute;
