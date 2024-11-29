import React, { useState, useRef } from "react";
import { PatientData } from "../helper/DummyData";
import PatientModal from "../components/PatientModal";
import { PATIENT } from "../helper/api";
import AddPatientModal from "../components/patient/AddPatientModal";
import axios from 'axios'
import { toBase64 } from "../utils/toBase64";
import toast from "react-hot-toast";
import AddNewPrenatal from "../components/healthcare_services/AddNewPrenatal";
import PatientTable from '../components/patient/PatientTable';
import printTemplate from '../templates/PatientPrintTemplate.html?raw';
import AddNewImmunization from "../components/healthcare_services/AddNewImmunization";
// import AddNewFamilyPlanning from "../components/healthcare_services/AddNewFamilyPlanning";

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
  const [healthCare, setHealthCare] = useState("default");
  const [isPrenatal, setIsPrenatal] = useState(false)
  const [isImmunization, setIsImmunization] = useState(false)
  const [isFamilyPlanning, setIsFamilyPlanning] = useState(false)
  const [isOtherServices, setIsOtherServices] = useState(false)
  const [isHealthcareActive, setIsHealthcareActive] = useState(false);
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
      try {
        // Replace placeholder with actual content
        const filledTemplate = printTemplate.replace(
          '<div id="content-placeholder"></div>',
          printContent.innerHTML
        );

        printWindow.document.write(filledTemplate);
        printWindow.document.close();

        // Wait for resources to load before printing
        printWindow.onload = () => {
          try {
            printWindow.print();
          } catch (error) {
            console.error('Print failed:', error);
          }
          setIsPrint(false);
        };

      } catch (error) {
        console.error('Error preparing print document:', error);
        setIsPrint(false);
      }
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


  const handleHealthcareSelection = () => {
    setIsHealthCareModal(false)
    setIsHealthcareActive(true);

    if (healthCare === 'PRENATAL') {
      setIsPrenatal(true)
    } else if (healthCare === 'IMMUNIZATION') {
      setIsImmunization(true)
    } else if (healthCare === 'FAMILY PLANNING') {
      setIsFamilyPlanning(true)
    } else if (healthCare === 'OTHER SERVICES') {
      setIsOtherServices(true)
    }
  }

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

            <button onClick={handleHealthcareSelection} className="border px-4 py-2 uppercase">ok</button>
          </div>
        </div>
      )}

      {(isPrenatal) && (
        <AddNewPrenatal setHealthCare={setHealthCare} setIsPrenatal={setIsPrenatal} setIsHealthcareActive={setIsHealthcareActive} />
      )}

      {(isImmunization) && (
        <AddNewImmunization setHealthCare={setHealthCare} setIsImmunization={setIsImmunization} setIsHealthcareActive={setIsHealthcareActive} />
      )}

      {/* {(healthCare === 'FAMILY PLANNING' && isFamilyPlanning) && (
        <AddNewFamilyPlanning setHealthCare={setHealthCare} setIsFamilyPlanning={setIsFamilyPlanning}/>
      )} */}

      {!isHealthcareActive && (
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

            <PatientTable
              filteredData={filteredData}
              handlePatientSelection={(data) => {
                handlePatientSelection(data);
                setIsPatientSelect(true);
              }}
              patientDataSelected={patientDataSelected}
              componentRef={componentRef}
            />

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
