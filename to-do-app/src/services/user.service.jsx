import axios from 'axios';
const BASE_API = 'http://localhost:8000/api/v1/user';

const signup = async (signupData) => {
    try {
        const response = await axios.post(`${BASE_API}/register`, signupData);
        return response;
    } catch (error) {
        // console.log(error.message);
        throw error;
    }
}

const login = async (loginData) => {
    try {
        const response = await axios.post(`${BASE_API}/login`, loginData);
        return response;
    } catch (error) {
        return error;
    }
}


export const userService = {
    signup,
    login
}