import axios from 'axios'       //frontend
import { server } from '../../config';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const API_URL = '/api/social/';

const createSocial  = async(socialData, token) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.post(server + API_URL, socialData, config)
    return response.data;
}

const updateSocial  = async(socialId, socialData, token) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.put(server + API_URL + socialId, socialData, config)
    return response.data;
}

/**
 * 
 * @param {String} token do usuario
 * @returns 
 */
const getSocials = async(token)=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(server + API_URL , config=config)
    return response.data
}


const deleteSocial= async(token, socialId)=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.delete(server + API_URL + socialId, config=config)
    return response.data
}

const projectController ={
    createSocial,
    getSocials,
    deleteSocial,
    updateSocial
}

export default projectController