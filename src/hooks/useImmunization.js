import axios from 'axios'
import { useState } from 'react'
import { IMMUNIZATION } from '../helper/api';

export const useImmunization = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [immunizationData, setImmunizationData] = useState(null);

    const createNewImmunization = async (payload) => {
        try{
            setIsLoading(true);
            const response = await axios.post(IMMUNIZATION, payload);
            console.log(response.data)
            return response.data
        }
        catch(error){
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    const getImmunizationById = async (id) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${IMMUNIZATION}/${id}`);
            console.log(response.data);
            return response.data;
        }
        catch(error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    const getImmunizationByPatient = async (patientId) => {
        try {
            const response = await axios.get(`${IMMUNIZATION}/user/${patientId}`);
            setImmunizationData(response.data.data[0]);
            return response.data.data[0];
        } catch (error) {
            console.error('Error fetching immunization:', error);
            throw error;
        }
    };

    const updateImmunization = async (payload) => {
        try {
            const response = await axios.put(`${IMMUNIZATION}/${payload.userId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Error updating immunization:', error);
            throw error;
        }
    };

    return {
        createNewImmunization,
        getImmunizationById,
        isLoading,
        getImmunizationByPatient,
        updateImmunization,
        immunizationData
    }
}