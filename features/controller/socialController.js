import axios from 'axios'       //frontend
import { server } from '../../config';
// axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*'

const API_URL = '/api/social/';


// CREATE
const createSocial  = async(socialData, token) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const response = await axios.post(server + API_URL, socialData, config)
    return response.data;
}


// UPDATE
const updateSocial  = async(socialData, token) =>{
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    
    const response = await axios.put(server + API_URL, socialData, config)
    return response.data;
}

/**
 * 
 * @param {String} token do usuario
 * @returns 
 */

// GET
const getSocials = async(userNickname)=>{
    const config = {
        //headers: { Authorization: `Bearer ${token}` }
    };
    const response = await axios.get(server + API_URL + userNickname , config=config)
    return response.data
}


// DELETE
const deleteSocial= async( social, token)=>{
    const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: social
    };

    const response = await axios.delete(server + API_URL, config)
    return response.data
}

const projectController ={
    createSocial,
    getSocials,
    deleteSocial,
    updateSocial
}

export default projectController