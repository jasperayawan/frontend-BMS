import axios from 'axios'
import { useState } from 'react'
import { RESETPASS } from '../helper/api';


export const useResetPass = () => {
    const [loading, setLoading] = useState(false);

    const resetPass = async (email) => {
        setLoading(true);

        const formData = {
            email: email
        }

        try{
            const res = await axios.post(RESETPASS, formData);
            console.log(res.data);
        }
        catch(error){
            console.log(error.response.data.message)
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