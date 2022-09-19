import { NextResponse } from "next/server";
import * as jose from 'jose'
import { verify } from "jsonwebtoken";


const secret = process.env.SECRET_JWT;


export default function middleware(req){

    const {cookies} = req;

    let jwt_token = undefined;

    try{ 
        jwt_token = JSON.parse(cookies.get('user')).token;
    }catch(err){
        console.log('undefinded cookie');
    }
    

    const url = req.url;                                                         /** Criar rota especifica para o login */

    if(url.includes('/dashboard')){
        const url_ = req.nextUrl.clone();
        url_.pathname = '/login'  // go back to login in case of unauthentucations
        try {
            
            if( jwt_token === undefined)
                return NextResponse.redirect(url_)           
                
                
             verify(jwt_token, secret)   
            //jose.jwtVerify(jwt_token, secret,  {algorithms:['HS256']}).then(resp => console.log('Validou: ', resp)).catch(err => console.log('ERR: ', err))
            //jose.jwtVerify(JSON.stringify(jwt_token), secret).then(resp => console.log('Validou: ', resp)).catch(err => console.log('ERR: ', err))
        } catch (error) {
            return NextResponse.redirect(url_)
        }

        console.log('CHegouy:: ');
    }    
}