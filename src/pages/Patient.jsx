import React, { useState, useRef, useEffect } from "react";
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
import EditFamilyPlanning from "../components/healthcare_services/EditFamilyPlanning";
import AddNewFamilyPlanning from "../components/healthcare_services/AddNewFamilyPlanning";
import AddNewOtherServices from "../components/healthcare_services/AddNewOtherServices";
import { usePatient } from "../hooks/usePatient";
import EditImmunization from "../components/healthcare_services/EditImmunization";
import EditPrenatal from "../components/healthcare_services/EditPrenatal";
import EditOtherServices from "../components/healthcare_services/EditOtherServices";

const Patient = () => {
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientDataView, setPatientDataView] = useState(null);
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
  const [isEditHealthCareModal, setIsEditHealthCareModal] = useState(false);
  const [isEditFamilyPlanning, setIsEditFamilyPlanning] = useState(false);  
  const [isEditImmunization, setIsEditImmunization] = useState(false);
  const [isEditPrenatal, setIsEditPrenatal] = useState(false);
  const [isEditOtherServices, setIsEditOtherServices] = useState(false);
  const [healthCareAddorEdit, setHealthCareAddorEdit] = useState(false);
  const { patientData, getPatients, isLoading } = usePatient();
  const [formData, setFormData] = useState({
    // Patient fields
    profilePicture: null,
    firstname: "",
    lastname: "",
    middleInitial: "",
    sex: "",
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
          sex: "",
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
        window.location.reload();
        setIsAddPatientModal(false)
      }
    } catch (error) {
      console.error("Error creating patient profile:", error);
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false); // End submission
    }
  };

  const handleOpenModal = (data) => {
    setIsModalOpen(true);
    setPatientDataView(data);
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

  const filteredData = Array.isArray(patientData) ? patientData.filter((data) => {
    if (searchType === "ALL") {
      return true;
    } else if (searchType === "NAME") {
      return data.lastname.toLowerCase().includes(searchInput.toLowerCase());
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
  }) : [];


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
    setIsHealthCareModal(false);
    setIsHealthcareActive(true);

    if (healthCare === 'PRENATAL') {
      if(healthCareAddorEdit === 'EDIT'){
        setIsEditPrenatal(true);
        setIsHealthCareModal(false)
        setIsEditHealthCareModal(false)
      } else {
        setIsPrenatal(true);
      }
    } else if (healthCare === 'IMMUNIZATION') {
      if(healthCareAddorEdit === 'EDIT'){
        setIsEditImmunization(true);
        setIsHealthCareModal(false)
        setIsEditHealthCareModal(false)
      } else {
        setIsImmunization(true);
      }
    } else if (healthCare === 'FAMILY PLANNING') {
      if(healthCareAddorEdit === 'EDIT'){
        setIsEditFamilyPlanning(true);
        setIsHealthCareModal(false)
        setIsEditHealthCareModal(false)
      } else {
        setIsFamilyPlanning(true);
      }
    } else if (healthCare === 'OTHER SERVICES') {
      if(healthCareAddorEdit === 'EDIT'){
        setIsEditOtherServices(true);
        setIsHealthCareModal(false)
        setIsEditHealthCareModal(false)
      } else {
        setIsOtherServices(true);
      }
    }
  };

  const handleHealthcareServicesModal = (data) => {
    if (data === 'EDIT') {
      setIsEditHealthCareModal(true);
    } else if (data === 'HEALTHCARE SERVICES') {
      setIsHealthCareModal(true)
    }
  }


  useEffect(() => {
    getPatients();
  }, []);
  

  return (
    <div className="flex justify-center items-center mt-20">
      {isModalOpen && (
        <PatientModal
          patientData={patientDataView}
          setIsModalOpen={setIsModalOpen}
          isModalOpen={isModalOpen}
          handlePrint={handlePrint}
          componentRef={componentRef}
          setIsPatientSelect={setIsPatientSelect}
          patientDataSelected={patientDataSelected}
        />
      )}

      {isAddPatientModal && (
        <AddPatientModal
          setFormData={setFormData}
          setError={setError}
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
            <button 
              onClick={() => setIsHealthCareModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
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

      {isEditHealthCareModal && (
        <div className="fixed inset-0 w-full bg-black/20 h-screen flex justify-center items-center z-50">
          <div className="relative bg-white border flex flex-col space-y-4 p-5">
            <button 
              onClick={() => setIsEditHealthCareModal(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ✕
            </button>
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
        <AddNewPrenatal patientDataSelected={patientDataSelected} setHealthCare={setHealthCare} setIsPrenatal={setIsPrenatal} setIsHealthcareActive={setIsHealthcareActive} />
      )}

      {(isImmunization) && (
        <AddNewImmunization patientDataSelected={patientDataSelected} setHealthCare={setHealthCare} setIsImmunization={setIsImmunization} setIsHealthcareActive={setIsHealthcareActive} />
      )}

      {(isFamilyPlanning) && (
        <AddNewFamilyPlanning patientDataSelected={patientDataSelected} setHealthCare={setHealthCare} setIsFamilyPlanning={setIsFamilyPlanning} setIsHealthcareActive={setIsHealthcareActive} />
      )}

      {(isOtherServices) && (
        <AddNewOtherServices 
          patientDataSelected={patientDataSelected}
          setHealthCare={setHealthCare} 
          setIsOtherServices={setIsOtherServices} 
          setIsHealthcareActive={setIsHealthcareActive} 
        />
      )}

      {isEditFamilyPlanning && (
        <EditFamilyPlanning
          setHealthCare={setHealthCare}
          patientDataSelected={patientDataSelected}
          setIsFamilyPlanning={setIsEditFamilyPlanning}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

      {isEditImmunization && (
        <EditImmunization
          setHealthCare={setHealthCare}
          patientDataSelected={patientDataSelected}
          setIsImmunization={setIsEditImmunization}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

      {isEditPrenatal && (
        <EditPrenatal
          setHealthCare={setHealthCare}
          patientDataSelected={patientDataSelected}
          setIsPrenatal={setIsEditPrenatal}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

      {isEditOtherServices && (
        <EditOtherServices
          setHealthCare={setHealthCare}
          patientDataSelected={patientDataSelected}
          setIsOtherServices={setIsEditOtherServices}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

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
              onRowDoubleClick={(data) => handleOpenModal(data)}
            />

            <div className="flex justify-center gap-x-2 mt-5">
              <button
                onClick={() => setIsAddPatientModal(!isAddPatientModal)}
                className="border-[2px] text-sm border-zinc-500 text-black font-bold py-2 px-4 bg-zinc-200"
              >
                Add
              </button> 
              <button
                onClick={() => { 
                  handleHealthcareServicesModal('EDIT') 
                  setHealthCareAddorEdit('EDIT')
                }}
                className="border-[2px] text-sm border-zinc-500 text-black font-bold py-2 px-4 bg-zinc-200"
              >
                EDIT
              </button>
              <button
                onClick={() => {
                  handleHealthcareServicesModal('HEALTHCARE SERVICES')
                  setHealthCareAddorEdit('ADD')
                }}
                className="border-[2px] text-sm border-zinc-500 text-black font-bold py-2 px-4 bg-zinc-200"
              >
                Healthcare Services
              </button>
              <button
                onClick={handlePrint}
                className="border-[2px] text-sm border-zinc-500 text-black font-bold py-2 px-4 bg-zinc-200"
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Patient;
