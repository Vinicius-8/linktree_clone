import { NextResponse } from "next/server";
import { verify } from 'jsonwebtoken'

const secret = process.env.SECRET_JWT;
console.log('--'+secret);

// export default function middleware(req){
//     const {cookies} = req;

//     const jwt = cookies.token;

//     const url =req.url;
// }