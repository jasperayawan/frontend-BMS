import { Calendar } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";

const AddNewPrenatal = ({ setHealthCare, setIsPrenatal }) => {
  const [formData, setFormData] = useState({
    patientId: "BSE-2023-006",
    lastName: "LOCKHEART",
    firstName: "CANDICE",
    middleInitial: "WAYE",
    birthDate: "SEPTEMBER 17 1998",
    age: "24",
    hospital: "",
    expectedDelivery: "",
    fatherFeeling: "",
    familyFeeling: "",
  });

  const symptoms = [
    "EDEMA (SWELLING OF HANDS AND FEET)",
    "DIARRHEA",
    "CONSTIPATION",
    "NAUSEA/VOMITING",
    "LEG CRAMPS",
    "HEMMORRHOIDS",
    "HEARTBURN",
  ];

  const vitalSigns = {
    bloodPressure: "120",
    weight: "76",
    height: "5'1",
    bmi: "50",
    pulseRate: "35",
  };

  const handleSave = () => {
    toast.success("Record saved successfully!");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
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
              <input type="text" value={formData.patientId} readOnly className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">LASTNAME</label>
              <input type="text" value={formData.lastName} readOnly className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">FIRSTNAME</label>
              <input type="text" value={formData.firstName} readOnly className="w-full p-2 border rounded" />
            </div>
            <div>
              <label className="block mb-2">MIDDLE INITIAL</label>
              <input type="text" value={formData.middleInitial} readOnly className="w-full p-2 border rounded" />
            </div>
          </div>
        </div>

        {/* Prenatal Periods */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Prenatal Periods</h2>
      <div className="space-y-6">
        {[1, 2, 3].map((period) => (
          <div key={period} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div>
              <label className="block mb-2">PRENATAL PERIOD</label>
              <select className="w-full p-2 border rounded">
                <option value="">Select period</option>
                <option value="first">First Trimester</option>
                <option value="second">Second Trimester</option>
                <option value="third">Third Trimester</option>
              </select>
            </div>
            
            <div>
              <label className="block mb-2">DATE</label>
              <div className="flex items-center">
                <input type="date" className="w-full p-2 border rounded" />
              </div>
            </div>

            <div>
              <label className="block mb-2">WEEKS</label>
              <input type="text" className="w-full p-2 border rounded" placeholder="Enter weeks" />
            </div>

            <div>
              <label className="block mb-2">PATIENT'S CONDITION</label>
              <select className="w-full p-2 border rounded">
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
                value={formData.expectedDelivery}
                onChange={(e) => setFormData({...formData, expectedDelivery: e.target.value})}
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
                value={formData.fatherFeeling}
                onChange={(e) => setFormData({...formData, fatherFeeling: e.target.value})}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="w-full">
              <label className="block mb-2">YOUR FAMILY?</label>
              <input 
                type="text"
                value={formData.familyFeeling}
                onChange={(e) => setFormData({...formData, familyFeeling: e.target.value})}
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
                  {symptoms.map((symptom) => (
                    <div key={symptom} className="flex items-center space-x-2">
                      <input type="checkbox" id={`${symptom}-${period}`} className="w-4 h-4" />
                      <label htmlFor={`${symptom}-${period}`} className="text-sm">
                        {symptom}
                      </label>
                    </div>
                  ))}
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
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name={item} value="yes" />
                      <span>YES</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name={item} value="no" defaultChecked />
                      <span>NO</span>
                    </label>
                  </div>
                </div>
              ))}
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
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name={`family_${item}`} value="yes" />
                      <span>YES</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name={`family_${item}`} value="no" defaultChecked />
                      <span>NO</span>
                    </label>
                  </div>
                </div>
              ))}
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
              ].map((item) => (
                <div key={item} className="flex items-center justify-between">
                  <span>{item}</span>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                      <input type="radio" name={`past_${item}`} value="yes" />
                      <span>YES</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input type="radio" name={`past_${item}`} value="no" defaultChecked />
                      <span>NO</span>
                    </label>
                  </div>
                </div>
              ))}
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
                <input type="text" value={value} readOnly className="w-full p-2 border rounded" />
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
            {[1, 2, 3].map((row) => (
              <tr key={row} className="border-[1px] border-zinc-700">
                <td className="border-[1px] border-zinc-700">
                  <div className="flex items-center space-x-2">
                    <input type="date" className="w-full p-2 rounded outline-none" />
                    <Calendar className="w-5 h-5 text-gray-500" />
                  </div>
                </td>
                <td className="border-[1px] border-zinc-700">
                  <textarea 
                    className="w-full p-2 rounded resize-none outline-none" 
                    rows={3}
                    placeholder="Enter complaints/complications"
                  />
                </td>
                <td className="border-[1px] border-zinc-700">
                  <textarea 
                    className="w-full p-2 rounded resize-none outline-none" 
                    rows={3}
                    placeholder="Enter MCN services"
                  />
                </td>
                <td className="p-3">
                  <textarea 
                    className="w-full p-2 rounded resize-none outline-none" 
                    rows={3}
                    placeholder="Enter provider name and signature"
                  />
                </td>
                <td className="border-[1px] border-zinc-700">
                  <div className="flex items-center space-x-2">
                    <input type="date" className="w-full p-2 rounded outline-none" />
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
            onClick={handleSave}
            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-green-700"
          >
            SAVE
          </button>
          <button  
            onClick={() => {
                setHealthCare(" ")
                setIsPrenatal(false)
            }}
            className="px-4 py-2 border-2 rounded"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddNewPrenatal;