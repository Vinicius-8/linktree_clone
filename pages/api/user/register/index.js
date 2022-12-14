import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs'

import User from '../../../../models/userModel';
import connectDB from '../../../../config/db';


export default async function handler(req, res){
    await connectDB();
    if(req.method === 'POST'){
        if(req.body){

            // checks for existing of data to be stored
            const {name, nickname, email, password } = req.body
            if(!name || !nickname || !email || !password){
                return res.status(400).json({message: 'Bad request, some fields might be missing'})
            }

            //check if the email is already stored
            const userExists = await User.find({email})
            const nicknameExists = await User.find({nickname})

            //salting the pass
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(password, salt)


            if(userExists.length > 0 || nicknameExists.length > 0){
                return res.status(400).json({message: 'User/nickname already exists'})
                
            }else{        
                // user creation
                const user = await User.create({name, nickname, email, password: hashedPassword})

                if(user){
                    return res.status(201).json({
                        _id: user.id,
                        name: user.name,
                        nickname: user.nickname,
                        username: user.email,
                        token: generateToken(user.id)
                    })
                }else{
                    return res.status(400).json({message: 'The user was not created'})
                }

            }
        }   
    }
}

//generate jwt
const generateToken = (id) => {
    return jwt.sign({id}, process.env.SECRET_JWT, {
        expiresIn: '30d'
    })
}