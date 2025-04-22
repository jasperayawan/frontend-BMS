import React, { useState } from "react";
import axios from "axios";
import { toBase64 } from "../../utils/toBase64";
import toast from "react-hot-toast";
import { useFamilyPlanning } from "../../hooks/useFamilyPlanning";

const AddNewFamilyPlanning = ({
  patientDataSelected,
  setHealthCare,
  setIsFamilyPlanning,
  setIsHealthcareActive,
}) => {
  const { formData, handleInputChange, createNewFamilyPlanning, isLoading } =
    useFamilyPlanning();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Single validation: Ensure at least one option is selected across all sections
    const isTypeOfClientSelected =
      formData.newAcceptor ||
      formData.currentUser ||
      formData.changingMethod ||
      formData.changingClinic ||
      formData.dropoutRestart;
    
      const isMethodCurrentlyUsedSelected =
      formData.coc ||
      formData.pop ||
      formData.injectable ||
      formData.implant ||
      formData.interval ||
      formData.postPartum ||
      formData.condom ||
      formData.bomCmm ||
      formData.bbt ||
      formData.stm ||
      formData.lam ||
      (formData.methodOthers && formData.methodOthers.trim() !== "");

      const isRisksForViolenceSelected =
      formData.unpleasantRelationship === "YES" ||
      formData.unpleasantRelationship === "NO" ||
      formData.partnerDisapproval === "YES" ||
      formData.partnerDisapproval === "NO" ||
      formData.domesticViolence === "YES" ||
      formData.domesticViolence === "NO";

      if (
        !isTypeOfClientSelected &&
        !isMethodCurrentlyUsedSelected &&
        !isRisksForViolenceSelected
      ) {
        toast.error("Please select at least one option in each section.");
        return;
      }


    try {
      await createNewFamilyPlanning(formData, patientDataSelected?.objectId);
      toast.success("Family planning record added successfully!");
      setHealthCare("default");
      setIsFamilyPlanning(false);
      setIsHealthcareActive(false);
    } catch (error) {
      toast.error("Error submitting form");
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="bg-white p-8 rounded-lg mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Family Planning Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block">Patient ID No.</label>
                <input
                  type="text"
                  name="patientIdNo"
                  value={patientDataSelected.patientIdNo}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={patientDataSelected.lastname}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={patientDataSelected.firstname}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Middle Name</label>
                <input
                  type="text"
                  name="middlename"
                  value={patientDataSelected.middleInitial}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Sex</label>
                <input
                  type="text"
                  name="middlename"
                  value={patientDataSelected.sex}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={patientDataSelected.bod}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Age</label>
                <input
                  type="number"
                  name="age"
                  value={patientDataSelected.age}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Contact No.</label>
                <input
                  type="tel"
                  name="contactNo"
                  value={patientDataSelected.contact}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Address</label>
                <input
                  type="text"
                  value={patientDataSelected.birthPlace}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Civil Status</label>
                <select
                  name="civilStatus"
                  value={patientDataSelected.civilStatus}
                  readOnly
                  className="w-full border rounded p-2"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
            </div>

            {/* Spouse Information Section */}
            <h3 className="text-xl font-semibold mt-6">Spouse Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block">Spouse Last Name</label>
                <input
                  type="text"
                  name="spouseLastname"
                  value={patientDataSelected.emergencyLastName}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse First Name</label>
                <input
                  type="text"
                  name="spouseFirstname"
                  value={patientDataSelected.emergencyFirstName}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse Middle Name</label>
                <input
                  type="text"
                  name="spouseMiddlename"
                  value={patientDataSelected.emergencyInitial}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse Birthdate</label>
                <input
                  type="date"
                  name="spouseBirthdate"
                  value={patientDataSelected.emergencyBod}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse Age</label>
                <input
                  type="number"
                  name="spouseAge"
                  value={patientDataSelected.emergencyAge}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Other Information Section */}
            <h3 className="text-xl font-semibold mt-6">Other Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block">Living Children</label>
                <input
                  type="number"
                  name="livingChildren"
                  value={patientDataSelected.livingChild}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Non-Living Children</label>
                <input
                  type="number"
                  name="nonLivingChildren"
                  value={patientDataSelected.nonLivingChild}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Household Monthly Income</label>
                <input
                  type="number"
                  name="householdMonthlyIncome"
                  value={patientDataSelected.houseHoldMonthlyIncome}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={patientDataSelected.occupation}
                  readOnly
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Three Tables Grid */}
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
                    <label htmlFor="newAcceptor" className="text-sm font-bold">
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
                        <label htmlFor="changingMethod" className="text-xs">
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
                        <label htmlFor="changingClinic" className="text-xs">
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
                        <label htmlFor="dropoutRestart" className="text-xs">
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
                      <label htmlFor="medicalCondition" className="text-sm">
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
                      <label htmlFor="sideEffects" className="text-sm">
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
                    <div key={name} className="flex items-center gap-2">
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
                    <label htmlFor="methodOthers" className="text-sm">
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
                    <p className="text-sm mb-2">UNPLEASANT RELATIONSHIP WITH PARTNER</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="unpleasantRelationship"
                          value="YES"
                          checked={formData.unpleasantRelationship === true}
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
                          checked={formData.unpleasantRelationship === false}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Partner Disapproval */}
                  <div>
                    <p className="text-sm mb-2">PARTNER DOES NOT APPROVE OF THE VISIT TO FP CLINIC</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="partnerDisapproval"
                          value="YES"
                          checked={formData.partnerDisapproval === true}
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
                          checked={formData.partnerDisapproval === false}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Domestic Violence */}
                  <div>
                    <p className="text-sm mb-2">HISTORY OF DOMESTIC VIOLENCE VAW</p>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="domesticViolence"
                          value="YES"
                          checked={formData.domesticViolence === true}
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
                          checked={formData.domesticViolence === false}
                          onChange={handleInputChange}
                          className="form-radio"
                        />
                        <span className="text-sm">NO</span>
                      </label>
                    </div>
                  </div>

                  {/* Referred To (Checkboxes) */}
                  <div>
                    <p className="text-sm font-semibold mb-2">REFERRED TO:</p>
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
                        <label htmlFor="dswd" className="text-sm">DSWD</label>
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
                        <label htmlFor="wcpu" className="text-sm">WCPU</label>
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
                        <label htmlFor="riskOthers" className="text-sm">OTHERS</label>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setHealthCare("default");
                setIsFamilyPlanning(false);
                setIsHealthcareActive(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-yellow-500 text-white px-4 py-2 rounded"
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFamilyPlanning;
