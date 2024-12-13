import React, { useState, useRef, useEffect } from "react";
import PatientModal from "../components/PatientModal";
import { PATIENT } from "../helper/api";
import AddPatientModal from "../components/patient/AddPatientModal";
import axios from "axios";
import { toBase64 } from "../utils/toBase64";
import toast from "react-hot-toast";
import AddNewPrenatal from "../components/healthcare_services/AddNewPrenatal";
import PatientTable from "../components/patient/PatientTable";
import printTemplate from "../templates/PatientPrintTemplate.html?raw";
import AddNewImmunization from "../components/healthcare_services/AddNewImmunization";
import EditFamilyPlanning from "../components/healthcare_services/EditFamilyPlanning";
import AddNewFamilyPlanning from "../components/healthcare_services/AddNewFamilyPlanning";
import AddNewOtherServices from "../components/healthcare_services/AddNewOtherServices";
import { usePatient } from "../hooks/usePatient";
import EditImmunization from "../components/healthcare_services/EditImmunization";
import EditPrenatal from "../components/healthcare_services/EditPrenatal";
import EditOtherServices from "../components/healthcare_services/EditOtherServices";
import Parse from "parse/dist/parse.min.js";

const Patient = () => {
  const [searchType, setSearchType] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [isPrint, setIsPrint] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [patientDataView, setPatientDataView] = useState(null);
  const [isAddPatientModal, setIsAddPatientModal] = useState(false);
  const [isAddNewPrenatal, setIsAddNewPrenatal] = useState(false);
  const [isHealthCareModal, setIsHealthCareModal] = useState(false);
  const [isPatientSelect, setIsPatientSelect] = useState(false);
  const [patientDataSelected, setPatientDataSelected] = useState({});
  const [healthCare, setHealthCare] = useState("default");
  const [isPrenatal, setIsPrenatal] = useState(false);
  const [isImmunization, setIsImmunization] = useState(false);
  const [isFamilyPlanning, setIsFamilyPlanning] = useState(false);
  const [isOtherServices, setIsOtherServices] = useState(false);
  const [isHealthcareActive, setIsHealthcareActive] = useState(false);
  const [isEditHealthCareModal, setIsEditHealthCareModal] = useState(false);
  const [isEditFamilyPlanning, setIsEditFamilyPlanning] = useState(false);
  const [isEditImmunization, setIsEditImmunization] = useState(false);
  const [isEditPrenatal, setIsEditPrenatal] = useState(false);
  const [isEditOtherServices, setIsEditOtherServices] = useState(false);
  const [healthCareAddorEdit, setHealthCareAddorEdit] = useState(false);
  const { patientData, getPatients, isLoading } = usePatient();
  const user = Parse.User.current();
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
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const componentRef = useRef(null);

  const calculateAge = (dateString) => {
    const today = new Date();
    const birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'bod') {
      const age = calculateAge(value);
      setFormData((prev) => ({ ...prev, age }));
  }
  
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.profilePicture) {
      toast.error("Please upload a profile picture.");
      return;
    }
    setIsSubmitting(true);

    try {
      const imageBase64 = formData.profilePicture
        ? await toBase64(formData.profilePicture)
        : null;

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
        setIsAddPatientModal(false);
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
        // Get the Tailwind CSS stylesheet
        const tailwindStyles =
          document.querySelector("style[data-tailwind]")?.innerHTML || "";

        // Replace placeholder with actual content and add Tailwind styles
        const filledTemplate = printTemplate
          .replace(
            "</head>",
            `<script src="https://cdn.tailwindcss.com"></script>
             <style>${tailwindStyles}</style>
             </head>`
          )
          .replace(
            '<div id="content-placeholder"></div>',
            printContent.innerHTML
          );

        printWindow.document.write(filledTemplate);
        printWindow.document.close();

        // Wait for Tailwind to initialize and resources to load
        printWindow.onload = () => {
          setTimeout(() => {
            try {
              printWindow.print();
            } catch (error) {
              console.error("Print failed:", error);
            }
            setIsPrint(false);
          }, 500); // Small delay to ensure Tailwind is initialized
        };
      } catch (error) {
        console.error("Error preparing print document:", error);
        setIsPrint(false);
      }
    }
  };

  const handleSearch = () => {
    setHasSearched(true);
    
    if (searchType === "ALL") {
      setSearchResults([]);
      setSearchInput("");
      setHasSearched(false);
      return;
    }

    const results = Array.isArray(patientData)
      ? patientData.filter((data) => {
          if (searchType === "NAME") {
            return data.lastname
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          } else if (searchType === "BLOODTYPE") {
            return data.bloodType === searchInput;
          } else if (searchType === "PUROK") {
            return data.purok.toLowerCase().includes(searchInput.toLowerCase());
          } else if (searchType === "HEALTHCARE SERVICES") {
            switch (searchInput) {
              case "PRENATAL":
                return data.prenatal && data.prenatal.length > 0;
              case "IMMUNIZATION":
                return data.immunization && data.immunization.length > 0;
              case "FAMILY PLANNING":
                return data.familyPlanning && data.familyPlanning.length > 0;
              case "OTHER SERVICES":
                return data.otherServices && data.otherServices.length > 0;
              default:
                return true;
            }
          }
          return false;
        })
      : [];
    
    setSearchResults(results);
  };

  // Reset search state when changing search type
  useEffect(() => {
    if (searchType === "ALL") {
      setSearchResults([]);
      setSearchInput("");
      setHasSearched(false);
    } else {
      setHasSearched(false);
      setSearchResults([]);
    }
  }, [searchType]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    const maxFileSize = 5 * 1024 * 1024;

    // File size validation
    if (file && file.size > maxFileSize) {
      setError("File size exceeds the 5MB limit.");
      setFormData((prev) => ({ ...prev, profilePicture: null }));
    } else if (file) {
      setError("");
      setFormData((prev) => ({ ...prev, profilePicture: file }));
    }
  };

  const handlePatientSelection = (data) => {
    setPatientDataSelected(data);
  };

  const handleChangeHealthCare = (event) => {
    setHealthCare(event.target.value);
  };

  const handleHealthcareSelection = () => {
    setIsHealthCareModal(false);
    setIsHealthcareActive(true);

    if (healthCare === "PRENATAL") {
      if (healthCareAddorEdit === "EDIT") {
        setIsEditPrenatal(true);
        setIsHealthCareModal(false);
        setIsEditHealthCareModal(false);
      } else {
        setIsPrenatal(true);
      }
    } else if (healthCare === "IMMUNIZATION") {
      if (healthCareAddorEdit === "EDIT") {
        setIsEditImmunization(true);
        setIsHealthCareModal(false);
        setIsEditHealthCareModal(false);
      } else {
        setIsImmunization(true);
      }
    } else if (healthCare === "FAMILY PLANNING") {
      if (healthCareAddorEdit === "EDIT") {
        setIsEditFamilyPlanning(true);
        setIsHealthCareModal(false);
        setIsEditHealthCareModal(false);
      } else {
        setIsFamilyPlanning(true);
      }
    } else if (healthCare === "OTHER SERVICES") {
      if (healthCareAddorEdit === "EDIT") {
        setIsEditOtherServices(true);
        setIsHealthCareModal(false);
        setIsEditHealthCareModal(false);
      } else {
        setIsOtherServices(true);
      }
    }
  };

  const handleHealthcareServicesModal = (data) => {
    if (data === "EDIT") {
      setIsEditHealthCareModal(true);
    } else if (data === "HEALTHCARE SERVICES") {
      setIsHealthCareModal(true);
    }
  };

  useEffect(() => {
    getPatients();
  }, []);

  return (
    <div className="flex justify-center items-center py-8">
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
        <div className="fixed inset-0 w-full bg-black/50 h-screen flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="relative bg-white border rounded-lg shadow-xl flex flex-col justify-center items-center space-y-6 p-8 w-[400px] animate-fadeIn">
            <button
              onClick={() => setIsHealthCareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src="/sanfranciscologo.png"
              alt="sanfrancisco logo"
              className="w-32 h-20 object-contain"
            />

            <div className="w-full space-y-2">
              <label
                htmlFor="healthCare"
                className="block text-sm font-medium text-gray-700"
              >
                Select Health Care Service
              </label>
              <select
                onChange={handleChangeHealthCare}
                value={healthCare}
                name="healthCare"
                id="healthCare"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              >
                <option value="">--Select a service--</option>
                <option value="PRENATAL">Prenatal Care</option>
                <option value="IMMUNIZATION">Immunization</option>
                <option value="FAMILY PLANNING">Family Planning</option>
                <option value="OTHER SERVICES">Other Services</option>
              </select>
            </div>

            <button
              onClick={handleHealthcareSelection}
              disabled={!healthCare}
              className={`w-full px-6 py-3 rounded-md text-white font-medium uppercase tracking-wide transition-all
                ${
                  healthCare
                    ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      {isEditHealthCareModal && (
        <div className="fixed inset-0 w-full bg-black/50 h-screen flex justify-center items-center z-50 backdrop-blur-sm">
          <div className="relative bg-white border rounded-lg shadow-xl flex flex-col justify-center items-center space-y-6 p-8 w-[400px] animate-fadeIn">
            <button
              onClick={() => setIsEditHealthCareModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <img
              src="/sanfranciscologo.png"
              alt="sanfrancisco logo"
              className="w-32 h-20 object-contain"
            />

            <div className="w-full space-y-2">
              <label
                htmlFor="healthCare"
                className="block text-sm font-medium text-gray-700"
              >
                Select Health Care Service
              </label>
              <select
                onChange={handleChangeHealthCare}
                value={healthCare}
                name="healthCare"
                id="healthCare"
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
              >
                <option value="">--Select a service--</option>
                <option value="PRENATAL">Prenatal Care</option>
                <option value="IMMUNIZATION">Immunization</option>
                <option value="FAMILY PLANNING">Family Planning</option>
                <option value="OTHER SERVICES">Other Services</option>
              </select>
            </div>

            <button
              onClick={handleHealthcareSelection}
              disabled={!healthCare}
              className={`w-full px-6 py-3 rounded-md text-white font-medium uppercase tracking-wide transition-all
                ${
                  healthCare
                    ? "bg-orange-500 hover:bg-orange-600 active:bg-orange-700"
                    : "bg-gray-300 cursor-not-allowed"
                }`}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      )}

      {isPrenatal && (
        <AddNewPrenatal
          patientDataSelected={patientDataSelected}
          setHealthCare={setHealthCare}
          setIsPrenatal={setIsPrenatal}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

      {isImmunization && (
        <AddNewImmunization
          patientDataSelected={patientDataSelected}
          setHealthCare={setHealthCare}
          setIsImmunization={setIsImmunization}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

      {isFamilyPlanning && (
        <AddNewFamilyPlanning
          patientDataSelected={patientDataSelected}
          setHealthCare={setHealthCare}
          setIsFamilyPlanning={setIsFamilyPlanning}
          setIsHealthcareActive={setIsHealthcareActive}
        />
      )}

      {isOtherServices && (
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
          <h1 className="text-2xl text-center font-semibold text-gray-800 bg-yellow-500 w-[max-content] mx-auto px-28 py-2 my-7">
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
              {searchType === "NAME" && (
                <div className="flex gap-x-2">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="border-[1.5px] border-zinc-500 rounded-md py-1 px-3 outline-none"
                    placeholder="Search by name"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                      />
                    </svg>
                  </button>
                </div>
              )}
              {searchType === "PUROK" && (
                <div className="flex gap-x-2">
                  <input
                    type="search"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="border-[1.5px] border-zinc-500 rounded-md py-1 px-3 outline-none"
                    placeholder="Search by purok"
                  />
                  <button
                    onClick={handleSearch}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                      />
                    </svg>
                  </button>
                </div>
              )}
              {searchType === "BLOODTYPE" && (
                <div className="flex gap-x-2">
                  <select
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="px-4 py-1 rounded-[12px] bg-zinc-300 outline-none w-[150px]"
                  >
                    <option value="">All Blood Types</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                  <button
                    onClick={handleSearch}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                      />
                    </svg>
                  </button>
                </div>
              )}
              {searchType === "HEALTHCARE SERVICES" && (
                <div className="flex gap-x-2">
                  <select
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="px-4 py-1 rounded-[12px] bg-zinc-300 outline-none w-[150px]"
                  >
                    <option value="">All Services</option>
                    <option value="PRENATAL">Prenatal</option>
                    <option value="IMMUNIZATION">Immunization</option>
                    <option value="FAMILY PLANNING">Family Planning</option>
                    <option value="OTHER SERVICES">Other Services</option>
                  </select>
                  <button
                    onClick={handleSearch}
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-md transition-colors"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      strokeWidth={2} 
                      stroke="currentColor" 
                      className="w-5 h-5"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" 
                      />
                    </svg>
                  </button>
                </div>
              )}
            </div>

            <PatientTable
              filteredData={hasSearched ? searchResults : patientData}
              handlePatientSelection={(data) => {
                handlePatientSelection(data);
                setIsPatientSelect(true);
              }}
              patientDataSelected={patientDataSelected}
              componentRef={componentRef}
              onRowDoubleClick={(data) => handleOpenModal(data)}
              searchType={searchType}
              searchInput={searchInput}
              hasSearched={hasSearched}
            />

            <div className="flex justify-center gap-2 mt-5">
              {user &&
                user.get("role") !== "PATIENT" &&
                user.get("role") !== "SECRETARY" &&
                user.get("role") !== "ADMIN" &&
                user.get("role") !== " " && (
                  <>
                    <button
                      onClick={() => setIsAddPatientModal(!isAddPatientModal)}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add
                    </button>

                    <button
                      onClick={() => {
                        handleHealthcareServicesModal("EDIT");
                        setHealthCareAddorEdit("EDIT");
                      }}
                      className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        handleHealthcareServicesModal("HEALTHCARE SERVICES");
                        setHealthCareAddorEdit("ADD");
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
                    >
                      Healthcare Services
                    </button>
                  </>
                )}
              <button
                onClick={handlePrint}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                    clipRule="evenodd"
                  />
                </svg>
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
