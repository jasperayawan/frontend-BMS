import React from 'react';

const OtherServicesHistoryDetails = ({ selectedRow, handleBackClick }) => {
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 z-50">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="bg-[#FFB800] text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white">
            OTHER SERVICES HISTORY DETAILS
          </h1>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          {/* Basic Service Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block mb-2">SERVICES AVAILED</label>
              <p className="p-2 border rounded">{selectedRow?.servicesAvailed || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">DATE</label>
              <p className="p-2 border rounded">{selectedRow?.date ? new Date(selectedRow.date).toLocaleDateString() : '-'}</p>
            </div>
          </div>

          {/* Personal Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-2">FIRST NAME</label>
              <p className="p-2 border rounded">{selectedRow?.firstName || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">MIDDLE NAME</label>
              <p className="p-2 border rounded">{selectedRow?.middleName || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">LAST NAME</label>
              <p className="p-2 border rounded">{selectedRow?.lastName || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">SEX</label>
              <p className="p-2 border rounded capitalize">{selectedRow?.sex || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">STATUS</label>
              <p className="p-2 border rounded">{selectedRow?.status || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">DATE OF BIRTH</label>
              <p className="p-2 border rounded">{selectedRow?.dateOfBirth ? new Date(selectedRow.dateOfBirth).toLocaleDateString() : '-'}</p>
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block mb-2">AGE</label>
              <p className="p-2 border rounded">{selectedRow?.age || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">BLOOD TYPE</label>
              <p className="p-2 border rounded">{selectedRow?.bloodType || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">BLOOD PRESSURE</label>
              <p className="p-2 border rounded">{selectedRow?.bloodPressure || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">HEIGHT (cm)</label>
              <p className="p-2 border rounded">{selectedRow?.height || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">WEIGHT (kg)</label>
              <p className="p-2 border rounded">{selectedRow?.weight || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">RELATIONSHIP</label>
              <p className="p-2 border rounded">{selectedRow?.relationship || '-'}</p>
            </div>
          </div>

          {/* Prescription */}
          <div className="mb-6">
            <label className="block mb-2">PRESCRIPTION</label>
            <p className="p-2 border rounded min-h-[8rem] whitespace-pre-wrap">{selectedRow?.prescription || '-'}</p>
          </div>

          {/* Signatures */}
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

        <div className="flex justify-center space-x-4 py-4">
          <button 
            onClick={handleBackClick}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtherServicesHistoryDetails; 