import axios from 'axios'
import { setCookie, deleteCookie } from 'cookies-next';


import { server } from '../../config';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const API_URL = '/api/user/';

const login  = async(userData) =>{
    const response = await axios.post(server + API_URL + 'login', userData)
    if(response.data){
        setCookie('user', JSON.stringify(response.data));
    }

    return response.data;
}

const registerUser = async(userData)=>{
    const response = await axios.post(server + API_URL + 'register', userData)
    
    if(response.data){
        setCookie('user', JSON.stringify(response.data));
    }
    return response.data
}



//logout 
const logout = () =>{
    deleteCookie('user');
}

const authService = {
    logout,
    login,
    registerUser
}
export default authService;