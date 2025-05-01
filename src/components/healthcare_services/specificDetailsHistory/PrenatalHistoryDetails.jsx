import { Calendar } from "lucide-react";
import React from "react";

const PrenatalHistoryDetails = ({
  selectedRow,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
  handlePrint,
  componentRef,
  user
}) => {
  return (
    <div className="min-h-screen p-4 md:p-8">
      <div
        ref={componentRef && componentRef}
        className="max-w-5xl mx-auto space-y-6"
      >
        <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
          Maternal Client Record FOR {activeTab}
        </h2>

        <div className="flex flex-col gap-y-4 w-full">
          {/* Patient Information */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2"
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
              Patient Information
            </h2>
            <div className="grid grid-cols-6 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  PATIENT ID NO.
                </label>
                <p className="">{myProfile?.patientIdNo || "-"}</p>
              </div>
              <div>
                <label className="block mb-2">LASTNAME</label>
                <p className="">
                  {myProfile?.lastname || "-"}
                </p>
              </div>
              <div>
                <label className="block mb-2">FIRSTNAME</label>
                <p className="">
                  {myProfile?.firstname || "-"}
                </p>
              </div>
              <div>
                <label className="block mb-2">MIDDLE INITIAL</label>
                <p className="">
                  {myProfile?.middleInitial || "-"}
                </p>
              </div>
              <div>
                <label className="block mb-2">BIRTHDATE</label>
                <p className="">
                  {myProfile?.bod || "-"}
                </p>
              </div>
              <div>
                <label className="block mb-2">AGE</label>
                <p className="">
                  {myProfile?.age || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Prenatal Periods */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <Calendar className="w-5 h-5 mr-2" />
              Prenatal Periods
            </h2>
            <div className="space-y-6">
              {[
                { trimester: "First Trimester", color: "bg-blue-50" },
                { trimester: "Second Trimester", color: "bg-green-50" },
                { trimester: "Third Trimester", color: "bg-purple-50" },
              ].map((period, index) => (
                <div key={index} className={`${period.color} p-4`}>
                  <div className="grid grid-cols-4 gap-4 items-center">
                    <div>
                      <label className="block mb-2">PRENATAL PERIOD</label>
                      <p className="p-2 border rounded">{period.trimester}</p>
                    </div>
                    <div>
                      <label className="block mb-2">DATE</label>
                      <p className="p-2 border rounded">
                        {selectedRow?.dateOne
                          ? new Date(selectedRow.dateOne).toLocaleDateString()
                          : "-"}
                      </p>
                    </div>
                    <div>
                      <label className="block mb-2">WEEKS</label>
                      <p className="p-2 border rounded">
                        {selectedRow?.weekOne || "-"}
                      </p>
                    </div>
                    <div>
                      <label className="block mb-2">PATIENT'S CONDITION</label>
                      <p className="p-2 border rounded">
                        {selectedRow?.coditionOne || "-"}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital and Expected Delivery */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">HOSPITAL</label>
                <p className="p-2 border rounded">
                  {selectedRow?.hospital || "-"}
                </p>
              </div>
              <div>
                <label className="block mb-2">EXPECTED DATE OF DELIVERY</label>
                <p className="p-2 border rounded">
                  {selectedRow?.expectedDateToDeliver
                    ? new Date(
                        selectedRow.expectedDateToDeliver
                      ).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Feelings Section */}
          <div className="p-6">
            <div className="flex space-x-4 w-full">
              <div className="w-full">
                <label className="block mb-2">
                  HOW DOES THE FATHER OF THE BABY FEEL ABOUT THE PREGNANCY?
                </label>
                <p className="p-2 border rounded">
                  {selectedRow?.questionOne || "-"}
                </p>
              </div>
              <div className="w-full">
                <label className="block mb-2">YOUR FAMILY?</label>
                <p className="p-2 border rounded">
                  {selectedRow?.questionTwo || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* Symptoms Checklist */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg
                className="w-5 h-5 mr-2"
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
              Discomforts During Pregnancy
            </h2>
            <div className="w-full">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1"></div>
                {Object.keys(selectedRow?.symptoms || {}).map((period) => (
                  <div
                    key={period}
                    className="text-center font-medium px-4 py-2 bg-gray-50 rounded-lg"
                  >
                    {period}
                  </div>
                ))}
              </div>
              {[
                "Edema",
                "Constipation",
                "Nausea/Vomiting",
                "Leg Cramps",
                "Hemorrhoids",
                "Heartburn",
              ].map((symptom) => (
                <div key={symptom} className="grid grid-cols-4 gap-4 mb-3">
                  <div className="col-span-1">{symptom}</div>
                  {Object.keys(selectedRow?.symptoms || {}).map((period) => {
                    const symptomKey = symptom
                      .toLowerCase()
                      .replace(/[^a-z]/g, "");
                    return (
                      <div
                        key={`${symptom}_${period}`}
                        className="flex justify-center"
                      >
                        <input
                          type="checkbox"
                          checked={
                            selectedRow?.symptoms?.[period]?.[symptomKey] ||
                            false
                          }
                          readOnly
                          className="w-4 h-4"
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Medical History Grid */}
          <div className="grid grid-cols-3 gap-6 p-6">
            {/* Review of System */}
            <div className="border p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                Review of System
              </h2>
              <div className="space-y-3">
                {selectedRow?.reviewOfSystem?.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[12px]">{item.name}</span>
                    <div className="flex items-center">
                      <label className="flex items-center mr-4 text-[12px]">
                        <input
                          type="radio"
                          name={`${item.name}-review`}
                          value="yes"
                          checked={item.value}
                          readOnly
                          className="mr-1"
                        />
                        YES
                      </label>
                      <label className="flex items-center text-[12px]">
                        <input
                          type="radio"
                          name={`${item.name}-review`}
                          value="no"
                          checked={!item.value}
                          readOnly
                          className="mr-1"
                        />
                        NO
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Family History */}
            <div className="border p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                Family History
              </h2>
              <div className="space-y-3">
                {selectedRow?.familyHistory?.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[12px]">{item.name}</span>
                    <div className="flex items-center text-[12px]">
                      <label className="flex items-center mr-4">
                        <input
                          type="radio"
                          name={`${item.name}-family`}
                          value="yes"
                          checked={item.value}
                          readOnly
                          className="mr-1"
                        />
                        YES
                      </label>
                      <label className="flex items-center text-[12px]">
                        <input
                          type="radio"
                          name={`${item.name}-family`}
                          value="no"
                          checked={!item.value}
                          readOnly
                          className="mr-1"
                        />
                        NO
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past History */}
            <div className="border p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                Past History
              </h2>
              <div className="space-y-3">
                {selectedRow?.pastHistory?.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center justify-between"
                  >
                    <span className="text-[12px]">{item.name}</span>
                    <div className="flex items-center">
                      <label className="flex items-center mr-4 text-[12px]">
                        <input
                          type="radio"
                          name={`${item.name}-past`}
                          value="yes"
                          checked={item.value}
                          readOnly
                          className="mr-1"
                        />
                        YES
                      </label>
                      <label className="flex items-center text-[12px]">
                        <input
                          type="radio"
                          name={`${item.name}-past`}
                          value="no"
                          checked={!item.value}
                          readOnly
                          className="mr-1"
                        />
                        NO
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Physical Examination */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Physical Examination</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { key: "bloodPressure", label: "BLOOD PRESSURE" },
                { key: "weight", label: "WEIGHT" },
                { key: "height", label: "HEIGHT" },
                { key: "bodyMaxIndex", label: "BODY MAX INDEX" },
                { key: "pulseRate", label: "PULSE RATE" },
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block mb-2">{label}</label>
                  <p className="p-2 border rounded">
                    {selectedRow?.[key] || "-"}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Maternal Records Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="bg-orange-500 text-white p-3">DATE</th>
                    <th className="bg-orange-500 text-white p-3">
                      COMPLAINTS/COMPLICATIONS
                    </th>
                    <th className="bg-orange-500 text-white p-3">
                      MCN SERVICES GIVEN
                    </th>
                    <th className="bg-orange-500 text-white p-3">
                      NAME OF PROVIDER AND SIGNATURE
                    </th>
                    <th className="bg-orange-500 text-white p-3">
                      NEXT FOLLOW UP
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRow?.maternalRecords?.map((record, index) => (
                    <tr key={index} className="border-[1px] border-zinc-700">
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.date
                          ? new Date(record.date).toLocaleDateString()
                          : "-"}
                      </td>
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.complaints || "-"}
                      </td>
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.mcnServicesGiven || "-"}
                      </td>
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.providerName || "-"}
                      </td>
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.followUp
                          ? new Date(record.followUp).toLocaleDateString()
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <p className='hidden print:block uppercase mt-10'>PRINTED BY: {user?.get("role")} {user?.get("name")}</p>  
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4 py-6">
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
          Back
        </button>
      </div>
    </div>
  );
};

export default PrenatalHistoryDetails;
