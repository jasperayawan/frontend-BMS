import React, { useEffect, useState } from "react";
import useOtherServices from "../../hooks/useOtherServices";
import toast from "react-hot-toast";
import { X } from "lucide-react";

const EditOtherServices = ({
  setHealthCare,
  patientDataSelected,
  setIsOtherServices,
  setIsHealthcareActive,
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [selectedOtherServicesHistory, setSelectedOtherServicesHistory] = useState(null);
  const [tableIndexSelected, setTableIndexSelected] = useState(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const {
    getOtherServiceHistory,
    otherServicesHistory,
    formData,
    handleInputChange,
    updateOtherServices,
    isLoading,
    setFormData
  } = useOtherServices();

  useEffect(() => {
    if (selectedOtherServicesHistory) {
      setFormData(selectedOtherServicesHistory);
    }
  }, [selectedOtherServicesHistory, setFormData]);

  useEffect(() => {
    getOtherServiceHistory(patientDataSelected?.objectId);
  }, [patientDataSelected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await updateOtherServices(formData?.objectId, formData);

      if (response.success) {
        toast.success("Service record updated successfully");
        // Reset states
        setHealthCare("default");
        setIsOtherServices(false);
        setIsHealthcareActive(false);
      }
    } catch (error) {
      toast.error("Error updating service record: " + error.message);
    }
  };

  const handleEdit = (e, data) => {
    e.preventDefault();
    if (data === "ok" && selectedOtherServicesHistory) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  const handleOtherServicesHistory = (item, index) => {
    setSelectedOtherServicesHistory(item);
    setTableIndexSelected(index);
  };

  const confirmSave = async () => {
    setShowConfirmationModal(false);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[800px]">
        <form className="" onSubmit={(e) => { e.preventDefault(); setShowConfirmationModal(true); }}>
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
                  <div className="flex flex-col gap-y-5">
                    <div className="flex flex-row gap-x-4 space-x-5">
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
                <button
                  type="button"
                  className="uppercase mt-5 text-sm px-4 py-1 border-[1px] border-zinc-700 bg-zinc-200"
                  onClick={() => setShowModal(true)}
                >
                  Update Patient record
                </button>
              </div>
            </div>
          </div>

          {showModal && (
            <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg max-h-[600px] overflow-y-auto w-[max-content]">
                {isEdit ? (
                  <div className="flex flex-col gap-y-1 w-full">
                    <h2 className="text-2xl font-bold mb-4">
                      Edit Other Services
                    </h2>
                    
                    {/* Main form content */}
                    <div className="w-full">
                      {/* Services Section */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block mb-1">Services Availed</label>
                          <input
                            type="text"
                            name="servicesAvailed"
                            value={formData.servicesAvailed}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                            required
                          />
                        </div>
                        <div>
                          <label className="block mb-1">Date</label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full border rounded p-2"
                            required
                          />
                        </div>
                      </div>

                      {/* Personal Information Section */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Personal Information</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block mb-1">First Name</label>
                            <input
                              type="text"
                              name="firstName"
                              value={formData.firstName}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Middle Name</label>
                            <input
                              type="text"
                              name="middleName"
                              value={formData.middleName}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Last Name</label>
                            <input
                              type="text"
                              name="lastName"
                              value={formData.lastName}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Sex</label>
                            <select
                              name="sex"
                              value={formData.sex}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            >
                              <option value="">Select Sex</option>
                              <option value="male">Male</option>
                              <option value="female">Female</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1">Status</label>
                            <select
                              name="status"
                              value={formData.status}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            >
                              <option value="">Select Status</option>
                              <option value="Single">Single</option>
                              <option value="Married">Married</option>
                              <option value="Widowed">Widowed</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1">Date of Birth</label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={formData.dateOfBirth}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Medical Information Section */}
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3">Medical Information</h3>
                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <label className="block mb-1">Age</label>
                            <input
                              type="number"
                              name="age"
                              value={formData.age}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Blood Type</label>
                            <select
                              name="bloodType"
                              value={formData.bloodType}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            >
                              <option value="">Select Blood Type</option>
                              <option value="A+">A+</option>
                              <option value="A-">A-</option>
                              <option value="B+">B+</option>
                              <option value="B-">B-</option>
                              <option value="O+">O+</option>
                              <option value="O-">O-</option>
                              <option value="AB+">AB+</option>
                              <option value="AB-">AB-</option>
                            </select>
                          </div>
                          <div>
                            <label className="block mb-1">Blood Pressure</label>
                            <input
                              type="text"
                              name="bloodPressure"
                              value={formData.bloodPressure}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Height (cm)</label>
                            <input
                              type="number"
                              name="height"
                              value={formData.height}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Weight (kg)</label>
                            <input
                              type="number"
                              name="weight"
                              value={formData.weight}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                          <div>
                            <label className="block mb-1">Relationship</label>
                            <input
                              type="text"
                              name="relationship"
                              value={formData.relationship}
                              onChange={handleInputChange}
                              className="w-full border rounded p-2"
                              required
                            />
                          </div>
                        </div>
                      </div>

                      {/* Prescription Section */}
                      <div className="mb-6">
                        <label className="block mb-1">Prescription</label>
                        <textarea
                          name="prescription"
                          value={formData.prescription}
                          onChange={handleInputChange}
                          className="w-full border rounded p-2 h-32"
                          required
                        />
                      </div>

                      {/* Signatures Section */}
                      <div className="flex justify-between mt-6">
                        <div className="text-center">
                          <div className="border-t border-black w-48 mt-8 pt-2">
                            PATIENT SIGNATURE OVER PRINTED NAME
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="border-t border-black w-48 mt-8 pt-2">
                            NURSE INCHARGE SIGNATURE OVER PRINTED NAME
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-center items-center gap-x-2 mt-5">
                      <button
                        onClick={confirmSave}
                        className="px-4 py-2 border-[1px] border-zinc-700 bg-zinc-200 rounded hover:bg-zinc-300"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleEdit(e, " ")}
                        className="px-4 py-2 border-[1px] border-zinc-700 bg-zinc-200 rounded hover:bg-zinc-300"
                      >
                        Back
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col w-full">
                    <h3 className="text-lg font-semibold mb-4">
                      Confirm Update
                    </h3>
                    <table className="min-w-full border-collapse border border-gray-300 bg-white shadow-sm rounded-lg overflow-hidden">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="border border-gray-300 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Health Care Services
                          </th>
                          <th className="border border-gray-300 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Year
                          </th>
                          <th className="border border-gray-300 px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Nurse In Charge
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {Array.isArray(otherServicesHistory) &&
                          otherServicesHistory.map((item, index) => (
                            <tr
                              key={index}
                              onClick={() =>
                                handleOtherServicesHistory(item, index)
                              }
                              className={`${
                                tableIndexSelected === index
                                  ? "bg-yellow-500"
                                  : ""
                              } cursor-pointer`}
                            >
                              <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                Other Services
                              </td>
                              <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                {new Date(item.createdAt).getFullYear()}
                              </td>
                              <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                {item.nurseIncharge.name}{" "}
                                {item.nurseIncharge.username}
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                    <div className="flex justify-end gap-x-3 mt-4">
                      <button
                        type="button"
                        className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        onClick={(e) => handleEdit(e, "ok")}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowModal(false)}
                        className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Confirmation Modal */}
          {showConfirmationModal && (
            <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
                <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
                  <button
                    onClick={() => setShowConfirmationModal(false)}
                    className=""
                  >
                    <X />
                  </button>
                </div>
                <div className="flex flex-col justify-center items-center p-6">
                  <h2 className="text-xl font-bold mb-4 text-center">
                    ARE YOU SURE YOU WANT TO SAVE?
                  </h2>
                  <div className="flex justify-end gap-4">
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200"
                    >
                      YES
                    </button>
                    <button
                      onClick={() => setShowConfirmationModal(false)}
                      className="px-4 py-2 bg-white hover:bg-gray-400 border border-zinc-600 transition-colors duration-200"
                    >
                      NO
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Form Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setHealthCare("default");
                setIsOtherServices(false);
                setIsHealthcareActive(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-zinc-200 text-black px-4 py-2 rounded"
            >
              {isLoading ? "Updating..." : "SAVE"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditOtherServices;
