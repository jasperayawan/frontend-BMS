import React, { useState } from 'react';
import axios from 'axios';
import { toBase64 } from '../../utils/toBase64';
import toast from 'react-hot-toast';

const AddNewFamilyPlanning = ({ setHealthCare, setIsFamilyPlanning, setIsHealthcareActive }) => {
  const [formData, setFormData] = useState({
    // Patient Information
    patientIdNo: '',
    lastname: '',
    firstname: '',
    middlename: '',
    sex: '',
    birthdate: '',
    age: '',
    contactNo: '',
    address: '',
    civilStatus: 'Single',
    // Spouse Information
    spouseLastname: '',
    spouseFirstname: '',
    spouseMiddlename: '',
    spouseBirthdate: '',
    spouseAge: '',
    // Other Information
    livingChildren: 0,
    nonLivingChildren: 0,
    householdMonthlyIncome: '',
    occupation: '',
    // Type of Client
    newAcceptor: false,
    currentUser: false,
    changingMethod: false,
    changingClinic: false,
    dropoutRestart: false,
    spacingReason: false,
    medicalCondition: false,
    sideEffects: false,
    limitingReason: false,
    otherReason: false,
    // Method Currently Used
    coc: false,
    pop: false,
    injectable: false,
    implant: false,
    inteval: false,
    postPartum: false,
    condom: false,
    bomCmm: false,
    bbt: false,
    stm: false,
    lam: false,
    otherMethod: false,
    // VAW Risks
    unpleasantRelationship: false,
    partnerDisapproval: false,
    domesticViolence: false,
    referredToDSWD: false,
    referredToWCPU: false,
    referredToOthers: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const base64 = await toBase64(file);
        setFormData(prev => ({
          ...prev,
          image: base64
        }));
      } catch (error) {
        toast.error('Error processing image');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Add your API endpoint here
      // await axios.post('/api/family-planning', formData);
      toast.success('Family planning record added successfully!');
      setHealthCare('default');
      setIsFamilyPlanning(false);
      setIsHealthcareActive(false);
    } catch (error) {
      toast.error('Error submitting form');
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="bg-white p-8 rounded-lg mx-auto w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-6">Family Planning Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Patient Information Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block">Patient ID No.</label>
                <input
                  type="text"
                  name="patientIdNo"
                  value={formData.patientIdNo}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">First Name</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Middle Name</label>
                <input
                  type="text"
                  name="middlename"
                  value={formData.middlename}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Sex</label>
                <select
                  name="sex"
                  value={formData.sex}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="">Select Sex</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div>
                <label className="block">Birthdate</label>
                <input
                  type="date"
                  name="birthdate"
                  value={formData.birthdate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Age</label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Contact No.</label>
                <input
                  type="tel"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Civil Status</label>
                <select
                  name="civilStatus"
                  value={formData.civilStatus}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                >
                  <option value="Single">Single</option>
                  <option value="Married">Married</option>
                  <option value="Widowed">Widowed</option>
                  <option value="Divorced">Divorced</option>
                  <option value="Separated">Separated</option>
                </select>
              </div>
              <div className="md:col-span-3">
                <label className="block">Address</label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                  rows="2"
                />
              </div>
            </div>

            {/* Spouse Information Section */}
            <h3 className="text-xl font-semibold mt-6">Spouse Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block">Spouse Last Name</label>
                <input
                  type="text"
                  name="spouseLastname"
                  value={formData.spouseLastname}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse First Name</label>
                <input
                  type="text"
                  name="spouseFirstname"
                  value={formData.spouseFirstname}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse Middle Name</label>
                <input
                  type="text"
                  name="spouseMiddlename"
                  value={formData.spouseMiddlename}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse Birthdate</label>
                <input
                  type="date"
                  name="spouseBirthdate"
                  value={formData.spouseBirthdate}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Spouse Age</label>
                <input
                  type="number"
                  name="spouseAge"
                  value={formData.spouseAge}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Other Information Section */}
            <h3 className="text-xl font-semibold mt-6">Other Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block">Living Children</label>
                <input
                  type="number"
                  name="livingChildren"
                  value={formData.livingChildren}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Non-Living Children</label>
                <input
                  type="number"
                  name="nonLivingChildren"
                  value={formData.nonLivingChildren}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Household Monthly Income</label>
                <input
                  type="number"
                  name="householdMonthlyIncome"
                  value={formData.householdMonthlyIncome}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
              <div>
                <label className="block">Occupation</label>
                <input
                  type="text"
                  name="occupation"
                  value={formData.occupation}
                  onChange={handleInputChange}
                  className="w-full border rounded p-2"
                />
              </div>
            </div>

            {/* Three Tables Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {/* Table 1: Type of Client */}
              <div className="border p-4 rounded">
                <h4 className="font-semibold mb-3">Type of Client</h4>
                <div className="space-y-2">
                  {[
                    { name: 'newAcceptor', label: 'New Acceptor' },
                    { name: 'currentUser', label: 'Current User' },
                    { name: 'changingMethod', label: 'Changing Method' },
                    { name: 'changingClinic', label: 'Changing Clinic' },
                    { name: 'dropoutRestart', label: 'Dropout/Restart' },
                    { name: 'spacingReason', label: 'Spacing Reason' },
                    { name: 'medicalCondition', label: 'Medical Condition' },
                    { name: 'sideEffects', label: 'Side Effects' },
                    { name: 'limitingReason', label: 'Limiting Reason' },
                    { name: 'otherReason', label: 'Other Reason' }
                  ].map(({ name, label }) => (
                    <div key={name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={e => handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked
                          }
                        })}
                      />
                      <label>{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table 2: Method Currently Used */}
              <div className="border p-4 rounded">
                <h4 className="font-semibold mb-3">Method Currently Used</h4>
                <div className="space-y-2">
                  {[
                    { name: 'coc', label: 'COC' },
                    { name: 'pop', label: 'POP' },
                    { name: 'injectable', label: 'Injectable' },
                    { name: 'implant', label: 'Implant' },
                    { name: 'inteval', label: 'IUD Interval' },
                    { name: 'postPartum', label: 'IUD Post Partum' },
                    { name: 'condom', label: 'Condom' },
                    { name: 'bomCmm', label: 'BOM/CMM' },
                    { name: 'bbt', label: 'BBT' },
                    { name: 'stm', label: 'STM' },
                    { name: 'lam', label: 'LAM' },
                    { name: 'otherMethod', label: 'Other Method' }
                  ].map(({ name, label }) => (
                    <div key={name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={e => handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked
                          }
                        })}
                      />
                      <label>{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Table 3: VAW Risks */}
              <div className="border p-4 rounded">
                <h4 className="font-semibold mb-3">Risks for VAW</h4>
                <div className="space-y-2">
                  {[
                    { name: 'unpleasantRelationship', label: 'Unpleasant Relationship with Partner' },
                    { name: 'partnerDisapproval', label: 'Partner Disapproval' },
                    { name: 'domesticViolence', label: 'Domestic Violence' },
                    { name: 'referredToDSWD', label: 'Referred to DSWD' },
                    { name: 'referredToWCPU', label: 'Referred to WCPU' },
                    { name: 'referredToOthers', label: 'Referred to Others' }
                  ].map(({ name, label }) => (
                    <div key={name} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name={name}
                        checked={formData[name]}
                        onChange={e => handleInputChange({
                          target: {
                            name: e.target.name,
                            value: e.target.checked
                          }
                        })}
                      />
                      <label>{label}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => {
                setHealthCare('default');
                setIsFamilyPlanning(false);
                setIsHealthcareActive(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewFamilyPlanning;