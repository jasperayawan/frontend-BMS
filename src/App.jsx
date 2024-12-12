import { Outlet } from 'react-router-dom'
import './App.css'
import Parse from 'parse/dist/parse.min.js';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import { PARSE } from './helper/api';
import { useLogout } from './hooks/useLogout';
import { useState } from 'react';
Parse.initialize(import.meta.env.VITE_APPLICATION_ID);
Parse.serverURL = PARSE;



function App() {
  const user = Parse.User.current();
  const { loadingLoading, logout } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmLogout = async () => {
    await logout();
    setIsModalOpen(false);
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Header />
      {user && (
        <div className="flex flex-col gap-y-2 ml-4 mt-2">
        <h1 className="text-xl font-bold text-orange-500 uppercase">
          Welcome{" "}
          <span className="">
            {user?.get("role")} {user?.get("name")}!
          </span>
        </h1>
        <button onClick={handleLogout} className="text-start underline">
          {loadingLoading ? "loading..." : "logout"}
        </button>
      </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="flex flex-col justify-center items-center bg-white rounded-lg shadow-lg p-6 max-w-sm w-full animate-fade-in">
            <h2 className="text-xl font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-4">ARE YOU SURE YOU WANT TO LOGOUT?</p>
            <div className="flex justify-between gap-x-2">
              <button onClick={confirmLogout} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition">Yes</button>
              <button onClick={cancelLogout} className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400 transition">No</button>
            </div>
          </div>
        </div>
      )}
      <Toaster />
      <Outlet />
    </>
  )
}

export default App
