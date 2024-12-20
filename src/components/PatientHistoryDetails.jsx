import React from 'react';
import { Calendar } from "lucide-react";
import ImmunizationHistoryDetails from './ImmunizationHistoryDetails';
import FamilyPlanningHistoryDetails from './FamilyPlanningHistoryDetails';
import OtherServicesHistoryDetails from './OtherServicesHistoryDetails';

const PatientHistoryDetails = ({ selectedRow, handleBackClick, patientDataSelected, componentRef, handlePrint }) => {
  if (selectedRow?.type === "IMMUNIZATION") {
    return <ImmunizationHistoryDetails selectedRow={selectedRow} componentRef={componentRef} handlePrint={handlePrint} handleBackClick={handleBackClick} patientDataSelected={patientDataSelected} />;
  }

  if (selectedRow?.type === "FAMILY PLANNING") {
    return <FamilyPlanningHistoryDetails selectedRow={selectedRow} componentRef={componentRef} handlePrint={handlePrint} handleBackClick={handleBackClick} patientDataSelected={patientDataSelected} />;
  }

  if (selectedRow?.type === "OTHER SERVICES") {
    return <OtherServicesHistoryDetails selectedRow={selectedRow} componentRef={componentRef} handlePrint={handlePrint} handleBackClick={handleBackClick} patientDataSelected={patientDataSelected} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#FFB800] to-[#FFA000] text-center py-6">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-wide">
            Maternal Client Record
          </h1>
          <p className="text-white/90 mt-1">Prenatal Care Documentation</p>
        </div>

        <div ref={componentRef} className="flex flex-col gap-y-4 w-full">
          {/* Patient Information */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Patient Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">PATIENT ID NO.</label>
                <p className="p-2 border">{patientDataSelected?.patientIdNo || '-'}</p>
              </div>
              <div>
                <label className="block mb-2">LASTNAME</label>
                <p className="p-2 border rounded">{patientDataSelected?.lastname || '-'}</p>
              </div>
              <div>
                <label className="block mb-2">FIRSTNAME</label>
                <p className="p-2 border rounded">{patientDataSelected?.firstname || '-'}</p>
              </div>
              <div>
                <label className="block mb-2">MIDDLE INITIAL</label>
                <p className="p-2 border rounded">{patientDataSelected?.middleInitial || '-'}</p>
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
                { trimester: 'First Trimester', color: 'bg-blue-50' },
                { trimester: 'Second Trimester', color: 'bg-green-50' },
                { trimester: 'Third Trimester', color: 'bg-purple-50' }
              ].map((period, index) => (
                <div key={index} className={`${period.color} p-4`}>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <label className="block mb-2">PRENATAL PERIOD</label>
                      <p className="p-2 border rounded">{period.trimester}</p>
                    </div>
                    <div>
                      <label className="block mb-2">DATE</label>
                      <p className="p-2 border rounded">{selectedRow?.dateOne ? new Date(selectedRow.dateOne).toLocaleDateString() : '-'}</p>
                    </div>
                    <div>
                      <label className="block mb-2">WEEKS</label>
                      <p className="p-2 border rounded">{selectedRow?.weekOne || '-'}</p>
                    </div>
                    <div>
                      <label className="block mb-2">PATIENT'S CONDITION</label>
                      <p className="p-2 border rounded">{selectedRow?.coditionOne || '-'}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hospital and Expected Delivery */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">HOSPITAL</label>
                <p className="p-2 border rounded">{selectedRow?.hospital || '-'}</p>
              </div>
              <div>
                <label className="block mb-2">EXPECTED DATE OF DELIVERY</label>
                <p className="p-2 border rounded">
                  {selectedRow?.expectedDateToDeliver ? new Date(selectedRow.expectedDateToDeliver).toLocaleDateString() : '-'}
                </p>
              </div>
            </div>
          </div>

          {/* Feelings Section */}
          <div className="p-6">
            <div className="flex space-x-4 w-full">
              <div className="w-full">
                <label className="block mb-2">HOW DOES THE FATHER OF THE BABY FEEL ABOUT THE PREGNANCY?</label>
                <p className="p-2 border rounded">{selectedRow?.questionOne || '-'}</p>
              </div>
              <div className="w-full">
                <label className="block mb-2">YOUR FAMILY?</label>
                <p className="p-2 border rounded">{selectedRow?.questionTwo || '-'}</p>
              </div>
            </div>
          </div>

          {/* Symptoms Checklist */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Discomforts During Pregnancy
            </h2>
            <div className="w-full">
              <div className="grid grid-cols-4 gap-4 mb-4">
                <div className="col-span-1"></div>
                {Object.keys(selectedRow?.symptoms || {}).map((period) => (
                  <div key={period} className="text-center font-medium px-4 py-2 bg-gray-50 rounded-lg">
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
                "Heartburn"
              ].map((symptom) => (
                <div key={symptom} className="grid grid-cols-4 gap-4 mb-3">
                  <div className="col-span-1">{symptom}</div>
                  {Object.keys(selectedRow?.symptoms || {}).map((period) => {
                    const symptomKey = symptom.toLowerCase().replace(/[^a-z]/g, '');
                    return (
                      <div key={`${symptom}_${period}`} className="flex justify-center">
                        <input 
                          type="checkbox"
                          checked={selectedRow?.symptoms?.[period]?.[symptomKey] || false}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
            {/* Review of System */}
            <div className="border p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-700 border-b pb-2">
                Review of System
              </h2>
              <div className="space-y-3">
                {selectedRow?.reviewOfSystem?.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span>{item.value ? "YES" : "NO"}</span>
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
                  <div key={item.name} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span>{item.value ? "YES" : "NO"}</span>
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
                  <div key={item.name} className="flex items-center justify-between">
                    <span>{item.name}</span>
                    <span>{item.value ? "YES" : "NO"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Physical Examination */}
          <div className="p-6">
            <h2 className="text-lg font-semibold mb-4">Physical Examination</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { key: 'bloodPressure', label: 'BLOOD PRESSURE' },
                { key: 'weight', label: 'WEIGHT' },
                { key: 'height', label: 'HEIGHT' },
                { key: 'bodyMaxIndex', label: 'BODY MAX INDEX' },
                { key: 'pulseRate', label: 'PULSE RATE' }
              ].map(({ key, label }) => (
                <div key={key}>
                  <label className="block mb-2">{label}</label>
                  <p className="p-2 border rounded">{selectedRow?.[key] || '-'}</p>
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
                    <th className="bg-[#FFB800] text-white p-3">DATE</th>
                    <th className="bg-[#FFB800] text-white p-3">COMPLAINTS/COMPLICATIONS</th>
                    <th className="bg-[#FFB800] text-white p-3">MCN SERVICES GIVEN</th>
                    <th className="bg-[#FFB800] text-white p-3">NAME OF PROVIDER AND SIGNATURE</th>
                    <th className="bg-[#FFB800] text-white p-3">NEXT FOLLOW UP</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedRow?.maternalRecords?.map((record, index) => (
                    <tr key={index} className="border-[1px] border-zinc-700">
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.date ? new Date(record.date).toLocaleDateString() : '-'}
                      </td>
                      <td className="border-[1px] border-zinc-700 p-2">{record.complaints || '-'}</td>
                      <td className="border-[1px] border-zinc-700 p-2">{record.mcnServicesGiven || '-'}</td>
                      <td className="border-[1px] border-zinc-700 p-2">{record.providerName || '-'}</td>
                      <td className="border-[1px] border-zinc-700 p-2">
                        {record.followUp ? new Date(record.followUp).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 py-6">
          <button 
            onClick={handlePrint}
            className="px-6 py-2 bg-[#FFB800] text-white hover:bg-[#FFA000] transition-colors duration-200 flex items-center rounded-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Record
          </button>
          <button 
            onClick={handleBackClick}
            className="px-6 py-2 border-2 border-gray-300 hover:bg-gray-50 transition-colors duration-200 flex items-center rounded-md"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientHistoryDetails; 