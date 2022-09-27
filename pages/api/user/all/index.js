import User from '../../../../models/userModel';
import connectDB from '../../../../config/db';

export default async function handler(req, res){
    await connectDB();

    if(req.method === 'GET'){
        
        /**
         o segundo argumento  " { password: 0} " garante que esse campo não seja retornado do DB, 
         caso seja trocado o 0 por 1, entao esse será o unico elemento retornando
         
         */
        const allUsers = await User.find({}, { password: 0}); 
        
        return res.status(200).json({users: allUsers})
    }

    return res.status(405).json({message: "Can't access"})
}