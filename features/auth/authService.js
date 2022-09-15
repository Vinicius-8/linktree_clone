import axios from 'axios'
import { setCookie } from 'cookies-next';


import { server } from '../../config';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const API_URL = '/api/user/';

const login  = async(userData) =>{
    let conca  = 'fectvhin: '+ server +API_URL + 'login'
    console.log(conca);
    const response = await axios.post(server + API_URL + 'login', userData)
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data)) // é jogado no local storage mas não é recomendado por questao de seguranca
        // setCookie('user', JSON.stringify(response.data), { path: '/' });
        setCookie('user', JSON.stringify(response.data));
    }

    return response.data;
}

const registerUser = async(userData)=>{
    const response = await axios.post(server + API_URL + 'register', userData)
    
    if(response.data){
        localStorage.setItem('user', JSON.stringify(response.data))
        //setCookie('user', JSON.stringify(response.data), { path: '/' });
        setCookie('user', JSON.stringify(response.data));
    }
    return response.data
}



//logout 
const logout = () =>{
    localStorage.removeItem('user');
    deleteCookie('user');
}

const authService = {
    logout,
    login,
    registerUser
}
export default authService;