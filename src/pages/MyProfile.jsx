import React, { useEffect } from 'react'
import Parse from 'parse/dist/parse.min.js'
import { usePatient } from '../hooks/usePatient';

const MyProfile = () => {
    const user = Parse.User.current();
    const { getPatientById, myProfile } = usePatient();

    useEffect(() => {
        getPatientById(user?.id)
    },[user])

 
  return (
    <div className='flex justify-center items-center py-10 bg-white'>
      <div className="grid grid-cols-5 gap-5 w-full max-w-6xl p-6 border rounded-lg shadow-lg">
        {/* Left Column - Photo and Basic Info */}
        <div className="flex flex-col gap-3">
          <img src={myProfile?.profilePicture || "/avatarplaceholder.png"} alt="" className="w-48 h-48 object-cover rounded-lg shadow" />
          <div className="text-sm">
            <p className="font-semibold">PATIENT ID NO.</p>
            <p className="text-black">{myProfile?.patientIdNo}</p>
          </div>
          <div className="text-sm">
            <p className="font-semibold">EMAIL ADDRESS:</p>
            <p className="text-black break-words">{myProfile?.email}</p>
          </div>
        </div>

        {/* Main Information Grid */}
        <div className="col-span-4 grid grid-cols-3 gap-4">
          {/* Personal Information */}
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">LASTNAME:</p>
              <p className="font-semibold">{myProfile?.lastname}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">PUROK:</p>
              <p className="font-semibold">{myProfile?.purok}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">BIRTHDATE:</p>
              <p className="font-semibold">{myProfile?.bod}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">BIRTHPLACE:</p>
              <p className="font-semibold">{myProfile?.birthPlace}</p>
            </div>
          </div>

          {/* Middle Column */}
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">FIRSTNAME:</p>
              <p className="font-semibold">{myProfile?.firstname}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">BARANGAY:</p>
              <p className="font-semibold">{myProfile?.barangay}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">AGE:</p>
              <p className="font-semibold">{myProfile?.age}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">BLOODTYPE:</p>
              <p className="font-semibold">{myProfile?.bloodType}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">HOUSEHOLD MONTHLY INCOME:</p>
              <p className="font-semibold">{myProfile?.houseHoldMonthlyIncome}</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-2">
            <div>
              <p className="text-gray-600 text-sm">MIDDLE NAME:</p>
              <p className="font-semibold">{myProfile?.middleInitial}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">MUNICIPALITY:</p>
              <p className="font-semibold">{myProfile?.municipality}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">NATIONALITY:</p>
              <p className="font-semibold">{myProfile?.nationality}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">CONTACT NO.:</p>
              <p className="font-semibold">{myProfile?.contact}</p>
            </div>
          </div>

          {/* Additional Information Spanning Full Width */}
          <div className="col-span-3 grid grid-cols-4 gap-4 mt-4">
            <div>
              <p className="text-gray-600 text-sm">CIVIL STATUS:</p>
              <p className="font-semibold">{myProfile?.civilStatus}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">PROVINCE:</p>
              <p className="font-semibold">{myProfile?.province}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">RELIGION:</p>
              <p className="font-semibold">{myProfile?.religion}</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">OCCUPATION:</p>
              <p className="font-semibold">{myProfile?.occupation}</p>
            </div>
          </div>

          {/* Family Information */}
          <div className="col-span-3 flex items-center gap-8 mt-4">
            <div>
              <p className="text-gray-600 text-sm">NO. LIVING CHILD:</p>
              <p className="text-center font-semibold">- {myProfile?.livingChild} -</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">NO. NON-LIVING CHILD:</p>
              <p className="text-center font-semibold">- {myProfile?.nonLivingChild} -</p>
            </div>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="healthcareAssistance" value="4PS" checked={myProfile?.healthcareAssistance === "4ps"} />
                <span>4PS</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="healthcareAssistance" value="INDIGENT" checked={myProfile?.healthcareAssistance === "indigent"} />
                <span>INDIGENT</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="healthcareAssistance" value="PRIVATE" checked={myProfile?.healthcareAssistance === "private"} />
                <span>PRIVATE</span>
              </label>
            </div>
          </div>

          {/* Emergency Contact Section */}
          <div className="col-span-3 mt-8 border-t pt-6">
            <h2 className="text-lg font-semibold mb-4">EMERGENCY CONTACT PERSON</h2>
            <div className="grid grid-cols-3 gap-4">
              {/* Left Column */}
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600 text-sm">LASTNAME:</p>
                  <p className="font-semibold">{myProfile?.emergencyLastName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">ADDRESS:</p>
                  <p className="font-semibold">{myProfile?.emergencyAddress}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">RELIGION:</p>
                  <p className="font-semibold">{myProfile?.emergencyReligion}</p>
                </div>
              </div>

              {/* Middle Column */}
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600 text-sm">FIRSTNAME:</p>
                  <p className="font-semibold">{myProfile?.emergencyFirstName}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">BIRTHDATE:</p>
                  <p className="font-semibold">{myProfile?.emergencyBod}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">CONTACT NO:</p>
                  <p className="font-semibold">{myProfile?.emergencyContact}</p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-2">
                <div>
                  <p className="text-gray-600 text-sm">MIDDLE NAME:</p>
                  <p className="font-semibold">{myProfile?.emergencyInitial}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm">AGE:</p>
                  <p className="font-semibold">{myProfile?.emergencyAge}</p>
                </div>
              </div>

              {/* Additional Info */}
              <div>
                <p className="text-gray-600 text-sm">RELATIONSHIP:</p>
                <p className="font-semibold">{myProfile?.emergencyRelationship}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">OCCUPATION:</p>
                <p className="font-semibold">{myProfile?.emergencyOccupation}</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">NATIONALITY:</p>
                <p className="font-semibold">{myProfile?.emergencyNationality}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="col-span-3 flex justify-between mt-6">
            <button className="px-8 py-2 bg-white text-black border border-zinc-600 rounded">
              MEDICAL HISTORY
            </button>
            <div className="flex gap-4">
              <button className="px-8 py-2 border border-gray-300 rounded hover:bg-gray-50">
                PRINT
              </button>
              <button className="px-8 py-2 border border-gray-300 rounded hover:bg-gray-50">
                BACK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyProfile

