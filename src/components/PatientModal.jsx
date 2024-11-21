import React, { useState } from "react";

const PatientModal = ({
  patientData,
  setIsModalOpen,
  isModalOpen,
  handlePrint,
  componentRef,
}) => {
  const [isPatientHistory, setIsPatientHistory] = useState(false);
  const [historyIndex, setHistoryIndex] = useState(0);

  console.log(patientData);
  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center">
      {isPatientHistory ? (
        <div className="bg-white flex flex-col justify-between items-center rounded-[12px] min-w-[500px] h-[600px] relative overflow-y-auto">
        <div className="flex flex-col">
        <h2 className="text-center py-2">Patient History</h2>
        <div className="flex flex-row justify-between items-center">
          <span onClick={() => setHistoryIndex(0)} className={`cursor-pointer text-[12px] px-4 border-[1px] border-[#000000] ${historyIndex === 0 && 'bg-yellow-500'} rounded-t-[12px]`}>
            PRENATAL
          </span>
          <span onClick={() => setHistoryIndex(1)} className={`cursor-pointer text-[12px] px-4 border-[1px] border-[#000000] ${historyIndex === 1 && 'bg-yellow-500'} rounded-t-[12px]`}>
            IMMUNIZATION
          </span>
          <span onClick={() => setHistoryIndex(2)} className={`cursor-pointer text-[12px] px-4 border-[1px] border-[#000000] ${historyIndex === 2 && `bg-yellow-500`} rounded-t-[12px]`}>
            FAMILY PLANNING
          </span>
          <span onClick={() => setHistoryIndex(3)} className={`cursor-pointer text-[12px] px-4 border-[1px] border-[#000000] ${historyIndex === 3 && `bg-yellow-500`} rounded-t-[12px]`}>
            OTHER SERVICES
          </span>
        </div>
      
        <table className="w-full text-sm text-left rtl:text-right">
          <thead className="bg-yellow-500">
            <tr>
              <th scope="col" className="px-6 py-3">
                HEALTH SERVICES
              </th>
              <th scope="col" className="px-6 py-3">
                YEAR
              </th>
              <th scope="col" className="px-6 py-3">
                NURSE INCHARGE
              </th>
            </tr>
          </thead>
          <tbody>
            {historyIndex === 0 ? (
              <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.prenatal[0]?.HealthService}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.prenatal[0].Year}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.prenatal[0]?.NurseInCharge}
                </td>
              </tr>
            ) : historyIndex === 1 ? (
              <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.immunization[0]?.HealthService}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.immunization[0].Year}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.immunization[0]?.NurseInCharge}
                </td>
              </tr>
            ) : historyIndex === 2 ? (
              <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.familyPlanning[0]?.HealthService}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.familyPlanning[0].Year}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.familyPlanning[0]?.NurseInCharge}
                </td>
              </tr>
            ) : (
              <tr className="bg-white border-b dark:bg-gray-200 dark:border-gray-700">
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.otherServices[0]?.HealthService}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.otherServices[0].Year}
                </td>
                <td className="px-6 py-4">
                  {patientData?.patientHistory?.otherServices[0]?.NurseInCharge}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
        <button onClick={() => {
          setIsPatientHistory(!isPatientHistory);
          setIsModalOpen(true)
        }} className="px-6 py-3 bg-gray-200">Back</button>
      </div>      
      ) : (
        <div className="bg-white rounded-[12px] min-w-[500px] h-[600px] relative p-4 overflow-y-auto">
          <div className="absolute top-2 right-2"></div>
          <div ref={componentRef} className="w-full">
            <div className="flex gap-x-6 formContainer">
              <div className="flex flex-col gap-y-2 InitInnerformContainer">
                <img
                  src="/avatarplaceholder.png"
                  alt=""
                  className="h-[150px] w-[150px] profilePic"
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
                    <p className="text-[14px]">{patientData.lastName}</p>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">First Name</h5>
                    <p className="text-[14px]">{patientData.firstName}</p>
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
                    <p className="text-[14px]">{patientData.birthdate}</p>
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
                    <p className="text-[14px]">{patientData.contactUs}</p>
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
                      {patientData.householdMonthlyIncome}
                    </p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-x-4">
                    <h5 className="text-[12px] font-semibold uppercase">
                      No, living child
                    </h5>
                    <p className="text-[14px]">{patientData.NoLivingChild}</p>
                  </div>
                  <div className="flex flex-col justify-start items-start gap-x-4">
                    <h5 className="text-[12px] font-semibold uppercase">
                      Contact No
                    </h5>
                    <p className="text-[14px]">{patientData.contactUs}</p>
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
                      checked={patientData.support === "4PS"}
                    />
                    <label htmlFor="html" className="text-[12px]">
                      4PS
                    </label>

                    <input
                      type="radio"
                      id="css"
                      name="support"
                      value="indigent"
                      checked={patientData.support === "INDIGENT"}
                    />
                    <label htmlFor="indigent" className="text-[12px]">
                      INDIGENT
                    </label>

                    <input
                      type="radio"
                      id="javascript"
                      name="support"
                      value="private"
                      checked={patientData.support === "PRIVATE"}
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
                    {patientData.emergencyContactPerson[0].lastName}
                  </p>
                </div>
                <div className="flex flex-col items-start dtContainer">
                  <h6 className="text-[12px] font-semibold">FIRSTNAME</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].firstName}
                  </p>
                </div>
                <div className="flex flex-col items-start dtContainer">
                  <h6 className="text-[12px] font-semibold">MIDDLE INITIAL</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].middleInitial}
                  </p>
                </div>
                <div className="flex flex-col items-start dtContainer">
                  <h6 className="text-[12px] font-semibold">RELATIONSHIP</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].relationship}
                  </p>
                </div>
                <div className="flex flex-col items-start dtContainer">
                  <h6 className="text-[12px] font-semibold">CIVIL STATUS</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].civilStatus}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 secondFormContainer_child">
                <div className="flex flex-col items-start">
                  <h6 className="text-[12px] font-semibold">ADDRESS</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].address}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h6 className="text-[12px] font-semibold">BIRTH DATE</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].birthdate}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h6 className="text-[12px] font-semibold">AGE</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].age}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h6 className="text-[12px] font-semibold">OCCUPATION</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].occupation}
                  </p>
                </div>
                <div className="flex flex-col items-start">
                  <h6 className="text-[12px] font-semibold">NATIONALITY</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].nationality}
                  </p>
                </div>
              </div>
              <div className="flex flex-row gap-x-4 secondFormContainer_child">
                <div className="flex flex-col items-start secondFormContainer_childData">
                  <h6 className="text-[12px] font-semibold">RELIGION</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].religion}
                  </p>
                </div>
                <div className="flex flex-col items-start secondFormContainer_childData">
                  <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                  <p className="text-[12px]">
                    {patientData.emergencyContactPerson[0].contactNo}
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
                onClick={() => setIsModalOpen(!isModalOpen)}
                className="px-6 py-2 rounded-md border-[1px] border-yellow-500 text-yellow-500 no-print"
              >
                BACK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PatientModal;
