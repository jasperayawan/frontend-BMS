import axios from "axios";
import { PATIENT, FAMILY_PLANNING, PRENATAL, IMMUNIZATION, OTHER_SERVICES } from "../helper/api";
import { useState, useEffect } from "react";

export const usePatient = () => {
    const [patientData, setPatientData] = useState(null);
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
            const response = await axios.get(PATIENT);
            const patients = response.data.patients;

            // Sort patients by creation date
            patients.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            // Fetch related data for each patient
            const patientsWithDetails = await Promise.all(
                patients.map(async (patient) => {
                    try {
                        const [
                            familyPlanningResponse,
                            prenatalResponse,
                            immunizationResponse,
                            otherServicesResponse
                        ] = await Promise.all([
                            axios.get(`${FAMILY_PLANNING}/user/${patient.objectId}`),
                            axios.get(`${PRENATAL}/user/${patient.objectId}`),
                            axios.get(`${IMMUNIZATION}/user/${patient.objectId}`),
                            axios.get(`${OTHER_SERVICES}/user/${patient.objectId}`)
                        ]);

                        return {
                            ...patient,
                            familyPlanning: familyPlanningResponse.data.records || null,
                            prenatal: prenatalResponse.data.data || null,
                            immunization: immunizationResponse.data.data || null,
                            otherServices: otherServicesResponse.data.data || null
                        };
                    } catch (error) {
                        console.warn(`Error fetching details for patient ${patient.objectId}:`, error);
                        return {
                            ...patient,
                            familyPlanning: null,
                            prenatal: null,
                            immunization: null,
                            otherServices: null
                        };
                    }
                })
            );

            setPatientData(patientsWithDetails);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getPatientById = async (id) => {
        try {
            const response = await axios.get(PATIENT + `/${id}`);
            setMyProfile(response.data.patient)
            return response.data.patient;
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
