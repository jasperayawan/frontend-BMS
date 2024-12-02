import axios from 'axios'
import { PRENATAL } from '../helper/api';
import { useState } from 'react';

export const usePrenatal = () => {
    const [isLoading, setIsLoading] = useState(false);

    const createNewPrenatal = async () => {
        setIsLoading(true)
    
        try{
            const res = await axios.post(PRENATAL);
            console.log(res.data);
        }
        catch(error){
            console.log(error)   
        } finally {
            setIsLoading(false)
        }
    }

    return {
        createNewPrenatal,
        isLoading
    }
}