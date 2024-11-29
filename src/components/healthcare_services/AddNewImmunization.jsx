import React, { useState } from 'react';

const AddNewImmunization = ({ setHealthCare, setIsImmunization, setIsHealthcareActive }) => {
  const [immunizationData, setImmunizationData] = useState({
    childId: '',
    vaccineName: '',
    dateGiven: '',
    nextSchedule: '',
    remarks: '',
    weight: '',
    length: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your submission logic here
    
    // Reset and close form
    setHealthCare('default');
    setIsImmunization(false);
    setIsHealthcareActive(false)
  };

  const handleCancel = () => {
    setHealthCare('default');
    setIsImmunization(false);
    setIsHealthcareActive(false)
  };

  return (
    <div className="fixed inset-0 w-full bg-black/20 h-screen flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-4">New Immunization Record</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="font-medium">Child ID</label>
            <input
              type="text"
              value={immunizationData.childId}
              onChange={(e) => setImmunizationData({...immunizationData, childId: e.target.value})}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Vaccine Name</label>
            <input
              type="text"
              value={immunizationData.vaccineName}
              onChange={(e) => setImmunizationData({...immunizationData, vaccineName: e.target.value})}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Date Given</label>
            <input
              type="date"
              value={immunizationData.dateGiven}
              onChange={(e) => setImmunizationData({...immunizationData, dateGiven: e.target.value})}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Next Schedule</label>
            <input
              type="date"
              value={immunizationData.nextSchedule}
              onChange={(e) => setImmunizationData({...immunizationData, nextSchedule: e.target.value})}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              value={immunizationData.weight}
              onChange={(e) => setImmunizationData({...immunizationData, weight: e.target.value})}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Length/Height (cm)</label>
            <input
              type="number"
              step="0.1"
              value={immunizationData.length}
              onChange={(e) => setImmunizationData({...immunizationData, length: e.target.value})}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label className="font-medium">Remarks</label>
            <textarea
              value={immunizationData.remarks}
              onChange={(e) => setImmunizationData({...immunizationData, remarks: e.target.value})}
              className="border p-2 rounded"
              rows="3"
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewImmunization; 