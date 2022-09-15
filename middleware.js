import { NextResponse } from "next/server";
import * as jose from 'jose'
import Cookies from 'universal-cookie';

const secret = process.env.SECRET_JWT;


export default function middleware(req){

    const {cookies} = req;

    try{ 
        const jwt_token = JSON.parse(cookies.get('user')).token;
    }catch(err){
        const jwt_token = JSON.parse(cookies.get('user')).token;
    }
    



    console.log('token: --');
    console.log(jwt_token)


    const url =req.url;                                                         /** Criar rota especifica para o login */

    if(url.includes('/dashboard')){

        const url = req.nextUrl.clone()
        url.pathname = '/login'  // go back to login in case of unauthentucations
        try {
            if( jwt_token === undefined){
                
                return NextResponse.redirect(url)
            
            }

        
            jose.jwtVerify(jwt_token, secret)
            NextResponse.next(); // passa pra pagina que tentara acessar
        } catch (error) {
            return NextResponse.redirect(url)
        }
    }

    return NextResponse.next();
}