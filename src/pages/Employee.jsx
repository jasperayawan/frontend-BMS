import React, { useState, useRef } from "react";
import { EmployeeData } from "../helper/DummyData";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeEditModal from "../components/EmployeeEditModal";
import AddEmployeeModal from "../components/AddEmployeeModal";

const Employee = () => {
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [view, setView] = useState(false);
  const [viewClick, setViewClick] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false)
  const [addEmployee, setAddEmployee] = useState(false)
  const [image, setImage] = useState(null)
  const [addEmployeeModal, setAddEmployeeModal] = useState(false)
  const [employeeObj, setEmployeeObj] = useState({
    userId: "",
    lastName: "",
    firstName: "",
    middleInitial: "",
    maritalStatus: "",
    bloodType: "",
    position: "",
    birthdate: "",
    age: "",
    nationality: "",
    address: "",
    contactNo: "",
    email: "",
    licenseId: "",
    profession: "",
    companyName: "",
    companyContact: "",
    workAddress: "",
    emergencyName: "",
    emergencyRelationship: "",
    emergencyAddress: "",
    emergencyContact: "",
  });
  

  const componentRef = useRef(null);

  const handleOpenModal = (data) => {
    setIsModalOpen(true);
    setView(!view);
  };

  const handlePrint = () => {
    const printContent = componentRef.current;
    const printWindow = window.open("", "_blank");
    setIsPrint(true);

    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Patient Data</title>
            <style>
              body {
                font-family: Arial, sans-serif;
              }
              table {
                width: 100%;
                border-collapse: collapse;
              }
              th, td {
                border: 1px solid #000;
                padding: 8px;
                text-align: left;
              }
              th {
                background-color: #f2f2f2;
              }
              .print-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 20px;
              }
              .print-header img {
                max-width: 100px; /* Adjust size as needed */
              }
              .profilePic{
                width: 150px;
                height: 150px;
              }
                .formContainer{
                  display: flex;
                  gap: 1.5rem;
                }
                  .InitInnerformContainer{
                  display: flex;
                  flex-direction: column;
                  gap: 0.5rem
                  }
                  .secondInnerformContainer{
                  display: flex;
                  flex-direction: column;
                  line-height: 1px;
                  }
                  .cuttLine{
                    display: flex;
                    align-items: start;
                  }
                .secondInnerformContainer_child{
                  display: flex;
                  flex-direction: row;
                  column-gap: 2rem;
                  margin-right: calc(1.25rem /* 20px */ * var(--tw-space-x-reverse));
                  margin-left: calc(1.25rem /* 20px */ * calc(1 - var(--tw-space-x-reverse)));
                }
                  .secondInnerformContainer_child h5{
                  font-size: 12px;
                  font-weight: 600;
                  text-transform: uppercase;
                  }
                  .secondFormContainer{
                    display: flex;
                    flex-direction: column;
                    line-height: 1px;
                  }
                    .secondFormContainer_child{
                    display: flex;
                    flex-direction: row;
                    column-gap: 16px;
                    }
                    .secondFormContainer_childData{
                      display: flex;
                      flex-direction: column;
                      align-items: start;
                    }
              .dtContainer{
               display: flex;
               flex-direction: column;
               align-items: start;
              }
               .dtContainer h6 {
                font-size: 12px;
                font-weight: 600;
                text-transform: uppercase;
               }
                .dtContainer p {
                font-size: 12px;
               }
                @media print {
                .no-print {
                  display: none;
                }
  }
            </style>
          </head>
          <body>
            <div class="print-header">
              <img src="/sanfranciscologo.svg" alt="San Francisco Logo" />
              <h2 style="color: #000000; text-align: center;">
                BARANGAY SAN FRANCISCO HEALTH CENTER<br/> MANAGEMENT SYSTEM
              </h2>
              <img src="/pagadianlogo.svg" alt="Pagadian Logo" />
            </div>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
      setIsPrint(false); // Reset isPrint state after printing
    }
  };

  const handleEditModal = () => {
    setIsEditModal(!isEditModal)
  }

  const handleAddEmployee = (e) => {
    e.preventDefault();

    const newEmployee = { ...employeeObj, id: EmployeeData.length + 1 };
    setAddEmployeeModal(false);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeObj({
      ...employeeObj,
      [name]: value,
    });
  };

  return (
    <div className="flex justify-center items-center mt-20">
      {view && (
        <EmployeeModal
          employeeData={employeeData}
          setView={setView}
          view={view}
          handlePrint={handlePrint}
        />
      )}

      {isEditModal && (
        <EmployeeEditModal employeeData={employeeData} setIsEditModal={setIsEditModal} isEditModal={isEditModal}/>
      )}

      {addEmployeeModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/30">
          <AddEmployeeModal 
          setImage={setImage} 
          image={image} 
          handleAddEmployee={handleAddEmployee} 
          setAddEmployeeModal={setAddEmployeeModal} 
          addEmployeeModal={addEmployeeModal}
          handleInputChange={handleInputChange}
          employeeObj={employeeObj}
          />
        </div>
      )}

      <div className="flex flex-col gap-y-10">
        <h1 className="text-2xl flex justify-center items-center font-semibold">
          EMPLOYEE LIST
        </h1>
        <div className="flex flex-col gap-y-3">
          <div ref={componentRef}>
            <table className="table-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-orange-500 dark:text-slate-800">
                <tr>
                  <th scope="col" className="py-2">
                    No
                  </th>
                  <th scope="col" className="py-2">
                    USER ID NO.
                  </th>
                  <th scope="col" className="py-2">
                    NAME
                  </th>
                  <th scope="col" className="py-2">
                    POSITION
                  </th>
                  <th scope="col" className="py-2">
                    CONTACT NO.
                  </th>
                  <th scope="col" className="py-2">
                    EMAIL
                  </th>
                  <th scope="col" className="py-2">
                    STATUS
                  </th>
                  <th scope="col" className="py-2">
                    ACTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {EmployeeData.length > 0 ? (
                  EmployeeData.map((data) => (
                    <tr
                      key={data.id}
                      onClick={() => {
                        setViewClick(!viewClick);
                        setEmployeeData(data);
                      }}
                      className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.userIdNo}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.firstName} {data.lastName}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.lastName} {data.firstName}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.position}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.contactNo}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.email}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        ACTIVE
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        <div className="flex gap-x-2">
                            <button onClick={handleEditModal} className="bg-zinc-700 text-white font-bold py-2 px-4 rounded">
                            Edit
                            </button>
                            <button
                            onClick={handleOpenModal}
                            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                            >
                            VIEW
                            </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="9"
                      className="px-4 py-2 text-center text-gray-500"
                    >
                      No patients found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-5 gap-x-3">
            <button onClick={() => setAddEmployeeModal(!addEmployeeModal)} className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              ADD
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employee;
