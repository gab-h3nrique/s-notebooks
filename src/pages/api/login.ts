// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../db/prisma";
import jwt from 'jsonwebtoken';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    
    const {email, password} = req.body;
    const { method } = req;

    if(method !== 'POST')  return res.status(405).json({ message: 'method Not allowed' })

    if(!email || !password) return res.status(200).json({ message: 'missing parameters' })

    try {

        const userDb = await prisma.users.findUnique({
            where: {
                email: email
            }
        })
        
        if(!userDb || email !== userDb.email)  return res.status(404).json({ message: 'email or password invalid!' })
        
        if(password !== userDb.password)  return res.status(404).json({ message: 'email or password invalid!' })

        const userLogin = {id:userDb.id, name:userDb.name, email:userDb.email};

        const accessToken = jwt.sign(userLogin, process.env.ACCESS_TOKEN as string);
        
        return res.status(200).json({ accessToken: accessToken, user: userLogin });

    } catch(error) {

        console.error(error)
        return res.status(500).end(error)

    }
}