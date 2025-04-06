"use client";

import React, { useEffect, useState } from "react";
import HistoryDetails from "./healthcare_services/specificDetailsHistory/HistoryDetails";

const MedicalServices = ({ setOpenMedicalHistory, myProfile }) => {
  const [activeTab, setActiveTab] = useState("PRENATAL");
  const [specificHistoryData, setSpecificHistoryData] = useState({});
  const [tableIndexSelected, setTableIndexSelected] = useState(null);
  const [isViewDetails, setIsViewDetails] = useState(false);

  const tabs = [
    "PRENATAL CARE",
    "IMMUNIZATION",
    "FAMILY PLANNING",
    "OTHER SERVICES",
  ];

  const services = {
    PRENATAL: [
      { year: "2017", nurse: "MARIE B. CHUI" },
      { year: "2020", nurse: "KIRA J. TERE" },
      { year: "2023", nurse: "MARJ CABARDO" },
    ],
    IMMUNIZATION: [],
    "FAMILY PLANNING": [],
    "OTHER SERVICES": [],
  };

  const handleSelectionTableRow = (data, i) => {
    setSpecificHistoryData(data);
    setTableIndexSelected(i);
    setIsViewDetails(false);
  };

  const handleTabsSelection = (tab) => {
    setActiveTab(tab);
    setTableIndexSelected(null);
    setIsViewDetails(false);
  };

  const handleViewDetailsRow = () => {
    setIsViewDetails(true);
  };

  const handleCloseHistoryDetails = () => {
    setTableIndexSelected(null);
    setIsViewDetails(false);
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Tabs */}
      {(!isViewDetails || tableIndexSelected === null) && (
        <div className="flex flex-col">
          <div className="flex relative mb-[-1px]">
            {tabs.map((tab, index) => (
              <button
                key={tab}
                onClick={() => handleTabsSelection(tab)}
                className={`
                  px-6 py-2 min-w-[200px] font-bold
                  ${
                    activeTab === tab
                      ? "bg-yellow-400 text-black border-2 border-black z-10 rounded-t-lg"
                      : "bg-white border-2 border-black rounded-t-lg -ml-2 first:ml-0"
                  }
                  ${index > 0 && "transform translate-x-[-1px]"}
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
              <div className="py-2 px-4 border-l-2 border-r-2 border-black">
                YEAR
              </div>
              <div className="py-2 px-4">NURSE INCHARGE</div>
            </div>

            {/* Table Content */}
            <div className="min-h-[300px]">
              {activeTab === "PRENATAL CARE" &&
                myProfile?.prenatal.length > 0 &&
                Array.isArray(myProfile.prenatal) &&
                myProfile.prenatal.map((data, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectionTableRow(data, i)}
                    className={`${
                      tableIndexSelected === i && activeTab === "PRENATAL CARE"
                        ? "bg-orange-100"
                        : ""
                    } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                  >
                    <div className="py-3 px-4">{activeTab}</div>
                    <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                      {new Date(data.createdAt).getFullYear()}
                    </div>
                    <div className="py-3 px-4">{data.nurseIncharge.name}</div>
                  </div>
                ))}

              {activeTab === "IMMUNIZATION" &&
                Array.isArray(myProfile.immunization) &&
                myProfile?.immunization.length > 0 &&
                Array.isArray(myProfile.immunization) &&
                myProfile.immunization.map((data, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectionTableRow(data, i)}
                    className={`${
                      tableIndexSelected === i && activeTab === "IMMUNIZATION"
                        ? "bg-orange-100"
                        : ""
                    } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                  >
                    <div className="py-3 px-4">{activeTab}</div>
                    <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                      {new Date(data.createdAt).getFullYear()}
                    </div>
                    <div className="py-3 px-4">{data.nurseIncharge.name}</div>
                  </div>
                ))}

              {activeTab === "FAMILY PLANNING" &&
                Array.isArray(myProfile.familyPlanning) &&
                myProfile?.familyPlanning.length > 0 &&
                Array.isArray(myProfile.familyPlanning) &&
                myProfile.familyPlanning.map((data, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectionTableRow(data, i)}
                    className={`${
                      tableIndexSelected === i &&
                      activeTab === "FAMILY PLANNING"
                        ? "bg-orange-100"
                        : ""
                    } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                  >
                    <div className="py-3 px-4">{activeTab}</div>
                    <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                      {new Date(data.record.createdAt).getFullYear()}
                    </div>
                    <div className="py-3 px-4">
                      {data.record.nurseIncharge?.name}
                    </div>
                  </div>
                ))}

              {activeTab === "OTHER SERVICES" &&
                Array.isArray(myProfile.otherServices) &&
                myProfile?.otherServices.length > 0 &&
                Array.isArray(myProfile.otherServices) &&
                myProfile.otherServices.map((data, i) => (
                  <div
                    key={i}
                    onClick={() => handleSelectionTableRow(data, i)}
                    className={`${
                      tableIndexSelected === i && activeTab === "OTHER SERVICES"
                        ? "bg-orange-100"
                        : ""
                    } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                  >
                    <div className="py-3 px-4">{activeTab}</div>
                    <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                      {new Date(data.createdAt).getFullYear()}
                    </div>
                    <div className="py-3 px-4">{data.nurseIncharge?.name}</div>
                  </div>
                ))}
            </div>

            {/* Buttons */}
            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={handleViewDetailsRow}
                className="px-12 py-2 border-2 border-black hover:bg-gray-100"
              >
                VIEW
              </button>
              <button
                onClick={() => setOpenMedicalHistory(false)}
                className="px-12 py-2 border-2 border-black hover:bg-gray-100"
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewDetails && tableIndexSelected !== null && (
        <HistoryDetails
          specificHistoryData={specificHistoryData}
          myProfile={myProfile}
          activeTab={activeTab}
          handleCloseHistoryDetails={handleCloseHistoryDetails}
        />
      )}
    </div>
  );
};

export default MedicalServices;
