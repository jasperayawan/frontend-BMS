import React from "react";

const FamilyPlanningDetails = ({
  selectedRow,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
  handlePrint,
  componentRef,
  user
}) => {

  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      <div ref={componentRef && componentRef} className="max-w-4xl mx-auto space-y-8">
        {/* Modern Header */}
        <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
        {activeTab}
        </h2>

        <div className="flex flex-col gap-y-6">
          {/* Patient Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  PATIENT ID NO.
                </label>
                <p className="flex h-10 bg-white px-3 py-2">
                  {myProfile?.patientIdNo || "-"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  SEX
                </label>
                <p className="flex h-10 bg-white px-3 py-2">
                  {myProfile?.sex || "-"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700">
                  DATE OF BIRTH
                </label>
                <p className="flex h-10 bg-white px-3 py-2">
                  {myProfile?.bod || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Patient Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  NAME OF CLIENT
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.firstname || "-"} {myProfile?.lastname || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  AGE
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.age || "-"}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  ADDRESS
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.barangay || "-"}, {myProfile?.birthPlace || "-"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  Contact
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.contact || "-"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  Civil Status
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.civilStatus || "-"}
                </p>
              </div>
            </div>

            {/* Spouse Information */}
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  NAME OF SPOUSE
                </label>
                <div className="flex items-center gap-2">
                  <p className="flex h-10 bg-white px-3 py-2 text-sm">
                    {myProfile?.emergencyLastName || "-"}
                  </p>
                  <p className="flex h-10 bg-white px-3 py-2 text-sm">
                    {myProfile?.emergencyFirstName || "-"}
                  </p>
                  <p className="flex h-10 bg-white px-3 py-2 text-sm">
                    {myProfile?.emergencyInitial || "-"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  Birthdate
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.emergencyBod || "-"}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  No. Living Child
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.livingChild || "-"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  Occupation
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.occupation || "-"}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-700 mb-1.5">
                  Average Monthly Income
                </label>
                <p className="flex h-10 bg-white px-3 py-2 text-sm">
                  {myProfile?.houseHoldMonthlyIncome || "-"}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-6">
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
                    checked={selectedRow.record.newAcceptor}
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
                      checked={selectedRow.record.currentUser}
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
                        checked={selectedRow.record.changingMethod}
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
                        checked={selectedRow.record.changingClinic}
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
                        checked={selectedRow.record.dropoutRestart}
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
                      checked={selectedRow.record.spacing}
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
                      checked={selectedRow.record.medicalCondition}
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
                      checked={selectedRow.record.sideEffects}
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
                      checked={selectedRow.record.limiting}
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
                    value={selectedRow.record.others}
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
                      checked={selectedRow.record[name]}
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
                    value={selectedRow.record.methodOthers}
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
                          selectedRow.record.unpleasantRelationship === true
                        }
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
                          selectedRow.record.unpleasantRelationship ===
                          false
                        }
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
                          selectedRow.record.partnerDisapproval === true
                        }
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
                          selectedRow.record.partnerDisapproval === false
                        }
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
                          selectedRow.record.domesticViolence === true
                        }
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
                          selectedRow.record.domesticViolence === false
                        }
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
                        checked={selectedRow.record.dswd}
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
                        checked={selectedRow.record.wcpu}
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
                        checked={selectedRow.record.riskOthers}
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
        </div>

        <p className='hidden print:block uppercase mt-10'>PRINTED BY: {user?.get("role")} {user?.get("name")}</p>                 
      </div>
      {/* Modern Buttons */}
      <div className="flex justify-center space-x-4 mt-10">
        {handlePrint && (
            <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-10 px-4 py-2"
          >
            PRINT
          </button>
        )}
          <button
            onClick={handleCloseHistoryDetails}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-10 px-4 py-2"
          >
            BACK
          </button>
        </div>
    </div>
  );
};

export default FamilyPlanningDetails;
