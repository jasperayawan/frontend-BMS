import React from 'react';

const FamilyPlanningHistoryDetails = ({ selectedRow, handleBackClick, patientDataSelected }) => {

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 z-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#FFB800] text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white">
            FAMILY PLANNING RECORD
          </h1>
        </div>

        {/* Patient Basic Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 font-semibold">PATIENT ID NO.</label>
              <p className="p-2 border rounded">{patientDataSelected?.patientIdNo || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Last Name</label>
              <p className="p-2 border rounded">{patientDataSelected?.lastname || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">First Name</label>
              <p className="p-2 border rounded">{patientDataSelected?.firstname || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Middle Initial</label>
              <p className="p-2 border rounded">{patientDataSelected?.middleInitial || '-'}</p>
            </div>
          </div>
        </div>

        {/* Additional Patient Details */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-4 gap-4">
            <div>
              <label className="block mb-2 font-semibold">Sex</label>
              <p className="p-2 border rounded">{patientDataSelected?.sex || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Birthdate</label>
              <p className="p-2 border rounded">{patientDataSelected?.bod || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Age</label>
              <p className="p-2 border rounded">{patientDataSelected?.age || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Contact</label>
              <p className="p-2 border rounded">{patientDataSelected?.contact || '-'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-2 font-semibold">Address</label>
              <p className="p-2 border rounded">{patientDataSelected?.birthPlace || '-'}, {patientDataSelected?.province || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Civil Status</label>
              <p className="p-2 border rounded">{patientDataSelected?.civilStatus || '-'}</p>
            </div>
          </div>

          {/* Spouse Information */}
          <div className="grid grid-cols-5 gap-4 mt-4">
            <div>
              <label className="block mb-2 font-semibold">Spouse LastName</label>
              <p className="p-2 border rounded">{patientDataSelected?.emergencyLastName || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Spouse FirstName</label>
              <p className="p-2 border rounded">{patientDataSelected?.emergencyFirstName || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Spouse MiddleInitial</label>
              <p className="p-2 border rounded">{patientDataSelected?.emergencyInitial || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Birthdate</label>
              <p className="p-2 border rounded">{patientDataSelected?.emergencyBod || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Age</label>
              <p className="p-2 border rounded">{patientDataSelected?.emergencyAge || '-'}</p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <div>
              <label className="block mb-2 font-semibold">No. Living Child</label>
              <p className="p-2 border rounded">{patientDataSelected?.livingChild || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">No. Non-Living Child</label>
              <p className="p-2 border rounded">{patientDataSelected?.nonLivingChild || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Household Monthly Income</label>
              <p className="p-2 border rounded">{patientDataSelected?.houseHoldMonthlyIncome || '-'}</p>
            </div>
            <div>
              <label className="block mb-2 font-semibold">Occupation</label>
              <p className="p-2 border rounded">{patientDataSelected?.occupation || '-'}</p>
            </div>
          </div>
        </div>

        {/* Three Tables Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Type of Client */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Type of Client</h2>
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
                <div key={name} className="flex items-center justify-between">
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={selectedRow?.record?.[name] || false}
                    readOnly
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Method Currently Used */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Method Currently Used</h2>
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
                <div key={name} className="flex items-center justify-between">
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={selectedRow?.record?.[name] || false}
                    readOnly
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* VAW Risks */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Risks for VAW</h2>
            <div className="space-y-2">
              {[
                { name: "unpleasantRelationship", label: "Unpleasant Relationship with Partner" },
                { name: "partnerDisapproval", label: "Partner Disapproval" },
                { name: "domesticViolence", label: "Domestic Violence" },
                { name: "referredToDSWD", label: "Referred to DSWD" },
                { name: "referredToWCPU", label: "Referred to WCPU" },
                { name: "referredToOthers", label: "Referred to Others" }
              ].map(({ name, label }) => (
                <div key={name} className="flex items-center justify-between">
                  <span>{label}</span>
                  <input
                    type="checkbox"
                    checked={selectedRow?.record?.[name] || false}
                    readOnly
                    className="w-4 h-4"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="flex justify-end">
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default FamilyPlanningHistoryDetails; 