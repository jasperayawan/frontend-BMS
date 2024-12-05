import React, { useState, useEffect } from "react";
import { useImmunization } from "../../hooks/useImmunization";

const EditImmunization = ({
  patientDataSelected,
  setHealthCare,
  setIsImmunization,
  setIsHealthcareActive,
}) => {
  const { updateImmunization, getImmunizationByPatient, isLoading } =
    useImmunization();
  const [immunizationDialog, setImmunizationDialog] = useState(false);
  const [openTableInfo, setOpenTableInfo] = useState(false);
  const [isImmunizationSelected, setIsImmunizationSelected] = useState(false);
  const [selectedImmunizationHistory, setSelectedImmunizationHistory] = useState(null);
  const [tableIndexSelected, setTableIndexSelected] = useState(null);
  const { getImmunizationByPatientHistory, immunizationHistory } = useImmunization();
  const [formData, setFormData] = useState({
    userId: patientDataSelected?.objectId,
    immunizationId: "",
    lastName: "",
    firstName: "",
    middleName: "",
    birthDate: "",
    age: "",
    birthPlace: "",
    birthWeight: "",
    birthLength: "",
  });

  const [vaccinationHistory, setVaccinationHistory] = useState([
    {
      date: "",
      vaccineType: "",
      doses: "",
      weight: "",
      length: "",
    },
  ]);

  const [micronutrientHistory, setMicronutrientHistory] = useState([
    {
      date: "",
      micronutrientType: "",
      doses: "",
      remarks: "",
    },
  ]);

  useEffect(() => {
    const fetchImmunizationData = async () => {
      try {
        const data = await getImmunizationByPatientHistory(
          patientDataSelected?.objectId
        );

        if (data) {
          setFormData({
            immunizationId: selectedImmunizationHistory.objectId,
            lastName: selectedImmunizationHistory.lastName,
            firstName: selectedImmunizationHistory.firstName,
            middleName: selectedImmunizationHistory.middleName,
            birthDate: selectedImmunizationHistory.birthDate,
            age: selectedImmunizationHistory.age,
            birthPlace: selectedImmunizationHistory.birthPlace,
            birthWeight: selectedImmunizationHistory.birthWeight,
            birthLength: selectedImmunizationHistory.birthLength,
          });
          setVaccinationHistory(selectedImmunizationHistory.vaccinationHistory || []);
          setMicronutrientHistory(selectedImmunizationHistory.micronutrientHistory || []);
        }
      } catch (error) {
        console.error("Error fetching immunization data:", error);
      }
    };

    fetchImmunizationData();
  }, [patientDataSelected?.objectId, selectedImmunizationHistory]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        ...formData,
        userId: patientDataSelected?.objectId,
        patientIdNo: patientDataSelected?.patientIdNo,
        motherName: patientDataSelected?.firstname,
        contactNo: patientDataSelected?.contact,
        address: patientDataSelected?.birthPlace,
        purok: patientDataSelected?.purok,
        category: patientDataSelected?.healthcareAssistance,
        vaccinationHistory,
        micronutrientHistory,
      };

      await updateImmunization(payload, formData?.immunizationId);
      setHealthCare("default");
      setIsImmunization(false);
      setIsHealthcareActive(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setHealthCare("default");
    setIsImmunization(false);
    setIsHealthcareActive(false);
  };

  const addVaccineRecord = () => {
    setVaccinationHistory([
      ...vaccinationHistory,
      {
        date: "",
        vaccineType: "",
        doses: "",
        weight: "",
        length: "",
      },
    ]);
  };

  const addMicronutrientRecord = () => {
    setMicronutrientHistory([
      ...micronutrientHistory,
      {
        date: "",
        micronutrientType: "",
        doses: "",
        remarks: "",
      },
    ]);
  };

  const handleImmunizationHistory = (item, index) => {
    setImmunizationDialog(true);
    setIsImmunizationSelected(true);
    setSelectedImmunizationHistory(item);
    setTableIndexSelected(index);
  };

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Edit Immunization Record</h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {!immunizationDialog && (
            <div className="max-w-7xl mx-auto space-y-6">
              <div className="bg-white rounded-[12px] min-w-[500px] relative p-4">
                <div className="w-full">
                  <div className="flex gap-x-6 formContainer">
                    <div className="flex flex-col gap-y-2 InitInnerformContainer">
                      <img
                        src={patientDataSelected.profilePicture}
                        alt=""
                        className="h-[150px] w-[150px] profilePic"
                      />
                      <div className="flex flex-col gap-y-1">
                        <div className="flex flex-col justify-start items-start gap-x-1">
                          <p className="text-[12px] font-semibold">
                            PATIENT ID NO.
                          </p>
                          <span className="text-[12px]">
                            {patientDataSelected.patientIdNo}
                          </span>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-1">
                          <p className="text-[12px] font-semibold">Email.</p>
                          <span className="text-[12px]">
                            {patientDataSelected.email}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-y-5 secondInnerformContainer">
                      <div className="flex flex-row gap-x-4 space-x-5 secondInnerformContainer_child">
                        <div className="flex flex-col">
                          <h5 className="text-[12px] font-semibold">
                            Last Name
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.lastname}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-[12px] font-semibold">
                            First Name
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.firstname}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-[12px] font-semibold">
                            Middle Initial
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.middleInitial}
                          </p>
                        </div>
                        <div className="flex flex-col">
                          <h5 className="text-[12px] font-semibold">
                            Civil Status
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.civilStatus}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Purok
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.purok}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Barangay
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.barangay}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Municipality
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.municipality}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Province
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.province}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Birth Date
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.birthdate}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Age
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.age}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Municipality
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.municipality}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Religion
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.religion}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Birth Place
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.birthPlace}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Blood Type
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.bloodType}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Contact No
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.contact}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Occupation
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.occupation}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
                        <div className="flex flex-col justify-start items-center gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            House Hold Montly Income
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.householdMonthlyIncome}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            No. living child
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.livingChild}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            No. Non living child
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.nonLivingChild}
                          </p>
                        </div>
                        <div className="flex flex-col justify-start items-start gap-x-4">
                          <h5 className="text-[12px] font-semibold uppercase">
                            Contact No
                          </h5>
                          <p className="text-[14px]">
                            {patientDataSelected.contact}
                          </p>
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
                            checked={
                              patientDataSelected.healthcareAssistance === "4PS"
                            }
                          />
                          <label htmlFor="html" className="text-[12px]">
                            4PS
                          </label>

                          <input
                            type="radio"
                            id="css"
                            name="support"
                            value="indigent"
                            checked={
                              patientDataSelected.healthcareAssistance ===
                              "INDIGENT"
                            }
                          />
                          <label htmlFor="indigent" className="text-[12px]">
                            INDIGENT
                          </label>

                          <input
                            type="radio"
                            id="javascript"
                            name="support"
                            value="private"
                            checked={
                              patientDataSelected.healthcareAssistance ===
                              "PRIVATE"
                            }
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
                          {patientDataSelected.emergencyLastName}
                        </p>
                      </div>
                      <div className="flex flex-col items-start dtContainer">
                        <h6 className="text-[12px] font-semibold">FIRSTNAME</h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyFirstName}
                        </p>
                      </div>
                      <div className="flex flex-col items-start dtContainer">
                        <h6 className="text-[12px] font-semibold">
                          MIDDLE INITIAL
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyInitial}
                        </p>
                      </div>
                      <div className="flex flex-col items-start dtContainer">
                        <h6 className="text-[12px] font-semibold">
                          RELATIONSHIP
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyRelationship}
                        </p>
                      </div>
                      <div className="flex flex-col items-start dtContainer">
                        <h6 className="text-[12px] font-semibold">
                          CIVIL STATUS
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyCivilStatus}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-x-4 secondFormContainer_child">
                      <div className="flex flex-col items-start">
                        <h6 className="text-[12px] font-semibold">ADDRESS</h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyAddress}
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <h6 className="text-[12px] font-semibold">
                          BIRTH DATE
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyBod}
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <h6 className="text-[12px] font-semibold">AGE</h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyAge}
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <h6 className="text-[12px] font-semibold">
                          OCCUPATION
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyOccupation}
                        </p>
                      </div>
                      <div className="flex flex-col items-start">
                        <h6 className="text-[12px] font-semibold">
                          NATIONALITY
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyNationality}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-row gap-x-4 secondFormContainer_child">
                      <div className="flex flex-col items-start secondFormContainer_childData">
                        <h6 className="text-[12px] font-semibold">RELIGION</h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyRelationship}
                        </p>
                      </div>
                      <div className="flex flex-col items-start secondFormContainer_childData">
                        <h6 className="text-[12px] font-semibold">
                          CONTACT NO.
                        </h6>
                        <p className="text-[12px]">
                          {patientDataSelected.emergencyContact}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row justify-center items-center gap-x-2 mt-10">
                    <button
                      onClick={() => setImmunizationDialog(true)}
                      className="px-6 py-2 rounded-md bg-zinc-200 text-black no-print"
                    >
                      UPDATE PATIENT RECORD
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {immunizationDialog && (
            <>
              {(!isImmunizationSelected || !openTableInfo) && (
                <>
                <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                  <thead className="bg-yellow-500 text-white">
                  <tr>
                    <th className="p-3 text-left font-semibold border-b">
                      IMMUNIZATION
                    </th>
                    <th className="p-3 text-left font-semibold border-b">
                      YEAR
                    </th>
                    <th className="p-3 text-left font-semibold border-b">
                      NURSE INCHARGE
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(immunizationHistory) &&
                    immunizationHistory.map((item, index) => (
                      <tr
                        onClick={() => handleImmunizationHistory(item, index)}
                        key={index}
                        className={`${
                          index % 2 === 0 ? "bg-gray-50" : "bg-white"
                        } cursor-pointer ${
                          tableIndexSelected === index ? "bg-yellow-500" : ""
                        }`}
                      >
                        <td className="p-3 border-b">
                          <div className="flex items-center">
                            <span className="font-medium">IMMUNIZATION</span>
                          </div>
                        </td>
                        <td className="p-3 border-b">
                          {new Date(item.createdAt).getFullYear()}
                        </td>
                        <td className="p-3 border-b">
                          <div className="flex items-center space-x-2">
                            <span>{item.nurseIncharge?.name}</span>
                            <span>{item.nurseIncharge?.username}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <div className="flex justify-center space-x-4 py-4">
                <button
                  type="button"
                  onClick={() => setOpenTableInfo(true)}
                  className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300"
                >
                  EDIT
                </button>
                <button
                  type="button"
                  onClick={() => setImmunizationDialog(!immunizationDialog)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                  </button>
                </div>
              </>
              )}

              {isImmunizationSelected && openTableInfo && (
                <>
                  {/* Child Information */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Child Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      <div className="flex flex-col">
                        <label className="font-medium">Patient ID No.</label>
                        <input
                          type="text"
                          value={patientDataSelected?.patientIdNo}
                          readOnly
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Last Name</label>
                        <input
                          type="text"
                          value={formData.lastName}
                          onChange={(e) =>
                            setFormData({ ...formData, lastName: e.target.value })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">First Name</label>
                        <input
                          type="text"
                          value={formData.firstName}
                          onChange={(e) =>
                            setFormData({ ...formData, firstName: e.target.value })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Middle Name</label>
                        <input
                          type="text"
                          value={formData.middleName}
                          onChange={(e) =>
                            setFormData({ ...formData, middleName: e.target.value })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Birth Date</label>
                        <input
                          type="date"
                          value={formData.birthDate}
                          onChange={(e) =>
                            setFormData({ ...formData, birthDate: e.target.value })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Age</label>
                        <input
                          type="text"
                          value={formData.age}
                          onChange={(e) =>
                            setFormData({ ...formData, age: e.target.value })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Birth Place</label>
                        <input
                          type="text"
                          value={formData.birthPlace}
                          onChange={(e) =>
                            setFormData({ ...formData, birthPlace: e.target.value })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Birth Weight (kg)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={formData.birthWeight}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              birthWeight: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Birth Length (cm)</label>
                        <input
                          type="number"
                          step="0.1"
                          value={formData.birthLength}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              birthLength: e.target.value,
                            })
                          }
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Mother's Name</label>
                        <input
                          type="text"
                          value={patientDataSelected?.firstname}
                          readOnly
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Contact Number</label>
                        <input
                          type="text"
                          value={patientDataSelected?.contact}
                          readOnly
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Address</label>
                        <input
                          type="text"
                          value={patientDataSelected?.birthPlace}
                          readOnly
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Purok</label>
                        <input
                          type="text"
                          value={patientDataSelected?.purok}
                          readOnly
                          className="border p-2 rounded"
                        />
                      </div>
                      <div className="flex flex-col">
                        <label className="font-medium">Category</label>
                        <div className="flex flex-row gap-2 mt-1">
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="4ps"
                              value="4ps"
                              checked={
                                patientDataSelected?.healthcareAssistance === "4ps"
                              }
                              readOnly
                              className="border p-2 rounded"
                            />
                            <label htmlFor="4ps">4Ps</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="indigent"
                              value="indigent"
                              checked={
                                patientDataSelected?.healthcareAssistance ===
                                "indigent"
                              }
                              readOnly
                              className="border p-2 rounded"
                            />
                            <label htmlFor="indigent">Indigent</label>
                          </div>
                          <div className="flex items-center gap-2">
                            <input
                              type="radio"
                              id="private"
                              value="private"
                              checked={
                                patientDataSelected?.healthcareAssistance ===
                                "private"
                              }
                              readOnly
                              className="border p-2 rounded"
                            />
                            <label htmlFor="private">Private</label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Vaccination History */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Vaccination History</h3>
                    {vaccinationHistory.map((vaccine, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-5 gap-4"
                      >
                        <div className="flex flex-col">
                          <label className="font-medium">Date</label>
                          <input
                            type="date"
                            value={vaccine.date}
                            onChange={(e) => {
                              const newHistory = [...vaccinationHistory];
                              newHistory[index].date = e.target.value;
                              setVaccinationHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Type of Vaccine</label>
                          <input
                            type="text"
                            value={vaccine.vaccineType}
                            onChange={(e) => {
                              const newHistory = [...vaccinationHistory];
                              newHistory[index].vaccineType = e.target.value;
                              setVaccinationHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Doses</label>
                          <input
                            type="text"
                            value={vaccine.doses}
                            onChange={(e) => {
                              const newHistory = [...vaccinationHistory];
                              newHistory[index].doses = e.target.value;
                              setVaccinationHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Weight (kg)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={vaccine.weight}
                            onChange={(e) => {
                              const newHistory = [...vaccinationHistory];
                              newHistory[index].weight = e.target.value;
                              setVaccinationHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Length/Height (cm)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={vaccine.length}
                            onChange={(e) => {
                              const newHistory = [...vaccinationHistory];
                              newHistory[index].length = e.target.value;
                              setVaccinationHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addVaccineRecord}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Add Vaccine Record
                    </button>
                  </div>

                  {/* Micronutrient History */}
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">
                      Micronutrient Supplement History
                    </h3>
                    {micronutrientHistory.map((supplement, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4"
                      >
                        <div className="flex flex-col">
                          <label className="font-medium">Date</label>
                          <input
                            type="date"
                            value={supplement.date}
                            onChange={(e) => {
                              const newHistory = [...micronutrientHistory];
                              newHistory[index].date = e.target.value;
                              setMicronutrientHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">
                            Type of Micronutrient
                          </label>
                          <input
                            type="text"
                            value={supplement.micronutrientType}
                            onChange={(e) => {
                              const newHistory = [...micronutrientHistory];
                              newHistory[index].micronutrientType = e.target.value;
                              setMicronutrientHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Doses</label>
                          <input
                            type="text"
                            value={supplement.doses}
                            onChange={(e) => {
                              const newHistory = [...micronutrientHistory];
                              newHistory[index].doses = e.target.value;
                              setMicronutrientHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                        <div className="flex flex-col">
                          <label className="font-medium">Remarks</label>
                          <input
                            type="text"
                            value={supplement.remarks}
                            onChange={(e) => {
                              const newHistory = [...micronutrientHistory];
                              newHistory[index].remarks = e.target.value;
                              setMicronutrientHistory(newHistory);
                            }}
                            className="border p-2 rounded"
                          />
                        </div>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addMicronutrientRecord}
                      className="px-4 py-2 bg-gray-200 rounded"
                    >
                      Add Micronutrient Record
                    </button>
                  </div>

                  <div className="flex justify-center space-x-4 py-4">
                    <button
                      type="submit"
                      className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-zinc-300"
                    >
                      SAVE CHANGES
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsImmunizationSelected(false);
                        setOpenTableInfo(false);
                      }}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </>
          )}

          {!immunizationDialog && !isImmunizationSelected && (
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                className="px-4 py-2 border rounded"
              >
                {isLoading ? "Loading..." : "SAVE"}
              </button>
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-zinc-200 text-black rounded"
            >
                CANCEL
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditImmunization;
