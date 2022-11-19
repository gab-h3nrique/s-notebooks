// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../db/prisma";
import jwt from 'jsonwebtoken';
import { Users } from '../../models/users';
import bcrypt from 'bcrypt'

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    
    const {name, email, password, role} = req.body;
    const { method } = req;
    
    if(method !== 'POST') return res.status(405).json({ message: 'method Not allowed' })

    if(!name || !email || !password) return res.status(200).json({ message: 'missing parameters' })
    
    try {
        console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
        const response = await prisma.users.findUnique({
            where: { email: email }
        })

        if(response) return res.status(409).json({ message: 'this email is already in use' })

        const hashedPassword = await bcrypt.hash(password, 2) 

        const userDb = await Users.createUser( {name: name, email: email, password: hashedPassword, role: role ? Number(role) : 200} )

        const newUser = {id:userDb.id, name:userDb.name, email:userDb.email};

        const accessToken = jwt.sign(newUser, process.env.ACCESS_TOKEN as string);
        
        return res.status(201).json({ accessToken: accessToken, user: newUser });

    } catch(error) {

        console.error(error)
        return res.status(500).end(error)
        
    }
}
