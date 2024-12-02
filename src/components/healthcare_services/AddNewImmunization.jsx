import React, { useState } from 'react';

const AddNewImmunization = ({ setHealthCare, setIsImmunization, setIsHealthcareActive }) => {
  const [childInfo, setChildInfo] = useState({
    patientIdNo: '',
    lastName: '',
    firstName: '',
    middleName: '',
    sex: '',
    birthDate: '',
    age: '',
    birthPlace: '',
    birthWeight: '',
    birthLength: '',
    motherName: '',
    contact: '',
    address: '',
    purok: '',
    healthCareAssistance: ''
  });

  const [vaccineHistory, setVaccineHistory] = useState([{
    date: '',
    vaccineType: '',
    doses: '',
    weight: '',
    length: ''
  }]);

  const [micronutrientHistory, setMicronutrientHistory] = useState([{
    date: '',
    micronutrientType: '',
    doses: '',
    remarks: ''
  }]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add submission logic here
    
    setHealthCare('default');
    setIsImmunization(false);
    setIsHealthcareActive(false)
  };

  const handleCancel = () => {
    setHealthCare('default');
    setIsImmunization(false);
    setIsHealthcareActive(false)
  };

  const addVaccineRecord = () => {
    setVaccineHistory([...vaccineHistory, {
      date: '',
      vaccineType: '',
      doses: '',
      weight: '',
      length: ''
    }]);
  };

  const addMicronutrientRecord = () => {
    setMicronutrientHistory([...micronutrientHistory, {
      date: '',
      micronutrientType: '',
      doses: '',
      remarks: ''
    }]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="bg-white p-6 rounded-lg shadow-lg mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Immunization Record</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Child Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Child Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Patient ID No.</label>
                <input
                  type="text"
                  value={childInfo.patientIdNo}
                  onChange={(e) => setChildInfo({...childInfo, patientIdNo: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Last Name</label>
                <input
                  type="text"
                  value={childInfo.lastName}
                  onChange={(e) => setChildInfo({...childInfo, lastName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">First Name</label>
                <input
                  type="text"
                  value={childInfo.firstName}
                  onChange={(e) => setChildInfo({...childInfo, firstName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Middle Name</label>
                <input
                  type="text"
                  value={childInfo.middleName}
                  onChange={(e) => setChildInfo({...childInfo, middleName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Sex</label>
                <select 
                  value={childInfo.sex}
                  onChange={(e) => setChildInfo({...childInfo, sex: e.target.value})}
                  className="border p-2 rounded"
                >
                  <option value="">Select Sex</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Date</label>
                <input
                  type="date"
                  value={childInfo.birthDate}
                  onChange={(e) => setChildInfo({...childInfo, birthDate: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Age</label>
                <input
                  type="text"
                  value={childInfo.age}
                  onChange={(e) => setChildInfo({...childInfo, age: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Place</label>
                <input
                  type="text"
                  value={childInfo.birthPlace}
                  onChange={(e) => setChildInfo({...childInfo, birthPlace: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  value={childInfo.birthWeight}
                  onChange={(e) => setChildInfo({...childInfo, birthWeight: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Length (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={childInfo.birthLength}
                  onChange={(e) => setChildInfo({...childInfo, birthLength: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Mother's Name</label>
                <input
                  type="text"
                  value={childInfo.motherName}
                  onChange={(e) => setChildInfo({...childInfo, motherName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Contact Number</label>
                <input
                  type="text"
                  value={childInfo.contact}
                  onChange={(e) => setChildInfo({...childInfo, contact: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  value={childInfo.address}
                  onChange={(e) => setChildInfo({...childInfo, address: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Purok</label>
                <input
                  type="text"
                  value={childInfo.purok}
                  onChange={(e) => setChildInfo({...childInfo, purok: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Healthcare Assistance</label>
                <div className="flex flex-row gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="4ps"
                      value="4ps"
                      checked={childInfo.healthCareAssistance === "4ps"}
                      onChange={(e) => setChildInfo({...childInfo, healthCareAssistance: e.target.value})}
                      className="border p-2 rounded"
                    />
                    <label htmlFor="4ps">4Ps</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio" 
                      id="indigent"
                      value="indigent"
                      checked={childInfo.healthCareAssistance === "indigent"}
                      onChange={(e) => setChildInfo({...childInfo, healthCareAssistance: e.target.value})}
                      className="border p-2 rounded"
                    />
                    <label htmlFor="indigent">Indigent</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="private"
                      value="private" 
                      checked={childInfo.healthCareAssistance === "private"}
                      onChange={(e) => setChildInfo({...childInfo, healthCareAssistance: e.target.value})}
                      className="border p-2 rounded"
                    />
                    <label htmlFor="private">Private</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vaccination History */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Vaccination History</h3>
            {vaccineHistory.map((vaccine, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium">Date</label>
                  <input
                    type="date"
                    value={vaccine.date}
                    onChange={(e) => {
                      const newHistory = [...vaccineHistory];
                      newHistory[index].date = e.target.value;
                      setVaccineHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Type of Vaccine</label>
                  <input
                    type="text"
                    value={vaccine.vaccineType}
                    onChange={(e) => {
                      const newHistory = [...vaccineHistory];
                      newHistory[index].vaccineType = e.target.value;
                      setVaccineHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Doses</label>
                  <input
                    type="text"
                    value={vaccine.doses}
                    onChange={(e) => {
                      const newHistory = [...vaccineHistory];
                      newHistory[index].doses = e.target.value;
                      setVaccineHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Weight (kg)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vaccine.weight}
                    onChange={(e) => {
                      const newHistory = [...vaccineHistory];
                      newHistory[index].weight = e.target.value;
                      setVaccineHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Length/Height (cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={vaccine.length}
                    onChange={(e) => {
                      const newHistory = [...vaccineHistory];
                      newHistory[index].length = e.target.value;
                      setVaccineHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addVaccineRecord}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Add Vaccine Record
            </button>
          </div>

          {/* Micronutrient History */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Micronutrient Supplement History</h3>
            {micronutrientHistory.map((supplement, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium">Date</label>
                  <input
                    type="date"
                    value={supplement.date}
                    onChange={(e) => {
                      const newHistory = [...micronutrientHistory];
                      newHistory[index].date = e.target.value;
                      setMicronutrientHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Type of Micronutrient</label>
                  <input
                    type="text"
                    value={supplement.micronutrientType}
                    onChange={(e) => {
                      const newHistory = [...micronutrientHistory];
                      newHistory[index].micronutrientType = e.target.value;
                      setMicronutrientHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Doses</label>
                  <input
                    type="text"
                    value={supplement.doses}
                    onChange={(e) => {
                      const newHistory = [...micronutrientHistory];
                      newHistory[index].doses = e.target.value;
                      setMicronutrientHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="font-medium">Remarks</label>
                  <input
                    type="text"
                    value={supplement.remarks}
                    onChange={(e) => {
                      const newHistory = [...micronutrientHistory];
                      newHistory[index].remarks = e.target.value;
                      setMicronutrientHistory(newHistory);
                    }}
                    className="border p-2 rounded"
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={addMicronutrientRecord}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Add Micronutrient Record
            </button>
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