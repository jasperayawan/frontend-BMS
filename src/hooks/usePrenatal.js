import axios from 'axios'
import { PRENATAL } from '../helper/api';
import { useState } from 'react';

export const usePrenatal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createNewPrenatal = async (formData) => {
        try {
            setIsLoading(true);
            const response = await axios.post(PRENATAL, formData);
            console.log(response.data)
            return response.data;
        } catch (error) {
            console.error('Error creating prenatal record:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    }

    return {
        createNewPrenatal,
        isLoading
    }
}