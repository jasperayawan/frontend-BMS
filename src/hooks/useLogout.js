import { useState } from "react"
import Parse from 'parse/dist/parse.min.js';
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);

        try{
            await Parse.User.logOut();
            localStorage.removeItem("sessionToken")
            navigate('/')
        }
        catch(error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        logout
    }
}