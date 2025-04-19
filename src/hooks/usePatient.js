import axios from "axios";
import { PATIENT, FAMILY_PLANNING, PRENATAL, IMMUNIZATION, OTHER_SERVICES } from "../helper/api";
import { useState, useEffect } from "react";

export const usePatient = () => {
    const [patientData, setPatientData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [myProfile, setMyProfile] = useState({});
    const [patientDetails, setPatientDetails] = useState({
        patient: null,
        familyPlanning: null,
        prenatal: null,
        immunization: null,
        otherServices: null
    });

    const getPatients = async () => {
        try {
          setIsLoading(true);
      
          // Fetch all patients
          const response = await axios.get(PATIENT);
          const patients = response.data.patients;
      
          // Sort patients by creation date
          patients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
          // Fetch related data for all patients in parallel
          const patientsWithDetails = await Promise.all(
            patients.map(async (patient) => {
              console.log("Fetching details for patient:", patient.objectId);
      
              // Fetch related data in parallel
              const [familyPlanning, prenatal, immunization, otherServices] = await Promise.all([
                axios
                  .get(`${FAMILY_PLANNING}/user/${patient.objectId}`)
                  .then((res) => res.data.records || null)
                  .catch((error) => {
                    console.warn("Error fetching family planning data:", error);
                    return null;
                  }),
                axios
                  .get(`${PRENATAL}/user/${patient.objectId}`)
                  .then((res) => res.data.data || null)
                  .catch((error) => {
                    console.warn("Error fetching prenatal data:", error);
                    return null;
                  }),
                axios
                  .get(`${IMMUNIZATION}/user/${patient.objectId}`)
                  .then((res) => res.data.data || null)
                  .catch((error) => {
                    console.warn("Error fetching immunization data:", error);
                    return null;
                  }),
                axios
                  .get(`${OTHER_SERVICES}/user/${patient.objectId}`)
                  .then((res) => res.data.data || null)
                  .catch((error) => {
                    console.warn("Error fetching other services data:", error);
                    return null;
                  }),
              ]);
      
              // Combine patient data with related data
              return {
                ...patient,
                familyPlanning,
                prenatal,
                immunization,
                otherServices,
              };
            })
          );
      
          // Update state once with all patient data
          setPatientData(patientsWithDetails);
        } catch (error) {
          console.error("Error fetching patient data:", error);
        } finally {
          setIsLoading(false);
        }
      };

    const getPatientById = async (id) => {

        try {
            const response = await axios.get(PATIENT + `/${id}`);
            const patient = response.data.patient;

            // Initialize variables for related data
            let familyPlanning = null;
            let prenatal = null;
            let immunization = null;
            let otherServices = null;

            // Fetch related data for the patient with error handling
            try {
                const familyPlanningResponse = await axios.get(`${FAMILY_PLANNING}/user/${id}`);
                familyPlanning = familyPlanningResponse.data.records || null;
            } catch (error) {
                console.warn('Error fetching family planning data:', error);
            }

            try {
                const prenatalResponse = await axios.get(`${PRENATAL}/user/${id}`);
                prenatal = prenatalResponse.data.data || null;
            } catch (error) {
                console.warn('Error fetching prenatal data:', error);
            }

            try {
                const immunizationResponse = await axios.get(`${IMMUNIZATION}/user/${id}`);
                immunization = immunizationResponse.data.data || null;
            } catch (error) {
                console.warn('Error fetching immunization data:', error);
            }

            try {
                const otherServicesResponse = await axios.get(`${OTHER_SERVICES}/user/${id}`);
                otherServices = otherServicesResponse.data.data || null;
            } catch (error) {
                console.warn('Error fetching other services data:', error);
            }

            // Combine patient data with related data
            const patientWithDetails = {
                ...patient,
                familyPlanning,
                prenatal,
                immunization,
                otherServices
            };
            
            setMyProfile(patientWithDetails);
            return patientWithDetails; // Return the patient with details
        } catch (error) {
            console.error('Error fetching patient by ID:', error);
            throw error; // Rethrow the error for handling in the calling function
        }
    };

    return {
        patientData,
        patientDetails,
        getPatients,
        getPatientById,
        myProfile,
        isLoading
    }
}
