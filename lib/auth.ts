
import { getCookie } from "./cookie"
import jwt from 'jsonwebtoken';
import { decode } from "./jwtToken";

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

export const authUser = {

    get: async() => {

        const auth = await getCookie('auth')

        return await jwt.decode(auth as string) || null

    },

}
