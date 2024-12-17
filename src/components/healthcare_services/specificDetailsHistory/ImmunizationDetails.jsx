import React from "react";

const ImmunizationDetails = ({
  selectedRow,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
  handlePrint,
  componentRef
}) => {

  console.log(myProfile)
  return (
    <div className="min-h-screen p-4 md:p-8 w-full ">
      <div ref={componentRef && componentRef} className="bg-transparent p-8 rounded-xl mx-auto w-full max-w-4xl">
        <div className="flex items-center mb-8 pb-4">
            <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
            {activeTab} FORM
            </h2>
        </div>

        <div className="">
          <div className="bg-white border border-gray-200 p-6">
            <div className="grid grid-cols-3">
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Patient ID No.
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {myProfile?.patientIdNo || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Last Name
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {myProfile?.lastname || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  First Name
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {myProfile?.firstname || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Middle Name
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {myProfile?.middleInitial || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Birth Date
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {myProfile?.bod || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">Age</label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.age || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Birth Place
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.birthPlace || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Birth Weight (kg)
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.birthWeight || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Birth Length (cm)
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.birthLength || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Mother's Name
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.motherName || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Contact Number
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.contactNo || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Address
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.address || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
                  Purok
                </label>
                <span className="p-3 bg-gray-50 text-gray-800">
                  {selectedRow?.purok || "-"}
                </span>
              </div>
              <div className="flex flex-row items-center gap-1.5">
                <label className="text-sm font-medium text-black">
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

          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold text-center text-black mb-6 gap-2">
              Vaccination History
            </h3>

            <table class="min-w-full table-auto">
              <thead class="bg-orange-500 text-white">
                <tr>
                  <th scope="col" class="py-2 px-4 text-left">Date</th>
                  <th scope="col" class="py-2 px-4 text-left">Type of Vaccine</th>
                  <th scope="col" class="py-2 px-4 text-left">Doses</th>
                  <th scope="col" class="py-2 px-4 text-left">Weight (kg)</th>
                  <th scope="col" class="py-2 px-4 text-left">Length/Height (cm)</th>
                </tr>
              </thead>
              <tbody>
                {selectedRow?.vaccinationHistory?.map((vaccine, index) => (
                  <tr className={`${index % 2 === 0 ? 'bg-pink-100' : 'bg-white'} hover:bg-pink-200`}>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{vaccine.date ? new Date(vaccine.date).toLocaleDateString() : "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{vaccine.vaccineType || "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{vaccine.doses || "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{vaccine.weight || "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{vaccine.length || "-"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          <div className="bg-white p-6">
            <h3 className="text-lg font-semibold text-center text-black mb-6 gap-2">
              Micronutrient Supplement History
            </h3>

            <table class="min-w-full table-auto">
              <thead class="bg-orange-500 text-white">
                <tr>
                  <th scope="col" class="py-2 px-4 text-left">Date</th>
                  <th scope="col" class="py-2 px-4 text-left">Type of Micronutrient</th>
                  <th scope="col" class="py-2 px-4 text-left">Doses</th>
                  <th scope="col" class="py-2 px-4 text-left">Remarks</th>
                </tr>
              </thead>
              <tbody>
                {selectedRow?.micronutrientHistory?.map((supplement, index) => (
                  <tr className={`${index % 2 === 0 ? 'bg-pink-100' : 'bg-white'} hover:bg-pink-200`}>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{supplement.date ? new Date(supplement.date).toLocaleDateString() : "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{supplement.micronutrientType || "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{supplement.doses || "-"}</span>
                    </td>
                    <td class="border p-2 text-sm">
                      <span className="p-2">{supplement.remarks || "-"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        </div>

      </div>

      <div className="mt-8 flex justify-center gap-3">
        {handlePrint && (
            <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-black bg-white hover:bg-gray-100 px-4 py-1 shadow"
          >
            PRINT
          </button>
        )}
          <button
            onClick={handleCloseHistoryDetails}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-black bg-white hover:bg-gray-100 px-4 py-1 shadow"
          >
            BACK
          </button>
        </div>
    </div>
  );
};

export default ImmunizationDetails;
