import { NextResponse } from "next/server";
import * as jose from 'jose'

const secret = process.env.SECRET_JWT;


export default function middleware(req){

    const {cookies} = req;

    const jwt_token = cookies.token;

    const url =req.url;

    if(url.includes('/dashboard')){
        if( jwt_token === undefined){
            return NextResponse.redirect('/login');
        
        }

        try {
            jose.jwtVerify(jwt_token, secret)
            NextResponse.next(); // passa pra pagina que tentara acessar
        } catch (error) {
            return NextResponse.redirect('/login');
    
        }
    }

    return NextResponse.next();
}