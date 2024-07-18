// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../../db/prisma";
import jwt from 'jsonwebtoken';
import { deleteCookie, getCookie } from '../../../lib/cookie';

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
    
    try {

        const cookie = deleteCookie('auth')
        
        return res.status(200).json({cookie})

    } catch(error:any) {

        console.error(error)
        return res.status(500).json({ message: error.message })
        
    }
}