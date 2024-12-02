import React, { useState } from 'react';

const EditFamilyPlanning = ({ setHealthCare, setIsFamilyPlanning, patientDataSelected, setIsHealthcareActive }) => {
  const [formData, setFormData] = useState({
    patientIdNo: "",
    email: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    civilStatus: "",
    purok: "",
    barangay: "",
    municipality: "",
    province: "",
    birthdate: "",
    age: "",
    religion: "",
    birthPlace: "",
    bloodType: "",
    contactNo: "",
    occupation: "",
    householdMonthlyIncome: "",
    noLivingChild: "",
    support: "4PS", // Default value
    emergencyContact: {
      lastName: "",
      firstName: "",
      middleInitial: "",
      relationship: "",
      civilStatus: "",
      address: "",
      birthdate: "",
      age: "",
      occupation: "",
      nationality: "",
      religion: "",
      contactNo: ""
    },
    // Keep existing family planning specific fields
    methodUsed: "",
    dateStarted: "",
    notes: ""
  });


  return (
    <div className="min-h-screen p-4 md:p-8 w-full">
      <div className="bg-white rounded-[12px] mx-auto max-w-[800px] relative p-4 overflow-y-auto">
        <div className="w-full">
          <div className="flex gap-x-6 formContainer">
            <div className="flex flex-col gap-y-2 InitInnerformContainer">
              <img
                src={patientDataSelected.profilePicture}
                alt=""
                className="h-[150px] w-[150px] profilePic"
              />
              <div className="flex flex-col gap-y-1">
                <div className="flex flex-col justify-start items-start gap-x-1">
                  <p className="text-[12px] font-semibold">PATIENT ID NO.</p>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.patientIdNo}
                    onChange={(e) => setFormData({...formData, patientIdNo: e.target.value})}
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-1">
                  <p className="text-[12px] font-semibold">EMAIL</p>
                  <input 
                    type="email"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-5 secondInnerformContainer">
              <div className="grid grid-cols-4 gap-4">
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Last Name</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.lastname}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">First Name</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.firstname}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Middle Initial</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.middleInitial}
                    onChange={(e) => setFormData({...formData, middleInitial: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Civil Status</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.civilStatus}
                    onChange={(e) => setFormData({...formData, civilStatus: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Purok</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.purok}
                    onChange={(e) => setFormData({...formData, purok: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Barangay</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.barangay}
                    onChange={(e) => setFormData({...formData, barangay: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Municipality</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.municipality}
                    onChange={(e) => setFormData({...formData, municipality: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Province</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.province}
                    onChange={(e) => setFormData({...formData, province: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Birthdate</h5>
                  <input 
                    type="date"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.birthdate}
                    onChange={(e) => setFormData({...formData, birthdate: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Age</h5>
                  <input 
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Religion</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.religion}
                    onChange={(e) => setFormData({...formData, religion: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Birth Place</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.birthPlace}
                    onChange={(e) => setFormData({...formData, birthPlace: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Blood Type</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.bloodType}
                    onChange={(e) => setFormData({...formData, bloodType: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Contact No.</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.contact}
                    onChange={(e) => setFormData({...formData, contactNo: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Occupation</h5>
                  <input 
                    type="text"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.occupation}
                    onChange={(e) => setFormData({...formData, occupation: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Household Monthly Income</h5>
                  <input 
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.houseHoldMonthlyIncome}
                    onChange={(e) => setFormData({...formData, householdMonthlyIncome: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">No. Living Child</h5>
                  <input 
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.livingChild}
                    onChange={(e) => setFormData({...formData, noLivingChild: e.target.value})}
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">No. Non-Living Child</h5>
                  <input 
                    type="number"
                    className="text-[14px] border rounded p-1"
                    value={patientDataSelected.nonLivingChild}
                    onChange={(e) => setFormData({...formData, noLivingChild: e.target.value})}
                  />
                </div>
                <div className="flex flex-row">
                  <h5 className="text-[12px] font-semibold">Support</h5>
                  <div className="flex flex-row gap-x-2 mt-1">
                    <input
                      type="radio"
                      id="4ps"
                      name="support"
                      value="4PS"
                      checked={formData.support === "4PS"}
                      onChange={(e) => setFormData({...formData, support: e.target.value})}
                    />
                    <label htmlFor="4ps" className="text-[12px]">
                      4PS
                    </label>

                    <input
                      type="radio"
                      id="indigent"
                      name="support"
                      value="INDIGENT"
                      checked={formData.support === "INDIGENT"}
                      onChange={(e) => setFormData({...formData, support: e.target.value})}
                    />
                    <label htmlFor="indigent" className="text-[12px]">
                      INDIGENT
                    </label>

                    <input
                      type="radio"
                      id="private"
                      name="support"
                      value="PRIVATE"
                      checked={formData.support === "PRIVATE"}
                      onChange={(e) => setFormData({...formData, support: e.target.value})}
                    />
                    <label htmlFor="private" className="text-[12px]">
                      PRIVATE
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h3 className="text-center text-zinc-500 text-[12px] mb-3">
                  EMERGENCY CONTACT PERSON
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Last Name</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyLastName}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          lastName: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">First Name</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyFirstName}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          firstName: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Middle Initial</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyInitial}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          middleInitial: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Relationship</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyRelationship}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          relationship: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Civil Status</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyCivilStatus}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          civilStatus: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Address</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyAddress}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          address: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Birthdate</h5>
                    <input 
                      type="date"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyBod}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          birthdate: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Age</h5>
                    <input 
                      type="number"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyAge}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          age: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Occupation</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyOccupation}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          occupation: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Nationality</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.nationality}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          nationality: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Religion</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyReligion}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          religion: e.target.value
                        }
                      })}
                    />
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Contact No.</h5>
                    <input 
                      type="text"
                      className="text-[14px] border rounded p-1"
                      value={patientDataSelected.emergencyContact}
                      onChange={(e) => setFormData({
                        ...formData, 
                        emergencyContact: {
                          ...formData.emergencyContact,
                          contactNo: e.target.value
                        }
                      })}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <div className="flex flex-row gap-x-4 space-x-5">
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Method Used</h5>
                    <select 
                      className="text-[14px] border rounded p-1"
                      value={formData.methodUsed}
                      onChange={(e) => setFormData({...formData, methodUsed: e.target.value})}
                    >
                      <option value="">Select Method</option>
                      <option value="pills">Pills</option>
                      <option value="iud">IUD</option>
                      <option value="injection">Injection</option>
                    </select>
                  </div>
                  <div className="flex flex-col">
                    <h5 className="text-[12px] font-semibold">Date Started</h5>
                    <input 
                      type="date" 
                      className="text-[14px] border rounded p-1"
                      value={formData.dateStarted}
                      onChange={(e) => setFormData({...formData, dateStarted: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold">Notes</h5>
                  <textarea 
                    className="border rounded p-2 text-[14px]" 
                    rows="3"
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  ></textarea>
                </div>
              </div>

              <div className="flex justify-end gap-x-2 mt-4">
                <button
                  onClick={() => {
                    setHealthCare('default');
                    setIsFamilyPlanning(false);
                    setIsHealthcareActive(false);
                  }}
                  className="px-6 py-2 rounded-md border-[1px] border-yellow-500 text-yellow-500"
                >
                  Cancel
                </button>
                <button
                  type="submit" 
                  className="px-6 py-2 rounded-md bg-yellow-500 text-white"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditFamilyPlanning;