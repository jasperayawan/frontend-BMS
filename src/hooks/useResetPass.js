import axios from 'axios'
import { useState } from 'react'
import { RESETPASS } from '../helper/api';
import toast from 'react-hot-toast';


export const useResetPass = () => {
    const [loading, setLoading] = useState(false);

    const resetPass = async (email) => {
        setLoading(true);

        const formData = {
            email: email
        }

        try{
            await axios.post(RESETPASS, formData);
            toast.success("PASSWORD RECOVERY WAS ALREADY SENT TO YOUR EMAIL");
        }
        catch(error){
            console.log(error.response.data.message)
            toast.error(error.response.data.message);
        }
        finally{
            setLoading(false)
        }
    }

    return {
        loading,
        resetPass
    }
}