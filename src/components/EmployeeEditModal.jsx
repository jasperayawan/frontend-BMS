import React from "react";
import { format } from "date-fns";

const EmployeeEditModal = ({
  employeeData,
  setIsEditModal,
  isEditModal,
  handleEditModal,
  handleInputChangeData,
  setImage,
  image,
  loading
}) => {
  const formattedBirthdate = employeeData.birthdate
    ? typeof employeeData.birthdate === 'object' && employeeData.birthdate.iso
      ? format(new Date(employeeData.birthdate.iso), "yyyy-MM-dd")
      : format(new Date(employeeData.birthdate), "yyyy-MM-dd")
    : "";

  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center z-50">
      <div className="bg-white rounded-[12px] min-w-[500px] h-[400px] relative p-4 overflow-y-auto">
        <div className="absolute top-2 right-2"></div>
        <form className="w-full" onSubmit={handleEditModal}>
          <div className="flex gap-x-6 formContainer">
            <div className="flex flex-col gap-y-2 InitInnerformContainer">
              <label htmlFor="image" className="cursor-pointer">
                {image ? (
                  <img
                    src={URL.createObjectURL(image)}
                    alt=""
                    className="h-[150px] w-[150px] profilePic rounded-full"
                  />
                ) : (
                  <img
                    src={employeeData.profilePic || "/emptyprofile.png"}
                    alt=""
                    className="h-[150px] w-[150px] profilePic rounded-full object-cover"
                  />
                )}
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setImage(e.target.files[0])}
                  className="hidden"
                />
              </label>
              <div className="flex flex-col justify-start items-start gap-x-1">
              <label className="text-[12px] font-semibold">USER ID NO.</label>
              <input
                type="text"
                name="userId"
                value={employeeData.userId || ""}
                onChange={(e) => handleInputChangeData(e, "userId")}
                className="text-[12px]"
              />
            </div>
            </div>
            <div className="flex flex-col gap-y-5 secondInnerformContainer">
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Last Name
                  </h5>
                  <input
                    type="text"
                    value={employeeData.lastName}
                    onChange={(e) => handleInputChangeData(e, 'lastName')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    First Name
                  </h5>
                  <input
                    type="text"
                    value={employeeData.firstName}
                    onChange={(e) => handleInputChangeData(e, 'firstName')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Middle Initial
                  </h5>
                  <input
                    type="text"
                    value={employeeData.middleInitial}
                    onChange={(e) => handleInputChangeData(e, 'middleInitial')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    MARITAL Status
                  </h5>
                  <input
                    type="text"
                    value={employeeData.maritalStatus}
                    onChange={(e) => handleInputChangeData(e, 'maritalStatus')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    BLOODTYPE
                  </h5>
                  <input
                    type="text"
                    value={employeeData.bloodType}
                    onChange={(e) => handleInputChangeData(e, 'bloodType')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    POSITION
                  </h5>
                  <input
                    type="text"
                    value={employeeData.position}
                    onChange={(e) => handleInputChangeData(e, 'position')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    BIRTHDATE
                  </h5>
                  <input
                    type="date"
                    value={formattedBirthdate}
                    onChange={(e) => handleInputChangeData(e, 'birthdate')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">AGE</h5>
                  <input
                    type="number"
                    value={employeeData.age}
                    onChange={(e) => handleInputChangeData(e, 'age')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    NATIONALITY
                  </h5>
                  <input
                    type="text"
                    value={employeeData.nationality}
                    onChange={(e) => handleInputChangeData(e, 'nationality')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    ADDRESS
                  </h5>
                  <input
                    type="text"
                    value={employeeData.address}
                    onChange={(e) => handleInputChangeData(e, 'address')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    CONTACT NO.
                  </h5>
                  <input
                    type="number"
                    name="contactNo"
                    value={employeeData.contactNo}
                    onChange={(e) => handleInputChangeData(e, 'contactNo')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">EMAIL</h5>
                  <input
                    type="email"
                    value={employeeData.email}
                    onChange={(e) => handleInputChangeData(e, 'email')}
                    className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
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
                <input
                  type="text"
                  value={employeeData.licenseId}
                  onChange={(e) => handleInputChangeData(e, 'licenseId')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">PROFESSION</h6>
                <input
                  type="text"
                  value={employeeData.profession}
                  onChange={(e) => handleInputChangeData(e, 'profession')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">COMPANY NAME</h6>
                <input
                  type="text"
                  value={employeeData.companyName}
                  onChange={(e) => handleInputChangeData(e, 'companyName')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <input
                  type="number"
                  name="companyContact"
                  value={employeeData.companyContact}
                  onChange={(e) => handleInputChangeData(e, 'companyContact')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">WORK ADDRESS</h6>
                <input
                  type="text"
                  value={employeeData.workAddress}
                  onChange={(e) => handleInputChangeData(e, 'workAddress')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
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
                <input
                  type="text"
                  value={employeeData.emergencyName}
                  onChange={(e) => handleInputChangeData(e, 'emergencyName')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">RELATIONSHIP</h6>
                <input
                  type="text"
                  value={employeeData.emergencyRelationship}
                  onChange={(e) => handleInputChangeData(e, 'emergencyRelationship')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">ADDRESS</h6>
                <input
                  type="text"
                  value={employeeData.emergencyAddress}
                  onChange={(e) => handleInputChangeData(e, 'emergencyAddress')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <input
                  type="number"
                  name="emergencyContact"
                  value={employeeData.emergencyContact}
                  onChange={(e) => handleInputChangeData(e, 'emergencyContact')}
                  className="border-[1px] border-zinc-300 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center gap-x-2 mt-10">
            <button
              type="submit"
              className="px-6 py-2 rounded-md border-[1px] border-yellow-500 bg-yellow-500 no-print"
            >
              {loading ? 'Loading...' : 'SAVE'}
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
