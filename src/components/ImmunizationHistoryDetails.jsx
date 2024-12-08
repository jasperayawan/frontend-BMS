import React from "react";

const ImmunizationHistoryDetails = ({
  selectedRow,
  handleBackClick,
  componentRef,
  handlePrint,
}) => {
  return (
    <div className="min-h-screen p-4 md:p-8 w-full bg-gray-50">
      <div className="bg-transparent p-8 rounded-xl mx-auto w-full max-w-4xl">
        <div className="flex items-center mb-8 border-b pb-4">
          <h2 className="text-3xl font-bold text-gray-800">
            Immunization Record Details
          </h2>
        </div>

        <div ref={componentRef} className="space-y-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Child Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Patient ID No.</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.patientIdNo || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Last Name</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.lastName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">First Name</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.firstName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Middle Name</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.middleName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Birth Date</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthDate || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Age</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.age || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Birth Place</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthPlace || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Birth Weight (kg)</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthWeight || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Birth Length (cm)</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.birthLength || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Mother's Name</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.motherName || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Contact Number</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.contactNo || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Address</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.address || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Purok</label>
                <span className="border p-3 rounded-lg bg-gray-50 text-gray-800">
                  {selectedRow?.purok || "-"}
                </span>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-600">Category</label>
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
              <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
              <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
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

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Record
          </button>
          <button
            onClick={handleBackClick}
            className="px-4 py-2 bg-gray-50 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImmunizationHistoryDetails;
