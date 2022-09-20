import connectDB from '../../../config/db';
import Social from '../../../models/socialModel.js';
import authService from '../../../features/auth/authService';

export default async function handler(req, res){
    await connectDB();

    const userId = await authService.authToken(req);

    if(!userId){
        return res.status(401).json({message: "Not a valid token"})
    }

    if(req.method === 'POST'){
        if(req.body){
            const {social, link} = req.body;
            

            if(!social || !link){ // tem social e link no request
                return res.status(400).json({message: "Bad request"})
            }

            const socialCreated = await Social.create({social, link, userId})

            return res.status(200).json({
                _id: socialCreated.id,
                social: socialCreated.social,
                link: socialCreated.link,
                userId: socialCreated.userId
            });
        }
    }
}
