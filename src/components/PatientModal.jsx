import React, { useState, useEffect } from "react";
import { useImmunization } from "../hooks/useImmunization";
import { usePrenatal } from "../hooks/usePrenatal";
import { useFamilyPlanning } from "../hooks/useFamilyPlanning";
import useOtherServices from "../hooks/useOtherServices";
import HistoryDetails from "./healthcare_services/specificDetailsHistory/HistoryDetails";
import { usePatient } from "../hooks/usePatient";

const PatientModal = ({
  patientData,
  setIsModalOpen,
  isModalOpen,
  handlePrint,
  componentRef,
  setIsPatientSelect,
  patientDataSelected,
  user
}) => {
  const [isPatientHistory, setIsPatientHistory] = useState(false);
  const { getPrenatalByUserIdHistory, prenatalHistory } = usePrenatal();
  const { getImmunizationByPatientHistory, immunizationHistory } =
    useImmunization();
  const { fetchFamilyPlanningByUserIdHistory, familyPlanningHistory } =
    useFamilyPlanning();
  const { getPatientById, myProfile } = usePatient();
  const { getOtherServiceHistory, otherServicesHistory } = useOtherServices();
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
  };

  useEffect(() => {
    getImmunizationByPatientHistory(patientData?.objectId);
  }, [patientData?.objectId]);

  useEffect(() => {
    getPrenatalByUserIdHistory(patientData?.objectId);
  }, [patientData?.objectId]);

  useEffect(() => {
    fetchFamilyPlanningByUserIdHistory(patientData?.objectId);
  }, [patientData?.objectId]);

  useEffect(() => {
    getOtherServiceHistory(patientData?.objectId);
  }, [patientData?.objectId]);

  useEffect(() => {
    getPatientById(patientDataSelected?.objectId);
  }, [patientDataSelected]);

  if (Object.keys(myProfile).length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-xl animate-pulse">Loading...</p>
      </div>
    );
  }


  return (
    <div className="w-full">
      {!isPatientHistory && (
        <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
          PATIENT PROFILE
        </h1>
      )}

      {isPatientHistory ? (
        <div className="bg-white flex flex-col justify-between items-center relative w-full">
          <div className="flex flex-col h-full w-full">
            {!isViewDetails && (
              <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
                PATIENT HISTORY RECORD OF {myProfile?.firstname}{" "}
                {myProfile?.lastname}
              </h2>
            )}
            {(!isViewDetails || tableIndexSelected === null) && (
              <div className="flex flex-col max-w-4xl mx-auto">
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
                <div className="border-2 border-black">
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
                      Array.isArray(myProfile?.prenatal) &&
                      (myProfile.prenatal.length > 0 ? (
                        myProfile.prenatal.map((data, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectionTableRow(data, i)}
                            className={`${
                              tableIndexSelected === i &&
                              activeTab === "PRENATAL CARE"
                                ? "bg-orange-100"
                                : ""
                            } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                          >
                            <div className="py-3 px-4">{activeTab}</div>
                            <div className="py-3 px-4">
                              {new Date(data.createdAt).getFullYear()}
                            </div>
                            <div className="py-3 px-4">
                              {data.nurseIncharge.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3">
                          <p className="text-2xl text-black font-semibold uppercase border-b-[1px] border-black pb-2">
                            No records found
                          </p>
                        </div>
                      ))}

                    {activeTab === "IMMUNIZATION" &&
                      (Array.isArray(myProfile?.immunization) &&
                      myProfile.immunization.length > 0 ? (
                        myProfile.immunization.map((data, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectionTableRow(data, i)}
                            className={`${
                              tableIndexSelected === i &&
                              activeTab === "IMMUNIZATION"
                                ? "bg-orange-100"
                                : ""
                            } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                          >
                            <div className="py-3 px-4">{activeTab}</div>
                            <div className="py-3 px-4">
                              {new Date(data.createdAt).getFullYear()}
                            </div>
                            <div className="py-3 px-4">
                              {data.nurseIncharge.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3">
                          <p className="text-2xl text-black font-semibold uppercase border-b-[1px] border-black pb-2">
                            No records found
                          </p>
                        </div>
                      ))}

                    {activeTab === "FAMILY PLANNING" &&
                      (Array.isArray(myProfile?.familyPlanning) &&
                      myProfile.familyPlanning.length > 0 ? (
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
                            <div className="py-3 px-4">
                              {new Date(data.record?.createdAt).getFullYear()}
                            </div>
                            <div className="py-3 px-4">
                              {data.record?.nurseIncharge?.name}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3">
                          <p className="text-2xl text-black font-semibold uppercase border-b-[1px] border-black pb-2">
                            No records found
                          </p>
                        </div>
                      ))}

                    {activeTab === "OTHER SERVICES" &&
                      (Array.isArray(myProfile?.otherServices) &&
                      myProfile.otherServices.length > 0 ? (
                        myProfile.otherServices.map((data, i) => (
                          <div
                            key={i}
                            onClick={() => handleSelectionTableRow(data, i)}
                            className={`${
                              tableIndexSelected === i &&
                              activeTab === "OTHER SERVICES"
                                ? "bg-orange-100"
                                : ""
                            } grid grid-cols-3 text-center border-b last:border-b-0 cursor-pointer`}
                          >
                            <div className="py-3 px-4">{activeTab}</div>
                            <div className="py-3 px-4">
                              {data.createdAt
                                ? new Date(data.createdAt).getFullYear()
                                : "N/A"}
                            </div>
                            <div className="py-3 px-4">
                              {data.nurseIncharge?.name || "Unknown"}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-3">
                          <p className="text-2xl text-black font-semibold uppercase border-b-[1px] border-black pb-2">
                            No records found
                          </p>
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
                      onClick={() => setIsPatientHistory(false)}
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
                handlePrint={handlePrint}
                componentRef={componentRef}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
                user={user}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <div
            ref={componentRef}
            className="mx-auto gap-5 w-full max-w-6xl p-6 border rounded-lg shadow-lg"
          >
            {/* Left Column - Photo and Basic Info */}
            <div className="grid grid-cols-5">
              <div className="flex flex-col gap-1">
                <img
                  src={myProfile?.profilePicture || "/avatarplaceholder.png"}
                  alt=""
                  className="w-32 h-32 object-cover"
                />
                <div className="text-[11px]">
                  <p className="font-semibold">PATIENT ID NO.</p>
                  <p className="text-black">{myProfile?.patientIdNo}</p>
                </div>
                <div className="text-[11px]">
                  <p className="font-semibold">EMAIL ADDRESS:</p>
                  <p className="text-black break-words">{myProfile?.email}</p>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-2 text-[11px]">
                <div>
                  <p className="text-gray-600 text-sm">LASTNAME:</p>
                  <p className="font-semibold">{myProfile?.lastname}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">PUROK:</p>
                  <p className="font-semibold">{myProfile?.purok}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">BIRTHDATE:</p>
                  <p className="font-semibold">{myProfile?.bod}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">BIRTHPLACE:</p>
                  <p className="font-semibold">{myProfile?.birthPlace}</p>
                </div>
                <div>
                  <p className="text-gray-600">HOUSEHOLD MONTHLY INCOME:</p>
                  <p className="font-semibold">
                    {myProfile?.houseHoldMonthlyIncome}
                  </p>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-2 text-[11px]">
                <div>
                  <p className="text-gray-600 text-sm">FIRSTNAME:</p>
                  <p className="font-semibold">{myProfile?.firstname}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">BARANGAY:</p>
                  <p className="font-semibold">{myProfile?.barangay}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">AGE:</p>
                  <p className="font-semibold">{myProfile?.age}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">BLOODTYPE:</p>
                  <p className="font-semibold">{myProfile?.bloodType}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-600">NO. LIVING CHILD:</p>
                  <p className="text-center font-semibold">
                    - {myProfile?.livingChild} -
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2 text-[11px]">
                <div>
                  <p className="text-gray-600 text-sm">MIDDLE NAME:</p>
                  <p className="font-semibold">{myProfile?.middleInitial}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">MUNICIPALITY:</p>
                  <p className="font-semibold">{myProfile?.municipality}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">NATIONALITY:</p>
                  <p className="font-semibold">{myProfile?.nationality}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">CONTACT NO.:</p>
                  <p className="font-semibold">{myProfile?.contact}</p>
                </div>
                <div className="flex gap-2 items-center">
                  <p className="text-gray-600">NO. NON-LIVING CHILD:</p>
                  <p className="text-center font-semibold">
                    - {myProfile?.nonLivingChild} -
                  </p>
                </div>
              </div>

              {/* Additional Information Spanning Full Width */}
              <div className="space-y-2 text-[11px]">
                <div>
                  <p className="text-gray-600 text-sm">CIVIL STATUS:</p>
                  <p className="font-semibold">{myProfile?.civilStatus}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">PROVINCE:</p>
                  <p className="font-semibold">{myProfile?.province}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">RELIGION:</p>
                  <p className="font-semibold">{myProfile?.religion}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">OCCUPATION:</p>
                  <p className="font-semibold">{myProfile?.occupation}</p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="healthcareAssistance"
                      value="4PS"
                      checked={myProfile?.healthcareAssistance === "4ps"}
                    />
                    <span>4PS</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="healthcareAssistance"
                      value="INDIGENT"
                      checked={myProfile?.healthcareAssistance === "indigent"}
                    />
                    <span>INDIGENT</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="healthcareAssistance"
                      value="PRIVATE"
                      checked={myProfile?.healthcareAssistance === "private"}
                    />
                    <span>PRIVATE</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Main Information Grid */}
            <div className="grid grid-cols-3 gap-4">
              {/* Emergency Contact Section */}
              <div className="col-span-3 mt-8 border-t pt-6 text-[11px]">
                <h2 className="text-lg font-semibold mb-4">
                  EMERGENCY CONTACT PERSON
                </h2>
                <div className="grid grid-cols-4 gap-4">
                  {/* Left Column */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600">LASTNAME:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyLastName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">ADDRESS:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyAddress}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">CIVIL STATUS:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyCivilStatus}
                      </p>
                    </div>
                  </div>

                  {/* Middle Column */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600">FIRSTNAME:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyFirstName}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">BIRTHDATE:</p>
                      <p className="font-semibold">{myProfile?.emergencyBod}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">NATIONALITY:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyNationality}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600">MIDDLE INITIAL:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyInitial}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">AGE:</p>
                      <p className="font-semibold">{myProfile?.emergencyAge}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">RELIGION:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyReligion}
                      </p>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-2">
                    <div>
                      <p className="text-gray-600 text-sm">RELATIONSHIP:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyRelationship}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">OCCUPATION:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyOccupation}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 text-sm">CONTACT NO:</p>
                      <p className="font-semibold">
                        {myProfile?.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className='hidden print:block uppercase mt-20'>PRINTED BY: {user?.get("role")} {user?.get("name")}</p> 
          </div>
          {/* Action Buttons */}
          <div className="max-w-6xl mx-auto col-span-3 flex justify-between mt-6 text-[11px]">
            <button
              onClick={() => setIsPatientHistory(!isPatientHistory)}
              className="px-8 py-2 bg-white text-black border-[2px] border-zinc-600 text-sm shadow font-semibold"
            >
              PATIENT HISTORY
            </button>
            <div className="flex gap-4">
              <button
                onClick={handlePrint}
                className="px-8 py-2 border-[2px] border-zinc-600 text-sm font-semibold shadow hover:bg-gray-50"
              >
                PRINT
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsModalOpen(!isModalOpen);
                  setIsPatientSelect(false);
                }}
                className="px-8 py-2 border-[2px] border-zinc-600 text-sm font-semibold shadow hover:bg-gray-50"
              >
                BACK
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PatientModal;
