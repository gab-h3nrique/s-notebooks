
import { getCookie } from "./cookie"
import jwt from 'jsonwebtoken';

export async function cookieUser() {

    const auth = await getCookie('auth')
    const user = jwt.decode(auth as string)

    return user
}

export async function authorizationToken(req:any) {
    const authorization = req.headers.authorization || ''
    const token = <string>authorization.replace('Bearer ', '');
    return token
}

