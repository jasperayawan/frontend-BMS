import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';

const Home = () => {
  const { loading, logout } = useLogout();

  const handleLogout = async (e) => {
    e.preventDefault();

    await logout();
  }

  return (
    <div className='flex flex-col'>
      Home
      <button onClick={handleLogout} className='w-[max-content] bg-zinc-700 rounded-md px-4 py-2 text-white'>
        {loading ? 'loading...' : 'logout'}
      </button>
    </div>
  )
}

export default Home
