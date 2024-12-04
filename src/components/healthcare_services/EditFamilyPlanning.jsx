"use client";

import React, { useEffect, useState } from "react";
import { useFamilyPlanning } from "../../hooks/useFamilyPlanning";

const EditFamilyPlanning = ({
  setHealthCare,
  setIsFamilyPlanning,
  patientDataSelected,
  setIsHealthcareActive,
}) => {
  const [formData, setFormData] = useState({
    patientIdNo: "",
    email: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    civilStatus: "",
    purok: "",
    barangay: "",
    municipality: "",
    province: "",
    birthdate: "",
    age: "",
    religion: "",
    birthPlace: "",
    bloodType: "",
    contactNo: "",
    occupation: "",
    householdMonthlyIncome: "",
    noLivingChild: "",
    support: "4PS", // Default value
    emergencyContact: {
      lastName: "",
      firstName: "",
      middleInitial: "",
      relationship: "",
      civilStatus: "",
      address: "",
      birthdate: "",
      age: "",
      occupation: "",
      nationality: "",
      religion: "",
      contactNo: "",
    },
    // Keep existing family planning specific fields
    methodUsed: "",
    dateStarted: "",
    notes: "",
  });

  const [showModal, setShowModal] = useState(false);
  const { 
    fetchFamilyPlanningByUserId, 
    familyPlanningData,
    updateFamilyPlanningById 
  } = useFamilyPlanning();
  const [isEdit, setIsEdit] = useState(false);
  const [isSelected, setIsSelected] = useState("");

  const handleSelectRow = (data) => {
    setIsSelected(data);
  };

  const handleEdit = (data) => {
    if (data === "ok" && isSelected) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    fetchFamilyPlanningByUserId(patientDataSelected?.objectId);
  }, []);

 
  useEffect(() => {
    if (familyPlanningData) {
      setFormData(prevData => ({
        ...prevData,
        // Type of Client
        newAcceptor: familyPlanningData?.newAcceptor || false,
        currentUser: familyPlanningData?.currentUser || false,
        changingMethod: familyPlanningData?.changingMethod || false,
        changingClinic: familyPlanningData?.changingClinic || false,
        dropoutRestart: familyPlanningData?.dropoutRestart || false,
        spacingReason: familyPlanningData?.spacingReason || false,
        medicalCondition: familyPlanningData?.medicalCondition || false,
        sideEffects: familyPlanningData?.sideEffects || false,
        limitingReason: familyPlanningData?.limitingReason || false,
        otherReason: familyPlanningData?.otherReason || false,

        // Method Currently Used
        coc: familyPlanningData?.coc || false,
        pop: familyPlanningData?.pop || false,
        injectable: familyPlanningData?.injectable || false,
        implant: familyPlanningData?.implant || false,
        inteval: familyPlanningData?.inteval || false,
        postPartum: familyPlanningData?.postPartum || false,
        condom: familyPlanningData?.condom || false,
        bomCmm: familyPlanningData?.bomCmm || false,
        bbt: familyPlanningData?.bbt || false,
        stm: familyPlanningData?.stm || false,
        lam: familyPlanningData?.lam || false,
        otherMethod: familyPlanningData?.otherMethod || false,

        // VAW Risks
        unpleasantRelationship: familyPlanningData?.unpleasantRelationship || false,
        partnerDisapproval: familyPlanningData?.partnerDisapproval || false,
        domesticViolence: familyPlanningData?.domesticViolence || false,
        referredToDSWD: familyPlanningData?.referredToDSWD || false,
        referredToWCPU: familyPlanningData?.referredToWCPU || false,
        referredToOthers: familyPlanningData?.referredToOthers || false,
      }));
    }
  }, [familyPlanningData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };


  const handleSave = async () => {
    try {
      // Create the payload with the form data
      const payload = {
        // Type of Client
        newAcceptor: formData.newAcceptor,
        currentUser: formData.currentUser,
        changingMethod: formData.changingMethod,
        changingClinic: formData.changingClinic,
        dropoutRestart: formData.dropoutRestart,
        spacingReason: formData.spacingReason,
        medicalCondition: formData.medicalCondition,
        sideEffects: formData.sideEffects,
        limitingReason: formData.limitingReason,
        otherReason: formData.otherReason,

        // Method Currently Used
        coc: formData.coc,
        pop: formData.pop,
        injectable: formData.injectable,
        implant: formData.implant,
        inteval: formData.inteval,
        postPartum: formData.postPartum,
        condom: formData.condom,
        bomCmm: formData.bomCmm,
        bbt: formData.bbt,
        stm: formData.stm,
        lam: formData.lam,
        otherMethod: formData.otherMethod,

        // VAW Risks
        unpleasantRelationship: formData.unpleasantRelationship,
        partnerDisapproval: formData.partnerDisapproval,
        domesticViolence: formData.domesticViolence,
        referredToDSWD: formData.referredToDSWD,
        referredToWCPU: formData.referredToWCPU,
        referredToOthers: formData.referredToOthers,
      };

      // Call the update function with the family planning ID and payload
      await updateFamilyPlanningById(familyPlanningData.objectId, payload);
      
      // Close the modal after successful update
      setShowModal(false);
      
      // Refresh the data
      await fetchFamilyPlanningByUserId(patientDataSelected?.objectId);
      
    } catch (error) {
      console.error('Error saving family planning data:', error);
      // Error handling is already done in the updateFamilyPlanningById function
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="bg-white rounded-[12px] mx-auto max-w-[800px] relative p-4 overflow-y-auto">
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
                  <p className="text-[12px] font-semibold">PATIENT ID NO.</p>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.patientIdNo}
                    onChange={(e) =>
                      setFormData({ ...formData, patientIdNo: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-1">
                  <p className="text-[12px] font-semibold">EMAIL</p>
                  <input
                    type="email"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-5 secondInnerformContainer">
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Last Name</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.lastname}
                    onChange={(e) =>
                      setFormData({ ...formData, lastName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">First Name</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.firstname}
                    onChange={(e) =>
                      setFormData({ ...formData, firstName: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Middle Initial</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.middleInitial}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        middleInitial: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Civil Status</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.civilStatus}
                    onChange={(e) =>
                      setFormData({ ...formData, civilStatus: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Purok</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.purok}
                    onChange={(e) =>
                      setFormData({ ...formData, purok: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Barangay</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.barangay}
                    onChange={(e) =>
                      setFormData({ ...formData, barangay: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Municipality</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.municipality}
                    onChange={(e) =>
                      setFormData({ ...formData, municipality: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Province</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Birthdate</h5>
                  <input
                    type="date"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.birthdate}
                    onChange={(e) =>
                      setFormData({ ...formData, birthdate: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Age</h5>
                  <input
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Religion</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.religion}
                    onChange={(e) =>
                      setFormData({ ...formData, religion: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Birth Place</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.birthPlace}
                    onChange={(e) =>
                      setFormData({ ...formData, birthPlace: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Blood Type</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.bloodType}
                    onChange={(e) =>
                      setFormData({ ...formData, bloodType: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Contact No.</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.contact}
                    onChange={(e) =>
                      setFormData({ ...formData, contactNo: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Occupation</h5>
                  <input
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.occupation}
                    onChange={(e) =>
                      setFormData({ ...formData, occupation: e.target.value })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">
                    Household Monthly Income
                  </h5>
                  <input
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.houseHoldMonthlyIncome}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        householdMonthlyIncome: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">
                    No. Living Child
                  </h5>
                  <input
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.livingChild}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        noLivingChild: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">
                    No. Non-Living Child
                  </h5>
                  <input
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.nonLivingChild}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        noLivingChild: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="flex flex-row">
                  <h5 className="text-[12px] font-semibold">Support</h5>
                  <div className="flex flex-row gap-x-2 mt-1">
                    <input
                      type="radio"
                      id="4ps"
                      name="support"
                      value="4PS"
                      checked={formData.support === "4PS"}
                      onChange={(e) =>
                        setFormData({ ...formData, support: e.target.value })
                      }
                    />
                    <label htmlFor="4ps" className="text-[12px]">
                      4PS
                    </label>

                    <input
                      type="radio"
                      id="indigent"
                      name="support"
                      value="INDIGENT"
                      checked={formData.support === "INDIGENT"}
                      onChange={(e) =>
                        setFormData({ ...formData, support: e.target.value })
                      }
                    />
                    <label htmlFor="indigent" className="text-[12px]">
                      INDIGENT
                    </label>

                    <input
                      type="radio"
                      id="private"
                      name="support"
                      value="PRIVATE"
                      checked={formData.support === "PRIVATE"}
                      onChange={(e) =>
                        setFormData({ ...formData, support: e.target.value })
                      }
                    />
                    <label htmlFor="private" className="text-[12px]">
                      PRIVATE
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-center text-zinc-500 text-[12px] mb-3">
                  EMERGENCY CONTACT PERSON
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Last Name</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyLastName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            lastName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">First Name</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyFirstName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            firstName: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">
                      Middle Initial
                    </h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyInitial}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            middleInitial: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Relationship</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyRelationship}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            relationship: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Address</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyAddress}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            address: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Birthdate</h5>
                    <input
                      type="date"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyBod}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            birthdate: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Age</h5>
                    <input
                      type="number"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyAge}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            age: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Occupation</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyOccupation}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            occupation: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Civil Status</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyCivilStatus}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            civilStatus: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Nationality</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.nationality}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            nationality: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Religion</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyReligion}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            religion: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Contact No.</h5>
                    <input
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyContact}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          emergencyContact: {
                            ...formData.emergencyContact,
                            contactNo: e.target.value,
                          },
                        })
                      }
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end items-end">
                <button
                  className="uppercase text-sm px-4 py-1 border-[1px] border-zinc-700 bg-zinc-200"
                  onClick={() => setShowModal(true)}
                >
                  Update Patient record
                </button>
              </div>
              {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-h-[600px] overflow-y-auto w-[max-content]">
                    {isEdit ? (
                      <div className="flex flex-col gap-y-1">
                        <div className="flex flex-row gap-x-1">
                          <div className="flex flex-col justify-start items-start gap-x-1">
                            <p className="text-[12px] font-semibold">
                              PATIENT ID NO.
                            </p>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.patientIdNo}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Last Name
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.lastname}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              First Name
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.firstname}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Middle Initial
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.middleInitial}
                              readOnly
                            />
                          </div>
                        </div>
                        <div className="flex flex-row gap-x-1">
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">Sex</h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.sex}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Birthdate
                            </h5>
                            <input
                              type="date"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.birthdate}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">Age</h5>
                            <input
                              type="number"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.age}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Contact
                            </h5>
                            <input
                              type="number"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.contact}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row gap-x-1">
                          <div className="flex flex-col w-full">
                            <h5 className="text-[12px] font-semibold">Sex</h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1 w-full"
                              value={`${patientDataSelected.birthPlace}, ${patientDataSelected.province}`}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Civil Status
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.civilStatus}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row gap-x-1">
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Spouse LastName
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.emergencyLastName}
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Spouse FirstName
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.emergencyFirstName}
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Spouse MiddleInitial
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.emergencyInitial}
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Birthdate
                            </h5>
                            <input
                              type="date"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.emergencyBod}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">Age</h5>
                            <input
                              type="number"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.emergencyAge}
                            />
                          </div>
                        </div>
                        <div className="flex flex-row gap-x-1">
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              No. Living Child
                            </h5>
                            <input
                              type="number"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.livingChild}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              No. Non-Living Child
                            </h5>
                            <input
                              type="number"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.nonLivingChild}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Household Monthly Income
                            </h5>
                            <input
                              type="number"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.houseHoldMonthlyIncome}
                              readOnly
                            />
                          </div>
                          <div className="flex flex-col">
                            <h5 className="text-[12px] font-semibold">
                              Occupation
                            </h5>
                            <input
                              type="text"
                              className="text-[14px] border rounded p-1"
                              value={patientDataSelected.occupation}
                              readOnly
                            />
                          </div>
                        </div>

                        {/* Three Tables Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          {/* Table 1: Type of Client */}
                          <div className="border p-4 rounded">
                            <h4 className="font-semibold mb-3">
                              Type of Client
                            </h4>
                            <div className="space-y-2">
                              {[
                                { name: "newAcceptor", label: "New Acceptor" },
                                { name: "currentUser", label: "Current User" },
                                {
                                  name: "changingMethod",
                                  label: "Changing Method",
                                },
                                {
                                  name: "changingClinic",
                                  label: "Changing Clinic",
                                },
                                {
                                  name: "dropoutRestart",
                                  label: "Dropout/Restart",
                                },
                                {
                                  name: "spacingReason",
                                  label: "Spacing Reason",
                                },
                                {
                                  name: "medicalCondition",
                                  label: "Medical Condition",
                                },
                                { name: "sideEffects", label: "Side Effects" },
                                {
                                  name: "limitingReason",
                                  label: "Limiting Reason",
                                },
                                { name: "otherReason", label: "Other Reason" },
                              ].map(({ name, label }) => (
                                <div
                                  key={name}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    name={name}
                                    checked={formData[name]}
                                    onChange={(e) =>
                                      handleInputChange({
                                        target: {
                                          name: e.target.name,
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <label>{label}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Table 2: Method Currently Used */}
                          <div className="border p-4 rounded">
                            <h4 className="font-semibold mb-3">
                              Method Currently Used
                            </h4>
                            <div className="space-y-2">
                              {[
                                { name: "coc", label: "COC" },
                                { name: "pop", label: "POP" },
                                { name: "injectable", label: "Injectable" },
                                { name: "implant", label: "Implant" },
                                { name: "inteval", label: "IUD Interval" },
                                {
                                  name: "postPartum",
                                  label: "IUD Post Partum",
                                },
                                { name: "condom", label: "Condom" },
                                { name: "bomCmm", label: "BOM/CMM" },
                                { name: "bbt", label: "BBT" },
                                { name: "stm", label: "STM" },
                                { name: "lam", label: "LAM" },
                                { name: "otherMethod", label: "Other Method" },
                              ].map(({ name, label }) => (
                                <div
                                  key={name}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    name={name}
                                    checked={formData[name]}
                                    onChange={(e) =>
                                      handleInputChange({
                                        target: {
                                          name: e.target.name,
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <label>{label}</label>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Table 3: VAW Risks */}
                          <div className="border p-4 rounded">
                            <h4 className="font-semibold mb-3">
                              Risks for VAW
                            </h4>
                            <div className="space-y-2">
                              {[
                                {
                                  name: "unpleasantRelationship",
                                  label: "Unpleasant Relationship with Partner",
                                },
                                {
                                  name: "partnerDisapproval",
                                  label: "Partner Disapproval",
                                },
                                {
                                  name: "domesticViolence",
                                  label: "Domestic Violence",
                                },
                                {
                                  name: "referredToDSWD",
                                  label: "Referred to DSWD",
                                },
                                {
                                  name: "referredToWCPU",
                                  label: "Referred to WCPU",
                                },
                                {
                                  name: "referredToOthers",
                                  label: "Referred to Others",
                                },
                              ].map(({ name, label }) => (
                                <div
                                  key={name}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    name={name}
                                    checked={formData[name]}
                                    onChange={(e) =>
                                      handleInputChange({
                                        target: {
                                          name: e.target.name,
                                          value: e.target.checked,
                                        },
                                      })
                                    }
                                  />
                                  <label>{label}</label>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="flex justify-center items-center gap-x-2 mt-5">
                          <button 
                            className="px-4 py-1 border-[1px] border-zinc-700 bg-zinc-200"
                            onClick={handleSave}
                          >
                            Save Changes
                          </button>
                          <button onClick={() => handleEdit(" ")} className="px-4 py-1 border-[1px] border-zinc-700 bg-zinc-200">
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
                            {familyPlanningData && (
                              <tr
                                onClick={() => handleSelectRow("selected")}
                                className={`${isSelected ? 'bg-yellow-500' : ''} cursor-pointer`}
                              >
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                  Family Planning
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                  {new Date(
                                    familyPlanningData.createdAt
                                  ).getFullYear()}
                                </td>
                                <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                  {familyPlanningData.nurseIncharge.username}
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <div className="flex justify-end gap-x-3 mt-4">
                          <button
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            onClick={() => handleEdit("ok")}
                          >
                            Edit
                          </button>
                          <button onClick={() => setShowModal(false)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
              {/* <div className="mt-5">
                <div className="flex flex-row gap-x-4 space-x-5">
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Method Used</h5>
                    <select 
                      className="text-[14px] border rounded p-1"
                      value={formData.methodUsed}
                      onChange={(e) => setFormData({...formData, methodUsed: e.target.value})}
                    >
                      <option value="">Select Method</option>
                      <option value="pills">Pills</option>
                      <option value="iud">IUD</option>
                      <option value="injection">Injection</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Date Started</h5>
                    <input 
                      type="date" 
                      className="text-[14px] border rounded p-1"
                      value={formData.dateStarted}
                      onChange={(e) => setFormData({...formData, dateStarted: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Notes</h5>
                  <textarea 
                    className="border rounded p-2 text-[14px]" 
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div> */}

              <div className="flex justify-end gap-x-2 mt-4">
                <button
                  onClick={() => {
                    setHealthCare("default");
                    setIsFamilyPlanning(false);
                    setIsHealthcareActive(false);
                  }}
                  className="px-6 py-2 rounded-md border-[1px] border-yellow-500 text-yellow-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-md bg-yellow-500 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFamilyPlanning;
