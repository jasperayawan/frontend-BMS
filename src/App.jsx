import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Parse from "parse/dist/parse.min.js";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import { PARSE } from "./helper/api";
import { useLogout } from "./hooks/useLogout";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
Parse.initialize(import.meta.env.VITE_APPLICATION_ID);
Parse.serverURL = PARSE;

function App() {
  const user = Parse.User.current();
  const { loadingLoading, logout } = useLogout();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = window.location.pathname; 
  const currentLoc = location.split("/").pop()
  const [isStatementModal, setStatementModal] = useState(false)

  const handleLogout = async (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const confirmLogout = async () => {
    await logout();
    setIsModalOpen(false);
    navigate("/");
    localStorage.removeItem("unregisteredUser");
    window.location.reload();
  };

  const cancelLogout = () => {
    setIsModalOpen(false);
  };

  const preventPath = ["login", "signup", "forgot", "reset-password", ""];

  const handleStatementModal = () => {
    setStatementModal(true);
  }

  useEffect(() => {
    if(currentLoc === "") {
      localStorage.removeItem("unregisteredUser");
    }
  },[currentLoc])

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

      {isStatementModal && (
        <div className="fixed inset-0 bg-black/20 flex justify-center items-center min-h-screen w-full z-50">
          <div className="px-14 py-7 w-[430px] bg-white border border-orange-600 flex justify-center items-center flex-col gap-y-3">
            <p className="text-center">To access our services and to Register, please visit your local barangay office to create an account.</p>
            <button onClick={() => setStatementModal(false)} className='px-4 py-1 border border-orange-600 text-orange-500 w-[max-content] mx-auto'>OK</button>
          </div>
        </div>
      )}

      {(!user) && (!preventPath.includes(currentLoc)) && (
        <div className="flex flex-col justify-start items-start m-5">
          <a href="/login" onClick={() => {
            localStorage.removeItem("unregisteredUser")
          }} className="block py-2 underline">Log in</a>
          <button onClick={handleStatementModal} className="hover:underline text-[12px] font-semibold text-orange-500">DO YOU WANT TO REGISTER?</button>
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

      <Toaster toastOptions={{ duration: 5000 }} />
      <Outlet />
    </>
  );
}

export default App;
