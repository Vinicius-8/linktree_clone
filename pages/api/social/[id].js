import connectDB from '../../../config/db';
import Social from '../../../models/socialModel.js';
import User from '../../../models/userModel.js';

/**
 * 
 * rota dedicada a pegar todos as socials de um user. ex: /api/socials/{userNickname}
 * 
 * @param {*} id  // id do usuario
 * @param {*} res 
 * @returns 
 */
export default async function handler(req, res){
    const {query: {id}} = req;
    
    if(!id || id === 'undefined'){
        return res.status(404).json({message: 'not found'})
    }

    await connectDB();
    
    const user = await User.findOne({nickname: id})

    if(!user){
        return res.status(404).json({message: 'User not found'})
    }


    // an id from a specific nickname 
    const userId = user._id;

    const allSocials = await Social.find({userId})

    return res.status(200).json({socials: allSocials})
}
