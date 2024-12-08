import React from 'react';

const OtherServicesHistoryDetails = ({ selectedRow, handleBackClick, componentRef, handlePrint }) => {
  return (
    <div className="min-h-screen bg-gray-50/95 p-4 md:p-8 z-50">
      <div className="max-w-4xl mx-auto w-full space-y-6">
        <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-center py-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-semibold text-white tracking-tight">
            OTHER SERVICES HISTORY DETAILS
          </h1>
        </div>

        <div ref={componentRef} className="p-8 rounded-xl border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">SERVICES AVAILED</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.servicesAvailed || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">DATE</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.date ? new Date(selectedRow.date).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">FIRST NAME</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.firstName || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">MIDDLE NAME</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.middleName || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">LAST NAME</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.lastName || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">SEX</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800 capitalize">{selectedRow?.sex || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">STATUS</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.status || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">DATE OF BIRTH</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.dateOfBirth ? new Date(selectedRow.dateOfBirth).toLocaleDateString() : '-'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-5">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">AGE</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.age || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">BLOOD TYPE</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.bloodType || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">BLOOD PRESSURE</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.bloodPressure || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">HEIGHT (cm)</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.height || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">WEIGHT (kg)</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.weight || '-'}</p>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2">RELATIONSHIP</label>
              <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
                <p className="text-gray-800">{selectedRow?.relationship || '-'}</p>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700 mb-2">PRESCRIPTION</label>
            <div className="p-3 bg-gray-50/50 border border-gray-200 rounded-md shadow-sm">
              <p className="text-gray-800 min-h-[8rem] whitespace-pre-wrap">{selectedRow?.prescription || '-'}</p>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <div className="text-center">
              <div className="border-t border-black w-48 mt-8 pt-2">
                PATIENT SIGNATURE OVER PRINTED NAME
              </div>
            </div>
            <div className="text-center">
              <div className="border-t border-black w-48 mt-8 pt-2">
                NURSE INCHARGE SIGNATURE OVER PRINTED NAME
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center space-x-4 py-6">
          <button 
            onClick={handlePrint}
            className="px-6 py-2.5 bg-gradient-to-r from-yellow-500 to-amber-500 text-white rounded-md font-medium shadow-sm hover:from-yellow-600 hover:to-amber-600 transition-colors duration-200"
          >
            Print
          </button>
          <button 
            onClick={handleBackClick}
            className="px-6 py-2.5 bg-white border border-gray-200 text-gray-700 rounded-md font-medium shadow-sm hover:bg-gray-50 transition-colors duration-200"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherServicesHistoryDetails; 