import React, { useState } from 'react'
import Parse from 'parse/dist/parse.min.js';

const Header = () => {
    const [isActive, setIsActive] = useState(" ")
    const isAuthenticated = Parse.User.current();

    const handleActiveSelect = (activeData) => {
        setIsActive(activeData)
    }


  return (
    <div className="flex flex-col w-full">
        <div className='flex flex-row justify-between items-center px-10 py-4 h-[150px] bg-yellow-500'>
        <img src="/sanfranciscologo.svg" alt="" />
        <h2 className='text-white text-[32px] text-center'>
        BARANGAY SAN FRANCISCO HEALTH CENTER<br/> MANAGEMENT SYSTEM
        </h2>
        <img src="/pagadianlogo.svg" alt="" />
        </div>
        {isAuthenticated && (
            <ul className='flex justify-between items-center px-20 py-1 border-b-[1px] border-yellow-600'>
                <li onClick={() => handleActiveSelect("patient")} className={`${isActive === 'patient' ? 'bg-yellow-500' : ''} cursor-pointer`}>
                    <a href="/patient">
                        PATIENT
                    </a>
                </li>
                <li onClick={() => handleActiveSelect("employee")} className={`${isActive === 'employee' ? 'bg-yellow-500' : ''} cursor-pointer`}>EMPLOYEE</li>
                <li onClick={() => handleActiveSelect("services")} className={`${isActive === 'services' ? 'bg-yellow-500' : ''} cursor-pointer`}>SERVICES</li>
                <li onClick={() => handleActiveSelect("gallery")} className={`${isActive === 'gallery' ? 'bg-yellow-500' : ''} cursor-pointer`}>GALLERY</li>
                <li onClick={() => handleActiveSelect("contactus")} className={`${isActive === 'contactus' ? 'bg-yellow-500' : ''} cursor-pointer`}>CONTACT US</li>
                <li onClick={() => handleActiveSelect("aboutus")} className={`${isActive === 'aboutus' ? 'bg-yellow-500' : ''} cursor-pointer`}>ABOUT US</li>
                <li onClick={() => handleActiveSelect("usersAccount")} className={`${isActive === 'usersAccount' ? 'bg-yellow-500' : ''} cursor-pointer`}>USERS ACCOUNT</li>
                <li onClick={() => handleActiveSelect("myAccount")} className={`${isActive === 'myAccount' ? 'bg-yellow-500' : ''} cursor-pointer`}>MY ACCOUNT</li>
            </ul>
        )}
    </div>
  )
}

export default Header
