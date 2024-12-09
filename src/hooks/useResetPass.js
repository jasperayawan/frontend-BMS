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
            const res = await axios.post(RESETPASS, formData);
            toast.success(res.data.message);
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