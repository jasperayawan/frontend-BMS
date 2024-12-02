import { Calendar } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { usePrenatal } from "../../hooks/usePrenatal";

const AddNewPrenatal = ({ patientDataSelected, setHealthCare, setIsPrenatal, setIsHealthcareActive }) => {
  const { createNewPrenatal, isLoading } = usePrenatal();

  const [formData, setFormData] = useState({
    userId: patientDataSelected?.objectId,
    // Prenatal Periods
    trimesterOne: "",
    dateOne: "",
    weekOne: "",
    coditionOne: "",
    trimesterTwo: "",
    dateTwo: "",
    weekTwo: "",
    coditionTwo: "",
    trimesterThree: "",
    dateThree: "",
    weekThree: "",
    coditionThree: "",
    // Hospital Info
    hospital: "",
    expectedDateToDeliver: "",
    // Questions
    questionOne: "", // father's feeling
    questionTwo: "", // family feeling
    // Symptoms
    edema: false,
    constipation: false,
    nauseaOrVomiting: false,
    legCramps: false,
    hemmorhoids: false,
    heartBurn: false,
    // Review of System
    heent: false,
    chestOrHeart: false,
    abdomen: false,
    genital: false,
    extremities: false,
    skin: false,
    // Family History
    cva: false,
    hypertension: false,
    asthma: false,
    heartDisease: false,
    diabites: false,
    skinTwo: false,
    // Past History
    allergies: false,
    drugIntake: false,
    bleedingTendencies: false,
    anemia: false,
    diabitesTwo: false,
    soresInOrAroundVagina: false,
    // Vital Signs
    bloodPressure: "",
    weight: "",
    height: "",
    bodyMaxIndex: "",
    pulseRate: "",
    // Maternal Records
    maternalRecords: [
      {
        date: "",
        complaints: "",
        mcnServicesGiven: "",
        providerName: "",
        followUp: ""
      },
      {
        date: "",
        complaints: "",
        mcnServicesGiven: "",
        providerName: "",
        followUp: ""
      },
      {
        date: "",
        complaints: "",
        mcnServicesGiven: "",
        providerName: "",
        followUp: ""
      }
    ]
  });

  // Define vitalSigns object
  const vitalSigns = {
    bloodPressure: formData.bloodPressure,
    weight: formData.weight,
    height: formData.height,
    bodyMaxIndex: formData.bodyMaxIndex,
    pulseRate: formData.pulseRate,
  };

  const symptoms = [
    "Edema",
    "Constipation",
    "Nausea/Vomiting",
    "Leg Cramps",
    "Hemorrhoids",
    "Heartburn"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createNewPrenatal(formData);
      toast.success("Prenatal record created successfully");
      handleCancel();
    } catch (error) {
      toast.error("Error creating prenatal record");
    }
  };

  const handleCancel = () => {
    setHealthCare('default');
    setIsPrenatal(false)
    setIsHealthcareActive(false)
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6"></div>
      <form onSubmit={handleSubmit} className="w-full">
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
              <input type="text" value={patientDataSelected.patientIdNo} readOnly className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">LASTNAME</label>
              <input type="text" value={patientDataSelected.lastname} readOnly className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">FIRSTNAME</label>
              <input type="text" value={patientDataSelected.firstname} readOnly className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">MIDDLE INITIAL</label>
              <input type="text" value={patientDataSelected.middleInitial} readOnly className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Prenatal Periods */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Prenatal Periods</h2>
      <div className="space-y-6">
        {[
          { trimester: 'trimesterOne', date: 'dateOne', week: 'weekOne', condition: 'coditionOne' },
          { trimester: 'trimesterTwo', date: 'dateTwo', week: 'weekTwo', condition: 'coditionTwo' },
          { trimester: 'trimesterThree', date: 'dateThree', week: 'weekThree', condition: 'coditionThree' }
        ].map((period, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block mb-2">PRENATAL PERIOD</label>
              <select 
                value={formData[period.trimester]}
                onChange={(e) => setFormData({...formData, [period.trimester]: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select period</option>
                <option value="first">First Trimester</option>
                <option value="second">Second Trimester</option>
                <option value="third">Third Trimester</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2">DATE</label>
              <div className="flex items-center">
                <input 
                  type="date"
                  value={formData[period.date]}
                  onChange={(e) => setFormData({...formData, [period.date]: e.target.value})}
                  className="w-full p-2 border rounded" 
                />
              </div>
            </div>

            <div>
              <label className="block mb-2">WEEKS</label>
              <input 
                type="text"
                value={formData[period.week]}
                onChange={(e) => setFormData({...formData, [period.week]: e.target.value})}
                className="w-full p-2 border rounded"
                placeholder="Enter weeks" 
              />
            </div>

            <div>
              <label className="block mb-2">PATIENT'S CONDITION</label>
              <select 
                value={formData[period.condition]}
                onChange={(e) => setFormData({...formData, [period.condition]: e.target.value})}
                className="w-full p-2 border rounded"
              >
                <option value="">Select condition</option>
                <option value="normal">Normal</option>
                <option value="high-risk">High Risk</option>
                <option value="critical">Critical</option>
              </select>
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
              <input 
                type="text"
                value={formData.hospital}
                onChange={(e) => setFormData({...formData, hospital: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block mb-2">EXPECTED DATE OF DELIVERY</label>
              <input 
                type="date"
                value={formData.expectedDateToDeliver}
                onChange={(e) => setFormData({...formData, expectedDateToDeliver: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Feelings Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex space-x-4 w-full">
            <div className="w-full">
              <label className="block mb-2">HOW DOES THE FATHER OF THE BABY FEEL ABOUT THE PREGNANCY?</label>
              <input 
                type="text"
                value={formData.questionOne}
                onChange={(e) => setFormData({...formData, questionOne: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2">YOUR FAMILY?</label>
              <input 
                type="text"
                value={formData.questionTwo}
                onChange={(e) => setFormData({...formData, questionTwo: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        {/* Symptoms Checklist */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Discomforts During Pregnancy</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {["0-13 wks", "14-27 wks", "28-40 wks"].map((period) => (
              <div key={period}>
                <h3 className="font-medium mb-2">{period}</h3>
                <div className="space-y-2">
                  {symptoms.map((symptom) => {
                    const formKey = `${period.replace(/[^a-z0-9]/gi, '')}_${symptom.toLowerCase().replace(/[^a-z]/g, '')}`;
                    return (
                      <div key={symptom} className="flex items-center space-x-2">
                        <input 
                          type="checkbox"
                          checked={formData[formKey] || false}
                          onChange={(e) => setFormData({...formData, [formKey]: e.target.checked})}
                          className="w-4 h-4"
                        />
                        <label className="text-sm">
                          {symptom}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Review of System */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">REVIEW OF SYSTEM</h2>
            <div className="space-y-3">
              {[
                "HEENT",
                "CHEST/HEART",
                "ABDOMEN",
                "GENITAL",
                "EXTREMITIES",
                "SKIN"
              ].map((item) => {
                const formKey = item.toLowerCase().replace(/[^a-z]/g, '');
                return (
                  <div key={item} className="flex items-center justify-between">
                    <span>{item}</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio"
                          name={item}
                          value="yes"
                          checked={formData[formKey] === true}
                          onChange={() => setFormData({...formData, [formKey]: true})}
                        />
                        <span>YES</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio"
                          name={item}
                          value="no"
                          checked={formData[formKey] === false}
                          onChange={() => setFormData({...formData, [formKey]: false})}
                        />
                        <span>NO</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Family History */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">FAMILY HISTORY</h2>
            <div className="space-y-3">
              {[
                "CVA",
                "HYPERTENSION",
                "ASTHMA",
                "HEART DISEASE",
                "DIABITES",
                "SKIN"
              ].map((item) => {
                const formKey = item.toLowerCase().replace(/[^a-z]/g, '');
                return (
                  <div key={item} className="flex items-center justify-between">
                    <span>{item}</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name={`family_${item}`} 
                          value="yes" 
                          checked={formData[formKey] === true}
                          onChange={() => setFormData({...formData, [formKey]: true})}
                        />
                        <span>YES</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name={`family_${item}`} 
                          value="no" 
                          checked={formData[formKey] === false}
                          onChange={() => setFormData({...formData, [formKey]: false})}
                        />
                        <span>NO</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Past History */}
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">PAST HISTORY</h2>
            <div className="space-y-3">
              {[
                "ALLERGIES",
                "DRUG INTAKE",
                "BLEEDING TENDENCIES",
                "ANEMIA",
                "DIABETES",
                "SORES IN OR AROUND VAGINA"
              ].map((item) => {
                const formKey = item.toLowerCase().replace(/[^a-z]/g, '');
                return (
                  <div key={item} className="flex items-center justify-between">
                    <span>{item}</span>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name={`past_${item}`} 
                          value="yes"
                          checked={formData[formKey] === true}
                          onChange={() => setFormData({...formData, [formKey]: true})}
                        />
                        <span>YES</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input 
                          type="radio" 
                          name={`past_${item}`} 
                          value="no"
                          checked={formData[formKey] === false}
                          onChange={() => setFormData({...formData, [formKey]: false})}
                        />
                        <span>NO</span>
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Physical Examination */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Physical Examination</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(vitalSigns).map(([key, value]) => (
              <div key={key}>
                <label className="block mb-2">{key.toUpperCase()}</label>
                <input 
                  type="text" 
                  value={value}
                  onChange={(e) => setFormData({...formData, [key]: e.target.value})}
                  className="w-full p-2 border rounded" 
                />
              </div>
            ))}
          </div>
        </div>

        {/** Prenatal records table */}

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
            {formData.maternalRecords.map((record, index) => (
              <tr key={index} className="border-[1px] border-zinc-700">
                <td className="border-[1px] border-zinc-700">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="date" 
                      value={record.date}
                      onChange={(e) => {
                        const newRecords = [...formData.maternalRecords];
                        newRecords[index].date = e.target.value;
                        setFormData({...formData, maternalRecords: newRecords});
                      }}
                      className="w-full p-2 rounded outline-none" 
                    />
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                </td>
                <td className="border-[1px] border-zinc-700">
                  <textarea 
                    value={record.complaints}
                    onChange={(e) => {
                      const newRecords = [...formData.maternalRecords];
                      newRecords[index].complaints = e.target.value;
                      setFormData({...formData, maternalRecords: newRecords});
                    }}
                    className="w-full p-2 rounded resize-none outline-none" 
                    rows={3}
                    placeholder="Enter complaints/complications"
                  />
                </td>
                <td className="border-[1px] border-zinc-700">
                  <textarea 
                    value={record.mcnServicesGiven}
                    onChange={(e) => {
                      const newRecords = [...formData.maternalRecords];
                      newRecords[index].mcnServicesGiven = e.target.value;
                      setFormData({...formData, maternalRecords: newRecords});
                    }}
                    className="w-full p-2 rounded resize-none outline-none" 
                    rows={3}
                    placeholder="Enter MCN services"
                  />
                </td>
                <td className="p-3">
                  <textarea 
                    value={record.providerName}
                    onChange={(e) => {
                      const newRecords = [...formData.maternalRecords];
                      newRecords[index].providerName = e.target.value;
                      setFormData({...formData, maternalRecords: newRecords});
                    }}
                    className="w-full p-2 rounded resize-none outline-none" 
                    rows={3}
                    placeholder="Enter provider name and signature"
                  />
                </td>
                <td className="border-[1px] border-zinc-700">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="date"
                      value={record.followUp}
                      onChange={(e) => {
                        const newRecords = [...formData.maternalRecords];
                        newRecords[index].followUp = e.target.value;
                        setFormData({...formData, maternalRecords: newRecords});
                      }}
                      className="w-full p-2 rounded outline-none" 
                    />
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
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
            type="submit"
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-green-700"
          >
            {isLoading ? 'Loading...' : 'SAVE'}
          </button>
          <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewPrenatal;