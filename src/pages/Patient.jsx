import React, { useState, useRef } from "react";
import { PatientData } from "../helper/DummyData";
import PatientModal from "../components/PatientModal";
import { PATIENT } from "../helper/api";
import AddPatientModal from "../components/patient/AddPatientModal";
import axios from 'axios'
import { toBase64 } from "../utils/toBase64";
import toast from "react-hot-toast";
import AddNewPrenatal from "../components/healthcare_services/AddNewPrenatal";

const Patient = () => {
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [isAddPatientModal, setIsAddPatientModal] = useState(false);
  const [isAddNewPrenatal, setIsAddNewPrenatal] = useState(false)
  const [isHealthCareModal, setIsHealthCareModal] = useState(false)
  const [isPatientSelect, setIsPatientSelect] = useState(false)
  const [patientDataSelected, setPatientDataSelected] = useState({})
  const [healthCare, setHealthCare] = useState("");
  const [isPrenatal, setIsPrenatal] = useState(false)
  const [formData, setFormData] = useState({
    // Patient fields
    profilePicture: null,
    firstname: "",
    lastname: "",
    middleInitial: "",
    civilStatus: "Single",
    purok: "",
    barangay: "",
    municipality: "",
    province: "",
    bod: "",
    age: "",
    nationality: "",
    religion: "",
    patientIdNo: "",
    birthPlace: "",
    bloodType: "O+",
    contact: "",
    occupation: "",
    email: "",
    password: "",
    houseHoldMonthlyIncome: "",
    livingChild: 0,
    nonLivingChild: 0,
    healthcareAssistance: "",

    // Emergency contact fields
    emergencyFirstName: "",
    emergencyLastName: "",
    emergencyInitial: "",
    emergencyRelationship: "",
    emergencyAddress: "",
    emergencyBod: "",
    emergencyAge: "",
    emergencyOccupation: "",
    emergencyCivilStatus: "Single",
    emergencyNationality: "",
    emergencyReligion: "",
    emergencyContact: "",
  });
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false);

  const componentRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.profilePicture) {
      toast.error('Please upload a profile picture.');
      return; 
    }
    setIsSubmitting(true); 

    try {

      const imageBase64 = formData.profilePicture ? await toBase64(formData.profilePicture) : null;

      const formDatas = {
        ...formData,
        profilePicture: imageBase64,
      };

      
      const response = await axios.post(PATIENT, formDatas);
      if (response.status === 201) {
        toast.success("Patient profile successfully created!");
        // Optionally, reset the form
        setFormData({
          profilePicture: null,
          firstname: "",
          lastname: "",
          middleInitial: "",
          civilStatus: "Single",
          purok: "",
          barangay: "",
          municipality: "",
          province: "",
          bod: "",
          age: "",
          nationality: "",
          religion: "",
          patientIdNo: "",
          birthPlace: "",
          bloodType: "O+",
          contact: "",
          occupation: "",
          email: "",
          password: "",
          houseHoldMonthlyIncome: "",
          livingChild: 0,
          nonLivingChild: 0,
          healthcareAssistance: "",
          emergencyFirstName: "",
          emergencyLastName: "",
          emergencyInitial: "",
          emergencyRelationship: "",
          emergencyAddress: "",
          emergencyBod: "",
          emergencyAge: "",
          emergencyOccupation: "",
          emergencyCivilStatus: "Single",
          emergencyNationality: "",
          emergencyReligion: "",
          emergencyContact: "",
        });

        setIsAddPatientModal(false)
      }
    } catch (error) {
      console.error("Error creating patient profile:", error);
      alert("An error occurred while creating the patient profile.");
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const handleOpenModal = (data) => {
    setIsModalOpen(true);
    setPatientData(data);
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

  const filteredData = PatientData.filter((data) => {
    if (searchType === "ALL") {
      return true;
    } else if (searchType === "NAME") {
      return data.lastName.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchType === "BLOODTYPE") {
      return data.bloodType.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchType === "PUROK") {
      return data.purok.toLowerCase().includes(searchInput.toLowerCase());
    } else if (searchType === "HEALTHCARE SERVICES") {
      return data.healthcareService
        ?.toLowerCase()
        .includes(searchInput.toLowerCase());
    }
    return false;
  });


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024;

    // File size validation
    if (file && file.size > maxFileSize) {
      setError('File size exceeds the 5MB limit.');
      setFormData((prev) => ({ ...prev, profilePicture: null }));
    } else if (file) {
      setError('');
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handlePatientSelection = (data) => {
    setPatientDataSelected(data)
  }

  const handleChangeHealthCare = (event) => {
    setHealthCare(event.target.value);
  };

  console.log('isPrenatal', isPrenatal)
  console.log('healthCare', healthCare)

  return (
    <div className="flex justify-center items-center mt-20">
      {isModalOpen && (
        <PatientModal
          patientData={patientData}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          handlePrint={handlePrint}
          componentRef={componentRef}
          setIsPatientSelect={setIsPatientSelect}
        />
      )}

      {isAddPatientModal && (
        <AddPatientModal
          handleSubmit={handleSubmit}
          formData={formData}
          isSubmitting={isSubmitting}
          handleInputChange={handleInputChange}
          setIsAddPatientModal={setIsAddPatientModal}
          handleFileChange={handleFileChange}
          error={error}
        />
      )}

      {isHealthCareModal && (
        <div className="fixed inset-0 w-full bg-black/20 h-screen flex justify-center items-center z-50">
          <div className="relative bg-white border flex flex-col space-y-4 p-5">
          <label for="healthCare">Select Health Care Service:</label>
            <select onChange={handleChangeHealthCare} value={healthCare} name="healthCare" id="healthCare">
              <option value="">--Select--</option>
              <option value="PRENATAL">PRENATAL</option>
              <option value="IMMUNIZATION">IMMUNIZATION</option>
              <option value="FAMILY PLANNING">FAMILY PLANNING</option>
              <option value="OTHER SERVICES">OTHER SERVICES</option>
            </select>

            <button onClick={() => {
              setIsHealthCareModal(false)
              setIsPrenatal(true)
            }} className="border px-4 py-2 uppercase">ok</button>
          </div>
        </div>
      )}

      {(healthCare === 'PRENATAL' && isPrenatal) && (
        <AddNewPrenatal setHealthCare={setHealthCare} setIsPrenatal={setIsPrenatal}/>
      )}


      {(healthCare === " " || !isPrenatal) && (
        <div className="flex flex-col gap-y-10">
        <h1 className="text-2xl flex justify-center items-center font-semibold">
          PATIENT LIST
        </h1>
        <div className="flex flex-col gap-y-3">
          <div className="flex flex-row justify-center items-center gap-x-2">
            <span>Search by:</span>
            <select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
              className="px-4 py-1 rounded-[12px] bg-zinc-300 outline-none w-[150px]"
            >
              <option value="ALL">ALL</option>
              <option value="NAME">NAME</option>
              <option value="BLOODTYPE">BLOODTYPE</option>
              <option value="PUROK">PUROK</option>
              <option value="HEALTHCARE SERVICES">HEALTHCARE SERVICES</option>
            </select>
            {searchType !== "ALL" && (
              <input
                type="search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-[1.5px] border-zinc-500 rounded-md py-1 px-3 outline-none"
                placeholder={`Search by ${searchType.toLowerCase()}`}
              />
            )}
          </div>

          <div ref={componentRef}>
            <table className="table-auto">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-orange-500 dark:text-slate-800">
                <tr>
                  <th scope="col" className="py-2">
                    No
                  </th>
                  <th scope="col" className="py-2">
                    Patient ID No.
                  </th>
                  <th scope="col" className="py-2">
                    Name
                  </th>
                  <th scope="col" className="py-2">
                    Sex
                  </th>
                  <th scope="col" className="py-2">
                    Blood type
                  </th>
                  <th scope="col" className="py-2">
                    Birthdate
                  </th>
                  <th scope="col" className="py-2">
                    Purok
                  </th>
                  <th scope="col" className="py-2">
                    Contact No.
                  </th>
                  <th scope="col" className="py-2">
                    Date registered
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.length > 0 ? (
                  filteredData.map((data) => (
                    <tr
                      key={data.id}
                      onClick={() => {
                        handlePatientSelection(data) 
                        setIsPatientSelect(true)
                      }}
                      className={`${patientDataSelected.id === data.id ? 'bg-yellow-500' : 'bg-zinc-100'} border-b  dark:border-gray-700 cursor-pointer`}
                    >
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.id}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.patientIdNo}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.lastName} {data.firstName}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.sex}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.bloodType}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.birthdate}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.purok}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.contactUs}
                      </td>
                      <td className="px-4 py-2 text-gray-900 whitespace-nowrap">
                        {data.dateRegistered}
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

          <div className="flex justify-center gap-x-2 mt-5">
            <button
              onClick={handlePrint}
              className="border-[2px] border-zinc-500 text-black font-bold py-2 px-4 rounded"
            >
              Print
            </button>
            <button
              onClick={() => setIsAddPatientModal(!isAddPatientModal)}
              className="border-[2px] border-zinc-500 text-black font-bold py-2 px-4 rounded"
            >
              Add
            </button>
            <button
              className="border-[2px] border-zinc-500 text-black font-bold py-2 px-4 rounded"
            >
              EDIT
            </button>
            <button
              onClick={() => setIsHealthCareModal(!isHealthCareModal)}
              className="border-[2px] border-zinc-500 text-black font-bold py-2 px-4 rounded"
            >
              Healthcare Services
            </button>
            {isPatientSelect && (
              <button
                onClick={() => handleOpenModal(patientDataSelected)}
                className="border-[2px] border-zinc-500 text-black font-bold py-2 px-4 rounded"
              >
                VIEW
              </button>
            )}
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default Patient;
