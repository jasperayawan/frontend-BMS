import React from "react";

const OtherServicesDetails = ({
  selectedRow,
  myProfile,
  activeTab,
  handleCloseHistoryDetails,
  handlePrint,
  componentRef,
}) => {
  return (
    <div className="p-4 md:p-8 z-50">
      <div
        ref={componentRef && componentRef}
        className="max-w-4xl mx-auto w-full space-y-6"
      >
        <h2 className="text-2xl uppercase text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 mb-7">
          {activeTab}
        </h2>

        <div className="border border-yellow-500">
          <h3 className="uppercase mb-4 text-[12px] bg-yellow-500 px-3 py-2 font-semibold">
            Patient Information
          </h3>
          <div className="flex flex-col px-8 pb-10">
            <div className="grid grid-cols-2 gap-6 mb-5">
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  SERVICES AVAILED:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.servicesAvailed || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  DATE:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.date
                    ? new Date(selectedRow.date).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-5">
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  FIRST NAME:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.firstName || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  MIDDLE NAME:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.middleName || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  LAST NAME:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.lastName || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  SEX:
                </label>
                <p className="text-gray-800 text-[12px] capitalize">
                  {selectedRow?.sex || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  STATUS:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.status || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  DATE OF BIRTH:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.dateOfBirth
                    ? new Date(selectedRow.dateOfBirth).toLocaleDateString()
                    : "-"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-5">
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  AGE:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.age || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  BLOOD TYPE:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.bloodType || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  BLOOD PRESSURE:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.bloodPressure || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  HEIGHT (cm):
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.height || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  WEIGHT (kg):
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.weight || "-"}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <label className="text-[12px] font-medium text-black">
                  RELATIONSHIP:
                </label>
                <p className="text-gray-800 text-[12px]">
                  {selectedRow?.relationship || "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-6">
              <label className="text-[12px] font-medium text-black">
                PRESCRIPTION:
              </label>
              <p className="text-gray-800 text-[12px] whitespace-pre-wrap">
                {selectedRow?.prescription || "-"}
              </p>
            </div>

            <div className="flex justify-between mt-6">
              <div className="text-center">
                <div className="border-t border-black w-48 mt-8 text-[12px] pt-2">
                  PATIENT SIGNATURE OVER PRINTED NAME
                </div>
              </div>
              <div className="text-center">
                <div className="border-t border-black w-48 mt-8 text-[12px] pt-2">
                  NURSE INCHARGE SIGNATURE OVER PRINTED NAME
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-4 py-6">
        {handlePrint && (
          <button
            onClick={handlePrint}
            className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-black bg-white hover:bg-gray-100 px-4 py-1 shadow"
          >
            PRINT
          </button>
        )}
        <button
          onClick={handleCloseHistoryDetails}
          className="inline-flex items-center justify-center text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 border border-black bg-white hover:bg-gray-100 px-4 py-1 shadow"
        >
          BACK
        </button>
      </div>
    </div>
  );
};

export default OtherServicesDetails;
