"use client";

import React, { useEffect, useState } from "react";
import { useFamilyPlanning } from "../../hooks/useFamilyPlanning";
import { X } from "lucide-react";

const EditFamilyPlanning = ({
  setHealthCare,
  setIsFamilyPlanning,
  patientDataSelected,
  setIsHealthcareActive,
}) => {
  const { fetchFamilyPlanningByUserIdHistory, familyPlanningHistory } =
    useFamilyPlanning();
  const [tableIndexSelected, setTableIndexSelected] = useState(null);
  const [isSave, setIsSave] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const {
    fetchFamilyPlanningByUserId,
    familyPlanningData,
    formData,
    setFormData,
    handleInputChange,
    updateFamilyPlanningById,
  } = useFamilyPlanning();
  const [isEdit, setIsEdit] = useState(false);
  const [selectedFamilyPlanningHistory, setSelectedFamilyPlanningHistory] =
    useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const handleFamilyPlanningHistory = (data, index) => {
    setSelectedFamilyPlanningHistory(data);
    setTableIndexSelected(index);
  };

  const handleEdit = (data) => {
    if (data === "ok" && selectedFamilyPlanningHistory) {
      setIsEdit(true);
    } else {
      setIsEdit(false);
    }
  };

  useEffect(() => {
    fetchFamilyPlanningByUserIdHistory(patientDataSelected?.objectId);
  }, []);

  useEffect(() => {
    if (selectedFamilyPlanningHistory) {
      setFormData((prevData) => ({
        ...prevData,
        // Type of Client
        newAcceptor:
          selectedFamilyPlanningHistory?.record?.newAcceptor || false,
        currentUser:
          selectedFamilyPlanningHistory?.record?.currentUser || false,
        changingMethod:
          selectedFamilyPlanningHistory?.record?.changingMethod || false,
        changingClinic:
          selectedFamilyPlanningHistory?.record?.changingClinic || false,
        dropoutRestart:
          selectedFamilyPlanningHistory?.record?.dropoutRestart || false,
        spacingReason: selectedFamilyPlanningHistory?.spacingReason || false,
        medicalCondition:
          selectedFamilyPlanningHistory?.record?.medicalCondition || false,
        sideEffects:
          selectedFamilyPlanningHistory?.record?.sideEffects || false,
        limitingReason:
          selectedFamilyPlanningHistory?.record?.limitingReason || false,
        otherReason:
          selectedFamilyPlanningHistory?.record?.otherReason || false,

        // Method Currently Used
        coc: selectedFamilyPlanningHistory?.record?.coc || false,
        pop: selectedFamilyPlanningHistory?.record?.pop || false,
        injectable: selectedFamilyPlanningHistory?.record?.injectable || false,
        implant: selectedFamilyPlanningHistory?.record?.implant || false,
        inteval: selectedFamilyPlanningHistory?.record?.inteval || false,
        postPartum: selectedFamilyPlanningHistory?.record?.postPartum || false,
        condom: selectedFamilyPlanningHistory?.record?.condom || false,
        bomCmm: selectedFamilyPlanningHistory?.record?.bomCmm || false,
        bbt: selectedFamilyPlanningHistory?.record?.bbt || false,
        stm: selectedFamilyPlanningHistory?.record?.stm || false,
        lam: selectedFamilyPlanningHistory?.record?.lam || false,
        otherMethod:
          selectedFamilyPlanningHistory?.record?.otherMethod || false,

        // VAW Risks
        unpleasantRelationship:
          selectedFamilyPlanningHistory?.record?.unpleasantRelationship ||
          false,
          partnerDisapproval:
          familyPlanningData?.record?.partnerDisapproval || false, 
        domesticViolence:
          selectedFamilyPlanningHistory?.record?.domesticViolence || false,
        dswd: selectedFamilyPlanningHistory?.record?.dswd || false,
        wcpu: selectedFamilyPlanningHistory?.record?.wcpu || false,
        riskOthers: selectedFamilyPlanningHistory?.record?.riskOthers || false,
      }));
    }
  }, [familyPlanningData, selectedFamilyPlanningHistory]);

  const confirmSave = async () => {
    try {
      await updateFamilyPlanningById(
        selectedFamilyPlanningHistory?.record.objectId,
        formData
      );
      window.location.reload();
      setShowConfirmationModal(false);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }
  };

  const handleSave = () => {
    setShowConfirmationModal(true);
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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Type of Client */}
                          <div className="border border-orange-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4 uppercase text-gray-700">
                              Type of Client
                            </h3>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <input
                                  type="checkbox"
                                  id="newAcceptor"
                                  name="newAcceptor"
                                  checked={formData.newAcceptor}
                                  onChange={handleInputChange}
                                  className="form-checkbox mt-1"
                                />
                                <label
                                  htmlFor="newAcceptor"
                                  className="text-sm font-bold"
                                >
                                  NEW ACCEPTOR
                                </label>
                              </div>

                              <div>
                                <div className="flex items-start gap-2">
                                  <input
                                    type="checkbox"
                                    id="currentUser"
                                    name="currentUser"
                                    checked={formData.currentUser}
                                    onChange={handleInputChange}
                                    className="form-checkbox mt-1"
                                  />
                                  <label
                                    htmlFor="currentUser"
                                    className="text-sm font-bold"
                                  >
                                    CURRENT USER
                                  </label>
                                </div>

                                <div className="ml-8 space-y-2 mt-2">
                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      id="changingMethod"
                                      name="changingMethod"
                                      checked={formData.changingMethod}
                                      onChange={handleInputChange}
                                      className="form-checkbox mt-1 h-3 w-3"
                                    />
                                    <label
                                      htmlFor="changingMethod"
                                      className="text-xs"
                                    >
                                      CHANGING METHOD
                                    </label>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      id="changingClinic"
                                      name="changingClinic"
                                      checked={formData.changingClinic}
                                      onChange={handleInputChange}
                                      className="form-checkbox mt-1 h-3 w-3"
                                    />
                                    <label
                                      htmlFor="changingClinic"
                                      className="text-xs"
                                    >
                                      CHANGING CLINIC
                                    </label>
                                  </div>

                                  <div className="flex items-start gap-2">
                                    <input
                                      type="checkbox"
                                      id="dropoutRestart"
                                      name="dropoutRestart"
                                      checked={formData.dropoutRestart}
                                      onChange={handleInputChange}
                                      className="form-checkbox mt-1 h-3 w-3"
                                    />
                                    <label
                                      htmlFor="dropoutRestart"
                                      className="text-xs"
                                    >
                                      DROPOUT/RESTART
                                    </label>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-2 mt-4">
                                <p className="text-sm font-semibold">
                                  REASON FOR FAMILY PLANNING
                                </p>
                                <div className="flex items-start gap-2">
                                  <input
                                    type="checkbox"
                                    id="spacing"
                                    name="spacing"
                                    checked={formData.spacing}
                                    onChange={handleInputChange}
                                    className="form-checkbox mt-1"
                                  />
                                  <label htmlFor="spacing" className="text-sm">
                                    SPACING
                                  </label>
                                </div>

                                <div className="flex items-start gap-2">
                                  <input
                                    type="checkbox"
                                    id="medicalCondition"
                                    name="medicalCondition"
                                    checked={formData.medicalCondition}
                                    onChange={handleInputChange}
                                    className="form-checkbox mt-1"
                                  />
                                  <label
                                    htmlFor="medicalCondition"
                                    className="text-sm"
                                  >
                                    MEDICAL CONDITION
                                  </label>
                                </div>

                                <div className="flex items-start gap-2">
                                  <input
                                    type="checkbox"
                                    id="sideEffects"
                                    name="sideEffects"
                                    checked={formData.sideEffects}
                                    onChange={handleInputChange}
                                    className="form-checkbox mt-1"
                                  />
                                  <label
                                    htmlFor="sideEffects"
                                    className="text-sm"
                                  >
                                    SIDE EFFECTS
                                  </label>
                                </div>

                                <div className="flex items-start gap-2">
                                  <input
                                    type="checkbox"
                                    id="limiting"
                                    name="limiting"
                                    checked={formData.limiting}
                                    onChange={handleInputChange}
                                    className="form-checkbox mt-1"
                                  />
                                  <label htmlFor="limiting" className="text-sm">
                                    LIMITING
                                  </label>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 mt-4">
                                <label htmlFor="others" className="text-sm">
                                  OTHERS
                                </label>
                                <input
                                  type="text"
                                  id="others"
                                  name="others"
                                  value={formData.others}
                                  onChange={handleInputChange}
                                  className="border-b border-gray-300 focus:border-orange-500 outline-none px-2 py-1 text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Method Currently Used */}
                          <div className="border border-orange-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4 uppercase text-gray-700">
                              Method Currently Used
                            </h3>
                            <div className="space-y-2">
                              {[
                                { name: "coc", label: "COC" },
                                { name: "pop", label: "POP" },
                                { name: "injectable", label: "INJECTABLE" },
                                { name: "implant", label: "IMPLANT" },
                                { name: "interval", label: "INTERVAL" },
                                { name: "postPartum", label: "POST-PARTUM" },
                                { name: "condom", label: "CONDOM" },
                                { name: "bomCmm", label: "BOM/CMM" },
                                { name: "bbt", label: "BBT" },
                                { name: "stm", label: "STM" },
                                { name: "lam", label: "LAM" },
                              ].map(({ name, label }) => (
                                <div
                                  key={name}
                                  className="flex items-center gap-2"
                                >
                                  <input
                                    type="checkbox"
                                    id={name}
                                    name={name}
                                    checked={formData[name]}
                                    onChange={handleInputChange}
                                    className="form-checkbox"
                                  />
                                  <label htmlFor={name} className="text-sm">
                                    {label}
                                  </label>
                                </div>
                              ))}
                              <div className="flex items-center gap-2">
                                <label
                                  htmlFor="methodOthers"
                                  className="text-sm"
                                >
                                  OTHERS
                                </label>
                                <input
                                  type="text"
                                  id="methodOthers"
                                  name="methodOthers"
                                  value={formData.methodOthers}
                                  onChange={handleInputChange}
                                  className="border-b border-gray-300 focus:border-orange-500 outline-none px-2 py-1 text-sm"
                                />
                              </div>
                            </div>
                          </div>

                          {/* Risks for Violence Against Women */}
                          <div className="border border-orange-200 rounded-lg p-4">
                            <h3 className="text-lg font-semibold mb-4 uppercase text-gray-700">
                              Risks for Violence Against Women
                            </h3>
                            <div className="space-y-4">
                              {/* Unpleasant Relationship */}
                              <div>
                                <p className="text-sm mb-2">
                                  UNPLEASANT RELATIONSHIP WITH PARTNER
                                </p>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="unpleasantRelationship"
                                      value="YES"
                                      checked={
                                        formData.unpleasantRelationship === true
                                      }
                                      onChange={handleInputChange}
                                      className="form-radio"
                                    />
                                    <span className="text-sm">YES</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="unpleasantRelationship"
                                      value="NO"
                                      checked={
                                        formData.unpleasantRelationship ===
                                        false
                                      }
                                      onChange={handleInputChange}
                                      className="form-radio"
                                    />
                                    <span className="text-sm">NO</span>
                                  </label>
                                </div>
                              </div>

                              {/* Partner Disapproval */}
                              <div>
                                <p className="text-sm mb-2">
                                  PARTNER DOES NOT APPROVE OF THE VISIT TO FP
                                  CLINIC
                                </p>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="partnerDisapproval"
                                      value="YES"
                                      checked={
                                        formData.partnerDisapproval === true
                                      }
                                      onChange={handleInputChange}
                                      className="form-radio"
                                    />
                                    <span className="text-sm">YES</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="partnerDisapproval"
                                      value="NO"
                                      checked={
                                        formData.partnerDisapproval === false
                                      }
                                      onChange={handleInputChange}
                                      className="form-radio"
                                    />
                                    <span className="text-sm">NO</span>
                                  </label>
                                </div>
                              </div>

                              {/* Domestic Violence */}
                              <div>
                                <p className="text-sm mb-2">
                                  HISTORY OF DOMESTIC VIOLENCE VAW
                                </p>
                                <div className="flex gap-4">
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="domesticViolence"
                                      value="YES"
                                      checked={
                                        formData.domesticViolence === true
                                      }
                                      onChange={handleInputChange}
                                      className="form-radio"
                                    />
                                    <span className="text-sm">YES</span>
                                  </label>
                                  <label className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="domesticViolence"
                                      value="NO"
                                      checked={
                                        formData.domesticViolence === false
                                      }
                                      onChange={handleInputChange}
                                      className="form-radio"
                                    />
                                    <span className="text-sm">NO</span>
                                  </label>
                                </div>
                              </div>

                              {/* Referred To (Checkboxes) */}
                              <div>
                                <p className="text-sm font-semibold mb-2">
                                  REFERRED TO:
                                </p>
                                <div className="space-y-2">
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id="dswd"
                                      name="dswd"
                                      checked={formData.dswd}
                                      onChange={handleInputChange}
                                      className="form-checkbox"
                                    />
                                    <label htmlFor="dswd" className="text-sm">
                                      DSWD
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id="wcpu"
                                      name="wcpu"
                                      checked={formData.wcpu}
                                      onChange={handleInputChange}
                                      className="form-checkbox"
                                    />
                                    <label htmlFor="wcpu" className="text-sm">
                                      WCPU
                                    </label>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="checkbox"
                                      id="riskOthers"
                                      name="riskOthers"
                                      checked={formData.riskOthers}
                                      onChange={handleInputChange}
                                      className="form-checkbox"
                                    />
                                    <label
                                      htmlFor="riskOthers"
                                      className="text-sm"
                                    >
                                      OTHERS
                                    </label>
                                  </div>
                                </div>
                              </div>
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
                          <button
                            onClick={() => handleEdit(" ")}
                            className="px-4 py-1 border-[1px] border-zinc-700 bg-zinc-200"
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
                            {Array.isArray(familyPlanningHistory) &&
                              familyPlanningHistory.map((item, index) => (
                                <tr
                                  key={index}
                                  onClick={() =>
                                    handleFamilyPlanningHistory(item, index)
                                  }
                                  className={`${
                                    tableIndexSelected === index
                                      ? "bg-yellow-500"
                                      : ""
                                  } cursor-pointer`}
                                >
                                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                    Family Planning
                                  </td>
                                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                    {new Date(
                                      item.record.createdAt
                                    ).getFullYear()}
                                  </td>
                                  <td className="border border-gray-300 px-6 py-4 text-sm text-gray-800">
                                    {item.record.nurseIncharge.name}{" "}
                                    {item.record.nurseIncharge.username}
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                        <div className="flex justify-end gap-x-3 mt-4">
                          <button
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                            onClick={() => handleEdit("ok")}
                          >
                            Edit
                          </button>
                          <button
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
                          onClick={confirmSave}
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
