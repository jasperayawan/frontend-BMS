import React from "react";

const AddEmployeeModal = ({
  setImage,
  image,
  handleAddEmployee,
  setAddEmployeeModal,
  addEmployeeModal,
  handleInputChange,
  employeeObj,
  loading
}) => {
  return (
    <div className="fixed top-0 left-0 bg-black/30 h-screen w-full flex justify-center items-center">
      <div className="bg-white rounded-[12px] min-w-[500px] h-[600px] relative p-4 overflow-y-auto">
        <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
          ADD EMPLOYEE PROFILE
        </h1>
        <div className="absolute top-2 right-2"></div>
        <form className="w-full" onSubmit={handleAddEmployee}>
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
                    src="/emptyprofile.png"
                    alt=""
                    className="h-[150px] w-[150px] profilePic rounded-full"
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
                <p className="text-[12px] font-semibold">USER ID NO.</p>
                {/* <span className="text-[12px]">{employeeData.userIdNo}</span>
                 */}
                <input
                  type="text"
                  name="userId"
                  value={employeeObj.userId || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
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
                    name="lastName"
                    value={employeeObj.lastName || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    First Name
                  </h5>
                  <input
                    type="text"
                    name="firstName"
                    value={employeeObj.firstName || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    Middle Initial
                  </h5>
                  <input
                    type="text"
                    name="middleInitial"
                    value={employeeObj.middleInitial || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    MARITAL Status
                  </h5>
                  <input
                    type="text"
                    name="maritalStatus"
                    value={employeeObj.maritalStatus || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col">
                  <h5 className="text-[12px] font-semibold uppercase">
                    BLOODTYPE
                  </h5>
                  <select
                    name="bloodType"
                    value={employeeObj.bloodType || ""}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 py-2 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    <option value="" className="text-[13px]">--select--</option>
                    <option value="O+" className="text-[13px]">O+</option>
                    <option value="A+" className="text-[13px]">A+</option>
                    <option value="B+" className="text-[13px]">B+</option>
                    <option value="AB+" className="text-[13px]">AB+</option>
                    <option value="O-" className="text-[13px]">O-</option>
                    <option value="A-" className="text-[13px]">A-</option>
                    <option value="B-" className="text-[13px]">B-</option>
                    <option value="AB-" className="text-[13px]">AB-</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-row space-x-2 secondInnerformContainer_child">
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    POSITION
                  </h5>
                  <input
                    type="text"
                    name="position"
                    value={employeeObj.position || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    BIRTHDATE
                  </h5>
                  <input
                    type="date"
                    name="birthdate"
                    value={employeeObj.birthdate || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">AGE</h5>
                  <input
                    type="number"
                    name="age"
                    value={employeeObj.age || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    NATIONALITY
                  </h5>
                  <input
                    type="text"
                    name="nationality"
                    value={employeeObj.nationality || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">
                    ADDRESS
                  </h5>
                  <input
                    type="text"
                    name="address"
                    value={employeeObj.address || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
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
                    value={employeeObj.contactNo || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col justify-start items-start gap-x-4">
                  <h5 className="text-[12px] font-semibold uppercase">EMAIL</h5>
                  <input
                    type="email"
                    name="email"
                    value={employeeObj.email || ""}
                    onChange={handleInputChange}
                    required
                    className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
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
                  name="licenseId"
                    value={employeeObj.licenseId || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">PROFESSION</h6>
                <input
                  type="text"
                  name="profession"
                    value={employeeObj.profession || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">COMPANY NAME</h6>
                <input
                  type="text"
                  name="companyName"
                    value={employeeObj.companyName || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <input
                  type="number"
                  name="companyContact"
                    value={employeeObj.companyContact || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">WORK ADDRESS</h6>
                <input
                  type="text"
                  name="workAddress"
                    value={employeeObj.workAddress || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
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
                  name="emergencyName"
                    value={employeeObj.emergencyName || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">RELATIONSHIP</h6>
                <input
                  type="text"
                  name="emergencyRelationship"
                  value={employeeObj.emergencyRelationship || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">ADDRESS</h6>
                <input
                  type="text"
                  name="emergencyAddress"
                  value={employeeObj.emergencyAddress || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
                />
              </div>
              <div className="flex flex-col items-start dtContainer">
                <h6 className="text-[12px] font-semibold">CONTACT NO.</h6>
                <input
                  type="number"
                  name="emergencyContact"
                    value={employeeObj.emergencyContact || ""}
                  onChange={handleInputChange}
                  required
                  className="border-[1px] border-zinc-300 py-2 placeholder:text-[12px] text-[12px] px-2 rounded-md"
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
              onClick={() => setAddEmployeeModal(!addEmployeeModal)}
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

export default AddEmployeeModal;
