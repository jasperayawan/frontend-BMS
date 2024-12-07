import React, { useState, useRef, useEffect } from "react";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeEditModal from "../components/EmployeeEditModal";
import AddEmployeeModal from "../components/AddEmployeeModal";
import axios from "axios";
import { EMPLOYEE } from "../helper/api";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";

const Employee = () => {
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(null);
  const [employee, setEmployee] = useState([]);
  const [viewEmployee, setViewEmployee] = useState({});
  const [view, setView] = useState(false);
  const [viewClick, setViewClick] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
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

  const handleRowClick = (data) => {
    setViewEmployee(data);
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

      // Convert birthdate to Parse.Date before sending
      if (updatedEmployeeData.birthdate) {
        updatedEmployeeData.birthdate = {
          __type: "Date",
          iso: new Date(updatedEmployeeData.birthdate).toISOString()
        };
      }

      // If there is a new image, make sure it's included in the data
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
    
    // Special handling for birthdate field
    if (fieldName === 'birthdate') {
      setEditData((prevEditData) => ({
        ...prevEditData,
        [fieldName]: value // Store as string initially
      }));
    } else {
      setEditData((prevEditData) => ({
        ...prevEditData,
        [fieldName]: value,
      }));
    }
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

  return (
    <div className="container mx-auto px-4 py-8">
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

      <div className="mx-auto max-w-6xl flex flex-col gap-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          EMPLOYEE LIST
        </h1>
        
        {/* Table Container */}
        <div className="overflow-x-auto shadow-lg rounded-lg" ref={componentRef}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gradient-to-r from-orange-400 to-orange-600">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">No</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">User ID</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Name</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Position</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Contact</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Email</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employee.length > 0 ? (
                employee.map((data, i) => (
                  <tr
                    key={i}
                    onClick={() => handleRowClick(data)}
                    className={`hover:bg-gray-50 transition-colors duration-200 cursor-pointer
                      ${viewEmployee?.objectId === data.objectId ? 'bg-orange-50' : ''}`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{i + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.userId}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {data.lastName} {data.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.position}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.contactNo}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{data.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Active
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No Employee found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Combined Buttons */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={() => viewEmployee?.objectId && setView(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
          >
            View
          </button>
          {user?.get('role') !== 'SECRETARY' && (
            <>
              <button
                onClick={() => {
                  if (viewEmployee?.objectId) {
                    setEditData(viewEmployee);
                    setIsEditModal(!isEditModal);
                  }
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => setAddEmployeeModal(!addEmployeeModal)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Add Employee
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
