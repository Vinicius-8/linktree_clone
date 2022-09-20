import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import User from '../../../../models/userModel';
import connectDB from '../../../../config/db';

export default async function handler(req, res){
    await connectDB();
    if(req.method === 'POST'){
        if(req.body){
            const {email, password} = req.body;
            

            if(!email || !password){ // tem email e senha no request
                return res.status(400).json({message: "Bad request"})
            }

            const user = await User.findOne({email})

            if(!user){ // nao acha o user
                return res.status(404).json({message:"User not found"})
            }


            if(!await bcrypt.compare(password, user.password)){ // acha o user mas senha n bate
                return res.status(301).json({message:"Not authorized"})
            }
            return res.status(200).json({
                _id: user.id,
                name: user.name,
                username: user.email,
                token: generateToken(user._id)
            });
        }
    }
}

const generateToken = (id) => {
    // const secret =  crypto.createSecretKey(process.env.SECRET_JWT)

    
    return jwt.sign(
            {id}, 
            process.env.SECRET_JWT,
            { 
                expiresIn: '30d', 
            }
        );

    
}

// const generateToken = async (id) => {
//     const secretKey = crypto.createSecretKey(process.env.SECRET_JWT)
//     const token  = await new jose.SignJWT({ id})
//     .setProtectedHeader({  alg: 'HS256'})
//     .setExpirationTime('30d')
//     .sign(secretKey);

//     console.log(token);

//   return token
// }