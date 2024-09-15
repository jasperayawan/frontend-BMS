import axios from 'axios'
import { useState } from 'react'


export const useResetPass = () => {
    const [loading, setLoading] = useState(false);

    const resetPass = async (email) => {
        setLoading(true);

        const formData = {
            email: email
        }

        try{
            const res = await axios.post("http://localhost:8001/api/resetpass/reset-password", formData);
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