import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RESETPASSCONFIRM } from '../helper/api';
import toast from 'react-hot-toast';


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
            await axios.post(RESETPASSCONFIRM, formData);
            toast.success('Password reset successful');
            navigate('/')
        }
        catch(error){
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
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