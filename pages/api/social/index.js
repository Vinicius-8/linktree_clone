import connectDB from '../../../config/db';
import Social from '../../../models/socialModel.js';
import authService from '../../../features/auth/authService';


/**     
 *      route: /api/social/
 * 
 * Handler for create and update of social
 */
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

            const socialCreated = await Social.create({social, link, userId});
            
            return res.status(200).json({
                _id: socialCreated.id,
                social: socialCreated.social,
                link: socialCreated.link,
                userId: socialCreated.userId
            });
        }
    }else if(req.method === 'PUT'){
        // updating the user social
        if(req.body){
            console.log('body: ', req.body)
            const {_id, social, link, userIdOwner} = req.body;
            
            if(userId !== userIdOwner){ // confirms that the social belongs to him
                console.log(userId , ' - - ', userIdOwner)
                return res.status(401).json({message: "The user don't own the social"})
            }

            const updatedSocial = await Social.findOneAndUpdate({_id}, { social, link })


            if(updatedSocial){
                return res.status(200).json(updatedSocial)
            }
            
            return res.status(500).json({message: 'The social was not updated'})

        }

        return res.status(401).json({message: "Can't update "})
        
    } else if(req.method === 'DELETE'){
        
        if(req.body){
            const {_id, userIdOwner} =  req.body;

            if(userId !== userIdOwner){ // confirms that the social belongs to him
                return res.status(401).json({message: "The user don't own the social"})
            }

            const deletedSocial = await Social.deleteOne({_id});

            if(deletedSocial){
                return res.status(200).json(deletedSocial)
            }

            return res.status(500).json({message: "Can't delete the item"})
        }

        return res.status(401).json({message: "Can't delete "})
    }
    
}
