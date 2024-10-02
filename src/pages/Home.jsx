import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import Parse from 'parse/dist/parse.min.js';

const Home = () => {
  const { loading, logout } = useLogout();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: ""
  })

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
  }

  
  
  useEffect(() => {
    const asyncUser = async () => {
      const user = Parse.User.current();

      if(user){
        const username = user.get("username");
        const email = user.get("email");

        setUserInfo({
          username, email
        })
      } else {
        return;
      }
    }
    asyncUser();
  },[])
  

  return (
    <div className='lg:min-h-[70vh] flex flex-col justify-center items-center'>
      <h1 className='text-4xl'>WELCOME {userInfo.username}!</h1>
      {/* <button onClick={handleLogout} className='w-[max-content] bg-zinc-700 rounded-md px-4 py-2 text-white'>
        {loading ? 'loading...' : 'logout'}
      </button> */}
    </div>
  )
}

export default Home
