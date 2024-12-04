import React, { useState, useEffect } from 'react';
import { useImmunization } from '../../hooks/useImmunization';

const EditImmunization = ({ patientDataSelected, setHealthCare, setIsImmunization, setIsHealthcareActive }) => {
  const { updateImmunization, getImmunizationByPatient, isLoading } = useImmunization();
  const [formData, setFormData] = useState({
    userId: patientDataSelected?.objectId,
    immunizationId: '',
    lastName: '',
    firstName: '',
    middleName: '',
    birthDate: '',
    age: '',
    birthPlace: '',
    birthWeight: '',
    birthLength: '',
  });

  const [vaccinationHistory, setVaccinationHistory] = useState([{
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
  
  useEffect(() => {
    const fetchImmunizationData = async () => {
      try {
        const data = await getImmunizationByPatient(patientDataSelected?.objectId);
        if (data) {
          setFormData({
            immunizationId: data.objectId,
            lastName: data.lastName,
            firstName: data.firstName,
            middleName: data.middleName,
            birthDate: data.birthDate,
            age: data.age,
            birthPlace: data.birthPlace,
            birthWeight: data.birthWeight,
            birthLength: data.birthLength,
          });
          setVaccinationHistory(data.vaccinationHistory || []);
          setMicronutrientHistory(data.micronutrientHistory || []);
        }
      } catch (error) {
        console.error('Error fetching immunization data:', error);
      }
    };

    fetchImmunizationData();
  }, [patientDataSelected?.objectId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const payload = {
        ...formData,
        userId: patientDataSelected?.objectId,
        patientIdNo: patientDataSelected?.patientIdNo,
        motherName: patientDataSelected?.firstname,
        contactNo: patientDataSelected?.contact,
        address: patientDataSelected?.birthPlace,
        purok: patientDataSelected?.purok,
        category: patientDataSelected?.healthcareAssistance,
        vaccinationHistory,
        micronutrientHistory
      };

      await updateImmunization(payload, formData?.immunizationId);
      setHealthCare('default');
      setIsImmunization(false);
      setIsHealthcareActive(false);
    } catch(error) {
      console.error(error);
    }
  };

  const handleCancel = () => {
    setHealthCare('default');
    setIsImmunization(false);
    setIsHealthcareActive(false)
  };

  const addVaccineRecord = () => {
    setVaccinationHistory([...vaccinationHistory, {
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
        <h2 className="text-2xl font-bold mb-4">Edit Immunization Record</h2>
        
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Child Information */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Child Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="flex flex-col">
                <label className="font-medium">Patient ID No.</label>
                <input
                  type="text"
                  value={patientDataSelected?.patientIdNo}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Last Name</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">First Name</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Middle Name</label>
                <input
                  type="text"
                  value={formData.middleName}
                  onChange={(e) => setFormData({...formData, middleName: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Date</label>
                <input
                  type="date"
                  value={formData.birthDate}
                  onChange={(e) => setFormData({...formData, birthDate: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Age</label>
                <input
                  type="text"
                  value={formData.age}
                  onChange={(e) => setFormData({...formData, age: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Place</label>
                <input
                  type="text"
                  value={formData.birthPlace}
                  onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Weight (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.birthWeight}
                  onChange={(e) => setFormData({...formData, birthWeight: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Birth Length (cm)</label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.birthLength}
                  onChange={(e) => setFormData({...formData, birthLength: e.target.value})}
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Mother's Name</label>
                <input
                  type="text"
                  value={patientDataSelected?.firstname}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Contact Number</label>
                <input
                  type="text"
                  value={patientDataSelected?.contact}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Address</label>
                <input
                  type="text"
                  value={patientDataSelected?.birthPlace}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Purok</label>
                <input
                  type="text"
                  value={patientDataSelected?.purok}
                  readOnly
                  className="border p-2 rounded"
                />
              </div>
              <div className="flex flex-col">
                <label className="font-medium">Category</label>
                <div className="flex flex-row gap-2 mt-1">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="4ps"
                      value="4ps"
                      checked={patientDataSelected?.healthcareAssistance === "4ps"}
                      readOnly
                      className="border p-2 rounded"
                    />
                    <label htmlFor="4ps">4Ps</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="indigent"
                      value="indigent"
                      checked={patientDataSelected?.healthcareAssistance === "indigent"}
                      readOnly
                      className="border p-2 rounded"
                    />
                    <label htmlFor="indigent">Indigent</label>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      id="private"
                      value="private"
                      checked={patientDataSelected?.healthcareAssistance === "private"}
                      readOnly
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
            {vaccinationHistory.map((vaccine, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <div className="flex flex-col">
                  <label className="font-medium">Date</label>
                  <input
                    type="date"
                    value={vaccine.date}
                    onChange={(e) => {
                      const newHistory = [...vaccinationHistory];
                      newHistory[index].date = e.target.value;
                      setVaccinationHistory(newHistory);
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
                      const newHistory = [...vaccinationHistory];
                      newHistory[index].vaccineType = e.target.value;
                      setVaccinationHistory(newHistory);
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
                      const newHistory = [...vaccinationHistory];
                      newHistory[index].doses = e.target.value;
                      setVaccinationHistory(newHistory);
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
                      const newHistory = [...vaccinationHistory];
                      newHistory[index].weight = e.target.value;
                      setVaccinationHistory(newHistory);
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
                      const newHistory = [...vaccinationHistory];
                      newHistory[index].length = e.target.value;
                      setVaccinationHistory(newHistory);
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
              {isLoading ? 'Loading...' : 'Cancel'}
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

export default EditImmunization;