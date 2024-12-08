import { Calendar } from "lucide-react";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { usePrenatal } from "../../hooks/usePrenatal";

const EditPrenatal = ({
  patientDataSelected,
  setHealthCare,
  setIsPrenatal,
  setIsHealthcareActive,
}) => {
  const { updatePrenatal, isLoading } = usePrenatal();
  const [prenatalDialog, setPrenatalDialog] = useState(false);
  const { getPrenatalByUserIdHistory, prenatalHistory } = usePrenatal();
  const [selectedPrenatalHistory, setSelectedPrenatalHistory] = useState(null);
  const [isPrenatalSelected, setIsPrenatalSelected] = useState(false);
  const [openTableInfo, setOpenTableInfo] = useState(false);
  const [tableIndexSelected, setTableIndexSelected] = useState(null);
  const [formData, setFormData] = useState({
    userId: patientDataSelected?.objectId,
    // Prenatal Periods
    trimesterOne: "",
    dateOne: "",
    weekOne: "",
    coditionOne: "",
    trimesterTwo: "",
    dateTwo: "",
    weekTwo: "",
    coditionTwo: "",
    trimesterThree: "",
    dateThree: "",
    weekThree: "",
    coditionThree: "",
    // Hospital Info
    hospital: "",
    expectedDateToDeliver: "",
    // Questions
    questionOne: "", // father's feeling
    questionTwo: "", // family feeling
    // Symptoms
    symptoms: {
      "0-13wks": {
        edema: false,
        constipation: false,
        nauseaOrVomiting: false,
        legCramps: false,
        hemorrhoids: false,
        heartBurn: false,
      },
      "14-27wks": {
        edema: false,
        constipation: false,
        nauseaOrVomiting: false,
        legCramps: false,
        hemorrhoids: false,
        heartBurn: false,
      },
      "28-40wks": {
        edema: false,
        constipation: false,
        nauseaOrVomiting: false,
        legCramps: false,
        hemorrhoids: false,
        heartBurn: false,
      },
    },
    // Updated to use arrays of objects
    reviewOfSystem: [
      { name: "HEENT", value: false },
      { name: "CHEST/HEART", value: false },
      { name: "ABDOMEN", value: false },
      { name: "GENITAL", value: false },
      { name: "EXTREMITIES", value: false },
      { name: "SKIN", value: false },
    ],
    familyHistory: [
      { name: "CVA", value: false },
      { name: "HYPERTENSION", value: false },
      { name: "ASTHMA", value: false },
      { name: "HEART DISEASE", value: false },
      { name: "DIABETES", value: false },
      { name: "SKIN", value: false },
    ],
    pastHistory: [
      { name: "ALLERGIES", value: false },
      { name: "DRUG INTAKE", value: false },
      { name: "BLEEDING TENDENCIES", value: false },
      { name: "ANEMIA", value: false },
      { name: "DIABETES", value: false },
      { name: "SORES IN OR AROUND VAGINA", value: false },
    ],
    // Vital Signs
    bloodPressure: "",
    weight: "",
    height: "",
    bodyMaxIndex: "",
    pulseRate: "",
    // Maternal Records
    maternalRecords: [
      {
        date: "",
        complaints: "",
        mcnServicesGiven: "",
        providerName: "",
        followUp: "",
      },
      {
        date: "",
        complaints: "",
        mcnServicesGiven: "",
        providerName: "",
        followUp: "",
      },
      {
        date: "",
        complaints: "",
        mcnServicesGiven: "",
        providerName: "",
        followUp: "",
      },
    ],
  });

  useEffect(() => {
    getPrenatalByUserIdHistory(patientDataSelected?.objectId);
  }, []);

  useEffect(() => {
    const fetchPrenatalData = async () => {
      try {
        const data = await getPrenatalByUserIdHistory(
          patientDataSelected?.objectId
        );
        if (data) {
          const maternalRecords = selectedPrenatalHistory.maternalRecords || [
            {
              date: "",
              complaints: "",
              mcnServicesGiven: "",
              providerName: "",
              followUp: "",
            },
            {
              date: "",
              complaints: "",
              mcnServicesGiven: "",
              providerName: "",
              followUp: "",
            },
            {
              date: "",
              complaints: "",
              mcnServicesGiven: "",
              providerName: "",
              followUp: "",
            },
          ];
          const symptoms = selectedPrenatalHistory.symptoms || {
            "0-13wks": {
              edema: false,
              constipation: false,
              nauseaOrVomiting: false,
              legCramps: false,
              hemorrhoids: false,
              heartBurn: false,
            },
            "14-27wks": {
              edema: false,
              constipation: false,
              nauseaOrVomiting: false,
              legCramps: false,
              hemorrhoids: false,
              heartBurn: false,
            },
            "28-40wks": {
              edema: false,
              constipation: false,
              nauseaOrVomiting: false,
              legCramps: false,
              hemorrhoids: false,
              heartBurn: false,
            },
          };
          setFormData({
            ...selectedPrenatalHistory,
            maternalRecords,
            symptoms,
          });
        }
      } catch (error) {
        console.log("Error fetching prenatal data");
      }
    };

    if (patientDataSelected?.objectId) {
      fetchPrenatalData();
    }
  }, [patientDataSelected?.objectId, selectedPrenatalHistory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePrenatal(formData);
      toast.success("Prenatal record updated successfully");
      handleCancel();
    } catch (error) {
      console.log(error);
      toast.error("Error updating prenatal record");
    }
  };

  const handleCancel = () => {
    setHealthCare("default");
    setIsPrenatal(false);
    setIsHealthcareActive(false);
  };

  // Define vitalSigns object
  const vitalSigns = {
    bloodPressure: formData.bloodPressure,
    weight: formData.weight,
    height: formData.height,
    bodyMaxIndex: formData.bodyMaxIndex,
    pulseRate: formData.pulseRate,
  };

  const symptoms = [
    "Edema",
    "Constipation",
    "Nausea/Vomiting",
    "Leg Cramps",
    "Hemorrhoids",
    "Heartburn",
  ];

  const handlePrenatalHistory = (item, index) => {
    setPrenatalDialog(true);
    setIsPrenatalSelected(true);
    setSelectedPrenatalHistory(item);
    setTableIndexSelected(index);
  };

  return (
    <div className="bg-gray-50 p-4 md:p-8">
      <form onSubmit={handleSubmit} className="w-full">
        {!prenatalDialog && (
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
                        <h5 className="text-[12px] font-semibold">Last Name</h5>
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
                        <p className="text-[14px]">{patientDataSelected.age}</p>
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
                            patientDataSelected.healthcareAssistance === "4ps"
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
                            "indigent"
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
                            "private"
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
                      <h6 className="text-[12px] font-semibold">BIRTH DATE</h6>
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
                      <h6 className="text-[12px] font-semibold">OCCUPATION</h6>
                      <p className="text-[12px]">
                        {patientDataSelected.emergencyOccupation}
                      </p>
                    </div>
                    <div className="flex flex-col items-start">
                      <h6 className="text-[12px] font-semibold">NATIONALITY</h6>
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
                      <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                      <p className="text-[12px]">
                        {patientDataSelected.emergencyContact}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-row justify-center items-center gap-x-2 mt-10">
                  <button
                    onClick={() => setPrenatalDialog(true)}
                    className="px-6 py-2 rounded-md bg-zinc-200 text-black no-print"
                  >
                    UPDATE PATIENT RECORD
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Header */}

        {prenatalDialog && (
          <>
            {(!isPrenatalSelected || !openTableInfo) && (
              <>
                <table className="w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-sm">
                  <thead className="bg-yellow-500 text-white">
                    <tr>
                      <th className="p-3 text-left font-semibold border-b">
                        HEALTH CARE SERVICES
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
                    {Array.isArray(prenatalHistory) &&
                      prenatalHistory.map((item, index) => (
                        <tr
                          onClick={() => handlePrenatalHistory(item, index)}
                          key={index}
                          className={`${
                            index % 2 === 0 ? "bg-gray-50" : "bg-white"
                          } cursor-pointer ${tableIndexSelected === index ? 'bg-yellow-500' : ''}`}
                        >
                          <td className="p-3 border-b">
                            <div className="flex items-center">
                              <span className="font-medium">PRENATAL</span>
                            </div>
                          </td>
                          <td className="p-3 border-b">
                            {new Date(item.createdAt).getFullYear()}
                          </td>
                          <td className="p-3 border-b">
                            <div className="flex items-center space-x-2">
                              <span>{item.nurseIncharge?.name}</span>
                              <span>
                              {item.nurseIncharge?.username}
                              </span>
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
                    onClick={() => setPrenatalDialog(!prenatalDialog)}
                    className="px-4 py-2 border rounded"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}

            {isPrenatalSelected && openTableInfo && (
              <>
                <div className="bg-[#FFB800] text-center py-4 rounded-t-lg">
                  <h1 className="text-2xl font-bold text-white">
                    MATERNAL CLIENT RECORD FOR PRENATAL CARE
                  </h1>
                </div>

                {/* Patient Information */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                      <label className="block mb-2">PATIENT ID NO.</label>
                      <input
                        type="text"
                        value={patientDataSelected.patientIdNo}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">LASTNAME</label>
                      <input
                        type="text"
                        value={patientDataSelected.lastname}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">FIRSTNAME</label>
                      <input
                        type="text"
                        value={patientDataSelected.firstname}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">MIDDLE INITIAL</label>
                      <input
                        type="text"
                        value={patientDataSelected.middleInitial}
                        readOnly
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Prenatal Periods */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Prenatal Periods
                  </h2>
                  <div className="space-y-6">
                    {[
                      {
                        trimester: "trimesterOne",
                        date: "dateOne",
                        week: "weekOne",
                        condition: "coditionOne",
                      },
                      {
                        trimester: "trimesterTwo",
                        date: "dateTwo",
                        week: "weekTwo",
                        condition: "coditionTwo",
                      },
                      {
                        trimester: "trimesterThree",
                        date: "dateThree",
                        week: "weekThree",
                        condition: "coditionThree",
                      },
                    ].map((period, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center"
                      >
                        <div>
                          <label className="block mb-2">PRENATAL PERIOD</label>
                          <select
                            value={formData[period.trimester]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [period.trimester]: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select period</option>
                            <option value="first">First Trimester</option>
                            <option value="second">Second Trimester</option>
                            <option value="third">Third Trimester</option>
                          </select>
                        </div>

                        <div>
                          <label className="block mb-2">DATE</label>
                          <div className="flex items-center">
                            <input
                              type="date"
                              value={formData[period.date]}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  [period.date]: e.target.value,
                                })
                              }
                              className="w-full p-2 border rounded"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block mb-2">WEEKS</label>
                          <input
                            type="text"
                            value={formData[period.week]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [period.week]: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded"
                            placeholder="Enter weeks"
                          />
                        </div>

                        <div>
                          <label className="block mb-2">
                            PATIENT'S CONDITION
                          </label>
                          <select
                            value={formData[period.condition]}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                [period.condition]: e.target.value,
                              })
                            }
                            className="w-full p-2 border rounded"
                          >
                            <option value="">Select condition</option>
                            <option value="normal">Normal</option>
                            <option value="high-risk">High Risk</option>
                            <option value="critical">Critical</option>
                          </select>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Hospital and Expected Delivery */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2">HOSPITAL</label>
                      <input
                        type="text"
                        value={formData.hospital}
                        onChange={(e) =>
                          setFormData({ ...formData, hospital: e.target.value })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block mb-2">
                        EXPECTED DATE OF DELIVERY
                      </label>
                      <input
                        type="date"
                        value={formData.expectedDateToDeliver}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            expectedDateToDeliver: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Feelings Section */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="flex space-x-4 w-full">
                    <div className="w-full">
                      <label className="block mb-2">
                        HOW DOES THE FATHER OF THE BABY FEEL ABOUT THE
                        PREGNANCY?
                      </label>
                      <input
                        type="text"
                        value={formData.questionOne}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            questionOne: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div className="w-full">
                      <label className="block mb-2">YOUR FAMILY?</label>
                      <input
                        type="text"
                        value={formData.questionTwo}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            questionTwo: e.target.value,
                          })
                        }
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                </div>

                {/* Symptoms Checklist */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Discomforts During Pregnancy
                  </h2>
                  <div className="w-full">
                    {/* Header row */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="col-span-1"></div>
                      {Object.keys(formData.symptoms).map((period) => (
                        <div key={period} className="text-center font-medium">
                          {period}
                        </div>
                      ))}
                    </div>

                    {/* Symptoms rows */}
                    {symptoms.map((symptom) => (
                      <div
                        key={symptom}
                        className="grid grid-cols-4 gap-4 mb-3"
                      >
                        <div className="col-span-1">{symptom}</div>
                        {Object.keys(formData.symptoms).map((period) => {
                          const symptomKey = symptom
                            .toLowerCase()
                            .replace(/[^a-z]/g, "");
                          return (
                            <div
                              key={`${symptom}_${period}`}
                              className="flex justify-center"
                            >
                              <input
                                type="checkbox"
                                checked={
                                  formData.symptoms[period][symptomKey] || false
                                }
                                onChange={(e) => {
                                  setFormData({
                                    ...formData,
                                    symptoms: {
                                      ...formData.symptoms,
                                      [period]: {
                                        ...formData.symptoms[period],
                                        [symptomKey]: e.target.checked,
                                      },
                                    },
                                  });
                                }}
                                className="w-4 h-4"
                              />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Review of System */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">
                      REVIEW OF SYSTEM
                    </h2>
                    <div className="space-y-3">
                      {formData.reviewOfSystem?.map((item, index) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`review_${item.name}`}
                                value="yes"
                                checked={item.value === true}
                                onChange={() => {
                                  const newReview = [
                                    ...formData.reviewOfSystem,
                                  ];
                                  newReview[index].value = true;
                                  setFormData({
                                    ...formData,
                                    reviewOfSystem: newReview,
                                  });
                                }}
                              />
                              <span>YES</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`review_${item.name}`}
                                value="no"
                                checked={item.value === false}
                                onChange={() => {
                                  const newReview = [
                                    ...formData.reviewOfSystem,
                                  ];
                                  newReview[index].value = false;
                                  setFormData({
                                    ...formData,
                                    reviewOfSystem: newReview,
                                  });
                                }}
                              />
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Family History */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">
                      FAMILY HISTORY
                    </h2>
                    <div className="space-y-3">
                      {formData.familyHistory?.map((item, index) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`family_${item.name}`}
                                value="yes"
                                checked={item.value === true}
                                onChange={() => {
                                  const newHistory = [
                                    ...formData.familyHistory,
                                  ];
                                  newHistory[index].value = true;
                                  setFormData({
                                    ...formData,
                                    familyHistory: newHistory,
                                  });
                                }}
                              />
                              <span>YES</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`family_${item.name}`}
                                value="no"
                                checked={item.value === false}
                                onChange={() => {
                                  const newHistory = [
                                    ...formData.familyHistory,
                                  ];
                                  newHistory[index].value = false;
                                  setFormData({
                                    ...formData,
                                    familyHistory: newHistory,
                                  });
                                }}
                              />
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Past History */}
                  <div className="bg-white p-6 rounded-lg shadow-sm">
                    <h2 className="text-lg font-semibold mb-4">PAST HISTORY</h2>
                    <div className="space-y-3">
                      {formData.pastHistory?.map((item, index) => (
                        <div
                          key={item.name}
                          className="flex items-center justify-between"
                        >
                          <span>{item.name}</span>
                          <div className="flex gap-4">
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`past_${item.name}`}
                                value="yes"
                                checked={item.value === true}
                                onChange={() => {
                                  const newPastHistory = [
                                    ...formData.pastHistory,
                                  ];
                                  newPastHistory[index].value = true;
                                  setFormData({
                                    ...formData,
                                    pastHistory: newPastHistory,
                                  });
                                }}
                              />
                              <span>YES</span>
                            </label>
                            <label className="flex items-center gap-2">
                              <input
                                type="radio"
                                name={`past_${item.name}`}
                                value="no"
                                checked={item.value === false}
                                onChange={() => {
                                  const newPastHistory = [
                                    ...formData.pastHistory,
                                  ];
                                  newPastHistory[index].value = false;
                                  setFormData({
                                    ...formData,
                                    pastHistory: newPastHistory,
                                  });
                                }}
                              />
                              <span>NO</span>
                            </label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Physical Examination */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <h2 className="text-lg font-semibold mb-4">
                    Physical Examination
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Object.entries(vitalSigns).map(([key, value]) => (
                      <div key={key}>
                        <label className="block mb-2">
                          {key.toUpperCase()}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) =>
                            setFormData({ ...formData, [key]: e.target.value })
                          }
                          className="w-full p-2 border rounded"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/** Prenatal records table */}
                <div className="bg-white p-6 rounded-lg shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr>
                          <th className="bg-[#FFB800] text-white p-3 w-1/6">
                            DATE
                          </th>
                          <th className="bg-[#FFB800] text-white p-3 w-2/6">
                            COMPLAINTS/COMPLICATIONS
                          </th>
                          <th className="bg-[#FFB800] text-white p-3 w-1/6">
                            MCN SERVICES GIVEN
                          </th>
                          <th className="bg-[#FFB800] text-white p-3 w-1/6">
                            NAME OF PROVIDER AND SIGNATURE
                          </th>
                          <th className="bg-[#FFB800] text-white p-3 w-1/6">
                            NEXT FOLLOW UP
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.maternalRecords.map((record, index) => (
                          <tr
                            key={index}
                            className="border-[1px] border-zinc-700"
                          >
                            <td className="border-[1px] border-zinc-700">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="date"
                                  value={record.date}
                                  onChange={(e) => {
                                    const newRecords = [
                                      ...formData.maternalRecords,
                                    ];
                                    newRecords[index].date = e.target.value;
                                    setFormData({
                                      ...formData,
                                      maternalRecords: newRecords,
                                    });
                                  }}
                                  className="w-full p-2 rounded outline-none"
                                />
                                <Calendar className="w-5 h-5 text-gray-500" />
                              </div>
                            </td>
                            <td className="border-[1px] border-zinc-700">
                              <textarea
                                value={record.complaints}
                                onChange={(e) => {
                                  const newRecords = [
                                    ...formData.maternalRecords,
                                  ];
                                  newRecords[index].complaints = e.target.value;
                                  setFormData({
                                    ...formData,
                                    maternalRecords: newRecords,
                                  });
                                }}
                                className="w-full p-2 rounded resize-none outline-none"
                                rows={3}
                                placeholder="Enter complaints/complications"
                              />
                            </td>
                            <td className="border-[1px] border-zinc-700">
                              <textarea
                                value={record.mcnServicesGiven}
                                onChange={(e) => {
                                  const newRecords = [
                                    ...formData.maternalRecords,
                                  ];
                                  newRecords[index].mcnServicesGiven =
                                    e.target.value;
                                  setFormData({
                                    ...formData,
                                    maternalRecords: newRecords,
                                  });
                                }}
                                className="w-full p-2 rounded resize-none outline-none"
                                rows={3}
                                placeholder="Enter MCN services"
                              />
                            </td>
                            <td className="p-3">
                              <textarea
                                value={record.providerName}
                                onChange={(e) => {
                                  const newRecords = [
                                    ...formData.maternalRecords,
                                  ];
                                  newRecords[index].providerName =
                                    e.target.value;
                                  setFormData({
                                    ...formData,
                                    maternalRecords: newRecords,
                                  });
                                }}
                                className="w-full p-2 rounded resize-none outline-none"
                                rows={3}
                                placeholder="Enter provider name and signature"
                              />
                            </td>
                            <td className="border-[1px] border-zinc-700">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="date"
                                  value={record.followUp}
                                  onChange={(e) => {
                                    const newRecords = [
                                      ...formData.maternalRecords,
                                    ];
                                    newRecords[index].followUp = e.target.value;
                                    setFormData({
                                      ...formData,
                                      maternalRecords: newRecords,
                                    });
                                  }}
                                  className="w-full p-2 rounded outline-none"
                                />
                                <Calendar className="w-5 h-5 text-gray-500" />
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
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
                        setIsPrenatalSelected(false);
                        setOpenTableInfo(false);
                      }}
                      className="px-4 py-2 border rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </>
            )}
          </>
        )}

        {!prenatalDialog && !isPrenatalSelected && (
          <div className="flex justify-center space-x-4 py-4">
            <button
              type="submit"
              className="px-4 py-2 bg-zinc-200 text-black rounded hover:bg-green-700"
            >
              {isLoading ? "Loading..." : "SAVE"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default EditPrenatal;
