import React from 'react'
import { format } from "date-fns";

const EmployeeModal = ({ viewEmployee, setView, view }) => {


  const formattedBirthdate = viewEmployee.birthdate
    ? format(new Date(viewEmployee.birthdate.iso), "yyyy-MM-dd")
    : "";

  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-[12px] min-w-[500px] h-[400px] relative p-4 overflow-y-auto">
        <div className="absolute top-2 right-2">
        </div>
        <div className="w-full">
        <div className="flex gap-x-6 formContainer">
          <div className="flex flex-col gap-y-2 InitInnerformContainer">
            <img
              src={viewEmployee.profilePic}
              alt=""
              className="h-[150px] w-[150px] profilePic"
            />
            <div className="flex flex-col justify-start items-start gap-x-1">
                <p className="text-[12px] font-semibold">USER ID NO.</p>
                <span className="text-[12px]">{viewEmployee.userId}</span>
              </div>
          </div>
          <div className="flex flex-col gap-y-5 secondInnerformContainer">
            <div className="flex flex-row gap-x-4 space-x-5 secondInnerformContainer_child">
              <div className="flex flex-col">
                <h5 className="text-[12px] font-semibold">Last Name</h5>
                <p className="text-[14px]">{viewEmployee.lastName}</p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-[12px] font-semibold">First Name</h5>
                <p className="text-[14px]">{viewEmployee.firstName}</p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-[12px] font-semibold">Middle Initial</h5>
                <p className="text-[14px]">{viewEmployee.middleInitial}</p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-[12px] font-semibold">MARITAL Status</h5>
                <p className="text-[14px]">{viewEmployee.maritalStatus}</p>
              </div>
              <div className="flex flex-col">
                <h5 className="text-[12px] font-semibold">BLOODTYPE</h5>
                <p className="text-[14px]">{viewEmployee.bloodType}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">POSITION</h5>
                <p className="text-[14px]">{viewEmployee.position}</p>
              </div>
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">BIRTHDATE</h5>
                <p className="text-[14px]">{formattedBirthdate}</p>
              </div>
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">
                  AGE
                </h5>
                <p className="text-[14px]">{viewEmployee.age}</p>
              </div>
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">NATIONALITY</h5>
                <p className="text-[14px]">{viewEmployee.nationality}</p>
              </div>
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">ADDRESS</h5>
                <p className="text-[14px]">{viewEmployee.address}</p>
              </div>
            </div>
            <div className="flex flex-row gap-x-1 space-x-5 secondInnerformContainer_child">
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">
                  CONTACT NO.
                </h5>
                <p className="text-[14px]">{viewEmployee.contactNo}</p>
              </div>
              <div className="flex flex-col justify-start items-start gap-x-4">
                <h5 className="text-[12px] font-semibold uppercase">EMAIL</h5>
                <p className="text-[14px]">{viewEmployee.email}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center my-5 cuttLine">
          <div className="w-[200px] h-[2px] bg-zinc-200 lineOne"></div>
          <h3 className="text-center text-zinc-500 text-[12px]">
            WORK
            <br /> REFERENCES
          </h3>
          <div className="w-full h-[2px] bg-zinc-200 lineTwo"></div>
        </div>
        <div className="flex flex-col gap-y-5 secondFormContainer">
          <div className="flex flex-row gap-x-4 secondFormContainer_child">
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">LICENSE ID</h6>
              <p className="text-[12px]">
                {viewEmployee.licenseId}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">PROFESSION</h6>
              <p className="text-[12px]">
                {viewEmployee.profession}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">COMPANY NAME</h6>
              <p className="text-[12px]">
                {viewEmployee.companyName}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
              <p className="text-[12px]">
                {viewEmployee.companyContact}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">WORK ADDRESS</h6>
              <p className="text-[12px]">
                {viewEmployee.workAddress}
              </p>
            </div>
          </div>

        </div>

        <div className="flex items-center my-5 cuttLine">
          <div className="w-[200px] h-[2px] bg-zinc-200 lineOne"></div>
          <h3 className="text-center text-zinc-500 text-[12px]">
            EMERGENCY CONTACT PERSON
          </h3>
          <div className="w-full h-[2px] bg-zinc-200 lineTwo"></div>
        </div>
        <div className="flex flex-col gap-y-5 secondFormContainer">
          <div className="flex flex-row gap-x-4 secondFormContainer_child">
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">NAME</h6>
              <p className="text-[12px]">
                {viewEmployee.emergencyName}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">RELATIONSHIP</h6>
              <p className="text-[12px]">
                {viewEmployee.emergencyRelationship}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">ADDRESS</h6>
              <p className="text-[12px]">
                {viewEmployee.emergencyAddress}
              </p>
            </div>
            <div className="flex flex-col items-start dtContainer">
              <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
              <p className="text-[12px]">
                {viewEmployee.emergencyContact}
              </p>
            </div>
          </div>

        </div>
        <div className="flex flex-row justify-center items-center gap-x-2 mt-10">
          <button onClick={() => setView(!view)} className="px-6 py-2 rounded-md border-[1px] border-yellow-500 text-yellow-500 no-print">BACK</button>
        </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeModal
