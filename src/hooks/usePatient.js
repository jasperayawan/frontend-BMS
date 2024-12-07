import axios from "axios";
import { PATIENT, FAMILY_PLANNING, PRENATAL, IMMUNIZATION } from "../helper/api";
import { useState, useEffect } from "react";

export const usePatient = () => {
    const [patientData, setPatientData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [patientDetails, setPatientDetails] = useState({
        patient: null,
        familyPlanning: null,
        prenatal: null,
        immunization: null
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
                            immunizationResponse
                        ] = await Promise.all([
                            axios.get(`${FAMILY_PLANNING}/user/${patient.objectId}`),
                            axios.get(`${PRENATAL}/user/${patient.objectId}`),
                            axios.get(`${IMMUNIZATION}/user/${patient.objectId}`)
                        ]);

                        return {
                            ...patient,
                            familyPlanning: familyPlanningResponse.data.records?.[0] || null,
                            prenatal: prenatalResponse.data.data?.[0] || null,
                            immunization: immunizationResponse.data.data?.[0] || null
                        };
                    } catch (error) {
                        console.warn(`Error fetching details for patient ${patient.objectId}:`, error);
                        return {
                            ...patient,
                            familyPlanning: null,
                            prenatal: null,
                            immunization: null
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

    return {
        patientData,
        patientDetails,
        getPatients,
        isLoading
    }
}
