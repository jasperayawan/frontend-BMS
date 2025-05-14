import React, { useState, useRef, useEffect } from "react";
import EmployeeModal from "../components/EmployeeModal";
import EmployeeEditModal from "../components/EmployeeEditModal";
import AddEmployeeModal from "../components/AddEmployeeModal";
import axios from "axios";
import { EMPLOYEE } from "../helper/api";
import toast from "react-hot-toast";
import Parse from "parse/dist/parse.min.js";
import { calculateAge } from "../utils/toBase64";
import { X } from "lucide-react";

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
  const [isOk, setIsOk] = useState(false);
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

  const handleDoubleClick = (data) => {
    setViewEmployee(data);
    setView(true);
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
    setLoading(true);

    try {
        const updatedEmployeeData = { ...editData };

        if (
          updatedEmployeeData.birthdate &&
          typeof updatedEmployeeData.birthdate === 'object' &&
          updatedEmployeeData.birthdate.__type === "Date"
        ) {
          updatedEmployeeData.birthdate = new Date(updatedEmployeeData.birthdate.iso);
        } else if (typeof updatedEmployeeData.birthdate === "string") {
          updatedEmployeeData.birthdate = new Date(updatedEmployeeData.birthdate);
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

        setIsEditModal(false);
        setEditData((prevData) => ({
            ...prevData,
            ...response.data.data,
        }))
        setIsOk(true)
    } catch (error) {
        console.error("Error updating employee:", error);
        toast.error("Failed to update employee: " + error.message);
    } finally {
        setLoading(false);
    }
  };


  const handleAddEmployee = async (e) => {
    e.preventDefault();
    setLoading(true)
    if(!image){
      toast.error("Select a Photo for profile picture.")
      setLoading(false)
      return
    }
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
      window.location.reload();
    } catch (error) {
      console.error("Error adding employee:", error);
      alert("Failed to add employee. Please try again.");
    } finally {
      setLoading(false)
    }
  };

  const handleInputChange = async (e) => {
    const { name, value, files } = e.target;

    const max11Fields = ['contactNo', 'companyContact', 'emergencyContact'];

    if (max11Fields.includes(name) && value.length > 11) {
      return;
    }


    if(name === 'birthdate'){
      const age = calculateAge(value);
      setEmployeeObj((prevObj) => ({
        ...prevObj, age
      }))
    }

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
    const { name, value } = e.target;

    const max11Fields = ['contactNo', 'companyContact', 'emergencyContact'];

    if (max11Fields.includes(name) && value.length > 11) {
      return;
    }

    if(name === 'birthdate'){
      const age = calculateAge(value);
      setEditData((prevObj) => ({
        ...prevObj, age
      }))
    }
    
    // Special handling for birthdate field
    if (fieldName === 'birthdate') {
        // Ensure the value is in YYYY-MM-DD format
        const birthdateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (birthdateRegex.test(value)) {
            setEditData((prevEditData) => ({
                ...prevEditData,
                [fieldName]: value // Store as string initially
            }));
        } else {
            console.error("Invalid birthdate format:", value);
            toast.error("Birthdate must be in YYYY-MM-DD format");
        }
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


    const generateUserId = () => {
      const randomNumber = Math.floor(100 + Math.random() * 900); 
      return `MDS-${randomNumber}`;
    };

    useEffect(() => {
        setEmployeeObj((prev) => ({
          ...prev,
          userId: generateUserId(),
        }));
      }, [setEmployeeObj]);
  

  return (
    <div className="container mx-auto px-4 py-8">
      {isOk && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">  
        <div className="bg-zinc-300 rounded-lg shadow-xl w-[400px]">
          <div className="bg-zinc-400 flex justify-end items-center px-2 h-8">
            <button
              onClick={() => {
                setIsOk(false);
                window.location.reload();
              }}
              className=""
            >
              <X />
            </button>
          </div>
          <div className="flex flex-col justify-center items-center p-6">
            <h2 className="text-xl font-bold mb-4 text-center">
              SAVE SUCCESSFULLY
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setIsOk(false);
                  window.location.reload();
                }}
                className="px-4 py-2 bg-white text-black border border-zinc-600 transition-colors duration-200"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
      )}

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
        <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
          LIST OF EMPLOYEES
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
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Remarks</th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-white uppercase tracking-wider">Date Registered</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {employee.length > 0 ? (
                employee.map((data, i) => (
                  <tr
                    key={i}
                    onClick={() => handleRowClick(data)}
                    onDoubleClick={() => handleDoubleClick(data)}
                    className={`${
                      viewEmployee?.objectId === data.objectId 
                        ? 'bg-yellow-100 hover:bg-yellow-200' 
                        : 'bg-white hover:bg-gray-50'
                    } border-b transition duration-200 ease-in-out cursor-pointer`}
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(data.createdAt).toLocaleDateString()}</td>
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
        <div className="flex justify-center gap-2 mt-6">
          {user?.get('role') !== 'SECRETARY' && (
            <>
            <button
                onClick={() => setAddEmployeeModal(!addEmployeeModal)}
                className="bg-yellow-500 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                Add
              </button>
              <button
                onClick={() => {
                  if (viewEmployee?.objectId) {
                    setEditData(viewEmployee);
                    setIsEditModal(!isEditModal);
                  }
                }}
                className="bg-yellow-500 hover:bg-orange-500 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Edit
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Employee;
