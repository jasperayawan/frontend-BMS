import React, { useState, useEffect } from "react";
import { useImmunization } from "../hooks/useImmunization";
import { usePrenatal } from "../hooks/usePrenatal";
import { useFamilyPlanning } from "../hooks/useFamilyPlanning";
import useOtherServices from "../hooks/useOtherServices";
import HistoryDetails from "./healthcare_services/specificDetailsHistory/HistoryDetails";

const PatientModal = ({
  patientData,
  setIsModalOpen,
  isModalOpen,
  handlePrint,
  componentRef,
  setIsPatientSelect,
  patientDataSelected,
}) => {
  const [isPatientHistory, setIsPatientHistory] = useState(false);
  const { getPrenatalByUserIdHistory, prenatalHistory } = usePrenatal();
  const { getImmunizationByPatientHistory, immunizationHistory } =
    useImmunization();
  const { fetchFamilyPlanningByUserIdHistory, familyPlanningHistory } =
    useFamilyPlanning();
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



  return (
    <div className="">
      {!isPatientHistory && (
        <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
        PATIENT PROFILE
      </h1>
      )}
      
      {isPatientHistory ? (
        <div className="bg-white flex flex-col justify-between items-center relative">
          <div className="flex flex-col h-full">
            {!isViewDetails && (
              <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
                PATIENT HISTORY RECORD OF {patientDataSelected?.firstname} {patientDataSelected?.lastname}
              </h2>
            )}
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
                    patientDataSelected?.prenatal.length > 0 &&
                    Array.isArray(patientDataSelected.prenatal) &&
                    patientDataSelected.prenatal.map((data, i) => (
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
                        <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                          {new Date(data.createdAt).getFullYear()}
                        </div>
                        <div className="py-3 px-4">
                          {data.nurseIncharge.name}
                        </div>
                      </div>
                    ))}

                  {activeTab === "IMMUNIZATION" &&
                    patientDataSelected?.immunization.length > 0 &&
                    Array.isArray(patientDataSelected.immunization) &&
                    patientDataSelected.immunization.map((data, i) => (
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
                        <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                          {new Date(data.createdAt).getFullYear()}
                        </div>
                        <div className="py-3 px-4">
                          {data.nurseIncharge.name}
                        </div>
                      </div>
                    ))}

                  {activeTab === "FAMILY PLANNING" &&
                    patientDataSelected?.familyPlanning.length > 0 &&
                    Array.isArray(patientDataSelected.familyPlanning) &&
                    patientDataSelected.familyPlanning.map((data, i) => (
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
                    patientDataSelected?.otherServices.length > 0 &&
                    Array.isArray(patientDataSelected.otherServices) &&
                    patientDataSelected.otherServices.map((data, i) => (
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
                        <div className="py-3 px-4 border-l-2 border-r-2 border-black">
                          {new Date(data.createdAt).getFullYear()}
                        </div>
                        <div className="py-3 px-4">
                          {data.nurseIncharge?.name}
                        </div>
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
                myProfile={patientDataSelected}
                activeTab={activeTab}
                handlePrint={handlePrint}
                componentRef={componentRef}
                handleCloseHistoryDetails={handleCloseHistoryDetails}
              />
            )}
          </div>
        </div>
      ) : (
        <div
          ref={componentRef}
          className="grid grid-cols-5 gap-5 w-full max-w-6xl p-6 border rounded-lg shadow-lg"
        >
          {/* Left Column - Photo and Basic Info */}
          <div className="flex flex-col gap-3">
            <img
              src={
                patientDataSelected?.profilePicture || "/avatarplaceholder.png"
              }
              alt=""
              className="w-48 h-48 object-cover rounded-lg shadow"
            />
            <div className="text-sm">
              <p className="font-semibold">PATIENT ID NO.</p>
              <p className="text-black">{patientDataSelected?.patientIdNo}</p>
            </div>
            <div className="text-sm">
              <p className="font-semibold">EMAIL ADDRESS:</p>
              <p className="text-black break-words">
                {patientDataSelected?.email}
              </p>
            </div>
          </div>

          {/* Main Information Grid */}
          <div className="col-span-4 grid grid-cols-3 gap-4">
            {/* Personal Information */}
            <div className="space-y-2">
              <div>
                <p className="text-gray-600 text-sm">LASTNAME:</p>
                <p className="font-semibold">{patientDataSelected?.lastname}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">PUROK:</p>
                <p className="font-semibold">{patientDataSelected?.purok}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">BIRTHDATE:</p>
                <p className="font-semibold">{patientDataSelected?.bod}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">BIRTHPLACE:</p>
                <p className="font-semibold">
                  {patientDataSelected?.birthPlace}
                </p>
              </div>
            </div>

            {/* Middle Column */}
            <div className="space-y-2">
              <div>
                <p className="text-gray-600 text-sm">FIRSTNAME:</p>
                <p className="font-semibold">
                  {patientDataSelected?.firstname}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">BARANGAY:</p>
                <p className="font-semibold">{patientDataSelected?.barangay}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">AGE:</p>
                <p className="font-semibold">{patientDataSelected?.age}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">BLOODTYPE:</p>
                <p className="font-semibold">
                  {patientDataSelected?.bloodType}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">
                  HOUSEHOLD MONTHLY INCOME:
                </p>
                <p className="font-semibold">
                  {patientDataSelected?.houseHoldMonthlyIncome}
                </p>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-2">
              <div>
                <p className="text-gray-600 text-sm">MIDDLE NAME:</p>
                <p className="font-semibold">
                  {patientDataSelected?.middleInitial}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">MUNICIPALITY:</p>
                <p className="font-semibold">
                  {patientDataSelected?.municipality}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">NATIONALITY:</p>
                <p className="font-semibold">
                  {patientDataSelected?.nationality}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">CONTACT NO.:</p>
                <p className="font-semibold">{patientDataSelected?.contact}</p>
              </div>
            </div>

            {/* Additional Information Spanning Full Width */}
            <div className="col-span-3 grid grid-cols-4 gap-4 mt-4">
              <div>
                <p className="text-gray-600 text-sm">CIVIL STATUS:</p>
                <p className="font-semibold">
                  {patientDataSelected?.civilStatus}
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">PROVINCE:</p>
                <p className="font-semibold">{patientDataSelected?.province}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">RELIGION:</p>
                <p className="font-semibold">{patientDataSelected?.religion}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">OCCUPATION:</p>
                <p className="font-semibold">
                  {patientDataSelected?.occupation}
                </p>
              </div>
            </div>

            {/* Family Information */}
            <div className="col-span-3 flex items-center gap-8 mt-4">
              <div>
                <p className="text-gray-600 text-sm">NO. LIVING CHILD:</p>
                <p className="text-center font-semibold">
                  - {patientDataSelected?.livingChild} -
                </p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">NO. NON-LIVING CHILD:</p>
                <p className="text-center font-semibold">
                  - {patientDataSelected?.nonLivingChild} -
                </p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="healthcareAssistance"
                    value="4PS"
                    checked={
                      patientDataSelected?.healthcareAssistance === "4ps"
                    }
                  />
                  <span>4PS</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="healthcareAssistance"
                    value="INDIGENT"
                    checked={
                      patientDataSelected?.healthcareAssistance === "indigent"
                    }
                  />
                  <span>INDIGENT</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="healthcareAssistance"
                    value="PRIVATE"
                    checked={
                      patientDataSelected?.healthcareAssistance === "private"
                    }
                  />
                  <span>PRIVATE</span>
                </label>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="col-span-3 mt-8 border-t pt-6">
              <h2 className="text-lg font-semibold mb-4">
                EMERGENCY CONTACT PERSON
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {/* Left Column */}
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-600 text-sm">LASTNAME:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyLastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">ADDRESS:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyAddress}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">CIVIL STATUS:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyCivilStatus}
                    </p>
                  </div>
                </div>

                {/* Middle Column */}
                <div className="space-y-2">
                  <div>
                    <p className="text-gray-600 text-sm">FIRSTNAME:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyFirstName}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">BIRTHDATE:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyBod}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">NATIONALITY:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyNationality}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <p className="text-gray-600 text-sm">MIDDLE INITIAL:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyInitial}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">AGE:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyAge}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">RELIGION:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyReligion}
                    </p>
                  </div>
                </div>

                {/* Right Column */}
                <div className="space-y-2">
                  
                  <div>
                    <p className="text-gray-600 text-sm">RELATIONSHIP:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyRelationship}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">OCCUPATION:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyOccupation}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm">CONTACT NO:</p>
                    <p className="font-semibold">
                      {patientDataSelected?.emergencyContact}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="col-span-3 flex justify-between mt-6">
              <button
                onClick={() => setIsPatientHistory(!isPatientHistory)}
                className="px-8 py-2 bg-white text-black border border-zinc-600 rounded"
              >
                PATIENT HISTORY
              </button>
              <div className="flex gap-4">
                <button
                  onClick={handlePrint}
                  className="px-8 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  PRINT
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(!isModalOpen);
                    setIsPatientSelect(false);
                  }}
                  className="px-8 py-2 border border-gray-300 rounded hover:bg-gray-50"
                >
                  BACK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientModal;
