import React from 'react';
import { Calendar } from "lucide-react";
import ImmunizationHistoryDetails from './ImmunizationHistoryDetails';
import FamilyPlanningHistoryDetails from './FamilyPlanningHistoryDetails';
import OtherServicesHistoryDetails from './OtherServicesHistoryDetails';

const PatientHistoryDetails = ({ selectedRow, handleBackClick, patientDataSelected }) => {
  if (selectedRow?.type === "IMMUNIZATION") {
    return <ImmunizationHistoryDetails selectedRow={selectedRow} handleBackClick={handleBackClick} patientDataSelected={patientDataSelected} />;
  }

  if (selectedRow?.type === "FAMILY PLANNING") {
    return <FamilyPlanningHistoryDetails selectedRow={selectedRow} handleBackClick={handleBackClick} patientDataSelected={patientDataSelected} />;
  }

  if (selectedRow?.type === "OTHER SERVICES") {
    return <OtherServicesHistoryDetails selectedRow={selectedRow} handleBackClick={handleBackClick} patientDataSelected={patientDataSelected} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 z-50">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-[#FFB800] text-center py-4 rounded-t-lg">
          <h1 className="text-2xl font-bold text-white">
            MATERNAL CLIENT RECORD FOR PRENATAL CARE
          </h1>
        </div>

        {/* Patient Information */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="block mb-2">PATIENT ID NO.</label>
              <p className="p-2 border rounded">{selectedRow?.patientIdNo || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">LASTNAME</label>
              <p className="p-2 border rounded">{selectedRow?.lastname || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">FIRSTNAME</label>
              <p className="p-2 border rounded">{selectedRow?.firstname || '-'}</p>
            </div>
            <div>
              <label className="block mb-2">MIDDLE INITIAL</label>
              <p className="p-2 border rounded">{selectedRow?.middleInitial || '-'}</p>
            </div>
          </div>
        </div>

        {/* Prenatal Periods */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Prenatal Periods</h2>
          <div className="space-y-6">
            {[
              { trimester: 'First Trimester', date: selectedRow?.dateOne, week: selectedRow?.weekOne, condition: selectedRow?.coditionOne },
              { trimester: 'Second Trimester', date: selectedRow?.dateTwo, week: selectedRow?.weekTwo, condition: selectedRow?.coditionTwo },
              { trimester: 'Third Trimester', date: selectedRow?.dateThree, week: selectedRow?.weekThree, condition: selectedRow?.coditionThree }
            ].map((period, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                <div>
                  <label className="block mb-2">PRENATAL PERIOD</label>
                  <p className="p-2 border rounded">{period.trimester}</p>
                </div>
                <div>
                  <label className="block mb-2">DATE</label>
                  <p className="p-2 border rounded">{period.date ? new Date(period.date).toLocaleDateString() : '-'}</p>
                </div>
                <div>
                  <label className="block mb-2">WEEKS</label>
                  <p className="p-2 border rounded">{period.week || '-'}</p>
                </div>
                <div>
                  <label className="block mb-2">PATIENT'S CONDITION</label>
                  <p className="p-2 border rounded">{period.condition || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Hospital and Expected Delivery */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Discomforts During Pregnancy</h2>
          <div className="w-full">
            <div className="grid grid-cols-4 gap-4 mb-4">
              <div className="col-span-1"></div>
              {Object.keys(selectedRow?.symptoms || {}).map((period) => (
                <div key={period} className="text-center font-medium">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Review of System */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">REVIEW OF SYSTEM</h2>
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
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">FAMILY HISTORY</h2>
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
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">PAST HISTORY</h2>
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
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
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="bg-[#FFB800] text-white p-3 w-1/6">DATE</th>
                  <th className="bg-[#FFB800] text-white p-3 w-2/6">COMPLAINTS/COMPLICATIONS</th>
                  <th className="bg-[#FFB800] text-white p-3 w-1/6">MCN SERVICES GIVEN</th>
                  <th className="bg-[#FFB800] text-white p-3 w-1/6">NAME OF PROVIDER AND SIGNATURE</th>
                  <th className="bg-[#FFB800] text-white p-3 w-1/6">NEXT FOLLOW UP</th>
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

        {/* Action Buttons */}
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

export default PatientHistoryDetails; 