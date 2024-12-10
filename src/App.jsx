import { Outlet } from 'react-router-dom'
import './App.css'
import Parse from 'parse/dist/parse.min.js';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import { PARSE } from './helper/api';
import { useLogout } from './hooks/useLogout';
Parse.initialize(import.meta.env.VITE_APPLICATION_ID);
Parse.serverURL = PARSE;



function App() {
  const user = Parse.User.current();
  const { loadingLoading, logout } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();
    await logout();
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
      <Toaster />
      <Outlet />
    </>
  )
}

export default App
