import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESETPASSCONFIRM } from '../helper/api';


export const useNewPass = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const newPass = async (token, newPassword) => {
        setLoading(true);

        const formData = {
            token: token,
            newPassword: newPassword
        }

        try{
            const res = await axios.post(RESETPASSCONFIRM, formData);
            navigate('/')
            console.log(res.data)
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
        newPass
    }
}