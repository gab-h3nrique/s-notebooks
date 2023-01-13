// middleware.ts
// import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import Api from "../lib/api";
import { verify } from '../lib/jwtToken';
import { Users } from './models/users';

export default async function middleware(req: NextRequest) {

    try{

        if(!await isAuthenticated(req)) return handleNotAuthenticated(req);

        return NextResponse.next();
        
    } catch(error) {
        
        return handleNotAuthenticated(req);
    
    }
    
}

//  running middleware on specific paths.
export const config = {
    matcher: ['/app/:path*', '/api/auth/:path*'],
}

async function isAuthenticated(request: NextRequest):Promise<boolean> {

    const authorization = request.headers.get('authorization') || request.cookies.get('auth') || '';
    const token = <string>authorization.replace('Bearer ', '');

    if(!token) return false

    const decodedToken = await verify(token, process.env.ACCESS_TOKEN as string)

    return decodedToken.id ? true : false;

}

function handleNotAuthenticated(request: NextRequest): NextResponse | undefined {

    const { pathname } = request.nextUrl

    if (pathname.startsWith('/app')) return NextResponse.redirect(new URL('/login', request.url))
    if (pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', request.url));

}

// ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION 

// export default async function middleware(req: NextRequest) {

//     try{

//         const authorization = req.headers.get('authorization') || req.cookies.get('auth') || '';
//         const token = <string>authorization.replace('Bearer ', '');
    
//         if(!token) {
    
//             if (req.nextUrl.pathname.startsWith('/app')) return NextResponse.redirect(new URL('/login', req.url))
//             if (req.nextUrl.pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', req.url));
//         }

//         const user = await verify(token, process.env.ACCESS_TOKEN as string);
//         // fazer validação com o retorno do verify com o usuario do banco <<---------------------
//         return NextResponse.next();
        
//     } catch(error) {
        
//         if (req.nextUrl.pathname.startsWith('/app')) return NextResponse.redirect(new URL('/login', req.url))
//         if (req.nextUrl.pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', req.url));
    
//     }
    
// }

// //  running middleware on specific paths.
// export const config = {
//     matcher: ['/app/:path*', '/api/auth/:path*'],
// }

// ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION  ******** OLD VERSION 
