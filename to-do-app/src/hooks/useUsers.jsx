import { useState } from "react";
import { userService } from "../services/user.service";


const useAuth = () => {
    const [userRegistration, setuserRegistration] = useState({
        error: '',
        loading: false
    })
    const [userLogindata, setUserLogin] = useState({
        error: '',
        loading: false
    })
    const userRegister = async (userData) => {
        try {
            setuserRegistration({ ...userRegistration, loading: true });
            const response = await userService.signup(userData);
            console.log(response.data.message);
            return true;
        } catch (error) {
            console.log('sdsdd', error.message);

            setuserRegistration({ ...userRegistration, error: "error.message" });
            return false;
        } finally {
            setuserRegistration({ ...userRegistration, loading: false });
        }
    };

    const userLogin = async (loginData) => {
        setUserLogin({ ...loginData, loading: true });
        try {
            const response = await userService.login(loginData);
            setUserLogin({ ...loginData, loading: false });
            return response
        } catch (error) {
            console.log('incorrect');
            setUserLogin({ ...loginData, loading: false });

            return error
        }
    }

    return { userRegister, userRegistration, userLogin, userLogindata }

}

export default useAuth;