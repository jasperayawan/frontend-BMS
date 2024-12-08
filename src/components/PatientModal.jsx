import React, { useState, useEffect } from "react";
import { useImmunization } from "../hooks/useImmunization";
import { usePrenatal } from "../hooks/usePrenatal";
import { useFamilyPlanning } from "../hooks/useFamilyPlanning";
import useOtherServices from "../hooks/useOtherServices";
import PatientHistoryDetails from './PatientHistoryDetails';
import { Avatar, ScrollArea, Theme } from "@radix-ui/themes";

const PatientModal = ({
  patientData,
  setIsModalOpen,
  isModalOpen,
  handlePrint,
  componentRef,
  setIsPatientSelect,
  patientDataSelected
}) => {
  const [isPatientHistory, setIsPatientHistory] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedHistoryType, setSelectedHistoryType] = useState("");
  const { getPrenatalByUserIdHistory, prenatalHistory } = usePrenatal();
  const { getImmunizationByPatientHistory, immunizationHistory } = useImmunization();
  const { fetchFamilyPlanningByUserIdHistory, familyPlanningHistory } = useFamilyPlanning();
  const { getOtherServiceHistory, otherServicesHistory } = useOtherServices();

  const symptoms = [
    "Edema",
    "Constipation", 
    "Nausea/Vomiting",
    "Leg Cramps",
    "Hemorrhoids",
    "Heartburn"
  ];

  useEffect(() => {
    getImmunizationByPatientHistory(patientData?.objectId)
  }, [patientData?.objectId])

  useEffect(() => {
    getPrenatalByUserIdHistory(patientData?.objectId)
  }, [patientData?.objectId])

  useEffect(() => {
    fetchFamilyPlanningByUserIdHistory(patientData?.objectId)
  }, [patientData?.objectId])

  useEffect(() => {
    getOtherServiceHistory(patientData?.objectId)
  }, [patientData?.objectId])

  const handleRowClick = (data, type) => {
    setSelectedRow({
      ...data,
      type: type
    });
    setSelectedHistoryType(type);
  };

  const handleBackClick = () => {
    setSelectedRow(null);
    setSelectedHistoryType("");
  };

  const HISTORY_TYPES = {
    0: { key: 'PRENATAL', data: prenatalHistory },
    1: { key: 'IMMUNIZATION', data: immunizationHistory },
    2: { key: 'FAMILY PLANNING', data: familyPlanningHistory },
    3: { key: 'OTHER SERVICES', data: otherServicesHistory }
  };

  const TableRow = ({ data, type, onClick }) => (
    <tr 
      className="bg-white border-b hover:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => onClick(data, type)}
    >
      <td className="px-6 py-4 font-medium">
        <span>{type}</span>
      </td>
      <td className="px-6 py-4">
        {data?.createdAt ? new Date(data.createdAt).toLocaleDateString() : '-'}
      </td>
      <td className="px-6 py-4">
        {data?.createdAt ? new Date(data.createdAt).getFullYear() : '-'}
      </td>
      <td className="px-6 py-4">
        {data?.nurseIncharge ? `${data.nurseIncharge.name} ${data.nurseIncharge.username}` : '-'}
      </td>
    </tr>
  );

  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center">
      {isPatientHistory ? (
        <div className="bg-white flex flex-col justify-between items-center rounded-[12px] min-w-[500px] h-[600px] relative overflow-y-auto">
        <div className="flex flex-col h-full">
        <h2 className="text-center py-2">Patient History</h2>
        
        {!selectedRow && (
          <div className="flex flex-row gap-x-1 p-4 border-b">
            {[
              { label: 'PRENATAL', index: 0 },
              { label: 'IMMUNIZATION', index: 1 },
              { label: 'FAMILY PLANNING', index: 2 },
              { label: 'OTHER SERVICES', index: 3 }
            ].map((tab) => (
              <button
                key={tab.index}
                onClick={() => setHistoryIndex(tab.index)}
                className={`
                  px-6 py-2.5
                  text-sm font-medium
                  transition-all duration-200
                  rounded-lg
                  ${historyIndex === tab.index 
                    ? 'bg-yellow-500 text-white shadow-sm' 
                    : 'text-gray-600 hover:bg-gray-100'
                  }
                `}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      
        {!selectedRow ? (
         <div className="flex flex-col justify-between items-center h-full">
           <div className="w-full overflow-x-auto">
             <table className="w-full text-sm text-left">
               <thead className="bg-yellow-500 text-white">
                 <tr>
                   <th scope="col" className="px-6 py-3 font-semibold">
                     HEALTH SERVICES
                   </th>
                   <th scope="col" className="px-6 py-3 font-semibold">
                     DATE
                   </th>
                   <th scope="col" className="px-6 py-3 font-semibold">
                     YEAR
                   </th>
                   <th scope="col" className="px-6 py-3 font-semibold">
                     NURSE INCHARGE
                   </th>
                 </tr>
               </thead>
               <tbody>
                 {(() => {
                   const currentType = HISTORY_TYPES[historyIndex];
                   const records = currentType?.data;

                   if (!Array.isArray(records) || records.length === 0) {
                     return (
                       <tr>
                         <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                           No records found for {currentType?.key}
                         </td>
                       </tr>
                     );
                   }

                   return records.map((data, index) => (
                     <TableRow 
                       key={data.objectId || index}
                       data={data}
                       type={currentType.key}
                       onClick={handleRowClick}
                     />
                   ));
                 })()}
               </tbody>
             </table>
           </div>
           <button 
             onClick={() => {
               setIsPatientHistory(!isPatientHistory);
               setIsModalOpen(true);
             }} 
             className="px-6 py-3 mt-4 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
           >
             Back
           </button>
         </div>
        ) : (
          <div className="w-full">
            <PatientHistoryDetails 
              componentRef={componentRef}
              selectedRow={selectedRow}
              symptoms={symptoms}
              patientDataSelected={patientDataSelected}
              handleBackClick={handleBackClick}
              handlePrint={handlePrint}
            />
          </div>
        )}
        </div>
      </div>      
      ) : (
        <ScrollArea className="bg-gray-50 rounded-lg p-4" style={{ width: '700px', height: '600px' }}>
        <div ref={componentRef} className="w-full">
          <div className="flex gap-x-6 formContainer">
            <div className="flex flex-col gap-y-2 InitInnerformContainer">
              <Avatar
                size="2"
                src={patientData.profilePicture}
                fallback="A"
                className="h-[192px] w-[192px]"
              />
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col justify-start items-start gap-x-1">
                  <p className="text-[12px] font-semibold">PATIENT ID NO.</p>
                  <span className="text-[12px]">
                    {patientData.patientIdNo}
                  </span>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-1">
                  <p className="text-[12px] font-semibold">Email.</p>
                  <span className="text-[12px]">{patientData.email}</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 secondInnerformContainer">
              <div className="flex flex-row gap-x-4 space-x-5 secondInnerformContainer_child">
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Last Name</h5>
                  <p className="text-[14px]">{patientData.lastname}</p>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">First Name</h5>
                  <p className="text-[14px]">{patientData.firstname}</p>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">
                    Middle Initial
                  </h5>
                  <p className="text-[14px]">{patientData.middleInitial}</p>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Civil Status</h5>
                  <p className="text-[14px]">{patientData.civilStatus}</p>
                </div>
              </div>
              <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Purok
                  </h5>
                  <p className="text-[14px]">{patientData.purok}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Barangay
                  </h5>
                  <p className="text-[14px]">{patientData.barangay}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Municipality
                  </h5>
                  <p className="text-[14px]">{patientData.municipality}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Province
                  </h5>
                  <p className="text-[14px]">{patientData.province}</p>
                </div>
              </div>
              <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Birth Date
                  </h5>
                  <p className="text-[14px]">{patientData.bod}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">Age</h5>
                  <p className="text-[14px]">{patientData.age}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Municipality
                  </h5>
                  <p className="text-[14px]">{patientData.municipality}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Religion
                  </h5>
                  <p className="text-[14px]">{patientData.religion}</p>
                </div>
              </div>
              <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Birth Place
                  </h5>
                  <p className="text-[14px]">{patientData.birthPlace}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Blood Type
                  </h5>
                  <p className="text-[14px]">{patientData.bloodType}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Contact No
                  </h5>
                  <p className="text-[14px]">{patientData.contact}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Occupation
                  </h5>
                  <p className="text-[14px]">{patientData.occupation}</p>
                </div>
              </div>
              <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-center gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    House Hold Montly Income
                  </h5>
                  <p className="text-[14px]">
                    {patientData.houseHoldMonthlyIncome}
                  </p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    No. living child
                  </h5>
                  <p className="text-[14px]">{patientData.livingChild}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    No. Non living child
                  </h5>
                  <p className="text-[14px]">{patientData.nonLivingChild}</p>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Contact No
                  </h5>
                  <p className="text-[14px]">{patientData.contact}</p>
                </div>
              </div>
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">
                  Occupation
                </h5>
                <div className="flex flex-row gap-x-2">
                  <input
                    type="radio"
                    id="html"
                    name="support"
                    value="4ps"
                    checked={patientData.healthcareAssistance === "4ps"}
                  />
                  <label htmlFor="html" className="text-[12px]">
                    4PS
                  </label>

                  <input
                    type="radio"
                    id="css"
                    name="support"
                    value="indigent"
                    checked={patientData.healthcareAssistance === "indigent"}
                  />
                  <label htmlFor="indigent" className="text-[12px]">
                    INDIGENT
                  </label>

                  <input
                    type="radio"
                    id="javascript"
                    name="support"
                    value="private"
                    checked={patientData.healthcareAssistance === "private"}
                  />
                  <label htmlFor="private" className="text-[12px]">
                    PRIVATE
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center my-5 cuttLine">
            <div className="w-[200px] h-[2px] bg-zinc-200 lineOne"></div>
            <h3 className="text-center text-zinc-500 text-[12px]">
              EMERGENCY
              <br /> CONTACT PERSON
            </h3>
            <div className="w-full h-[2px] bg-zinc-200 lineTwo"></div>
          </div>
          <div className="flex flex-col gap-y-5 secondFormContainer">
            <div className="flex flex-row gap-x-4 secondFormContainer_child">
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">LASTNAME</h6>
                <p className="text-[12px]">
                  {patientData.emergencyLastName}
                </p>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">FIRSTNAME</h6>
                <p className="text-[12px]">
                  {patientData.emergencyFirstName}
                </p>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">MIDDLE INITIAL</h6>
                <p className="text-[12px]">
                  {patientData.emergencyInitial}
                </p>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">RELATIONSHIP</h6>
                <p className="text-[12px]">
                  {patientData.emergencyRelationship}
                </p>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CIVIL STATUS</h6>
                <p className="text-[12px]">
                  {patientData.emergencyCivilStatus}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 secondFormContainer_child">
              <div className="flex flex-col items-start">
                <h6 className="text-[12px] font-semibold">ADDRESS</h6>
                <p className="text-[12px]">
                  {patientData.emergencyAddress}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <h6 className="text-[12px] font-semibold">BIRTH DATE</h6>
                <p className="text-[12px]">
                  {patientData.emergencyBod}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <h6 className="text-[12px] font-semibold">AGE</h6>
                <p className="text-[12px]">
                  {patientData.emergencyAge}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <h6 className="text-[12px] font-semibold">OCCUPATION</h6>
                <p className="text-[12px]">
                  {patientData.emergencyOccupation}
                </p>
              </div>
              <div className="flex flex-col items-start">
                <h6 className="text-[12px] font-semibold">NATIONALITY</h6>
                <p className="text-[12px]">
                  {patientData.emergencyNationality}
                </p>
              </div>
            </div>
            <div className="flex flex-row gap-x-4 secondFormContainer_child">
              <div className="flex flex-col items-start secondFormContainer_childData">
                <h6 className="text-[12px] font-semibold">RELIGION</h6>
                <p className="text-[12px]">
                  {patientData.emergencyRelationship}
                </p>
              </div>
              <div className="flex flex-col items-start secondFormContainer_childData">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <p className="text-[12px]">
                  {patientData.emergencyContact}
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={() => setIsPatientHistory(!isPatientHistory)}
            className="px-6 py-2 rounded-md bg-zinc-400 text-[12px] mt-5 font-semibold"
          >
            Patient History
          </button>
          <div className="flex flex-row justify-center items-center gap-x-2 mt-10">
            <button
              onClick={handlePrint}
              className="px-6 py-2 rounded-md bg-yellow-500 text-white no-print"
            >
              PRINT
            </button> 
            <button
              onClick={() => {
                setIsModalOpen(!isModalOpen)
                setIsPatientSelect(false)
              }}
              className="px-6 py-2 rounded-md border-[1px] border-yellow-500 text-yellow-500 no-print"
            >
              BACK
            </button>
          </div>
        </div>
      </ScrollArea>
      )}
    </div>
  );
};

export default PatientModal;
