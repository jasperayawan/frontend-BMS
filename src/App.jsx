import { Outlet } from "react-router-dom";
import "./App.css";
import Parse from "parse/dist/parse.min.js";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import { PARSE } from "./helper/api";
import { useLogout } from "./hooks/useLogout";
import { useState } from "react";
import { X } from "lucide-react";
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
    window.location.reload();
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
          <button
            onClick={handleLogout}
            className="text-start underline w-[max-content]"
          >
            {loadingLoading ? "loading..." : "logout"}
          </button>
        </div>
      )}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
        <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
          <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
            <button onClick={() => setShowEditConfirmModal(false)} className="">
              <X />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
            ARE YOU SURE YOU WANT TO LOGOUT?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200"
              >
                YES
              </button>
              <button
                onClick={cancelLogout}
                className="px-4 py-2 bg-white hover:bg-gray-400 border border-zinc-600 transition-colors duration-200"
              >
                NO
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

      <Toaster />
      <Outlet />
    </>
  );
}

export default App;
