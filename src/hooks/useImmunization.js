import axios from 'axios'
import { useState } from 'react'
import { IMMUNIZATION } from '../helper/api';
import toast from 'react-hot-toast';

export const useImmunization = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [immunizationData, setImmunizationData] = useState(null);

    const createNewImmunization = async (payload, user) => {
        try{
            setIsLoading(true);
            const formData = {
                nurseIncharge: user?.id,
                ...payload
            }

            const response = await axios.post(IMMUNIZATION, formData);
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

    const updateImmunization = async (payload, immunizationId) => {
        try {
            const response = await axios.put(`${IMMUNIZATION}/${immunizationId}`, payload);
            toast.success('Immunization record updated successfully');
            return response.data;
        } catch (error) {
            console.error('Error updating immunization:', error);
            toast.error('Failed to update immunization record');
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