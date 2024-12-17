import React from "react";

const FamilyPlanningDetails = ({
  selectedRow,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
  handlePrint,
  componentRef
}) => {
  console.log(myProfile)
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

          {/* Three Tables Grid with modern styling */}
          <div className="grid grid-cols-3 gap-6">
            {/* Type of Client */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Type of Client
              </h2>
              <div className="space-y-2">
                {[
                  { name: "newAcceptor", label: "New Acceptor" },
                  { name: "currentUser", label: "Current User" },
                  { name: "changingMethod", label: "Changing Method" },
                  { name: "changingClinic", label: "Changing Clinic" },
                  { name: "dropoutRestart", label: "Dropout/Restart" },
                  { name: "spacingReason", label: "Spacing Reason" },
                  { name: "medicalCondition", label: "Medical Condition" },
                  { name: "sideEffects", label: "Side Effects" },
                  { name: "limitingReason", label: "Limiting Reason" },
                  { name: "otherReason", label: "Other Reason" },
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedRow?.record?.[name] || false}
                      readOnly
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-950"
                    />
                    <label className="text-sm text-gray-700">{label}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Method Currently Used */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Method Currently Used
              </h2>
              <div className="space-y-2">
                {[
                  { name: "coc", label: "COC" },
                  { name: "pop", label: "POP" },
                  { name: "injectable", label: "Injectable" },
                  { name: "implant", label: "Implant" },
                  { name: "inteval", label: "IUD Interval" },
                  { name: "postPartum", label: "IUD Post Partum" },
                  { name: "condom", label: "Condom" },
                  { name: "bomCmm", label: "BOM/CMM" },
                  { name: "bbt", label: "BBT" },
                  { name: "stm", label: "STM" },
                  { name: "lam", label: "LAM" },
                  { name: "otherMethod", label: "Other Method" },
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedRow?.record?.[name] || false}
                      readOnly
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-950"
                    />
                    <label className="text-sm text-gray-700">{label}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* VAW Risks */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Risks for VAW
              </h2>
              <div className="space-y-2">
                {[
                  {
                    name: "unpleasantRelationship",
                    label: "Unpleasant Relationship with Partner",
                  },
                  { name: "partnerDisapproval", label: "Partner Disapproval" },
                  { name: "domesticViolence", label: "Domestic Violence" },
                  { name: "referredToDSWD", label: "Referred to DSWD" },
                  { name: "referredToWCPU", label: "Referred to WCPU" },
                  { name: "referredToOthers", label: "Referred to Others" },
                ].map(({ name, label }) => (
                  <div key={name} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={selectedRow?.record?.[name] || false}
                      readOnly
                      className="h-4 w-4 rounded border-gray-300 text-gray-900 focus:ring-gray-950"
                    />
                    <label className="text-sm text-gray-700">{label}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        
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
