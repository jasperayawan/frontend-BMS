'use client'

import React, { useEffect, useState } from 'react'

const MedicalServices = ({ setOpenMedicalHistory, myProfile }) => {
  const [activeTab, setActiveTab] = useState('PRENATAL')
  const [oraganizeData, setOraganizeData] = useState({})
  
  const tabs = ['PRENATAL', 'IMMUNIZATION', 'FAMILY PLANNING', 'OTHER SERVICES']
  
  const services = {
    'PRENATAL': [
      { year: '2017', nurse: 'MARIE B. CHUI' },
      { year: '2020', nurse: 'KIRA J. TERE' },
      { year: '2023', nurse: 'MARJ CABARDO' },
    ],
    'IMMUNIZATION': [],
    'FAMILY PLANNING': [],
    'OTHER SERVICES': [],
  }


  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Tabs */}
      <div className="flex relative mb-[-1px]">
        {tabs.map((tab, index) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`
              px-6 py-2 min-w-[200px] font-bold
              ${activeTab === tab 
                ? 'bg-yellow-400 text-black border-2 border-black z-10 rounded-t-lg' 
                : 'bg-white border-2 border-black rounded-t-lg -ml-2 first:ml-0'
              }
              ${index > 0 && 'transform translate-x-[-1px]'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="border-2 border-black p-4">
        {/* Header */}
        <div className="grid grid-cols-3 bg-yellow-400 font-bold text-center border-2 border-black">
          <div className="py-2 px-4">HEALTH SERVICES</div>
          <div className="py-2 px-4 border-l-2 border-r-2 border-black">YEAR</div>
          <div className="py-2 px-4">NURSE INCHARGE</div>
        </div>

        {/* Table Content */}
        <div className="min-h-[300px]">
          {activeTab === 'PRENATAL' && myProfile?.prenatal.length > 0 && Array.isArray(myProfile.prenatal) && myProfile.prenatal.map((data, i) => (
                <div key={i} className="grid grid-cols-3 text-center border-b last:border-b-0">
                        <div className="py-3 px-4">{activeTab}</div>
                        <div className="py-3 px-4 border-l-2 border-r-2 border-black">{new Date(data.createdAt).getFullYear()}</div>
                        <div className="py-3 px-4">{data.nurseIncharge.name}</div>
                </div>
            ))}
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4 mt-4">
          <button className="px-12 py-2 border-2 border-black hover:bg-gray-100">
            VIEW
          </button>
          <button onClick={() => setOpenMedicalHistory(false)} className="px-12 py-2 border-2 border-black hover:bg-gray-100">
            BACK
          </button>
        </div>
      </div>
    </div>
  )
}

export default MedicalServices

