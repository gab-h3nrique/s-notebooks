import type { NextApiRequest, NextApiResponse } from 'next'
import { Users } from '../../../models/users'

export default async function handler( req: NextApiRequest,res: NextApiResponse<Object>) {
    
    const { method } = req

    if(method === 'GET') {

        try {

            const { id } = req.query

            let response;

            if(id) response = await Users.getUserById(Number(id))
            if(!id) response = await Users.getAllUsers()


            return res.status(200).json({response})

        } catch(error) {

            console.error(error)
            return res.status(500).json({ message: error })
            
        }

    }

    // return res.status(405).json({ message: 'method Not allowed' })
}