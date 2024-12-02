import axios from "axios";
import { PATIENT } from "../helper/api";
import { useState, useEffect } from "react";

export const usePatient = () => {
    const [patientData, setPatientData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getPatients = async () => {
        try {
            setIsLoading(true);
            const response = await axios.get(PATIENT);
            setPatientData(response.data.patients);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        patientData,
        getPatients,
        isLoading
    }
}
