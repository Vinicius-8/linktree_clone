import axios from 'axios'
import { setCookie, deleteCookie } from 'cookies-next';
import { decodeJwt } from 'jose';


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

const getAllUsers = async ()=>{
    const response = await axios.get(server + API_URL + 'all')
    return response.data
}


const authToken = async (req) =>{
    let token;

    if(req.headers.authorization && req.headers.authorization.includes('Bearer')){
        try {
            //get token from header
            
            let splitAuth = req.headers.authorization.split(' ')
            token = splitAuth[0] === 'Bearer'? splitAuth[1] : splitAuth[0];        
            
            // verify token
            const decoded = decodeJwt(token, process.env.SECRET_JWT); 
            return decoded.id;
            
        } catch (error) {
            return null;
        }        
    }
    
    if(!token){
        return null;
    }
}




//logout 
const logout = () =>{
    deleteCookie('user');
}

const authService = {
    logout,
    login,
    registerUser,
    authToken,
    getAllUsers
}
export default authService;