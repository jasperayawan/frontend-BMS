import { useState } from "react"
import Parse from 'parse/dist/parse.min.js';
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
    const [loadingLoading, setLoading] = useState(false);
    const navigate = useNavigate();

    const logout = async () => {
        setLoading(true);

        try{
            await Parse.User.logOut();
            localStorage.removeItem("sessionToken")
            window.location.reload();
        }
        catch(error){
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return {
        loadingLoading,
        logout
    }
}