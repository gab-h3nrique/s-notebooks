// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../db/prisma";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    
    const {email, password} = req.body;
    const { method } = req;

    if(method !== 'POST')  return res.status(405).json({ message: 'method Not allowed' })

    if(!email || !password) return res.status(200).json({ message: 'missing parameters' })

    try {

        const userDb = await prisma.users.findUnique({
            where: { email: email }
        })
        
        if(!userDb)  return res.status(404).json({ message: 'email ou senha inválidos!' })
        
        if(!await bcrypt.compare(password, userDb.password)) return res.status(404).json({ message: 'email ou senha inválidos!' }) 

        // if(password !== userDb.password)  return res.status(404).json({ message: 'email ou senha inválidos!' })

        const userLogin = {id:userDb.id, name:userDb.name, email:userDb.email, role:userDb.role};

        const accessToken = jwt.sign(userLogin, `${process.env.ACCESS_TOKEN}` as string);
        
        return res.status(200).json({ accessToken: accessToken, user: userLogin });

    } catch(error) {

        console.error(error)
        return res.status(500).end(error)

    }
}