import axios from 'axios'
import { PRENATAL } from '../helper/api';
import { useState } from 'react';

export const usePrenatal = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [prenatalData, setPrenatalData] = useState(null);
    const [prenatalHistory, setPrenatalHistory] = useState(null);

    const createNewPrenatal = async (formData, user) => {
        try {
            setIsLoading(true);
            const payload = {
                nurseIncharge: user?.id,
                ...formData
            }
            const response = await axios.post(PRENATAL, payload);
            return response.data;
        } catch (error) {
            console.error('Error creating prenatal record:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    const getPrenatalByUserId = async (userId) => {
        try {
            const response = await axios.get(`${PRENATAL}/user/${userId}`);
            setPrenatalData(response.data.data[0]);
            return response.data.data[0];
        } catch (error) {
            throw error;
        }
    };

    const getPrenatalByUserIdHistory = async (userId) => {
        try {
            const response = await axios.get(`${PRENATAL}/user/${userId}`);
            setPrenatalHistory(response.data.data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const updatePrenatal = async (data) => {
        try {
            const response = await axios.put(`${PRENATAL}/${data.objectId}`, data);
            return response.data;
        } catch (error) {
            throw error;
        }
    };

    return {
        createNewPrenatal,
        isLoading,
        getPrenatalByUserId,
        prenatalData,
        updatePrenatal,
        getPrenatalByUserIdHistory,
        prenatalHistory
    }
}