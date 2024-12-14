import React from "react";

const ImmunizationDetails = ({
  selectedRow,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
  handlePrint,
  componentRef
}) => {
  return (
    <div className="min-h-screen p-4 md:p-8 w-full bg-gray-50">
      <div ref={componentRef && componentRef} className="bg-transparent p-8 rounded-xl mx-auto w-full max-w-4xl">
        <div className="flex items-center mb-8 border-b pb-4">
            <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
            {activeTab} FORM
            </h2>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              Child Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Patient ID No.
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {myProfile?.patientIdNo || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Last Name
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {myProfile?.lastName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  First Name
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {myProfile?.firstName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Middle Name
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {myProfile?.middleName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Birth Date
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {myProfile?.birthDate || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Age</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.age || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Birth Place
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthPlace || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Birth Weight (kg)
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthWeight || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Birth Length (cm)
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthLength || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Mother's Name
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.motherName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Contact Number
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.contactNo || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Address
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.address || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Purok
                </label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.purok || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">
                  Category
                </label>
                <div className="flex flex-row gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={selectedRow?.category === "4ps"}
                      readOnly
                      className="border p-2 rounded"
                    />
                    <label>4Ps</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={selectedRow?.category === "indigent"}
                      readOnly
                      className="border p-2 rounded"
                    />
                    <label>Indigent</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      checked={selectedRow?.category === "private"}
                      readOnly
                      className="border p-2 rounded"
                    />
                    <label>Private</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Vaccination History
            </h3>

            <div className="space-y-4">
              {selectedRow?.vaccinationHistory?.map((vaccine, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex flex-col">
                    <label className="font-medium">Date</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {vaccine.date
                        ? new Date(vaccine.date).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Type of Vaccine</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {vaccine.vaccineType || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Doses</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {vaccine.doses || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Weight (kg)</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {vaccine.weight || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Length/Height (cm)</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {vaccine.length || "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-yellow-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Micronutrient Supplement History
            </h3>

            <div className="space-y-4">
              {selectedRow?.micronutrientHistory?.map((supplement, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex flex-col">
                    <label className="font-medium">Date</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {supplement.date
                        ? new Date(supplement.date).toLocaleDateString()
                        : "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Type of Micronutrient</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {supplement.micronutrientType || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Doses</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {supplement.doses || "-"}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <label className="font-medium">Remarks</label>
                    <span className="border p-2 rounded bg-gray-50">
                      {supplement.remarks || "-"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-end gap-3">
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

export default ImmunizationDetails;
