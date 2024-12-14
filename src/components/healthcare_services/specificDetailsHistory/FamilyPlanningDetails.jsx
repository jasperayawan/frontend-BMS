import React from 'react'

const FamilyPlanningDetails = ({ selectedRow, myProfile, activeTab, handleCloseHistoryDetails  }) => {
  return (
    <div className="min-h-screen bg-[#fafafa] p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Modern Header */}
        <div className="text-center py-6">
          <h1 className="text-1xl md:text-2xl font-bold text-black tracking-wide uppercase">
          Family Planning Record FOR {activeTab}
          </h1>
        </div>

        <div className="flex flex-col gap-y-6">
          {/* Patient Basic Information */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">PATIENT ID NO.</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.patientIdNo || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Last Name</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.lastname || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">First Name</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.firstname || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Middle Initial</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.middleInitial || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Patient Details */}
          <div className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Sex</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.sex || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Birthdate</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.bod || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.age || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Contact</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.contact || '-'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Address</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.birthPlace || '-'}, {myProfile?.province || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Civil Status</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.civilStatus || '-'}
                </p>
              </div>
            </div>

            {/* Spouse Information */}
            <div className="grid grid-cols-5 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Spouse LastName</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.emergencyLastName || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Spouse FirstName</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.emergencyFirstName || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Spouse MiddleInitial</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.emergencyInitial || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Birthdate</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.emergencyBod || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Age</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.emergencyAge || '-'}
                </p>
              </div>
            </div>

            {/* Additional Details */}
            <div className="grid grid-cols-4 gap-4 mt-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">No. Living Child</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.livingChild || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">No. Non-Living Child</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.nonLivingChild || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Household Monthly Income</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.houseHoldMonthlyIncome || '-'}
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1.5">Occupation</label>
                <p className="flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 disabled:cursor-not-allowed disabled:opacity-50">
                  {myProfile?.occupation || '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Three Tables Grid with modern styling */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Type of Client */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Type of Client</h2>
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
                  { name: "otherReason", label: "Other Reason" }
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
              <h2 className="text-lg font-semibold text-gray-900">Method Currently Used</h2>
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
                  { name: "otherMethod", label: "Other Method" }
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
              <h2 className="text-lg font-semibold text-gray-900">Risks for VAW</h2>
              <div className="space-y-2">
                {[
                  { name: "unpleasantRelationship", label: "Unpleasant Relationship with Partner" },
                  { name: "partnerDisapproval", label: "Partner Disapproval" },
                  { name: "domesticViolence", label: "Domestic Violence" },
                  { name: "referredToDSWD", label: "Referred to DSWD" },
                  { name: "referredToWCPU", label: "Referred to WCPU" },
                  { name: "referredToOthers", label: "Referred to Others" }
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

        {/* Modern Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleCloseHistoryDetails}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-gray-200 bg-white hover:bg-gray-100 h-10 px-4 py-2"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  )
}

export default FamilyPlanningDetails