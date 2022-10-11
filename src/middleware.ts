// middleware.ts
// import jwt from 'jsonwebtoken';
import { NextRequest, NextResponse } from 'next/server';
import { verify } from '../lib/jwtToken';

export default async function middleware(req: NextRequest) {
    const authorization = req.headers.get('authorization') || req.cookies.get('auth') || '';
    const token = <string>authorization.replace('Bearer ', '');

    if(!token) {
        if (req.nextUrl.pathname.startsWith('/app')) return NextResponse.redirect(new URL('/login', req.url))
        if (req.nextUrl.pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', req.url));
    }
    try{
        const user = await verify(token, process.env.ACCESS_TOKEN as string);
        // fazer validação com o retorno do verify com o usuario do banco <<---------------------
        return NextResponse.next();
    } catch(error) {
        if (req.nextUrl.pathname.startsWith('/app')) return NextResponse.redirect(new URL('/login', req.url))
        if (req.nextUrl.pathname.startsWith('/api')) return NextResponse.redirect(new URL('/api/unauthorized', req.url));
    }
}

//  running middleware on specific paths.
export const config = {
    matcher: ['/app/:path*', '/api/auth/:path*'],
  }