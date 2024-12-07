import React from "react";

const ImmunizationHistoryDetails = ({
  selectedRow,
  handleBackClick,
  componentRef,
  handlePrint,
}) => {
  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Immunization Record Details</h2>

        <div className="space-y-8">
          <div ref={componentRef} className="flex flex-col gap-y-2 w-full">
            {/* Child Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Child Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Patient ID No.</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.patientIdNo || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Last Name</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.lastName || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">First Name</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.firstName || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Middle Name</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.middleName || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Date</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.birthDate || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Age</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.age || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Place</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.birthPlace || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Weight (kg)</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.birthWeight || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Length (cm)</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.birthLength || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Mother's Name</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.motherName || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Contact Number</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.contactNo || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Address</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.address || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Purok</label>
                <span className="border p-2 rounded bg-gray-50">
                  {selectedRow?.purok || "-"}
                </span>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Category</label>
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

          {/* Vaccination History */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Vaccination History</h3>
            {selectedRow?.vaccinationHistory?.map((vaccine, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-5 gap-4 p-4 border rounded"
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

          {/* Micronutrient History */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">
              Micronutrient Supplement History
            </h3>
            {selectedRow?.micronutrientHistory?.map((supplement, index) => (
              <div
                key={index}
                className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded"
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

          <div className="flex justify-end gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Print
            </button>
            <button
              onClick={handleBackClick}
              className="px-4 py-2 border rounded hover:bg-gray-100"
            >
              Back to List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImmunizationHistoryDetails;
