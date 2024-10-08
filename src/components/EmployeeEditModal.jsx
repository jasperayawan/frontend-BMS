import React from "react";

const EmployeeEditModal = ({ employeeData, setIsEditModal, isEditModal }) => {
  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-[12px] min-w-[500px] h-[400px] relative p-4 overflow-y-auto">
        <div className="absolute top-2 right-2"></div>
        <form className="w-full">
          <div className="flex gap-x-6 formContainer">
            <div className="flex flex-col gap-y-2 InitInnerformContainer">
              <img
                src={employeeData.image}
                alt=""
                className="h-[150px] w-[150px] profilePic"
              />
              <div className="flex flex-col justify-start items-start gap-x-1">
                <p className="text-[12px] font-semibold">USER ID NO.</p>
                <span className="text-[12px]">{employeeData.userIdNo}</span>
              </div>
            </div>
            <div className="flex flex-col gap-y-5 secondInnerformContainer">
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">Last Name</h5>
                  <input type="text" value={employeeData.lastName} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">First Name</h5>
                  <input type="text" value={employeeData.firstName} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">Middle Initial</h5>
                  <input type="text" value={employeeData.middleInitial} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">MARITAL Status</h5>
                  <input type="text" value={employeeData.maritalStatus} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">BLOODTYPE</h5>
                  <input type="text" value={employeeData.bloodType} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
              </div>
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    POSITION
                  </h5>
                  <input type="text" value={employeeData.position} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    BIRTHDATE
                  </h5>
                  <input type="text" value={employeeData.birthdate} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">AGE</h5>
                  <input type="text" value={employeeData.age} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    NATIONALITY
                  </h5>
                  <input type="text" value={employeeData.nationality} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    ADDRESS
                  </h5>
                  <input type="text" value={employeeData.address} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
              </div>
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    CONTACT NO.
                  </h5>
                  <input type="text" value={employeeData.contactNo} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">EMAIL</h5>
                  <input type="text" value={employeeData.email} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
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
            <div className="flex flex-row gap-x-2 secondFormContainer_child">
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">LICENSE ID</h6>
                <input type="text" value={employeeData.workReferences[0].licenceIdNo} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">PROFESSION</h6>
                <input type="text" value={employeeData.workReferences[0].profession} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">COMPANY NAME</h6>
                <input type="text" value={employeeData.workReferences[0].companyName} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <input type="text" value={employeeData.workReferences[0].contactNo} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">WORK ADDRESS</h6>
                <input type="text" value={employeeData.workReferences[0].workAddress} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
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
            <div className="flex flex-row gap-x-2 secondFormContainer_child">
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">NAME</h6>
                <input type="text" value={employeeData.emergencyContactPerson[0].name} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">RELATIONSHIP</h6>
                <input type="text" value={employeeData.emergencyContactPerson[0].relationship} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">ADDRESS</h6>
                <input type="text" value={employeeData.emergencyContactPerson[0].address} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <input type="text" value={employeeData.emergencyContactPerson[0].contactNo} className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"/>
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-x-2 mt-10">
            <button
              onClick={() => setIsEditModal(!isEditModal)}
              className="px-6 py-2 rounded-md border-[1px] border-yellow-500 bg-yellow-500 no-print"
            >
              SAVE
            </button>
            <button
              onClick={() => setIsEditModal(!isEditModal)}
              className="px-6 py-2 rounded-md border-[1px] border-yellow-500 text-yellow-500 no-print"
            >
              CANCEL
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EmployeeEditModal;
