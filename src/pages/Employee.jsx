import React, { useState, useRef, useEffect } from "react";
import { EmployeeData } from "../helper/DummyData";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeEditModal from "../components/EmployeeEditModal";
import AddEmployeeModal from "../components/AddEmployeeModal";
import axios from "axios";
import { EMPLOYEE } from "../helper/api";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";

const Employee = () => {
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [viewEmployee, setViewEmployee] = useState({});
  const [view, setView] = useState(false);
  const [viewClick, setViewClick] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editData, setEditData] = useState(null);
  const user = Parse.User.current()

  const [image, setImage] = useState(null);
  const [addEmployeeModal, setAddEmployeeModal] = useState(false);
  const [employeeList, setEmployeeList] = useState([]);
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
    setViewEmployee(data);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    const searchTerm = e.target.value.toLowerCase();

    // Filter employees based on search input
    const filtered = employee.filter(
      (emp) =>
        emp.firstName.toLowerCase().includes(searchTerm) ||
        emp.lastName.toLowerCase().includes(searchTerm) ||
        emp.userId.toString().includes(searchTerm) ||
        emp.position.toLowerCase().includes(searchTerm) ||
        emp.contactNo.includes(searchTerm) ||
        emp.email.toLowerCase().includes(searchTerm)
    );

    setFilteredEmployees(filtered);
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

  const handleEditModal = async (e) => {
    e.preventDefault();
    setLoading(true)

    try {
      const updatedEmployeeData = { ...editData };

      // If there is a new image, make sure it's included in the data.
      
      if (image) {
        const base64Image = await toBase64(image);
        updatedEmployeeData.profilePic = base64Image;
      }

      const response = await axios.put(
        EMPLOYEE + `/${editData.objectId}`,
        updatedEmployeeData
      );
      console.log("Employee updated:", response.data);
      setIsEditModal(false);
      toast.success("Employee updated successfully!");
    } catch (error) {
      console.error("Error updating employee:", error);
      toast.error("Failed to update employee.");
    } finally {
      setLoading(false)
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const formData = { ...employeeObj }; // Create plain object

      if (image) {
        const base64Image = await toBase64(image);
        formData.profilePic = base64Image;
      }

      const response = await axios.post(EMPLOYEE, formData);

      // Update local state
      const newEmployee = { ...employeeObj, id: employeeList.length + 1 };
      setEmployeeList([...employeeList, newEmployee]);

      // Reset form
      setEmployeeObj({
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
        profilePic: null,
      });
      setImage(null);
      setAddEmployeeModal(false);
      toast.success("Employee added successfully!");
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "image" && files?.[0]) {
      const file = files[0];
      const base64 = await toBase64(file);
      setEmployeeObj((prevObj) => ({
        ...prevObj,
        profilePic: base64,
      }));
      setImage(URL.createObjectURL(file));
    } else {
      setEmployeeObj((prevObj) => ({
        ...prevObj,
        [name]: value,
      }));
    }
  };

  const handleInputChangeData = (e, fieldName) => {
    const { value } = e.target;
    setEditData((prevEditData) => ({
      ...prevEditData,
      [fieldName]: value,
    }));
  };

  // Utility function to convert a file to Base64
  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  useEffect(() => {
    const fetchAllEmployee = async () => {
      try {
        const res = await axios.get(EMPLOYEE);
        setEmployee(res.data);
      } catch (error) {
        console.log(error.response.data.error);
      }
    };

    fetchAllEmployee();
  }, []);

  useEffect(() => {
    setFilteredEmployees(employee); // Sync filteredEmployees with the fetched data
  }, [employee]);

  return (
    <div className="flex justify-center items-center mt-20">
      {view && (
        <EmployeeModal
          viewEmployee={viewEmployee}
          setView={setView}
          view={view}
          handlePrint={handlePrint}
        />
      )}

      {isEditModal && (
        <EmployeeEditModal
          employeeData={editData}
          handleInputChangeData={handleInputChangeData}
          setIsEditModal={setIsEditModal}
          isEditModal={isEditModal}
          handleEditModal={handleEditModal}
          setImage={setImage}
          image={image}
          loading={loading}
        />
      )}

      {addEmployeeModal && (
        <div className="fixed top-0 left-0 w-full h-screen bg-black/30 z-50">
          <AddEmployeeModal
            setImage={setImage}
            image={image}
            handleAddEmployee={handleAddEmployee}
            setAddEmployeeModal={setAddEmployeeModal}
            addEmployeeModal={addEmployeeModal}
            handleInputChange={handleInputChange}
            employeeObj={employeeObj}
            loading={loading}
          />
        </div>
      )}

      <div className="flex flex-col gap-y-10">
        <h1 className="text-2xl flex justify-center items-center font-semibold">
          EMPLOYEE LIST
        </h1>
        <div className="flex flex-col gap-y-3">
        <div className="flex justify-center mb-4">
          <div className="relative w-full max-w-md">
            <input
              type="text"
              value={searchInput}
              onChange={handleSearchInputChange}
              placeholder="Search employees..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                className="w-5 h-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1010.5 3a7.5 7.5 0 006.15 12.65z"
                />
              </svg>
            </div>
          </div>
        </div>


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
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((data, i) => (
                    <tr
                      key={i}
                      onClick={() => {
                        setViewClick(!viewClick);
                      }}
                      className="bg-white border-b dark:bg-gray-200 dark:border-gray-700 cursor-pointer"
                    >
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.userId}
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
                          {user?.get('role') !== 'SECRETARY' && (
                            <button
                              onClick={() => {
                                setEditData(data);
                                setIsEditModal(!isEditModal);
                              }}
                              className="bg-zinc-700 text-white font-bold py-2 px-4 rounded"
                            >
                              Edit
                            </button>
                          )}
                          <button
                            onClick={() => handleOpenModal(data)}
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
                      No Employee found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          {user?.get('role') !== 'SECRETARY' && (
            <div className="flex justify-center mt-5 gap-x-3">
              <button
                onClick={() => setAddEmployeeModal(!addEmployeeModal)}
                className="bg-yellow-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                ADD
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
