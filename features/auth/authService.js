import axios from 'axios'
import { useCookies } from "react-cookie";

import { server } from '../../config';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const API_URL = '/api/user/';
const [cookies, setCookie, removeCookie] = useCookies(["user"]);

const login  = async(userData) =>{
    const response = await axios.post(server + API_URL + 'login', userData)

    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data)) // é jogado no local storage mas não é recomendado por questao de seguranca

        setCookie('user', JSON.stringify(response.data), { path: '/' });
    }

    return response.data;
}

const registerUser = async(userData)=>{
    const response = await axios.post(server + API_URL + 'register', userData)
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        setCookie('user', JSON.stringify(response.data), { path: '/' });
    }
    return response.data
}



//logout 
const logout = () =>{
    localStorage.removeItem('user');
    removeCookie('user')
}

const authService = {
    logout,
    login,
    registerUser
}
export default authService;