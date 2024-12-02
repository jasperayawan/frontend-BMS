import React, { useState } from 'react';

const AddNewOtherServices = ({ setHealthCare, setIsOtherServices, setIsHealthcareActive }) => {
  const [formData, setFormData] = useState({
    servicesAvailed: '',
    date: '',
    firstName: '',
    middleName: '',
    lastName: '',
    sex: '',
    status: '',
    dateOfBirth: '',
    age: '',
    bloodType: '',
    bloodPressure: '',
    height: '',
    weight: '',
    relationship: '',
    prescription: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    // Reset states
    setHealthCare('default');
    setIsOtherServices(false);
    setIsHealthcareActive(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-[800px]">
        <h2 className="text-2xl font-bold mb-4">Other Services Form</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1">Services Availed</label>
              <input
                type="text"
                name="servicesAvailed"
                value={formData.servicesAvailed}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            
            {/* Personal Information */}
            <div>
              <label className="block mb-1">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Middle Name</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Sex</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              >
                <option value="">Select Sex</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            {/* Additional Fields */}
            <div>
              <label className="block mb-1">Status</label>
              <input
                type="text"
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Date of Birth</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            
            {/* Medical Information */}
            <div>
              <label className="block mb-1">Age</label>
              <input
                type="number"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Blood Type</label>
              <input
                type="text"
                name="bloodType"
                value={formData.bloodType}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Blood Pressure</label>
              <input
                type="text"
                name="bloodPressure"
                value={formData.bloodPressure}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Height (cm)</label>
              <input
                type="number"
                name="height"
                value={formData.height}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Weight (kg)</label>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Relationship</label>
              <input
                type="text"
                name="relationship"
                value={formData.relationship}
                onChange={handleInputChange}
                className="w-full border rounded p-2"
                required
              />
            </div>
          </div>
          
          {/* Prescription */}
          <div>
            <label className="block mb-1">Prescription</label>
            <textarea
              name="prescription"
              value={formData.prescription}
              onChange={handleInputChange}
              className="w-full border rounded p-2 h-32"
              required
            />
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
          
          {/* Form Buttons */}
          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={() => {
                setHealthCare('default');
                setIsOtherServices(false);
                setIsHealthcareActive(false);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewOtherServices; 