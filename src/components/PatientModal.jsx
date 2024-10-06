import React from "react";
import { IoMdClose } from "react-icons/io";

const PatientModal = ({ patientData, setIsModalOpen, isModalOpen }) => {
  console.log(patientData);
  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center">
      <div className="bg-white min-w-[500px] h-[400px] relative rounded-[1 justify-start items-center2px] p-4">
        <div className="absolute top-3 right-3">
          <IoMdClose
            onClick={() => setIsModalOpen(!isModalOpen)}
            fontSize={30}
            className="cursor-pointer z-10"
          />
        </div>
        <div className="flex row-x-2">
          <div className="flex flex-col gap-y-2">
            <img src="/avatarplaceholder.png" alt="" className="w-[100px]" />
            <div className="flex flex-col gap-y-1">
              <div className="flex fex-row justify-start items-center gap-x-1">
                <p className="text-[12px]">PATIENT ID NO.</p>
                <span>{patientData.patientIdNo}</span>
              </div>
              <div className="flex fex-row justify-start items-center gap-x-1">
                <p className="text-[12px]">Email.</p>
                <span>{patientData.email}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <div className="flex flex-row justify-start items-center gap-x-4">
              <div className="flex flex-row gap-x-1">
                <p className="text-[12px] font-semibold">Last Name</p>
                <p className="text-[14px]">{patientData.lastName}</p>
              </div>
              <div className="flex flex-row gap-x-1">
                <p className="text-[12px] font-semibold">First Name</p>
                <p className="text-[14px]">{patientData.firstName}</p>
              </div>
              <div className="flex flex-row gap-x-1">
                <p className="text-[12px] font-semibold">Middle Initial</p>
                <p className="text-[14px]">{patientData.middleInitial}</p>
              </div>
              <div className="flex flex-row gap-x-1">
                <p className="text-[12px] font-semibold">Civil Status</p>
                <p className="text-[14px]">{patientData.civilStatus}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-1">
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Purok</p>
                <p className="text-[14px]">{patientData.purok}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Barangay</p>
                <p className="text-[14px]">{patientData.barangay}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Municipality</p>
                <p className="text-[14px]">{patientData.municipality}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Province</p>
                <p className="text-[14px]">{patientData.province}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-1">
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Birth Date</p>
                <p className="text-[14px]">{patientData.birthdate}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Age</p>
                <p className="text-[14px]">{patientData.age}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Municipality</p>
                <p className="text-[14px]">{patientData.municipality}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Religion</p>
                <p className="text-[14px]">{patientData.religion}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-1">
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Birth Place</p>
                <p className="text-[14px]">{patientData.birthPlace}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Blood Type</p>
                <p className="text-[14px]">{patientData.bloodType}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Contact No</p>
                <p className="text-[14px]">{patientData.contactNo}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Occupation</p>
                <p className="text-[14px]">{patientData.occupation}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-1">
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Birth Place</p>
                <p className="text-[14px]">
                  {patientData.householdMonthlyIncome}
                </p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Blood Type</p>
                <p className="text-[14px]">{patientData.NoLivingChild}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Contact No</p>
                <p className="text-[14px]">{patientData.NoNoneLivingChild}</p>
              </div>
              <div className="flex flex-row justify-start items-center gap-x-4">
                <p className="text-[12px] font-semibold">Occupation</p>
                <p className="text-[14px]">{patientData.support}</p>
                <div className="flex flex-row gap-x-2">
                    <input
                    type="radio"
                    id="html"
                    name="support"
                    value="4ps"
                    checked={patientData.support === '4PS'}
                    />
                    <label htmlFor="html">4PS</label>

                    <input
                    type="radio"
                    id="css"
                    name="support"
                    value="indigent"
                    checked={patientData.support === 'INDIGENT'}
                    />
                    <label htmlFor="indigent">INDIGENT</label>

                    <input
                    type="radio"
                    id="javascript"
                    name="support"
                    value="private"
                    checked={patientData.support === 'PRIVATE'}
                    />
                    <label htmlFor="private">PRIVATE</label>
                </div>
                </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientModal;
