import React from 'react'

const Header = () => {
  return (
    <div className="flex flex-col w-full">
        <div className='flex flex-row justify-between items-center px-10 py-4 h-[150px] bg-yellow-500'>
        <img src="/sanfranciscologo.svg" alt="" />
        <h2 className='text-white text-[32px] text-center'>
        BARANGAY SAN FRANCISCO HEALTH CENTER<br/>
    MANAGEMENT SYSTEM
        </h2>
        <img src="/pagadianlogo.svg" alt="" />
        </div>
        <ul className='flex justify-between items-center px-4 py-1 border-b-[1px] border-yellow-600'>
            <li>PATIENT</li>
            <li>EMPLOYEE</li>
            <li>SERVICES</li>
            <li>GALLERY</li>
            <li>CONTACT US</li>
            <li>ABOUT US</li>
            <li>USERS ACCOUNT</li>
            <li>MY ACCOUNT</li>
        </ul>
    </div>
  )
}

export default Header
